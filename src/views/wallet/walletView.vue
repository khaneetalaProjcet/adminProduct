<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card-text>
                    <v-card title="کیف پول ها">
                        <template v-slot:text>
                            <v-text-field v-model="WalletSearch" label="جستجو"
                                prepend-inner-icon="ri-search-line"></v-text-field>
                        </template>
                        <v-data-table :headers="walletHeader" :items="walletData" :search="search"
                            :loading="walletLoading">
                            <template v-slot:item.balance="{ item }">
                                <p>{{ formatNumber(item.balance) }}</p>
                            </template>
                            <template v-slot:item.action="{ item }">
                                <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                                    @click="walletInfo(item)"></v-icon>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-card-text>
            </v-col>
        </v-row>


        <template>
            <div class="text-center pa-4">
                <v-dialog v-model="walletSheet" transition="dialog-bottom-transition" fullscreen>
                    <v-card>
                        <v-toolbar class="px-7">
                            <v-toolbar-title> کیف پول {{ walletDetail.user.firstName }} {{ walletDetail.user.lastName
                            }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon="ri-close-large-line" color="#000" @click="walletSheet = false"></v-btn>
                        </v-toolbar>
                        <v-container>
                            <v-row class="wallet-info-box">
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title">نام: </p>
                                        <p class="desc">{{ walletDetail.user.firstName }}</p>
                                    </div>
                                </v-col>
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title">نام خانوادگی: </p>
                                        <p class="desc">{{ walletDetail.user.lastName }}</p>
                                    </div>
                                </v-col>
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title">شماره موبایل: </p>
                                        <p class="desc">{{ walletDetail.user.phoneNumber }}</p>
                                    </div>
                                </v-col>
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title">کدملی: </p>
                                        <p class="desc">{{ walletDetail.user.nationalCode }}</p>
                                    </div>
                                </v-col>
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title">دارایی طلایی: </p>
                                        <p class="desc">{{ walletDetail.goldWeight }} گرم</p>
                                    </div>
                                </v-col>
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title">دارایی ریالی: </p>
                                        <p class="desc">{{ formatNumber(walletDetail.balance) }} ریال</p>
                                    </div>
                                </v-col>
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title">تعداد تراکنش ها: </p>
                                        <p class="desc">{{ walletDetail.transactions.length }}</p>
                                    </div>
                                </v-col>
                                <v-col cols="6" md="3" class="my-3">
                                    <div class="content">
                                        <p class="title red">در انتظار برداشت: </p>
                                        <p class="desc">{{ walletDetail.blocked }}</p>
                                    </div>
                                </v-col>
                                <v-divider class="my-10"></v-divider>
                                <v-col cols="12" class="my-2">
                                    <v-data-table :headers="walletTransactionHeader" :items="walletDetail.transactions"
                                        :search="transactionSearch" :loading="walletLoading">
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
                                                <v-chip
                                                    color="#000"
                                                    size="small">
                                                    <v-icon
                                                        :icon="item.type == 'deposit' ? 'ri-arrow-up-long-line' : 'ri-arrow-down-long-line'"
                                                        start></v-icon>
                                                    {{ item.type == 'deposit' ? 'واریز' : 'برداشت' }}
                                                </v-chip>
                                            </div>
                                        </template>
                                    </v-data-table>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-dialog>
            </div>
        </template>

        <!-- user info modal -->
        <!-- <v-dialog v-model="UserInfoDialog" max-width="500" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات کاربران</p>
                </div>
                <div class="d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 user-dialog-info">
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام: </p>
                            <p class="mx-2">{{ UserInfo.firstName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ UserInfo.lastName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>نام پدر: </p>
                            <p class="mx-2">{{ UserInfo.fatherName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2 user-price">
                            <p>موجودی کیف پول: </p>
                            <p class="mx-2">{{ formatNumber(UserInfo.wallet.balance) }} ریال</p>
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>تاریخ تولد: </p>
                            <p class="mx-2">{{ UserInfo.birthDate }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>کد ملی: </p>
                            <p class="mx-2">{{ UserInfo.nationalCode }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>شماره همراه: </p>
                            <p class="mx-2">{{ UserInfo.phoneNumber }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2 user-price">
                            <p>موجودی طلا: </p>
                            <p class="mx-2">{{ UserInfo.wallet.goldWeight }} گرم</p>
                        </div>
                    </div>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بستن" @click="UserInfoDialog = false" size="large" class="m-3"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>
    </div>
</template>

<script setup>
import WalletService from '@/services/wallet/wallet';
import { onMounted, ref } from 'vue';

const search = ref('');
const errorMsg = ref('');
const alertError = ref(false);
const walletLoading = ref(false);
const walletSheet = ref(false);
const walletTransactionHeader = ref([
    {
        title: 'نوع تراکنش',
        key: 'type',
    },
    {
        title: 'مبلغ (ریال)',
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
const walletHeader = ref([
    {
        title: 'نام',
        key: 'user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'user.lastName',
    },
    {
        title: 'دارایی ریالی',
        key: 'balance',
    },
    {
        title: 'دارایی طلا (گرم)',
        key: 'goldWeight',
    },
    {
        title: 'در انتظار برداشت',
        key: 'blocked',
    },
    {
        title: 'تعداد تراکنش ها',
        key: 'transactions.length',
    },
    {
        title: 'فعالیت',
        key: 'action'
    }
]);
const WalletSearch = ref();
const walletData = ref();
const walletDetail = ref();

const GetWallet = async () => {
    try {
        walletLoading.value = true;
        const response = await WalletService.AllWallet();
        walletData.value = response.data;
        console.log(walletData.value)
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        walletLoading.value = false;
    }
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const walletInfo = (item) => {
    walletSheet.value = true;
    walletDetail.value = item;
}

onMounted(() => {
    GetWallet();
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

.bottom-sheet {
    height: 100% !important;
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
