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
                                    <v-data-table :headers="financeTransactionHeader" :items="financeItemData.buys"
                                        :loading="financeItemLoading">
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
                                                <v-chip
                                                    :text="item.type.title == 'sell' ? 'فروش' : 'خرید' "
                                                    color="#666666" size="small"></v-chip>
                                                    <!-- <p>{{ item.type.title }}</p> -->
                                            </div>
                                        </template>

                                        <template v-slot:item.action="{ item }">
                                            <v-icon class="me-2" size="small" icon="ri-info-i" color="#d4af37"
                                                @click="FinanceInfo(item)"></v-icon>
                                        </template>
                                    </v-data-table>
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
                <v-col cols="6" class="my-1 pa-1">
                    <div class="d-flex align-center">
                        <p>قیمت لحظه ای طلا : </p>
                        <p>{{ financeDetail.goldPrice }}</p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1">
                    <div class="d-flex align-center">
                        <p>وزن طلا : </p>
                        <p>{{ financeDetail.goldWeight }}</p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1">
                    <div class="d-flex align-center">
                        <p>قیمت کل : </p>
                        <p>{{ financeDetail.totalPrice }}</p>
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
                <v-col cols="6" class="my-1 pa-1">
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
                <v-col cols="6" class="my-1 pa-1">
                    <div class="d-flex align-center">
                        <p>نوع پرداخت : </p>
                        <p v-if="financeDetail.paymentMethod == 0">درگاه</p>
                        <p v-else-if="financeDetail.paymentMethod == 1">کارت به کارت</p>
                        <p v-else-if="financeDetail.paymentMethod == 2">کارتخوان</p>
                        <p v-else-if="financeDetail.paymentMethod == 3">پول نقد</p>
                        <p v-else> - </p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1">
                    <div class="d-flex align-center">
                        <p>ادمین : </p>
                        <p>{{ financeDetail.adminId }}</p>
                    </div>
                </v-col>
                <v-col cols="6" class="my-1 pa-1">
                    <div class="d-flex align-center">
                        <p>حسابدار : </p>
                        <p>{{ financeDetail.accounterId }}</p>
                    </div>
                </v-col>
                <v-col cols="12" class="my-1 pa-1">
                    <div class="d-flex align-center">
                        <p>شماره کارت مبدا : </p>
                        <p>{{ financeDetail.originCardPan }}</p>
                    </div>
                </v-col>
                <v-col cols="12" class="my-1 pa-1">
                    <div class="d-flex align-center">
                        <p>شماره کارت مقصد : </p>
                        <p>{{ financeDetail.destCardPan }}</p>
                    </div>
                </v-col>
                <v-col cols="12" class="my-1 pa-1">
                    <div class="d-flex align-center">
                        <p>توضیحات حسابدار : </p>
                        <p>{{ financeDetail.accounterDescription }}</p>
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
    buys: [],
    wallet: {
        balance: '-',
        blocked: '-',
        goldWeight: '-',
    }
});

const financeDetail = ref({
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
})

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
        financeItemLoading.value = true;
        financeSheet.value = true;
        const response = await WalletService.UserFinanceItem(item.id);
        financeItemData.value.firstName = response.data?.firstName;
        financeItemData.value.lastName = response.data?.lastName;
        financeItemData.value.nationalCode = response.data?.nationalCode;
        financeItemData.value.phoneNumber = response.data?.phoneNumber;
        financeItemData.value.bankAccounts = response.data?.bankAccounts;
        financeItemData.value.buys = response.data?.buys;
        financeItemData.value.wallet.balance = response.data?.wallet.balance;
        financeItemData.value.wallet.blocked = response.data?.wallet.blocked;
        financeItemData.value.wallet.goldWeight = response.data?.wallet.goldWeight;
        financeItemData.value.buys.map((item)=>{
            console.log(item.type)
        })
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

const FinanceInfo = async (item) => {
    detailModal.value = true;
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
}


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
</style>
