<template>
    <v-container>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center">
                    <v-tab value="one">مانیتور سرور</v-tab>
                    <v-tab value="two">مانیتور انتقال</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12">
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
                            <v-card title="سرویس ها">
                                <template v-slot:text>
                                    <v-text-field v-model="ServerSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="serverHeader" :items="serverData" :search="ServerSearch"
                                    :loading="ServerLoading">
                                    <template v-slot:item.status="{ item }">
                                        <v-chip :text="item.status == 0 ? 'DOWN' : 'UP'"
                                            :color="item.status == 0 ? '#ff0000' : '#43A047'" size="small"></v-chip>
                                    </template>
                                    <template v-slot:item.error="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-signal-wifi-error-line"
                                            color="#d4af37" @click="errorView(item)"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="two">
                            <v-card title="انتقال ها">
                                <template v-slot:text>
                                    <v-text-field v-model="transferSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="transferHeader" :items="transferData"
                                    :loading="transferLoading">
                                    <template v-slot:item.isHaveBank="{ item }">
                                        <v-icon size="small" icon="ri-close-line" color="#c9190c"
                                            v-if="item.isHaveBank == false"></v-icon>
                                        <v-icon size="small" icon="ri-check-line" color="#0b8707"
                                            v-else-if="item.isHaveBank == true"></v-icon>
                                    </template>
                                    <template v-slot:item.oldUserCheck="{ item }">
                                        <v-icon size="small" icon="ri-close-line" color="#c9190c"
                                            v-if="item.oldUserCheck == false"></v-icon>
                                        <v-icon size="small" icon="ri-check-line" color="#0b8707"
                                            v-else-if="item.oldUserCheck == true"></v-icon>
                                    </template>
                                    <!-- <template v-slot:bottom>
                                        <div class="text-center pt-2">
                                            <v-pagination v-model="currentPage" :length="totalPages"
                                                :total-visible="4"></v-pagination>
                                        </div>
                                    </template> -->
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-exchange-funds-line" color="#c9190c"
                                            :loading="transferDetailLoading" @click="TransferDetail(item)"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>
    </v-container>

    <v-dialog v-model="errorDialog" max-width="500" class="error-dialog">
        <v-card class="dialog-card">
            <div class="pa-5">
                <div v-for="(item, i) in errorData" :key="i">
                    <p>{{ item }}</p>
                    <v-divider></v-divider>
                </div>
            </div>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="close" @click="errorDialog = false" size="large" class="m-3"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


    <v-dialog v-model="transferDialog" max-width="500" class="error-dialog">
        <v-card class="dialog-card">
            <div class="k-dialog-title">
                <p>احراز هویت</p>
            </div>
            <div class="pa-5">
                <v-row v-if="transferDetailLoading == true">
                    <v-col cols="12">
                        <div class="d-flex justify-center align-center">
                            <p>لطفا منتظر بمانید ...</p>
                        </div>
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col cols="6">
                        <div class="d-flex align-center justify-between">
                            <p class="mx-2">تعداد انتقال:</p>
                            <p class="mx-2">{{ transferDetailData.logs.length }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex align-center justify-between">
                            <p class="mx-2">حجم خرید:</p>
                            <p class="mx-2">{{ transferDetailData.allBuys }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex align-center justify-between">
                            <p class="mx-2">حجم فروش:</p>
                            <p class="mx-2">{{ transferDetailData.allSels }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex align-center justify-between">
                            <p class="mx-2">موجودی ریالی:</p>
                            <p class="mx-2">{{ transferDetailData.balance }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex align-center justify-between">
                            <p class="mx-2">حجم واریز:</p>
                            <p class="mx-2">{{ transferDetailData.dep }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex align-center justify-between">
                            <p class="mx-2">حجم خالص خرید:</p>
                            <p class="mx-2">{{ transferDetailData.goldW }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex align-center justify-between">
                            <p class="mx-2">موجودی صندوق طلا:</p>
                            <p class="mx-2">{{ transferDetailData.mainWallet }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex align-center justify-between">
                            <p class="mx-2">برداشت:</p>
                            <p class="mx-2">{{ transferDetailData.withd }}</p>
                        </div>
                    </v-col>
                    <v-divider class="my-3"></v-divider>
                    <v-col cols="12" v-for="(item, i) in transferDetailData.logs" :key="i">
                        <div class="d-flex justify-space-between align-items-center flex-wrap">
                            <div class="d-flex mx-2">
                                <p class="mx-1">founded:</p>
                                <p class="mx-1">{{ item.founded }}</p>
                            </div>

                            <div class="d-flex mx-2">
                                <p class="mx-1">weight:</p>
                                <p class="mx-1">{{ item.weight }}</p>
                            </div>

                            <div class="d-flex mx-2">
                                <p class="mx-1">nationalCode:</p>
                                <p class="mx-1">{{ item.nationalCode }}</p>
                            </div>

                            <div class="d-flex mx-2">
                                <p class="mx-1">userId:</p>
                                <p class="mx-1">{{ item.userId }}</p>
                            </div>

                            <div class="d-flex mx-2">
                                <p class="mx-1">date:</p>
                                <p class="mx-1">{{ item.date }}</p>
                            </div>

                            <div class="d-flex mx-2">
                                <p class="mx-1">time:</p>
                                <p class="mx-1">{{ item.time }}</p>
                            </div>
                        </div>
                        <v-divider></v-divider>
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex mx-2">
                            <p class="mx-1">verificationStatus:</p>
                            <p class="mx-1">{{ transferDetailData.oldWe.verificationStatus }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex mx-2">
                            <p class="mx-1">nationalCode:</p>
                            <p class="mx-1">{{ transferDetailData.oldWe.nationalCode }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex mx-2">
                            <p class="mx-1">phoneNumber:</p>
                            <p class="mx-1">{{ transferDetailData.oldWe.phoneNumber }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex mx-2">
                            <p class="mx-1">validData:</p>
                            <p class="mx-1">{{ transferDetailData.oldWe.validData }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex mx-2">
                            <p class="mx-1">wallet:</p>
                            <p class="mx-1">{{ transferDetailData.oldWe.wallet.goldWeight }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex mx-2">
                            <p class="mx-1">verificationStatus:</p>
                            <p class="mx-1">{{ transferDetailData.oldWe.verificationStatus }}</p>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="بستن" @click="transferDialog = false" size="large" class="m-3"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


</template>

<script setup>
import { router } from '@/plugins/router';
import ServerService from '@/services/server/server';
import { onMounted, ref } from 'vue';
import { debounce } from 'lodash'

const ServerLoading = ref(false)
const serverData = ref();
const tab = ref(null);
const serverHeader = ref([
    {
        title: 'service name',
        key: 'service',
    },
    {
        title: 'status',
        key: 'status',
    },
    {
        title: 'request count',
        key: 'total.all',
    },
    {
        title: 'request count',
        key: 'total.all',
    },
    {
        title: 'success',
        key: 'total.statusCount.success',
    },
    {
        title: 'failed',
        key: 'total.statusCount.failed',
    },
    {
        title: 'internalIssues',
        key: 'total.statusCount.internalIssues',
    },
    {
        title: 'error',
        key: 'error',
    },
]);
const ServerSearch = ref(null);
const errorData = ref();
const errorDialog = ref(false);
const transferSearch = ref('');
const transferData = ref();
const transferDetailData = ref('');
const transferHeader = ref(
    [
        {
            title: 'نام',
            key: 'firstName',
        },
        {
            title: 'نام خانوادگی',
            key: 'lastName',
        },
        {
            title: 'شماره همراه',
            key: 'phoneNumber',
        },
        {
            title: 'کد ملی',
            key: 'nationalCode',
        },
        {
            title: 'شهر',
            key: 'officeName',
        },
        {
            title: 'کارت بانکی',
            key: 'isHaveBank'
        },
        {
            title: 'انتقال یافته',
            key: 'oldUserCheck',
        },
        {
            title: 'فعالیت',
            key: 'action'
        }
    ]
);
const transferLoading = ref();
const transferDetailLoading = ref();
const transferDialog = ref(false);



const GetStatus = async () => {
    try {
        ServerLoading.value = true;
        const response = await ServerService.AllStatus();
        serverData.value = response.data;
        return response
    } catch (error) {
        if (error.response.status == 401) {
            localStorage.clear();
            router.replace("/login");
        }
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        ServerLoading.value = false;
    }
};


const GetTransferData = async () => {
    try {
        transferLoading.value = true;
        const response = await ServerService.transfer(transferSearch.value);
        transferData.value = response;
        return response
    } catch (error) {
        if (error.response.status == 401) {
            localStorage.clear();
            router.replace("/login");
        }
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        transferLoading.value = false;
    }
};

const TransferDetail = (item) => {
    transferDialog.value = true;
    getTransferDetail(item.id)
};

const getTransferDetail = async (id) => {
    try {
        transferDetailLoading.value = true;
        const response = await ServerService.transferDetail(id);
        transferDetailData.value = response;
        return response
    } catch (error) {
        if (error.response.status == 401) {
            localStorage.clear();
            router.replace("/login");
        }
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        transferDetailLoading.value = false;
    }
}

const errorView = (item) => {
    errorDialog.value = true;
    errorData.value = item.total.error;
}

watch(
    transferSearch,
    debounce(() => {
        GetTransferData()
    }, 1000)
)

onMounted(() => {
    GetStatus();
    GetTransferData();
})

</script>

<style scoped>
.error-dialog {
    direction: ltr;
    padding: 1rem;
}

.k-dialog-title {
    border-radius: 0.5rem 0.5rem 0 0 !important;
    background-color: #d4af37;
    padding: 0.5rem;
}

.k-dialog-title p {
    margin: 0.5rem;
    font-size: 18px;
    color: #fff;
}
</style>
