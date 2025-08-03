<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center" @update:modelValue="changeTabs">
                    <v-tab value="one">تایید شده</v-tab>
                    <v-tab value="two">رد شده توسط حسابدار</v-tab>
                    <v-tab value="three">عودت داده شده</v-tab>
                    <v-tab value="four">اصلاح شده</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12">
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
                            <v-row class="filter my-3">
                                <v-col cols="6" md="3">
                                    <persian-date-picker v-model="searchFilter.startDate"
                                        placeholder="از تاریخ"></persian-date-picker>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <persian-date-picker type="time" v-model="searchFilter.startTime"
                                        placeholder="از زمان" format="HH:mm:ss"></persian-date-picker>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <persian-date-picker v-model="searchFilter.endDate"
                                        placeholder="تا تاریخ"></persian-date-picker>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <persian-date-picker type="time" v-model="searchFilter.endTime"
                                        placeholder="تا زمان" format="HH:mm:ss"></persian-date-picker>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <v-text-field v-model="searchFilter.firstName" label="نام" density="compact"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <v-text-field v-model="searchFilter.lastName" label="نام خانوادگی" density="compact"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <v-text-field v-model="searchFilter.phoneNumber" label="شماره موبایل"
                                        density="compact" variant="outlined" :rules="phoneRules"
                                        @input="limitNumber"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <v-text-field v-model="searchFilter.nationalCode" label="کد ملی" density="compact"
                                        variant="outlined" :rules="nationalCodeRules"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <v-text-field v-model="searchFilter.goldPrice" label="قیمت طلا" density="compact"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <v-text-field v-model="searchFilter.goldWeight" label="وزن طلا" density="compact"
                                        variant="outlined" :rules="validateWeight"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <v-text-field v-model="searchFilter.admin" label="ادمین" density="compact"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <v-text-field v-model="searchFilter.accounter" label="حسابدار" density="compact"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col md="6" class="d-none d-md-flex">
                                </v-col>
                                <v-col cols="12" md="3">
                                    <div class="w-100 d-flex justify-end">
                                        <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block
                                            @click="SubmitFilter('pending')">به
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
                            <v-card title="شارژ کیف پول های تایید شده">

                                <template v-slot:text>
                                    <ul class="listGuide">
                                        <li>
                                            شارژ کیف پول های تایید شده نشانگر کارت به کارت هایی است که توسط حسابدار
                                            تایید شده و مبلغ به حساب کاربران اضافه شده است
                                        </li>

                                    </ul>
                                    <v-text-field v-model="walletCompleteSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line" @input="onSearchInput"></v-text-field>
                                </template>

                                <v-data-table :page="walletCompletePage" :items-per-page="walletCompleteItemsPerPage"
                                    :headers="walletCompleteHeader" :items="walletCompleteData"
                                    :search="walletCompleteSearch" :loading="walletCompleteLoading"
                                    :server-items-length="walletCompleteTotalItems"
                                    :items-per-page-options="walletCompleteItemsPerPageOptions"
                                    @update:options="walletCompleteHandleOptionsChange">
                                    <template v-slot:item.amount="{ item }">
                                        <p>{{ formatNumber(item.amount) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <v-chip text="تایید شده" color="#00853f" size="small"></v-chip>
                                    </template>
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-information-line"
                                            color="#d4af37"></v-icon>
                                    </template>
                                    <template v-slot:bottom>
                                        <div class="text-center pt-2">
                                            <v-pagination v-model="walletCompletePage"
                                                :length="walletCompleteTotalNewPages" :total-visible="4"></v-pagination>
                                        </div>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="two">
                            <v-card title="شارژ کیف پول های رد شده توسط حسابدار">

                                <template v-slot:text>
                                    <ul class="listGuide">
                                        <li>
                                            شارژ کیف پول های رد شده توسط حسابدار نشانگر کارت به کارت هایی است که توسط
                                            حسابدار
                                            رد شده است
                                        </li>

                                    </ul>
                                    <v-text-field v-model="walletFailedSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line" @input="onSearchFailedInput"></v-text-field>
                                </template>

                                <v-data-table :page="walletFailedPage" :items-per-page="walletFailedItemsPerPage"
                                    :headers="walletFailedHeader" :items="walletFailedData" :search="walletFailedSearch"
                                    :loading="walletFailedLoading" :server-items-length="walletFailedTotalItems"
                                    :items-per-page-options="walletFailedItemsPerPageOptions"
                                    @update:options="walletFailedHandleOptionsChange">
                                    <template v-slot:item.amount="{ item }">
                                        <p>{{ formatNumber(item.amount) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <v-chip text="رد شده توسط حسابدار" color="#ff0000" size="small"></v-chip>
                                    </template>
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-information-line"
                                            color="#d4af37"></v-icon>
                                    </template>
                                    <template v-slot:bottom>
                                        <div class="text-center pt-2">
                                            <v-pagination v-model="walletFailedPage" :length="walletFailedTotalNewPages"
                                                :total-visible="4"></v-pagination>
                                        </div>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="three">
                            <v-card title="عودتی ها">

                                <template v-slot:text>
                                    <ul class="listGuide">
                                        <li>
                                            واریزی های عودتی، نشانگر واریزی هایی است که از نظر حسابدار مورد تایید بوده و
                                            مبلغ به حساب کاربر برگشت داده شده است
                                        </li>

                                    </ul>
                                    <v-text-field v-model="walletReturnSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line" @input="onSearchReturnInput"></v-text-field>
                                </template>

                                <v-data-table :page="walletReturnPage" :items-per-page="walletReturnItemsPerPage"
                                    :headers="walletReturnHeader" :items="walletReturnData" :search="walletReturnSearch"
                                    :loading="walletReturnLoading" :server-items-length="walletReturnTotalItems"
                                    :items-per-page-options="walletReturnItemsPerPageOptions"
                                    @update:options="walletReturnHandleOptionsChange">
                                    <template v-slot:item.amount="{ item }">
                                        <p>{{ formatNumber(item.amount) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <v-chip text="عودت شده" color="#ff0000" size="small"></v-chip>
                                    </template>
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-information-line"
                                            color="#d4af37"></v-icon>
                                    </template>
                                    <template v-slot:bottom>
                                        <div class="text-center pt-2">
                                            <v-pagination v-model="walletReturnPage" :length="walletReturnTotalNewPages"
                                                :total-visible="4"></v-pagination>
                                        </div>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="four">
                            <v-card title="اصلاح شده ها">

                                <template v-slot:text>
                                    <ul class="listGuide">
                                        <li>
                                            واریزی های اصلاحی نشانگر واریزی هایی است که اطلاعات آنها مجدد ویرایش شده است.
                                        </li>

                                    </ul>
                                    <v-text-field v-model="walletUpdateSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line" @input="onSearchUpdateInput"></v-text-field>
                                </template>

                                <v-data-table :page="walletUpdatePage" :items-per-page="walletUpdateItemsPerPage"
                                    :headers="walletUpdateHeader" :items="walletUpdateData" :search="walletUpdateSearch"
                                    :loading="walletUpdateLoading" :server-items-length="walletUpdateTotalItems"
                                    :items-per-page-options="walletUpdateItemsPerPageOptions"
                                    @update:options="walletUpdateHandleOptionsChange">
                                    <template v-slot:item.amount="{ item }">
                                        <p>{{ formatNumber(item.amount) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <v-chip text="اصلاح شده" color="#66666" size="small"></v-chip>
                                    </template>
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-information-line"
                                            color="#d4af37"></v-icon>
                                    </template>
                                    <template v-slot:bottom>
                                        <div class="text-center pt-2">
                                            <v-pagination v-model="walletUpdatePage" :length="walletUpdateTotalNewPages"
                                                :total-visible="4"></v-pagination>
                                        </div>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>

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
import { onMounted, ref, watch } from 'vue';
import { debounce } from 'lodash'
import { router } from '@/plugins/router';
import WalletService from '@/services/wallet/wallet';


const tab = ref(null);
const errorMsg = ref('');
const alertError = ref(false);
const successMsg = ref("");
const alertSuccess = ref(false);
const walletCompleteLoading = ref(false);
const walletCompleteSearch = ref('');
const walletCompleteData = ref();
const walletCompleteItemsPerPage = ref(50);
const walletCompletePage = ref(1);
const walletCompleteItemsPerPageOptions = ref([10, 25]);
const walletCompleteTotalItems = ref(0);
const walletCompleteTotalNewPages = ref(1);
const walletCompleteHeader = ref([
    {
        title: 'نام',
        key: 'user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'user.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'user.phoneNumber',
    },
    {
        title: 'کد ملی',
        key: 'user.nationalCode',
    },
    {
        title: 'مبلغ(تومان)',
        key: 'amount',
    },
    {
        title: 'کارشناس',
        key: 'admin',
    },
    {
        title: 'حسابدار',
        key: 'accountant',
    },
    {
        title: 'وضعیت',
        key: 'status',
    },
    {
        title: 'فعالیت',
        key: 'action'
    }
]);

const walletFailedLoading = ref(false);
const walletFailedSearch = ref('');
const walletFailedData = ref();
const walletFailedItemsPerPage = ref(50);
const walletFailedPage = ref(1);
const walletFailedItemsPerPageOptions = ref([10, 25]);
const walletFailedTotalItems = ref(0);
const walletFailedTotalNewPages = ref(1);
const walletFailedHeader = ref([
    {
        title: 'نام',
        key: 'user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'user.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'user.phoneNumber',
    },
    {
        title: 'کد ملی',
        key: 'user.nationalCode',
    },
    {
        title: 'مبلغ(تومان)',
        key: 'amount',
    },
    {
        title: 'کارشناس',
        key: 'admin',
    },
    {
        title: 'حسابدار',
        key: 'accountant',
    },
    {
        title: 'وضعیت',
        key: 'status',
    },
    {
        title: 'فعالیت',
        key: 'action'
    }
]);



const walletReturnLoading = ref(false);
const walletReturnSearch = ref('');
const walletReturnData = ref();
const walletReturnItemsPerPage = ref(50);
const walletReturnPage = ref(1);
const walletReturnItemsPerPageOptions = ref([10, 25]);
const walletReturnTotalItems = ref(0);
const walletReturnTotalNewPages = ref(1);
const walletReturnHeader = ref([
    {
        title: 'نام',
        key: 'user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'user.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'user.phoneNumber',
    },
    {
        title: 'کد ملی',
        key: 'user.nationalCode',
    },
    {
        title: 'مبلغ(تومان)',
        key: 'amount',
    },
    {
        title: 'کارشناس',
        key: 'admin',
    },
    {
        title: 'حسابدار',
        key: 'accountant',
    },
    {
        title: 'وضعیت',
        key: 'status',
    },
    {
        title: 'فعالیت',
        key: 'action'
    }
]);



const walletUpdateLoading = ref(false);
const walletUpdateSearch = ref('');
const walletUpdateData = ref();
const walletUpdateItemsPerPage = ref(50);
const walletUpdatePage = ref(1);
const walletUpdateItemsPerPageOptions = ref([10, 25]);
const walletUpdateTotalItems = ref(0);
const walletUpdateTotalNewPages = ref(1);
const walletUpdateHeader = ref([
    {
        title: 'نام',
        key: 'user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'user.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'user.phoneNumber',
    },
    {
        title: 'کد ملی',
        key: 'user.nationalCode',
    },
    {
        title: 'مبلغ(تومان)',
        key: 'amount',
    },
    {
        title: 'کارشناس',
        key: 'admin',
    },
    {
        title: 'حسابدار',
        key: 'accountant',
    },
    {
        title: 'وضعیت',
        key: 'status',
    },
    {
        title: 'فعالیت',
        key: 'action'
    }
]);


const searchFilter = ref({
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


const GetCompleteWallet = async () => {
    let status = 1;
    try {
        walletCompleteLoading.value = true;
        const response = await WalletService.GetAccountingWallet({
            page: walletCompletePage.value,
            perPage: walletCompleteItemsPerPage.value,
            search: walletCompleteSearch.value,
        }, status);
        walletCompleteTotalItems.value = response.totalItems;
        walletCompleteData.value = response.data;
        walletCompleteTotalNewPages.value = Math.ceil(walletCompleteTotalItems.value / walletCompleteItemsPerPage.value)
        return response
    } catch (error) {
        console.log(error)
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
        walletCompleteLoading.value = false;
    }
};


const walletCompleteHandleOptionsChange = (options) => {
    walletCompletePage.value = options.page;
    walletCompleteItemsPerPage.value = options.itemsPerPage;
    GetCompleteWallet();
}

const onSearchInput = () => {
    walletCompletePage.value = 1
    walletCompleteHandleOptionsChange({
        page: walletCompletePage.value,
        itemsPerPage: walletCompleteItemsPerPage.value
    })
};


watch([walletCompletePage, walletCompleteItemsPerPage], () => {
    GetCompleteWallet();
});


watch(
    walletCompleteSearch,
    debounce(() => {
        GetCompleteWallet()
    }, 1000)
);


const GetFailedWallet = async () => {
    let status = 2;
    try {
        walletFailedLoading.value = true;
        const response = await WalletService.GetAccountingWallet({
            page: walletFailedPage.value,
            perPage: walletFailedItemsPerPage.value,
            search: walletFailedSearch.value,
        }, status);
        walletFailedTotalItems.value = response.totalItems;
        walletFailedData.value = response.data;
        walletFailedTotalNewPages.value = Math.ceil(walletFailedTotalItems.value / walletFailedItemsPerPage.value)
        return response
    } catch (error) {
        console.log(error)
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
        walletFailedLoading.value = false;
    }
};


const walletFailedHandleOptionsChange = (options) => {
    walletFailedPage.value = options.page;
    walletFailedItemsPerPage.value = options.itemsPerPage;
    GetFailedWallet();
}

const onSearchFailedInput = () => {
    walletFailedPage.value = 1
    walletFailedHandleOptionsChange({
        page: walletFailedPage.value,
        itemsPerPage: walletFailedItemsPerPage.value
    })
};


watch([walletFailedPage, walletFailedItemsPerPage], () => {
    GetFailedWallet();
});


watch(
    walletFailedSearch,
    debounce(() => {
        GetFailedWallet()
    }, 1000)
);



const GetReturnWallet = async () => {
    let status = 4;
    try {
        walletReturnLoading.value = true;
        const response = await WalletService.GetAccountingWallet({
            page: walletReturnPage.value,
            perPage: walletReturnItemsPerPage.value,
            search: walletReturnSearch.value,
        }, status);
        walletReturnTotalItems.value = response.totalItems;
        walletReturnData.value = response.data;
        walletReturnTotalNewPages.value = Math.ceil(walletReturnTotalItems.value / walletReturnItemsPerPage.value)
        return response
    } catch (error) {
        console.log(error)
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
        walletReturnLoading.value = false;
    }
};


const walletReturnHandleOptionsChange = (options) => {
    walletReturnPage.value = options.page;
    walletReturnItemsPerPage.value = options.itemsPerPage;
    GetReturnWallet();
}

const onSearchReturnInput = () => {
    walletReturnPage.value = 1
    walletReturnHandleOptionsChange({
        page: walletReturnPage.value,
        itemsPerPage: walletReturnItemsPerPage.value
    })
};


watch([walletReturnPage, walletReturnItemsPerPage], () => {
    GetReturnWallet();
});


watch(
    walletReturnSearch,
    debounce(() => {
        GetFailedWallet()
    }, 1000)
);



const GetUpdateWallet = async () => {
    let status = 3;
    try {
        walletUpdateLoading.value = true;
        const response = await WalletService.GetAccountingWallet({
            page: walletUpdatePage.value,
            perPage: walletUpdateItemsPerPage.value,
            search: walletUpdateSearch.value,
        }, status);
        walletUpdateTotalItems.value = response.totalItems;
        walletUpdateData.value = response.data;
        walletUpdateTotalNewPages.value = Math.ceil(walletUpdateTotalItems.value / walletUpdateItemsPerPage.value)
        return response
    } catch (error) {
        console.log(error)
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
        walletUpdateLoading.value = false;
    }
};


const walletUpdateHandleOptionsChange = (options) => {
    walletUpdatePage.value = options.page;
    walletUpdateItemsPerPage.value = options.itemsPerPage;
    GetUpdateWallet();
}

const onSearchUpdateInput = () => {
    walletUpdatePage.value = 1
    walletUpdateHandleOptionsChange({
        page: walletUpdatePage.value,
        itemsPerPage: walletUpdateItemsPerPage.value
    })
};


watch([walletUpdatePage, walletUpdateItemsPerPage], () => {
    GetUpdateWallet();
});


watch(
    walletUpdateSearch,
    debounce(() => {
        GetFailedWallet()
    }, 1000)
);

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


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

const changeTabs = () => {
    searchFilter.value.firstName = '';
    searchFilter.value.lastName = '';
    searchFilter.value.accounter = '';
    searchFilter.value.admin = '';
    searchFilter.value.endDate = '';
    searchFilter.value.endTime = '';
    searchFilter.value.goldPrice = '';
    searchFilter.value.goldWeight = '';
    searchFilter.value.invoiceId = '';
    searchFilter.value.nationalCode = '';
    searchFilter.value.phoneNumber = '';
    searchFilter.value.startTime = '';
    searchFilter.value.startDate = '';
}


onMounted(() => {
    GetCompleteWallet();
    GetFailedWallet();
    GetReturnWallet();
    GetUpdateWallet();
})


</script>

<style scoped>
.k-alert {
    position: fixed;
    top: 10px;
    left: 40%;
    font-size: 12px;
    padding: 10px !important;
    z-index: 10000;
}

.user-price {
    font-weight: bold;
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

.listGuide {
    font-size: 12px;
    color: #2c3e50;
    font-weight: 500px;
    padding: 0.5rem;
    margin: 0.2rem;
    margin-bottom: 2rem;

}
</style>
