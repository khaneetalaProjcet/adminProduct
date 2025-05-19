<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center">
                    <v-tab value="one">نامشخص</v-tab>
                    <v-tab value="two">موفق</v-tab>
                    <v-tab value="three">ناموفق</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12">
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
                            <v-card title="تراکنش های استفاده نامشخص">
                                <template v-slot:text>
                                    <v-text-field v-model="PendingUseGoldSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="PendingUseGoldHeader" :items="PendingUseGoldData"
                                    :search="PendingUseGoldSearch" :loading="PendingUseGoldLoading">
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'pending' ? 'نامشخص' : 'بررسی شده'"
                                                :color="item.status == 'pending' ? '#ff0000' : '#66666'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                                            @click="PendingUseGoldInfo(item)"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="two">
                            <v-card title="تراکنش های استفاده تایید شده">
                                <template v-slot:text>
                                    <v-text-field v-model="CompleteUseGoldSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="CompleteUseGoldHeader" :items="CompleteUseGoldData"
                                    :search="CompleteUseGoldSearch" :loading="CompleteUseGoldLoading">
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'completed' ? 'موفق' : 'در انتظار بررسی'"
                                                :color="item.status == 'completed' ? '#00853f' : '#66666'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                                            @click="CompleteUseGoldInfo(item)"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="three">
                            <v-card title="تراکنش های استفاده رد شده">
                                <template v-slot:text>
                                    <v-text-field v-model="failedUseGoldSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="failedUseGoldHeader" :items="failedUseGoldData"
                                    :search="failedUseGoldSearch" :loading="failedUseGoldLoading">
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'failed' ? 'رد شده' : 'در انتظار بررسی'"
                                                :color="item.status == 'failed' ? '#66666' : '#00853f'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                                            @click="failedUseGoldInfo(item)"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>


        <!-- UseGold Dialog -->
        <v-dialog v-model="UseGoldDialog" max-width="700" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات استفاده از صندوق طلا</p>
                </div>
                <v-row class="my-3 px-3">
                    <v-col cols="12" md="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>نام: </p>
                            <p class="mx-2">{{ UseGoldDetail.user.firstName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ UseGoldDetail.user.lastName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>کد ملی: </p>
                            <p class="mx-2">{{ UseGoldDetail.user.nationalCode }}</p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>شماره موبایل: </p>
                            <p class="mx-2">{{ UseGoldDetail.user.phoneNumber }}</p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>وزن طلا: </p>
                            <p class="mx-2">{{ UseGoldDetail.goldWeight }} گرم</p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>قیمت لحظه ای طلا:</p>
                            <p class="mx-2">{{ formatNumber(UseGoldDetail.goldPrice) }} تومان</p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>تاریخ استفاده:</p>
                            <p class="mx-2">{{ UseGoldDetail.date }}</p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>زمان استفاده:</p>
                            <p class="mx-2">{{ UseGoldDetail.time }}</p>
                        </div>
                    </v-col>
                    <v-divider></v-divider>
                    <v-col cols="12" md="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>فروشنده:</p>
                            <p class="mx-2">{{ UseGoldDetail.seller.firstName }} {{ UseGoldDetail.seller.lastName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>کد فروشنده:</p>
                            <p class="mx-2">{{ UseGoldDetail.seller.code }}</p>
                        </div>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بستن" @click="UseGoldDialog = false" size="large" class="m-3"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>
    </div>
</template>

<script setup>
import { router } from '@/plugins/router';
import WalletService from '@/services/wallet/wallet';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const alertError = ref(false);
const PendingUseGoldLoading = ref(false);
const tab = ref(null);
const PendingUseGoldHeader = ref([
    {
        title: 'نام',
        key: 'user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'user.lastName',
    },
    {
        title: 'میزان طلا (گرم)',
        key: 'goldWeight',
    },
    {
        title: 'قیمت لحظه ای (تومان)',
        key: 'goldPrice',
    },
    {
        title: 'تاریخ',
        key: 'date',
    },
    {
        title: 'زمان',
        key: 'time',
    },
    {
        title: 'وضعیت',
        key: 'status'
    },
    {
        title: 'فعالیت',
        key: 'action'
    }
]);
const PendingUseGoldSearch = ref();
const PendingUseGoldData = ref();
const CompleteUseGoldSearch = ref();
const CompleteUseGoldHeader = ref([
    {
        title: 'نام',
        key: 'user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'user.lastName',
    },
    {
        title: 'میزان طلا (گرم)',
        key: 'goldWeight',
    },
    {
        title: 'قیمت لحظه ای (تومان)',
        key: 'goldPrice',
    },
    {
        title: 'تاریخ',
        key: 'date',
    },
    {
        title: 'زمان',
        key: 'time',
    },
    {
        title: 'وضعیت',
        key: 'status'
    },
    {
        title: 'فعالیت',
        key: 'action'
    }
]);
const CompleteUseGoldData = ref();
const CompleteUseGoldLoading = ref();
const UseGoldDetail = ref();
const UseGoldDialog = ref(false);
const failedUseGoldSearch = ref();
const failedUseGoldHeader = ref([
    {
        title: 'نام',
        key: 'user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'user.lastName',
    },
    {
        title: 'میزان طلا (گرم)',
        key: 'goldWeight',
    },
    {
        title: 'قیمت لحظه ای (تومان)',
        key: 'goldPrice',
    },
    {
        title: 'تاریخ',
        key: 'date',
    },
    {
        title: 'زمان',
        key: 'time',
    },
    {
        title: 'وضعیت',
        key: 'status'
    },
    {
        title: 'فعالیت',
        key: 'action'
    }
]
);
const failedUseGoldData = ref();
const failedUseGoldLoading = ref();

const GetPendingUseGoldList = async () => {
    try {
        PendingUseGoldLoading.value = true;
        const response = await WalletService.UseGoldList('pending');
        PendingUseGoldData.value = response.data;
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
        PendingUseGoldLoading.value = false;
    }
};

const GetCompleteUseGoldList = async () => {
    try {
        CompleteUseGoldLoading.value = true;
        const response = await WalletService.UseGoldList('completed');
        CompleteUseGoldData.value = response.data;
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
        CompleteUseGoldLoading.value = false;
    }
};

const GetfailedUseGoldList = async () => {
    try {
        failedUseGoldLoading.value = true;
        const response = await WalletService.UseGoldList('failed');
        failedUseGoldData.value = response.data;
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
        failedUseGoldLoading.value = false;
    }
};

const PendingUseGoldInfo = (item) => {
    UseGoldDialog.value = true;
    UseGoldDetail.value = item;
}

const CompleteUseGoldInfo = (item) => {
    UseGoldDialog.value = true;
    UseGoldDetail.value = item;
}

const failedUseGoldInfo = (item) => {
    UseGoldDialog.value = true;
    UseGoldDetail.value = item;
}

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


onMounted(() => {
    GetPendingUseGoldList();
    GetCompleteUseGoldList();
    GetfailedUseGoldList();
})


</script>

<style scoped>
.k-alert {
    position: absolute;
    top: 10px;
    left: 40%;
    font-size: 12px;
    padding: 10px !important;
    z-index: 100000;
}

.dialog-card {
    padding: 0.5rem !important;
}

.k-dialog-title {
    border-radius: 0.5rem 0.5rem 0 0 !important;
    background-color: #d4af37;
    padding: 0.5rem;
    margin: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
}

.k-dialog-title p {
    font-size: 18px;
    color: #fff;
    margin: 0.5rem;
}

.user-dialog-info {
    font-size: 14px;
}

.form-box {
    width: 100%;
    padding: 2rem;
}
</style>
