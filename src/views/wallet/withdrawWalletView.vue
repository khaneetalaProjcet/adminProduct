<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center">
                    <v-tab value="one">در انتظار پرداخت</v-tab>
                    <v-tab value="two">پرداخت شده</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12">
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">

                            <div class="d-flex justify-end ma-2">

                                <v-btn icon="ri-file-excel-line" color="#226d3a" @click="exportReport"></v-btn>
                            </div>
                            <v-card title="برداشت از کیف پول">

                                <template v-slot:text>
                                                                <ul class="listGuide">
                    <li>
معاملاتی که به‌طور مستقیم از موجودی کیف پول انجام شده و در انتظار تأیید هستند.
                    </li>
                  </ul>
                                    <v-text-field v-model="PendingWithdrawSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="PendingWithdrawHeader" :items="PendingWithdrawData"
                                    :search="PendingWithdrawSearch" :loading="PendingWithdrawLoading">
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
                                            @click="PendingWithdrawInfo(item)"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="two">

                            <v-card title="برداشت از کیف پول">
                                <template v-slot:text>
                                                 <ul class="listGuide">
                    <li>
تراکنش‌ هایی که از کیف پول کاربران کسر شده و با موفقیت انجام شده‌اند.
                    </li>
                  </ul>
                                    <v-text-field v-model="CompleteWithdrawSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="CompleteWithdrawHeader" :items="CompleteWithdrawData"
                                    :search="CompleteWithdrawSearch" :loading="CompleteWithdrawLoading">
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
                                            @click="CompleteWithdrawInfo(item)"></v-icon>
                                    </template> -->
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>


        <!-- Withdraw Dialog -->
        <v-dialog v-model="WithdrawDialog" max-width="600" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات برداشت</p>
                </div>
                <div class="d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 user-dialog-info">
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام: </p>
                            <p class="mx-2">{{ WithdrawDetail.wallet.user.firstName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>مبلغ: </p>
                            <p class="mx-2">{{ formatNumber(WithdrawDetail.amount) }} تومان</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>شماره کارت: </p>
                            <p class="mx-2">{{ WithdrawDetail.cardPan }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>نام بانک: </p>
                            <p class="mx-2">{{ WithdrawDetail.wallet.user.bankAccounts[0].name }}</p>
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ WithdrawDetail.wallet.user.lastName }}</p>
                        </div>

                        <div class="d-flex align-items-center my-2 user-price">
                            <p>موجودی کیف پول: </p>
                            <p class="mx-2">{{ formatNumber(WithdrawDetail.wallet.balance) }} تومان</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>شماره شبا: </p>
                            <p class="mx-2">{{ WithdrawDetail.shebaNumber }}</p>
                        </div>
                    </div>
                </div>
                <div class="form-box">
                    <v-form ref="form" v-model="isValid" @submit.prevent="submitWithdraw">

                        <v-text-field v-model="withdrawalDetail.withdrawalId" label="شناسه پرداخت"
                            :rules="withdrawalIdRule" class="my-2"></v-text-field>
                        <v-btn type="submit" :disabled="!isValid" size="large" class="my-2"
                            :loading="WithdrawSubmitLoading" block>ثبت</v-btn>
                    </v-form>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="بستن" @click="WithdrawDialog = false" size="large" class="m-3"></v-btn>
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
const ExportLoading = ref(false);
const alertError = ref(false);
const PendingWithdrawLoading = ref(false);
const WithdrawSubmitLoading = ref(false);
const tab = ref(null);
const isValid = ref(false);
const PendingWithdrawHeader = ref([
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
const PendingWithdrawSearch = ref();
const PendingWithdrawData = ref();
const CompleteWithdrawSearch = ref();
const CompleteWithdrawHeader = ref([
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
        title: 'شناسه پرداخت',
        key: 'withdrawalId'
    },
    // {
    //     title: 'فعالیت',
    //     key: 'action'
    // }
]);
const CompleteWithdrawData = ref();
const CompleteWithdrawLoading = ref();
const WithdrawDetail = ref();
const WithdrawDialog = ref(false);
const withdrawalDetail = ref({
    withdrawalId: '',
    id: '',
})

const GetPendingWithdrawList = async () => {
    try {
        PendingWithdrawLoading.value = true;
        const response = await WalletService.PendingWithdraw();
        PendingWithdrawData.value = response.data;
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
        PendingWithdrawLoading.value = false;
    }
};

const GetCompleteWithdrawList = async () => {
    try {
        CompleteWithdrawLoading.value = true;
        const response = await WalletService.CompleteWithdraw();
        CompleteWithdrawData.value = response.data;
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
        CompleteWithdrawLoading.value = false;
    }
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PendingWithdrawInfo = (item) => {
    WithdrawDialog.value = true;
    WithdrawDetail.value = item;
    withdrawalDetail.value.id = item.id;
}

const withdrawalIdRule = [
    (v) => !!v || 'شناسه پرداخت نمی‌تواند خالی باشد',
];

const limitInput = () => {
    withdrawalDetail.value.withdrawalId = withdrawalDetail.value.withdrawalId
        .replace(/[٠-٩۰-۹]/g, (d) =>
            String.fromCharCode(d.charCodeAt(0) - (d.charCodeAt(0) >= 0x06F0 ? 1728 : 1584))
        )
        .replace(/\D/g, '')
}

const submitWithdraw = async () => {
    try {
        WithdrawSubmitLoading.value = true;
        const response = await WalletService.SubmitWithdraw(withdrawalDetail.value);
        GetPendingWithdrawList();
        GetCompleteWithdrawList();
        WithdrawDialog.value = false;
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
        WithdrawSubmitLoading.value = false;
    }
}

const exportReport = async () => {
    try {
        ExportLoading.value = true;
        const response = await WalletService.ExportWithdraw();
        window.location.href = response[1]
        return response
    } catch (error) {
        if (error.response.status == 401) {
            localStorage.clear();
            router.replace("/login");
        }
        console.log(error)
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        ExportLoading.value = false;
    }
}

onMounted(() => {
    GetPendingWithdrawList();
    GetCompleteWithdrawList();
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
.listGuide {
  font-size: 12px;
  color: #2c3e50;
  font-weight: 500px;
  padding: 0.5rem;
  margin: 0.1rem;
  margin-bottom: 1rem;
  margin-right: 0.5rem
}
</style>
