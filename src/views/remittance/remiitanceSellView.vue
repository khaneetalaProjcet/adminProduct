<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center">
                    <v-tab value="one">حواله های در انتظار</v-tab>
                    <v-tab value="two">حواله های موفق</v-tab>
                    <v-tab value="three">حواله های ناموفق</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12">
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
                            <v-card title="در انتظار تایید">
                                <template v-slot:text>
                                    <v-text-field v-model="PendingRemiitanceSellSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="PendingRemiitanceSellHeader" :items="PendingRemiitanceSellData"
                                    :search="PendingRemiitanceSellSearch" :loading="PendingRemiitanceSellLoading">
                                    <template v-slot:item.totalPrice="{ item }">
                                        <p>{{ formatNumber(item.totalPrice) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'pending' ? 'نامشخص' : 'پرداخت موفق'"
                                                :color="item.status == 'pending' ? '#ff0000' : '#66666'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-refund-2-line" color="#d4af37"
                                            @click="PendingRemiitanceSellInfo(item)"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="two">
                            <v-card title="موفق">
                                <template v-slot:text>
                                    <v-text-field v-model="CompleteRemiitanceSellSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="CompleteRemiitanceSellHeader"
                                    :items="CompleteRemiitanceSellData" :search="CompleteRemiitanceSellSearch"
                                    :loading="CompleteRemiitanceSellLoading">
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
                                            @click="CompleteRemiitanceSellInfo(item)"></v-icon>
                                    </template> -->
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="three">
                            <v-card title="ناموفق">
                                <template v-slot:text>
                                    <v-text-field v-model="FailedRemiitanceSellSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="FailedRemiitanceSellHeader" :items="FailedRemiitanceSellData"
                                    :search="FailedRemiitanceSellSearch" :loading="CompleteRemiitanceSellLoading">
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
                                            @click="CompleteRemiitanceSellInfo(item)"></v-icon>
                                    </template> -->
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>


        <!-- RemmitanceBuy Dialog -->
        <v-dialog v-model="RemmitanceSellDialog" max-width="600" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات فروش</p>
                </div>
                <div class="d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 user-dialog-info">
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام: </p>
                            <p class="mx-2">{{ RemmitanceSellDetail.seller.firstName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2 user-price">
                            <p>کد ملی: </p>
                            <p class="mx-2">{{ RemmitanceSellDetail.seller.nationalCode }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>مبلغ کل: </p>
                            <p class="mx-2">{{ formatNumber(RemmitanceSellDetail.totalPrice) }} تومان</p>
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ RemmitanceSellDetail.seller.lastName }}</p>
                        </div>

                        <div class="d-flex align-items-center my-2 user-price">
                            <p>قیمت لحظه ای طلا: </p>
                            <p class="mx-2">{{ formatNumber(RemmitanceSellDetail.goldPrice) }} تومان</p>
                        </div>
                        <div class="d-flex align-items-center my-2 user-price">
                            <p>وزن طلای خریداری شده: </p>
                            <p class="mx-2">{{ formatNumber(RemmitanceSellDetail.goldWeight) }} گرم</p>
                        </div>
                    </div>
                </div>
                <div class="form-box">
                    <v-textarea v-model="RemmitanceSellSubmitDetail.description" label="توضیحات" variant="outlined"
                        rows="2"></v-textarea>
                    <div class="d-flex justify-space-between mt-5">
                        <v-btn type="submit" size="large" class="my-2" color="#388E3C"
                            :loading="acceptRemmitanceSellLoading" @click="acceptRemmitanceSell">تایید
                            پرداخت</v-btn>
                        <v-btn type="submit" size="large" class="my-2" color="error"
                            :loading="rejectRemmitanceSellLoading" @click="rejectRemmitanceSell">رد
                            پرداخت</v-btn>
                    </div>
                </div>
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
import RemiitanceService from '@/services/remittance/remiitance';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const successMsg = ref('');
const alertError = ref(false);
const alertSuccess = ref(false);
const PendingRemiitanceSellLoading = ref(false);
const RemmitanceSellSubmitLoading = ref(false);
const acceptRemmitanceSellLoading = ref(false);
const rejectRemmitanceSellLoading = ref(false);
const tab = ref(null);
const PendingRemiitanceSellHeader = ref([
    {
        title: 'نام',
        key: 'seller.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'seller.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'seller.phoneNumber',
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
        title: 'شماره حساب واریز',
        key: 'originaCardPan'
    },
    {
        title: 'شناسه پرداخت',
        key: 'invoiceId'
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
const PendingRemiitanceSellSearch = ref();
const PendingRemiitanceSellData = ref();
const CompleteRemiitanceSellSearch = ref();
const CompleteRemiitanceSellHeader = ref([
    {
        title: 'نام',
        key: 'seller.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'seller.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'seller.phoneNumber',
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
        title: 'شماره حساب واریز',
        key: 'originaCardPan'
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
const FailedRemiitanceSellHeader = ref([
    {
        title: 'نام',
        key: 'seller.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'seller.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'seller.phoneNumber',
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
        title: 'شماره حساب واریز',
        key: 'originaCardPan'
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
const CompleteRemiitanceSellData = ref();
const CompleteRemiitanceSellLoading = ref();
const FailedRemiitanceSellLoading = ref();
const FailedRemiitanceSellData = ref();
const FailedRemiitanceSellSearch = ref();
const RemmitanceSellDetail = ref();
const RemmitanceSellDialog = ref(false);
const RemmitanceSellSubmitDetail = ref({
    description: '',
    id: '',
})

const GetPendingRemiitanceSellList = async () => {
    try {
        PendingRemiitanceSellLoading.value = true;
        const response = await RemiitanceService.RemiitanceSell('pending');
        PendingRemiitanceSellData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        PendingRemiitanceSellLoading.value = false;
    }
};

const GetCompleteRemiitanceSellList = async () => {
    try {
        CompleteRemiitanceSellLoading.value = true;
        const response = await RemiitanceService.RemiitanceSell('completed');
        CompleteRemiitanceSellData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        CompleteRemiitanceSellLoading.value = false;
    }
};

const GetFailedRemiitanceSellList = async () => {
    try {
        FailedRemiitanceSellLoading.value = true;
        const response = await RemiitanceService.RemiitanceSell('failed');
        FailedRemiitanceSellData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        FailedRemiitanceSellLoading.value = false;
    }
};


const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PendingRemiitanceSellInfo = (item) => {
    RemmitanceSellDialog.value = true;
    RemmitanceSellDetail.value = item;
    RemmitanceSellSubmitDetail.value.id = item.id;
}

// const submitRemmitanceSell = async () => {
//     try {
//         RemmitanceSellSubmitLoading.value = true;
//         const response = await GoldBoxService.SubmitRemmitanceSell(RemmitanceSellSubmitDetail.value);
//         successMsg.value = response.msg;
//         alertSuccess.value = true;
//         setTimeout(() => {
//             alertSuccess.value = false;
//         }, 5000)
//         GetPendingRemiitanceSellList();
//         GetCompleteRemiitanceSellList();
//         GetFailedRemiitanceSellList();
//         RemmitanceSellDialog.value = false;
//         return response
//     } catch (error) {
//         errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
//         alertError.value = true;
//         setTimeout(() => {
//             alertError.value = false;
//         }, 10000)
//     } finally {
//         RemmitanceSellSubmitLoading.value = false;
//     }
// }


const acceptRemmitanceSell = async () => {
    try {
        acceptRemmitanceSellLoading.value = true;
        const response = await RemiitanceService.AcceptSellRemmitance(RemmitanceSellSubmitDetail.value);
        successMsg.value = response.msg;
        alertSuccess.value = true;
        setTimeout(() => {
            alertSuccess.value = false;
        }, 5000)
        GetPendingRemiitanceSellList();
        GetCompleteRemiitanceSellList();
        GetFailedRemiitanceSellList();
        RemmitanceSellDialog.value = false;
        RemmitanceSellSubmitDetail.value.description = '';
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        acceptRemmitanceSellLoading.value = false;
    }
}



const rejectRemmitanceSell = async () => {
    try {
        acceptRemmitanceSellLoading.value = true;
        const response = await RemiitanceService.RejectSellRemmitance(RemmitanceSellSubmitDetail.value);
        successMsg.value = response.msg;
        alertSuccess.value = true;
        setTimeout(() => {
            alertSuccess.value = false;
        }, 5000)
        GetPendingRemiitanceSellList();
        GetCompleteRemiitanceSellList();
        GetFailedRemiitanceSellList();
        RemmitanceSellDialog.value = false;
        RemmitanceSellSubmitDetail.value.description = '';
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        acceptRemmitanceSellLoading.value = false;
    }
}




onMounted(() => {
    GetPendingRemiitanceSellList();
    GetCompleteRemiitanceSellList();
    GetFailedRemiitanceSellList();
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
