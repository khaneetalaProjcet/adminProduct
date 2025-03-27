<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center">
                    <v-tab value="one">فروش حضوری موفق</v-tab>
                    <v-tab value="two">فروش حضوری ناموفق</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12">
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
                            <v-card title="موفق">
                                <template v-slot:text>
                                    <v-text-field v-model="CompleteInPersonSellSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="CompleteInPersonSellHeader" :items="CompleteInPersonSellData"
                                    :search="CompleteInPersonSellSearch" :loading="CompleteInPersonSellLoading">
                                    <template v-slot:item.totalPrice="{ item }">
                                        <p>{{ formatNumber(item.totalPrice) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip
                                                :text="item.status == 'completed' ? 'پرداخت موفق' : 'در انتظار پرداخت'"
                                                :color="item.status == 'completed' ? '#00853f' : '#66666'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                    <!-- <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-refund-2-line" color="#d4af37"
                                            @click="CompleteInPersonSellInfo(item)"></v-icon>
                                    </template> -->
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="two">
                            <v-card title="ناموفق">
                                <template v-slot:text>
                                    <v-text-field v-model="FailedInPersonSellSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="FailedInPersonSellHeader" :items="FailedInPersonSellData"
                                    :search="FailedInPersonSellSearch" :loading="CompleteInPersonSellLoading">
                                    <template v-slot:item.totalPrice="{ item }">
                                        <p>{{ formatNumber(item.totalPrice) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip
                                                :text="item.status == 'failed' ? 'پرداخت ناموفق' : 'در انتظار پرداخت'"
                                                :color="item.status == 'failed' ? '#66666' : '#00853f'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                    <!-- <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-refund-2-line" color="#d4af37"
                                            @click="CompleteInPersonSellInfo(item)"></v-icon>
                                    </template> -->
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>

        <!-- InPersonSell Dialog -->
        <v-dialog v-model="InPersonSellDialog" max-width="600" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات خرید</p>
                </div>
                <div class="d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 user-dialog-info">
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام: </p>
                            <p class="mx-2">{{ InPersonSellDetail.Seller.firstName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2 user-price">
                            <p>کد ملی: </p>
                            <p class="mx-2">{{ InPersonSellDetail.Seller.nationalCode }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>مبلغ کل: </p>
                            <p class="mx-2">{{ formatNumber(InPersonSellDetail.totalPrice) }} تومان</p>
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ InPersonSellDetail.Seller.lastName }}</p>
                        </div>

                        <div class="d-flex align-items-center my-2 user-price">
                            <p>قیمت لحظه ای طلا: </p>
                            <p class="mx-2">{{ formatNumber(InPersonSellDetail.goldPrice) }} تومان</p>
                        </div>
                        <div class="d-flex align-items-center my-2 user-price">
                            <p>وزن طلای خریداری شده: </p>
                            <p class="mx-2">{{ formatNumber(InPersonSellDetail.goldWeight) }} تومان</p>
                        </div>
                    </div>
                </div>
                <div class="form-box">
                    <v-form ref="form" @submit.prevent="submitInPersonSell">
                        <v-btn type="submit" size="large" class="my-2" :loading="InPersonSellSubmitLoading" block>بررسی
                            مجدد
                            پرداخت</v-btn>
                    </v-form>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="بستن" @click="InPersonSellDialog = false" size="large" class="m-3"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>


        <v-alert v-if="alertSuccess" color="success" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ successMsg }}
        </v-alert>


    </div>
</template>

<script setup>
import GoldBoxService from '@/services/goldBox/goldbox';
import InPersonService from '@/services/inperson/inperson';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const successMsg = ref('');
const alertError = ref(false);
const alertSuccess = ref(false);
const InPersonSellSubmitLoading = ref(false);
const tab = ref(null);
const CompleteInPersonSellSearch = ref();
const CompleteInPersonSellHeader = ref([
    {
        title: 'نام',
        key: 'Seller.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'Seller.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'Seller.phoneNumber',
    },
    {
        title: 'مبلغ خرید (تومان)',
        key: 'totalPrice',
    },
    {
        title: 'وزن طلا (گرم)',
        key: 'goldWeight',
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
        title: 'شناسه پرداخت',
        key: 'invoiceId'
    },
    {
        title: 'وضعیت',
        key: 'status'
    },
]);
const FailedInPersonSellHeader = ref([
    {
        title: 'نام',
        key: 'Seller.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'Seller.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'Seller.phoneNumber',
    },
    {
        title: 'مبلغ خرید (تومان)',
        key: 'totalPrice',
    },
    {
        title: 'وزن طلا (گرم)',
        key: 'goldWeight',
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
        title: 'شناسه پرداخت',
        key: 'invoiceId'
    },
    {
        title: 'وضعیت',
        key: 'status'
    },
])
const CompleteInPersonSellData = ref();
const CompleteInPersonSellLoading = ref();
const FailedInPersonSellLoading = ref();
const FailedInPersonSellData = ref();
const FailedInPersonSellSearch = ref();
const InPersonSellDetail = ref();
const InPersonSellDialog = ref(false);
const InPersonSellSubmitDetail = ref({
    authority: '',
    id: '',
})


const GetCompleteInPersonSellList = async () => {
    try {
        CompleteInPersonSellLoading.value = true;
        const response = await InPersonService.InPersonSell('completed');
        CompleteInPersonSellData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        CompleteInPersonSellLoading.value = false;
    }
};

const GetFailedInPersonSellList = async () => {
    try {
        FailedInPersonSellLoading.value = true;
        const response = await InPersonService.InPersonSell('failed');
        FailedInPersonSellData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        FailedInPersonSellLoading.value = false;
    }
};


const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const submitInPersonSell = async () => {
    try {
        InPersonSellSubmitLoading.value = true;
        const response = await GoldBoxService.SubmitInPersonSell(InPersonSellSubmitDetail.value);
        successMsg.value = response.msg;
        alertSuccess.value = true;
        setTimeout(() => {
            alertSuccess.value = false;
        }, 5000)
        GetCompleteInPersonSellList();
        GetFailedInPersonSellList();
        InPersonSellDialog.value = false;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        InPersonSellSubmitLoading.value = false;
    }
}

onMounted(() => {
    GetCompleteInPersonSellList();
    GetFailedInPersonSellList();
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
}

.k-dialog-title p {
    margin: 0.5rem;
    font-size: 18px;
    color: #fff;
}

.user-dialog-info {
    font-size: 14px;
}

.form-box {
    width: 100%;
    padding: 0 2rem;
}
</style>
