<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card-text>
            <v-row class="filter my-3">
                <v-col cols="6" md="3">
                  <persian-date-picker v-model="filter.startDate" placeholder="از تاریخ"></persian-date-picker>
                </v-col>
                <v-col cols="6" md="3">
                  <persian-date-picker type="time" v-model="filter.startTime" placeholder="از زمان"
                    format="HH:mm:ss"></persian-date-picker>
                </v-col>
                <v-col cols="6" md="3">
                  <persian-date-picker v-model="filter.endDate" placeholder="تا تاریخ"></persian-date-picker>
                </v-col>
                <v-col cols="6" md="3">
                  <persian-date-picker type="time" v-model="filter.endTime" placeholder="تا زمان"
                    format="HH:mm:ss"></persian-date-picker>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.firstName" label="نام" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.lastName" label="نام خانوادگی" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.phoneNumber" label="شماره موبایل" density="compact" variant="outlined"
                    :rules="phoneRules" @input="limitNumber"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.nationalCode" label="کد ملی" density="compact" variant="outlined"
                    :rules="nationalCodeRules"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.goldPrice" label="قیمت طلا" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.goldWeight" label="وزن طلا" density="compact" variant="outlined"
                    :rules="validateWeight"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.admin" label="ادمین" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.accounter" label="حسابدار" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col md="6" class="d-none d-md-flex">
                </v-col>
                <v-col cols="12" md="3">
                  <div class="w-100 d-flex justify-end">
                    <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block @click="SubmitFilter('pending')">به
                      روز
                      رسانی</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="3">
                  <div class="w-100 d-flex justify-end">
                    <v-btn prepend-icon="ri-file-excel-line" block>خروجی اکسل</v-btn>
                  </div>
                </v-col>
              </v-row>


                    <v-card title="اطلاعات مالی کاربران">
                        <template v-slot:text>
                            <ul class="listGuide">
                                <li>
                                    در این صفحه می‌توان تمامی فعالیت‌های مالی کاربر و موجودی‌ها را مشاهده و بررسی کرد.
                                </li>

                            </ul>

                            <v-text-field v-model="financeSearch" label="جستجو"
                                prepend-inner-icon="ri-search-line"></v-text-field>
                        </template>
                        <v-data-table :page="currentPage" :items-per-page="itemsPerPage" :headers="financeHeader"
                            :items="financeData" :loading="financeLoading" :server-items-length="totalItems"
                            :items-per-page-options="itemsPerPageOptions" @update:options="handleOptionsChange">
                            <template v-slot:item.action="{ item }">
                                <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                                    @click="userFinanceInfo(item)"></v-icon>
                            </template>
                            <template v-slot:item.balance="{ item }">
                                <p>{{ formatNumber(item.balance) }}</p>
                            </template>
                            <template v-slot:bottom>
                                <div class="text-center pt-2">
                                    <v-pagination v-model="currentPage" :length="totalPages"
                                        :total-visible="4"></v-pagination>
                                </div>
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
                                    <div class="w-100">
                                        <v-tabs v-model="detailTab" align-tabs="center">
                                            <v-tab value="wallet">تراکنش های کیف پول</v-tab>
                                            <v-tab value="trade">تراکنش های معامله</v-tab>
                                        </v-tabs>
                                    </div>
                                </v-col>
                                <v-col cols="12" class="my-2">
                                    <v-tabs-window v-model="detailTab">
                                        <v-tabs-window-item value="wallet">
                                            <v-data-table :headers="financeTransactionWalletHeader"
                                                :items="financeItemData.wallets" :loading="financeItemLoading">
                                                <template v-slot:item.status="{ item }">
                                                    <div>
                                                        <v-chip
                                                            :text="item.status == 'completed' ? 'موفق' : (item.status) == 'pending' ? 'در انتظار' : 'ناموفق'"
                                                            :color="item.status == 'completed' ? '#00853f' : (item.status) == 'pending' ? '#666666' : '#ff0000'"
                                                            size="small"></v-chip>
                                                    </div>
                                                </template>

                                                <template v-slot:item.tradeType="{ item }">
                                                    <div>
                                                        <v-chip
                                                            :text="item.tradeType == '0' ? 'آنلاین' : (item.tradeType) == '1' ? 'تلفنی' : (item.tradeType) == '2' ? 'حضوری' : (item.tradeType) == '3' ? 'حواله' : (item.tradeType) == '4' ? 'تبدیل حضوری' : 'نامشخص'"
                                                            color="#666666" size="small"></v-chip>
                                                    </div>
                                                </template>

                                                <template v-slot:item.amount="{ item }">
                                                    <div>
                                                        <p>
                                                            {{ formatNumber(item.amount) }}
                                                        </p>
                                                    </div>
                                                </template>

                                                <template v-slot:item.type="{ item }">
                                                    <div>
                                                        <!-- <p v-if="item.type == 'withdraw'">برداشت</p>
                                                    <p v-else>واریز</p> -->

                                                        <v-chip :text="item.type == 'withdraw' ? 'برداشت' : 'واریز'"
                                                            color="#666666" size="small"></v-chip>
                                                    </div>
                                                </template>

                                                <template v-slot:item.type.title="{ item }">
                                                    <div>
                                                        <v-chip :text="item.type.title == 'sell' ? 'فروش' : 'خرید'"
                                                            color="#666666" size="small"></v-chip>
                                                    </div>
                                                </template>

                                                <template v-slot:item.action="{ item }">
                                                    <v-icon class="me-2" size="small" icon="ri-info-i" color="#d4af37"
                                                        @click="FinanceInfo(item, 'wallet')"></v-icon>
                                                </template>
                                            </v-data-table>
                                        </v-tabs-window-item>
                                        <v-tabs-window-item value="trade">
                                            <v-data-table :headers="financeTransactionTradeHeader"
                                                :items="financeItemData.invoices" :loading="financeItemLoading">
                                                <template v-slot:item.status="{ item }">
                                                    <div>
                                                        <v-chip
                                                            :text="item.status == 'completed' ? 'موفق' : (item.status) == 'pending' ? 'در انتظار' : 'ناموفق'"
                                                            :color="item.status == 'completed' ? '#00853f' : (item.status) == 'pending' ? '#666666' : '#ff0000'"
                                                            size="small"></v-chip>
                                                    </div>
                                                </template>

                                                <template v-slot:item.tradeType="{ item }">
                                                    <div>
                                                        <v-chip
                                                            :text="item.tradeType == '0' ? 'آنلاین' : (item.tradeType) == '1' ? 'تلفنی' : (item.tradeType) == '2' ? 'حضوری' : (item.tradeType) == '3' ? 'حواله' : (item.tradeType) == '4' ? 'تبدیل حضوری' : 'نامشخص'"
                                                            color="#666666" size="small"></v-chip>
                                                    </div>
                                                </template>

                                                <template v-slot:item.type.title="{ item }">
                                                    <div>
                                                        <v-chip :text="item.type.title == 'sell' ? 'فروش' : 'خرید'"
                                                            color="#666666" size="small"></v-chip>
                                                        <!-- <p>{{ item.type.title }}</p> -->
                                                    </div>
                                                </template>

                                                <template v-slot:item.action="{ item }">
                                                    <v-icon class="me-2" size="small" icon="ri-info-i" color="#d4af37"
                                                        @click="FinanceInfo(item, 'trade')"></v-icon>
                                                </template>
                                            </v-data-table>
                                        </v-tabs-window-item>
                                    </v-tabs-window>
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

    <v-dialog max-width="500" v-model="detailModal">
        <v-card class="trade-modal">
            <div class="modal-title">
                <h3 class="my-4">جزئیات تراکنش</h3>
            </div>
            <v-row class="px-3">
                <v-col cols="6" class="my-1 pa-1">
                    <div class="d-flex align-center">
                        <p>تاریخ : </p>
                        <p>{{ financeDetail.date }}</p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1">
                    <div class="d-flex align-center">
                        <p>زمان : </p>
                        <p>{{ financeDetail.time }}</p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1" v-if="financeDetail.invoiceType == 'trade'">
                    <div class="d-flex align-center">
                        <p>قیمت لحظه ای طلا : </p>
                        <p>{{ formatNumber(financeDetail.goldPrice) }} تومان</p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1" v-if="financeDetail.invoiceType == 'trade'">
                    <div class="d-flex align-center">
                        <p>وزن طلا : </p>
                        <p>{{ financeDetail.goldWeight }} گرم</p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1" v-if="financeDetail.invoiceType == 'trade'">
                    <div class="d-flex align-center">
                        <p>قیمت کل : </p>
                        <p>{{ formatNumber(financeDetail.totalPrice) }}</p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1">
                    <div class="d-flex align-center">
                        <p>شماره فاکتور : </p>
                        <p>{{ financeDetail.invoiceId }}</p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1">
                    <div class="d-flex align-center">
                        <p>وضعیت فاکتور : </p>
                        <p v-if="financeDetail.status == 'completed'">موفق</p>
                        <p v-else-if="financeDetail.status == 'pending'">در انتظار</p>
                        <p v-else>ناموفق</p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1" v-if="financeDetail.invoiceType == 'wallet'">
                    <div class="d-flex align-center">
                        <p>مبلغ : </p>
                        <p>{{ formatNumber(financeDetail.amount) }}</p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1"
                    v-if="financeDetail.invoiceType == 'wallet' && financeDetail.type == 'withdraw'">
                    <div class="d-flex align-center">
                        <p>شماره تراکنش : </p>
                        <p>{{ financeDetail.withdrawalId }}</p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1" v-if="financeDetail.invoiceType == 'trade'">
                    <div class="d-flex align-center">
                        <p>نوع معامله : </p>
                        <p v-if="financeDetail.tradeType == 0">آنلاین</p>
                        <p v-else-if="financeDetail.tradeType == 1">تلفنی</p>
                        <p v-else-if="financeDetail.tradeType == 2">حضوری</p>
                        <p v-else-if="financeDetail.tradeType == 3">حواله</p>
                        <p v-else-if="financeDetail.tradeType == 4">تبدیل حضوری</p>
                        <p v-else>ناموفق</p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1" v-if="financeDetail.invoiceType == 'trade'">
                    <div class="d-flex align-center">
                        <p>نوع پرداخت : </p>
                        <p v-if="financeDetail.paymentMethod == 0">درگاه</p>
                        <p v-else-if="financeDetail.paymentMethod == 1">کارت به کارت</p>
                        <p v-else-if="financeDetail.paymentMethod == 2">کارتخوان</p>
                        <p v-else-if="financeDetail.paymentMethod == 3">پول نقد</p>
                        <p v-else> - </p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1" v-if="financeDetail.invoiceType == 'trade'">
                    <div class="d-flex align-center">
                        <p>ادمین : </p>
                        <p>{{ financeDetail.adminId }}</p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1" v-if="financeDetail.invoiceType == 'trade'">
                    <div class="d-flex align-center">
                        <p>حسابدار : </p>
                        <p>{{ financeDetail.accounterId }}</p>
                    </div>
                </v-col>
                <v-col cols="12" class="my-1 pa-1" v-if="financeDetail.invoiceType == 'trade'">
                    <div class="d-flex align-center">
                        <p>شماره کارت مبدا : </p>
                        <p>{{ financeDetail.originCardPan }}</p>
                    </div>
                </v-col>
                <v-col cols="12" class="my-1 pa-1" v-if="financeDetail.invoiceType == 'trade'">
                    <div class="d-flex align-center">
                        <p>شماره کارت مقصد : </p>
                        <p>{{ financeDetail.destCardPan }}</p>
                    </div>
                </v-col>
                <v-col cols="12" class="my-1 pa-1" v-if="financeDetail.invoiceType == 'trade'">
                    <div class="d-flex align-center">
                        <p>توضیحات حسابدار : </p>
                        <p>{{ financeDetail.accounterDescription }}</p>
                    </div>
                </v-col>
                <v-col cols="12" class="my-1 pa-1">
                    <div class="d-flex align-center">
                        <p>توضیحات: </p>
                        <p>{{ financeDetail.description }}</p>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { router } from '@/plugins/router';
import WalletService from '@/services/wallet/wallet';
import { ref, watch } from 'vue';
import { debounce } from 'lodash'

const errorMsg = ref('');
const alertError = ref(false);
const financeLoading = ref(false);
const financeItemLoading = ref(false);
const financeSheet = ref(false);
const itemsPerPage = ref(50);
const currentPage = ref(1);
const itemsPerPageOptions = ref([5, 10, 25, 50]);
const totalItems = ref(0);
const totalPages = ref(1);
const detailModal = ref(false);
const detailTab = ref(null);
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
const financeTransactionTradeHeader = ref([
    {
        title: 'تاریخ',
        key: 'date',
    },
    {
        title: 'زمان',
        key: 'time',
    },
    {
        title: 'وزن طلا(گرم)',
        key: 'goldWeight',
    },
    {
        title: 'مبلغ (تومان)',
        key: 'goldPrice',
    },
    {
        title: 'وضعیت',
        key: 'status',
    },
    {
        title: 'نوع پرداخت',
        key: 'tradeType',
    },
    {
        title: 'شماره فاکتور',
        key: 'invoiceId',
    },
    {
        title: 'نوع تراکنش',
        key: 'type.title',
    },
    {
        title: 'فعالیت',
        key: 'action',
    },
]);

const financeTransactionWalletHeader = ref([
    {
        title: 'تاریخ',
        key: 'date',
    },
    {
        title: 'زمان',
        key: 'time',
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
        title: 'شماره فاکتور',
        key: 'invoiceId',
    },
    {
        title: 'نوع تراکنش',
        key: 'type',
    },
    {
        title: 'فعالیت',
        key: 'action',
    },
])

const financeTransactionHeader = ref([
    {
        title: 'تاریخ',
        key: 'date',
    },
    {
        title: 'زمان',
        key: 'time',
    },
    {
        title: 'وزن طلا(گرم)',
        key: 'goldWeight',
    },
    {
        title: 'مبلغ (تومان)',
        key: 'goldPrice',
    },
    {
        title: 'وضعیت',
        key: 'status',
    },
    {
        title: 'نوع پرداخت',
        key: 'tradeType',
    },
    {
        title: 'شماره فاکتور',
        key: 'invoiceId',
    },
    {
        title: 'نوع تراکنش',
        key: 'type.title',
    },
    {
        title: 'فعالیت',
        key: 'action',
    },
])
const financeSearch = ref('');
const financeData = ref();
const financeItemData = ref({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    nationalCode: '',
    bankAccounts: [],
    invoices: [],
    wallets: [],
    wallet: {
        balance: '',
        blocked: '',
        goldBlock: '',
        goldWeight: '',
    }
});
const financeDetail = ref({
    invoiceType: '',
    date: '-',
    time: '-',
    totalPrice: '-',
    goldPrice: '-',
    goldWeight: '-',
    invoiceId: '-',
    originCardPan: '-',
    paymentMethod: '-',
    status: '-',
    tradeType: '-',
    destCardPan: '-',
    description: '-',
    adminId: '-',
    accounterId: '-',
    accounterDescription: '-',
    withdrawalId: '-',
    type: '',
    amount: '-'
})
const filter = ref({
    firstName: '',
    lastName: '',
    nationalCode: '',
    phoneNumber: '',
    tradeType: 1,
    type: 'buy',
    goldPrice: '',
    goldWeight: '',
    admin: '',
    accounter: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    invoiceId: '',
    status: '',
});
const handleOptionsChange = (options) => {
    currentPage.value = options.page;
    itemsPerPage.value = options.itemsPerPage;
    GetFinance();
};

const GetFinance = async () => {
    try {
        financeLoading.value = true;
        const response = await WalletService.UserFinance(
            {
                page: currentPage.value,
                perPage: itemsPerPage.value,
                search: financeSearch.value,
            }
        );
        totalItems.value = response.data.totalItem;
        financeData.value = response.data.users;
        totalPages.value = Math.ceil(totalItems.value / itemsPerPage.value)
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
        financeItemData.value.firstName = item.firstName;
        financeItemData.value.lastName = item.lastName;
        financeItemData.value.nationalCode = item.nationalCode;
        financeItemData.value.phoneNumber = item.phoneNumber;
        financeItemData.value.wallet.balance = item.wallet.balance;
        financeItemData.value.wallet.blocked = item.wallet.blocked;
        financeItemData.value.wallet.goldBlock = item.wallet.goldBlock;
        financeItemData.value.wallet.goldWeight = item.wallet.goldWeight;
        financeItemData.value.bankAccounts = item.bankAccounts;
        financeItemLoading.value = true;
        financeSheet.value = true;
        const response = await WalletService.UserFinanceItem(item.id);
        financeItemData.value.wallets = response?.data?.wallet;
        financeItemData.value.invoices = response?.data?.invoices;
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

const FinanceInfo = async (item, type) => {
    detailModal.value = true;
    financeDetail.value.invoiceType = type;

    financeDetail.value.accounterDescription = item.accounterDescription;
    financeDetail.value.accounterId = item.accounterId;
    financeDetail.value.adminId = item.adminId;
    financeDetail.value.date = item.date;
    financeDetail.value.description = item.description;
    financeDetail.value.destCardPan = item.destCardPan;
    financeDetail.value.goldPrice = item.goldPrice;
    financeDetail.value.goldWeight = item.goldWeight;
    financeDetail.value.invoiceId = item.invoiceId;
    financeDetail.value.originCardPan = item.originCardPan;
    financeDetail.value.paymentMethod = item.paymentMethod;
    financeDetail.value.status = item.status;
    financeDetail.value.time = item.time;
    financeDetail.value.totalPrice = item.totalPrice;
    financeDetail.value.tradeType = item.tradeType;
    financeDetail.value.withdrawalId = item.withdrawalId;
    financeDetail.value.type = item.type;
    financeDetail.value.amount = item.amount;
}


const limitNumber = () => {
    searchFilter.value.phoneNumber = searchFilter.value.phoneNumber.replace(/\D/g, '').slice(0, 11);
}

const SubmitFilter = async (status) => {
    console.log(status)
    // try {
    //     if (status == 'pending') {
    //         PendingAccountingReviewLoading.value = true;
    //     } else if (status == 'completed') {
    //         CompleteAccountingReviewLoading.value = true;
    //     } else if (status == 'failed') {
    //         rejectAccountingReviewLoading.value = true;
    //     }
    //     filter.value.status = status;
    //     const response = await InPersonService.SubmitFilterInvoice(filter.value);
    //     if (status == 'pending') {
    //         PendingAccountingReviewData.value = response.data;
    //     } else if (status == 'completed') {
    //         CompleteAccountingReviewData.value = response.data;
    //     } else if (status == 'failed') {
    //         rejectAccountingReviewData.value = response.data;
    //     }
    //     return response
    // } catch (error) {
    //     if (error.response.status == 401) {
    //         localStorage.clear();
    //         router.replace("/login");
    //     }
    //     errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
    //     alertError.value = true;
    //     setTimeout(() => {
    //         alertError.value = false;
    //     }, 10000)
    // } finally {
    //     PendingAccountingReviewLoading.value = false;
    //     CompleteAccountingReviewLoading.value = false;
    //     rejectAccountingReviewLoading.value = false;
    // }
}


const phoneRules = [
    (v) => !!v || 'شماره همراه نمی‌تواند خالی باشد',
    (v) => /^\d{11}$/.test(v) || 'شماره همراه باید 11 رقم باشد',
    (v) => v.startsWith('09') || 'شماره همراه باید با 09 شروع شود',
];

const nationalCodeRules = [
    (v) => !!v || 'کد ملی الزامی است',
    (v) => /^\d{10}$/.test(v) || 'کد ملی باید ۱۰ رقم باشد',
    (v) => {
        if (!/^\d{10}$/.test(v)) return true;

        const check = +v[9];
        const sum = v.split('').slice(0, 9).reduce((acc, x, i) => acc + (+x * (10 - i)), 0) % 11;
        return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11) || 'کد ملی نامعتبر است';
    }
];

const validateWeight = [
    (v) => !!v,
    (v) => /^\d+(\.\d{1,3})?$/.test(v),
];




watch([currentPage, itemsPerPage], () => {
    GetFinance();
});

watch(
    financeSearch,
    debounce(() => {
        GetFinance()
    }, 1000)
)


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

.trade-modal {
    border-radius: 10px !important;
    padding: 0 1rem;
}


.modal-title {
    background-color: #d4af37;
    border-radius: 10px 10px 0 0;
    margin: 1rem 0;
}

.modal-title h3 {
    color: #fff;
    padding: 0 0.5rem;
}

.listGuide {
    font-size: 12px;
    color: #2c3e50;
    font-weight: 500px;
    padding: 0.5rem;
    margin: 0.2rem;
    margin-bottom: 2rem;

}
</style>
