<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center">
                    <v-tab value="one">در انتظار بررسی</v-tab>
                    <v-tab value="two">بررسی شده</v-tab>
                    <v-tab value="two">رد شده</v-tab>
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
                                <v-data-table :headers="PendingAccountingReviewHeader" :items="PendingAccountingReviewData"
                                    :search="PendingAccountingReviewSearch" :loading="PendingAccountingReviewLoading">
                                    <template v-slot:item.amount="{ item }">
                                        <p>{{ formatNumber(item.amount) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'pending' ? 'در انتظار پرداخت' : 'پرداخت شده'"
                                                :color="item.status == 'pending' ? '#ff0000' : '#66666'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-refund-2-line" color="#d4af37"
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
                                <v-data-table :headers="CompleteAccountingReviewHeader" :items="CompleteAccountingReviewData"
                                    :search="CompleteAccountingReviewSearch" :loading="CompleteAccountingReviewLoading">
                                    <template v-slot:item.amount="{ item }">
                                        <p>{{ formatNumber(item.amount) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip
                                                :text="item.status == 'completed' ? 'پرداخت شده' : 'در انتظار پرداخت'"
                                                :color="item.status == 'completed' ? '#00853f' : '#66666'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                    <!-- <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-refund-2-line" color="#d4af37"
                                            @click="CompleteAccountingReviewInfo(item)"></v-icon>
                                    </template> -->
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="three">

                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>


        <!-- AccountingReview Dialog -->
        <v-dialog v-model="AccountingReviewDialog" max-width="600" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات برداشت</p>
                </div>
                <div class="d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 user-dialog-info">
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام: </p>
                            <p class="mx-2">{{ AccountingReviewDetail.wallet.user.firstName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>مبلغ: </p>
                            <p class="mx-2">{{ formatNumber(AccountingReviewDetail.amount) }} ریال</p>
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ AccountingReviewDetail.wallet.user.lastName }}</p>
                        </div>

                        <div class="d-flex align-items-center my-2 user-price">
                            <p>موجودی کیف پول: </p>
                            <p class="mx-2">{{ formatNumber(AccountingReviewDetail.wallet.balance) }} ریال</p>
                        </div>
                    </div>
                </div>
                <div class="form-box">
                    <v-form ref="form" v-model="isValid" @submit.prevent="submitAccountingReview">
                        <v-text-field v-model="AccountingReviewalDetail.AccountingReviewalId" label="شناسه پرداخت"
                            :rules="AccountingReviewalIdRule" @input="limitInput" class="my-2"></v-text-field>
                        <v-btn type="submit" :disabled="!isValid" size="large" class="my-2"
                            :loading="AccountingReviewSubmitLoading" block>ثبت</v-btn>
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
import WalletService from '@/services/wallet/wallet';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const alertError = ref(false);
const PendingAccountingReviewLoading = ref(false);
const AccountingReviewSubmitLoading = ref(false);
const tab = ref(null);
const isValid = ref(false);
const PendingAccountingReviewHeader = ref([
    {
        title: 'نام',
        key: 'wallet.user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'wallet.user.lastName',
    },
    {
        title: 'مبلغ (ریال)',
        key: 'amount',
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
        key: 'wallet.user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'wallet.user.lastName',
    },
    {
        title: 'مبلغ (ریال)',
        key: 'amount',
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
        title: 'شناسه پرداخت',
        key: 'AccountingReviewalId'
    },
    // {
    //     title: 'فعالیت',
    //     key: 'action'
    // }
]);
const CompleteAccountingReviewData = ref();
const CompleteAccountingReviewLoading = ref();
const AccountingReviewDetail = ref();
const AccountingReviewDialog = ref(false);
const AccountingReviewalDetail = ref({
    AccountingReviewalId: '',
    id: '',
})

const GetPendingAccountingReviewList = async () => {
    try {
        PendingAccountingReviewLoading.value = true;
        const response = await WalletService.PendingAccountingReview();
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
        const response = await WalletService.CompleteAccountingReview();
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

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PendingAccountingReviewInfo = (item) => {
    AccountingReviewDialog.value = true;
    AccountingReviewDetail.value = item;
    AccountingReviewalDetail.value.id = item.id;
}

const AccountingReviewalIdRule = [
    (v) => !!v || 'شناسه پرداخت نمی‌تواند خالی باشد',
];

const limitInput = () => {
    AccountingReviewalDetail.value.AccountingReviewalId = AccountingReviewalDetail.value.AccountingReviewalId
        .replace(/[٠-٩۰-۹]/g, (d) =>
            String.fromCharCode(d.charCodeAt(0) - (d.charCodeAt(0) >= 0x06F0 ? 1728 : 1584))
        )
        .replace(/\D/g, '')
}

const submitAccountingReview = async () => {
    try {
        AccountingReviewSubmitLoading.value = true;
        const response = await WalletService.SubmitAccountingReview(AccountingReviewalDetail.value);
        GetPendingAccountingReviewList();
        GetCompleteAccountingReviewList();
        AccountingReviewDialog.value = false;
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

onMounted(() => {
    GetPendingAccountingReviewList();
    GetCompleteAccountingReviewList();
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
    padding: 2rem;
}
</style>
