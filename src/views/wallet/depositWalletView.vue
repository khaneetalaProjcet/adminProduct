<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center">
                    <v-tab value="one">واریزی های نامشخص</v-tab>
                    <v-tab value="two">واریزی های موفق</v-tab>
                    <v-tab value="three">واریزی های ناموفق</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12">
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
                            <v-card title="نامشخص">
                                <template v-slot:text>
                                    <v-text-field v-model="PendingDepositSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="PendingDepositHeader" :items="PendingDepositData"
                                    :search="PendingDepositSearch" :loading="PendingDepositLoading">
                                    <template v-slot:item.amount="{ item }">
                                        <p>{{ formatNumber(item.amount) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'pending' ? 'تایید نشده' : 'پرداخت موفق'"
                                                :color="item.status == 'pending' ? '#ff0000' : '#66666'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-refund-2-line" color="#d4af37"
                                            @click="PendingDepositInfo(item)"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="two">
                            <v-card title="موفق">
                                <template v-slot:text>
                                    <v-text-field v-model="CompleteDepositSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="CompleteDepositHeader" :items="CompleteDepositData"
                                    :search="CompleteDepositSearch" :loading="CompleteDepositLoading">
                                    <template v-slot:item.amount="{ item }">
                                        <p>{{ formatNumber(item.amount) }}</p>
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
                                            @click="CompleteDepositInfo(item)"></v-icon>
                                    </template> -->
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="three">
                            <v-card title="ناموفق">
                                <template v-slot:text>
                                    <v-text-field v-model="FailedDepositSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="FailedDepositHeader" :items="FailedDepositData"
                                    :search="FailedDepositSearch" :loading="CompleteDepositLoading">
                                    <template v-slot:item.amount="{ item }">
                                        <p>{{ formatNumber(item.amount) }}</p>
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
                                            @click="CompleteDepositInfo(item)"></v-icon>
                                    </template> -->
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>


        <!-- Deposit Dialog -->
        <v-dialog v-model="DepositDialog" max-width="600" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات برداشت</p>
                </div>
                <div class="d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 user-dialog-info">
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام: </p>
                            <p class="mx-2">{{ DepositDetail.wallet.user.firstName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>مبلغ: </p>
                            <p class="mx-2">{{ formatNumber(DepositDetail.amount) }} تومان</p>
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ DepositDetail.wallet.user.lastName }}</p>
                        </div>

                        <div class="d-flex align-items-center my-2 user-price">
                            <p>موجودی کیف پول: </p>
                            <p class="mx-2">{{ formatNumber(DepositDetail.wallet.balance) }} تومان</p>
                        </div>
                    </div>
                </div>
                <div class="form-box">
                    <v-form ref="form" @submit.prevent="submitDeposit">
                        <v-btn type="submit" size="large" class="my-2" :loading="DepositSubmitLoading" block>بررسی مجدد
                            پرداخت</v-btn>
                    </v-form>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="بستن" @click="DepositDialog = false" size="large" class="m-3"></v-btn>
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
import WalletService from '@/services/wallet/wallet';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const successMsg = ref('');
const alertError = ref(false);
const alertSuccess = ref(false);
const PendingDepositLoading = ref(false);
const DepositSubmitLoading = ref(false);
const tab = ref(null);
const PendingDepositHeader = ref([
    {
        title: 'نام',
        key: 'wallet.user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'wallet.user.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'wallet.user.phoneNumber',
    },
    {
        title: 'مبلغ (تومان)',
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
const PendingDepositSearch = ref();
const PendingDepositData = ref();
const CompleteDepositSearch = ref();
const CompleteDepositHeader = ref([
    {
        title: 'نام',
        key: 'wallet.user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'wallet.user.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'wallet.user.phoneNumber',
    },
    {
        title: 'مبلغ (تومان)',
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
        title: 'شناسه واریز',
        key: 'invoiceId'
    },
    // {
    //     title: 'فعالیت',
    //     key: 'action'
    // }
]);
const FailedDepositHeader = ref([
    {
        title: 'نام',
        key: 'wallet.user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'wallet.user.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'wallet.user.phoneNumber',
    },
    {
        title: 'مبلغ (تومان)',
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
        title: 'شناسه واریز',
        key: 'invoiceId'
    },
    // {
    //     title: 'فعالیت',
    //     key: 'action'
    // }
])
const CompleteDepositData = ref();
const CompleteDepositLoading = ref();
const FailedDepositLoading = ref();
const FailedDepositData = ref();
const FailedDepositSearch = ref();
const DepositDetail = ref();
const DepositDialog = ref(false);
const DepositSubmitDetail = ref({
    authority: '',
    id: '',
})

const GetPendingDepositList = async () => {
    try {
        PendingDepositLoading.value = true;
        const response = await WalletService.PendingDeposit();
        PendingDepositData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        PendingDepositLoading.value = false;
    }
};

const GetCompleteDepositList = async () => {
    try {
        CompleteDepositLoading.value = true;
        const response = await WalletService.CompleteDeposit();
        CompleteDepositData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        CompleteDepositLoading.value = false;
    }
};

const GetFailedDepositList = async () => {
    try {
        FailedDepositLoading.value = true;
        const response = await WalletService.FailedDeposit();
        FailedDepositData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        FailedDepositLoading.value = false;
    }
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PendingDepositInfo = (item) => {
    DepositDialog.value = true;
    DepositDetail.value = item;
    DepositSubmitDetail.value.id = item.id;
    DepositSubmitDetail.value.authority = item.authority;
}

const submitDeposit = async () => {
    try {
        DepositSubmitLoading.value = true;
        const response = await WalletService.SubmitDeposit(DepositSubmitDetail.value);
        successMsg.value = response.msg;
        alertSuccess.value = true;
        setTimeout(() => {
            alertSuccess.value = false;
        }, 5000)
        GetPendingDepositList();
        GetCompleteDepositList();
        GetFailedDepositList();
        DepositDialog.value = false;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        DepositSubmitLoading.value = false;
    }
}

onMounted(() => {
    GetPendingDepositList();
    GetCompleteDepositList();
    GetFailedDepositList();
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
