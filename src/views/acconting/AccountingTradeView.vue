<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center">
                    <v-tab value="one">در انتظار بررسی</v-tab>
                    <v-tab value="two">بررسی شده</v-tab>
                    <v-tab value="three">رد شده</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12">
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
                            <v-card title="معاملات در انتظار تایید صندوق طلا">
                                <template v-slot:text>
                                    <v-text-field v-model="PendingAccountingReviewSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="PendingAccountingReviewHeader"
                                    :items="PendingAccountingReviewData" :search="PendingAccountingReviewSearch"
                                    :loading="PendingAccountingReviewLoading">
                                    <template v-slot:item.totalPrice="{ item }">
                                        <p>{{ formatNumber(item.totalPrice) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'pending' ? 'در انتظار بررسی' : 'بررسی شده'"
                                                :color="item.status == 'pending' ? '#ff0000' : '#66666'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-survey-line" color="#d4af37"
                                            @click="PendingAccountingReviewInfo(item)"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="two">
                            <v-card title="معاملات تایید شده صندوق طلا">
                                <template v-slot:text>
                                    <v-text-field v-model="CompleteAccountingReviewSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="CompleteAccountingReviewHeader"
                                    :items="CompleteAccountingReviewData" :search="CompleteAccountingReviewSearch"
                                    :loading="CompleteAccountingReviewLoading">
                                    <template v-slot:item.amount="{ item }">
                                        <p>{{ formatNumber(item.amount) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'completed' ? 'بررسی شده' : 'در انتظار بررسی'"
                                                :color="item.status == 'completed' ? '#00853f' : '#66666'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="three">
                            <v-card title="معاملات رد شده صندوق طلا">
                                <template v-slot:text>
                                    <v-text-field v-model="rejectAccountingReviewSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="rejectAccountingReviewHeader"
                                    :items="rejectAccountingReviewData" :search="rejectAccountingReviewSearch"
                                    :loading="rejectAccountingReviewLoading">
                                    <template v-slot:item.amount="{ item }">
                                        <p>{{ formatNumber(item.amount) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'failed' ? 'رد شده' : 'در انتظار بررسی'"
                                                :color="item.status == 'failed' ? '#66666' : '#00853f'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>


        <!-- AccountingReview Dialog -->
        <v-dialog v-model="AccountingReviewDialog" max-width="700" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات فاکتور</p>
                </div>
                <v-row class="my-3 px-3">
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>نام: </p>
                            <p class="mx-2">{{ AccountingReviewDetail.buyer.firstName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ AccountingReviewDetail.buyer.lastName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>کد ملی: </p>
                            <p class="mx-2">{{ AccountingReviewDetail.buyer.nationalCode }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>شماره موبایل: </p>
                            <p class="mx-2">{{ AccountingReviewDetail.buyer.phoneNumber }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>مبلغ کل: </p>
                            <p class="mx-2">{{ formatNumber(AccountingReviewDetail.totalPrice) }} تومان</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>میزان طلا: </p>
                            <p class="mx-2">{{ AccountingReviewDetail.goldWeight }} گرم</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>قیمت طلا : </p>
                            <p class="mx-2">{{ formatNumber(AccountingReviewDetail.goldPrice) }} تومان</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>تاریخ : </p>
                            <p class="mx-2">{{ AccountingReviewDetail.date }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>زمان : </p>
                            <p class="mx-2">{{ AccountingReviewDetail.time }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>کارشناس ثبت کننده : </p>
                            <p class="mx-2">{{ AccountingReviewDetail.adminId }}</p>
                        </div>
                    </v-col>
                    <v-col cols="12" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>توضیحات : </p>
                            <p class="mx-2">{{ AccountingReviewDetail.description }}</p>
                        </div>
                    </v-col>
                </v-row>
                <div class="form-box">
                    <v-form ref="form" @submit.prevent="">
                        <v-textarea v-model="AccountingRevieItemDetail.description" label="توضیحات" variant="outlined"
                            rows="2"></v-textarea>
                        <div class="d-flex justify-space-between">
                            <v-btn type="submit" size="large" class="my-2" color="#388E3C"
                                :loading="AccountingReviewSubmitLoading" @click="submitAccountingReview">تایید
                                پرداخت</v-btn>
                            <v-btn type="submit" size="large" class="my-2" color="error"
                                :loading="AccountingReviewRejectLoading" @click="rejectAccountingReview">رد
                                پرداخت</v-btn>
                        </div>
                    </v-form>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="بستن" @click="AccountingReviewDialog = false" size="large" class="m-3"></v-btn>
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
import AccountingService from '@/services/accounting/accounting';
import WalletService from '@/services/wallet/wallet';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const alertError = ref(false);
const PendingAccountingReviewLoading = ref(false);
const AccountingReviewSubmitLoading = ref(false);
const AccountingReviewRejectLoading = ref(false);
const tab = ref(null);
const PendingAccountingReviewHeader = ref([
    {
        title: 'نام',
        key: 'buyer.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'buyer.lastName',
    },
    {
        title: 'شناسه پرداخت',
        key: 'invoiceId',
    },
    {
        title: 'مبلغ (تومان)',
        key: 'totalPrice',
    },
    {
        title: 'میزان طلا (گرم)',
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
        title: 'وضعیت',
        key: 'status'
    },
    {
        title: 'فعالیت',
        key: 'action'
    }
]);
const PendingAccountingReviewSearch = ref();
const PendingAccountingReviewData = ref();
const CompleteAccountingReviewSearch = ref();
const CompleteAccountingReviewHeader = ref([
    {
        title: 'نام',
        key: 'buyer.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'buyer.lastName',
    },
    {
        title: 'شناسه پرداخت',
        key: 'invoiceId',
    },
    {
        title: 'مبلغ (تومان)',
        key: 'totalPrice',
    },
    {
        title: 'میزان طلا (گرم)',
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
        title: 'وضعیت',
        key: 'status'
    },
]);
const CompleteAccountingReviewData = ref();
const CompleteAccountingReviewLoading = ref();
const AccountingReviewDetail = ref();
const AccountingReviewDialog = ref(false);
const AccountingRevieItemDetail = ref({
    description: '',
    id: '',
})
const rejectAccountingReviewSearch = ref();
const rejectAccountingReviewHeader = ref([
    {
        title: 'نام',
        key: 'buyer.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'buyer.lastName',
    },
    {
        title: 'شناسه پرداخت',
        key: 'invoiceId',
    },
    {
        title: 'مبلغ (تومان)',
        key: 'totalPrice',
    },
    {
        title: 'میزان طلا (گرم)',
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
        title: 'وضعیت',
        key: 'status'
    },
]
);
const rejectAccountingReviewData = ref();
const rejectAccountingReviewLoading = ref();

const GetPendingAccountingReviewList = async () => {
    try {
        PendingAccountingReviewLoading.value = true;
        const response = await AccountingService.PendingAccountingList();
        PendingAccountingReviewData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        PendingAccountingReviewLoading.value = false;
    }
};

const GetCompleteAccountingReviewList = async () => {
    try {
        CompleteAccountingReviewLoading.value = true;
        const response = await AccountingService.CompleteAccountingList();
        CompleteAccountingReviewData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        CompleteAccountingReviewLoading.value = false;
    }
};

const GetRejectAccountingReviewList = async () => {
    try {
        CompleteAccountingReviewLoading.value = true;
        const response = await AccountingService.rejectAccountingList();
        rejectAccountingReviewData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        CompleteAccountingReviewLoading.value = false;
    }
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PendingAccountingReviewInfo = (item) => {
    AccountingReviewDialog.value = true;
    AccountingReviewDetail.value = item;
    AccountingRevieItemDetail.value.id = item.id;
}

const submitAccountingReview = async () => {
    try {
        AccountingReviewSubmitLoading.value = true;
        const response = await AccountingService.SubmitAccountingReview(AccountingRevieItemDetail.value);
        GetPendingAccountingReviewList();
        GetCompleteAccountingReviewList();
        GetRejectAccountingReviewList();
        AccountingReviewDialog.value = false;
        AccountingRevieItemDetail.value.description = '';
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        AccountingReviewSubmitLoading.value = false;
    }
}

const rejectAccountingReview = async () => {
    try {
        AccountingReviewRejectLoading.value = true;
        const response = await AccountingService.RejectAccountingReview(AccountingRevieItemDetail.value);
        GetPendingAccountingReviewList();
        GetCompleteAccountingReviewList();
        GetRejectAccountingReviewList();
        AccountingReviewDialog.value = false;
        AccountingRevieItemDetail.value.description = '';
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        AccountingReviewRejectLoading.value = false;
    }
}

onMounted(() => {
    GetPendingAccountingReviewList();
    GetCompleteAccountingReviewList();
    GetRejectAccountingReviewList();
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
