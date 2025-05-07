<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card-text>
                    <v-card title="اطلاعات مالی کاربران">
                        <template v-slot:text>
                            <v-text-field v-model="financeSearch" label="جستجو"
                                prepend-inner-icon="ri-search-line"></v-text-field>
                        </template>
                        <v-data-table :headers="financeHeader" :items="financeData" :loading="financeLoading">
                            <template v-slot:item.action="{ item }">
                                <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                                    @click="userFinanceInfo(item)"></v-icon>
                            </template>
                            <template v-slot:item.balance="{ item }">
                                <p>{{ formatNumber(item.balance) }}</p>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-card-text>
            </v-col>
        </v-row>


        <template>
            <div class="text-center pa-4">
                <v-dialog v-model="financeSheet" transition="dialog-bottom-transition" fullscreen>
                    <v-card>
                        <v-toolbar class="px-7">
                            <v-toolbar-title> تراکنش های مالی {{ financeItemData.firstName }} {{
                                financeItemData.lastName
                            }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon="ri-close-large-line" color="#000" @click="financeSheet = false"></v-btn>
                        </v-toolbar>
                        <v-container>
                            <v-row class="wallet-info-box">
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title">نام: </p>
                                        <p class="desc">{{ financeItemData.firstName }}</p>
                                    </div>
                                </v-col>
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title">نام خانوادگی: </p>
                                        <p class="desc">{{ financeItemData.lastName }}</p>
                                    </div>
                                </v-col>
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title">شماره موبایل: </p>
                                        <p class="desc">{{ financeItemData.phoneNumber }}</p>
                                    </div>
                                </v-col>
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title">کدملی: </p>
                                        <p class="desc">{{ financeItemData.nationalCode }}</p>
                                    </div>
                                </v-col>
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title">موجودی صندوق طلا: </p>
                                        <p class="desc">{{ financeItemData.wallet.goldWeight }} گرم</p>
                                    </div>
                                </v-col>
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title">موجودی کیف پول: </p>
                                        <p class="desc">{{ formatNumber(financeItemData.wallet.balance) }} تومان</p>
                                    </div>
                                </v-col>
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title red">در انتظار برداشت: </p>
                                        <p class="desc">{{ formatNumber(financeItemData.wallet.blocked) }} تومان</p>
                                    </div>
                                </v-col>
                                <v-divider class="my-10"></v-divider>
                                <v-col cols="12" class="my-2">
                                    <v-data-table :headers="financeTransactionHeader" :items="financeItemData.buys"
                                        :loading="financeItemLoading"></v-data-table>
                                    <!-- <v-data-table :headers="financeTransactionHeader" :items="financeItemData.buys"
                                        :loading="financeItemLoading">
                                        <template v-slot:item.amount="{ item }">
                                            <p>{{ formatNumber(item.amount) }}</p>
                                        </template>
<template v-slot:item.status="{ item }">
                                            <div>
                                                <v-chip
                                                    :text="item.status == 'completed' ? 'موفق' : (item.status) == 'pending' ? 'نامشخص' : 'ناموفق'"
                                                    :color="item.status == 'completed' ? '#00853f' : (item.status) == 'pending' ? '#666666' : '#ff0000'"
                                                    size="small"></v-chip>
                                            </div>
                                        </template>
<template v-slot:item.type="{ item }">
                                            <div>
                                                <v-chip color="#000" size="small">
                                                    <v-icon
                                                        :icon="item.type == 'deposit' ? 'ri-arrow-up-long-line' : 'ri-arrow-down-long-line'"
                                                        start></v-icon>
                                                    {{ item.type == 'deposit' ? 'واریز' : 'برداشت' }}
                                                </v-chip>
                                            </div>
                                        </template>
</v-data-table> -->
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-dialog>
            </div>
        </template>
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

const search = ref('');
const errorMsg = ref('');
const alertError = ref(false);
const financeLoading = ref(false);
const financeItemLoading = ref(false);
const financeSheet = ref(false);
const walletTransactionHeader = ref([
    {
        title: 'نوع تراکنش',
        key: 'type',
    },
    {
        title: 'مبلغ (تومان)',
        key: 'amount',
    },
    {
        title: 'وضعیت',
        key: 'status',
    },
    {
        title: 'تاریخ',
        key: 'date',
    },
    {
        title: 'زمان',
        key: 'time',
    },
])
const transactionSearch = ref('');
const financeHeader = ref([
    {
        title: 'نام',
        key: 'firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'lastName',
    },
    {
        title: 'شماره موبایل',
        key: 'phoneNumber',
    },
    {
        title: 'کد ملی',
        key: 'nationalCode',
    },
    {
        title: 'کیف پول (ریال)',
        key: 'wallet.balance',
    },
    {
        title: 'صندوق طلا (گرم)',
        key: 'wallet.goldWeight',
    },
    {
        title: 'فعالیت',
        key: 'action'
    }
]);
const financeTransactionHeader = ref([
    {
        title: 'وزن طلا(گرم)',
        key: 'goldWeight',
    },
    {
        title: 'مبلغ (تومان)',
        key: 'goldPrice',
    },
    {
        title: 'تاریخ',
        key: 'date',
    },
    {
        title: 'زمان',
        key: 'time',
    }
])
const financeSearch = ref('');
const financeData = ref();
const financeItemData = ref({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    nationalCode: '',
    bankAccounts: [],
    buys: [],
    wallet: {
        balance: '',
        blocked: '',
        goldWeight: '',
    }
});

const GetFinance = async () => {
    try {
        financeLoading.value = true;
        const response = await WalletService.UserFinance();
        financeData.value = response.data;
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
        financeLoading.value = false;
    }
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const userFinanceInfo = async (item) => {
    try {
        financeItemLoading.value = true;
        const response = await WalletService.UserFinanceItem(item.id);
        financeItemData.value.firstName = response.data.firstName;
        financeItemData.value.lastName = response.data.lastName;
        financeItemData.value.nationalCode = response.data.nationalCode;
        financeItemData.value.phoneNumber = response.data.phoneNumber;
        financeItemData.value.bankAccounts = response.data?.bankAccounts;
        financeItemData.value.buys = response.data?.buys;
        financeItemData.value.wallet.balance = response.data?.wallet.balance;
        financeItemData.value.wallet.blocked = response.data?.wallet.blocked;
        financeItemData.value.wallet.goldWeight = response.data?.wallet.goldWeight;
        financeSheet.value = true;
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
        financeItemLoading.value = false;
    }
}

onMounted(() => {
    GetFinance();
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

.wallet-info-box div.content {
    display: flex;
    padding: 0.5rem 0;
    border-bottom: 1px solid #d4af37;
}

.wallet-info-box .title {
    font-weight: bold;
    margin: 0 0.4rem;
}

.wallet-info-box .title.red {
    color: red;
}

.wallet-info-box .desc {
    margin: 0 0.4rem;
}

.v-table thead {
    border-radius: 8px 8px 0 0 !important;
}
</style>
