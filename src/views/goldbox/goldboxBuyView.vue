<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center">
                    <v-tab value="one">خرید های نامشخص</v-tab>
                    <v-tab value="two">خرید های موفق</v-tab>
                    <v-tab value="three">خرید های ناموفق</v-tab>
                    <v-tab value="four">خرید های پرداخت نشده</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12">
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
                            <v-card title="نامشخص">
                                <template v-slot:text>
                                    <v-text-field v-model="PendingGoldBoxBuySearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="PendingGoldBoxBuyHeader" :items="PendingGoldBoxBuyData"
                                    :search="PendingGoldBoxBuySearch" :loading="PendingGoldBoxBuyLoading">
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
                                            @click="PendingGoldBoxBuyInfo(item)"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="two">
                            <v-card title="موفق">
                                <template v-slot:text>
                                    <v-text-field v-model="CompleteGoldBoxBuySearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="CompleteGoldBoxBuyHeader" :items="CompleteGoldBoxBuyData"
                                    :search="CompleteGoldBoxBuySearch" :loading="CompleteGoldBoxBuyLoading">
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
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                                            @click="PayInfo(item)" :loading="DetailPayLoading"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="three">
                            <v-card title="ناموفق">
                                <template v-slot:text>
                                    <v-text-field v-model="FailedGoldBoxBuySearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="FailedGoldBoxBuyHeader" :items="FailedGoldBoxBuyData"
                                    :search="FailedGoldBoxBuySearch" :loading="CompleteGoldBoxBuyLoading">
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
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                                            @click="PayInfo(item)" :loading="DetailPayLoading"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="four">
                            <v-card title="پرداخت نشده">
                                <template v-slot:text>
                                    <v-text-field v-model="InitGoldBoxBuySearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="InitGoldBoxBuyHeader" :items="InitGoldBoxBuyData"
                                    :search="InitGoldBoxBuySearch" :loading="InitGoldBoxBuyLoading">
                                    <template v-slot:item.totalPrice="{ item }">
                                        <p>{{ formatNumber(item.totalPrice) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'init' ? 'پرداخت نشده' : 'در انتظار پرداخت'"
                                                :color="item.status == 'init' ? '#d4af37' : '#d4af37'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                                            @click="PayInfo(item)" :loading="DetailPayLoading"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>


        <!-- GoldBoxBuy Dialog -->
        <v-dialog v-model="GoldBoxBuyDialog" max-width="600" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات خرید</p>
                </div>
                <div class="d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 user-dialog-info">
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام: </p>
                            <p class="mx-2">{{ GoldBoxBuyDetail.buyer.firstName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2 user-price">
                            <p>کد ملی: </p>
                            <p class="mx-2">{{ GoldBoxBuyDetail.buyer.nationalCode }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>مبلغ کل: </p>
                            <p class="mx-2">{{ formatNumber(GoldBoxBuyDetail.totalPrice) }} تومان</p>
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ GoldBoxBuyDetail.buyer.lastName }}</p>
                        </div>

                        <div class="d-flex align-items-center my-2 user-price">
                            <p>قیمت لحظه ای طلا: </p>
                            <p class="mx-2">{{ formatNumber(GoldBoxBuyDetail.goldPrice) }} تومان</p>
                        </div>
                        <div class="d-flex align-items-center my-2 user-price">
                            <p>وزن طلای خریداری شده: </p>
                            <p class="mx-2">{{ formatNumber(GoldBoxBuyDetail.goldWeight) }} تومان</p>
                        </div>
                    </div>
                </div>
                <div class="form-box">
                    <v-form ref="form" @submit.prevent="submitGoldBoxBuy">
                        <v-btn type="submit" size="large" class="my-2" :loading="GoldBoxBuySubmitLoading" block>بررسی
                            مجدد
                            پرداخت</v-btn>
                    </v-form>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="بستن" @click="GoldBoxBuyDialog = false" size="large" class="m-3"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Detail Dialog -->
        <v-dialog v-model="DetailPayDialog" max-width="600" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات پرداخت</p>
                </div>
                <p>تست</p>
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
import GoldBoxService from '@/services/goldBox/goldbox';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const successMsg = ref('');
const alertError = ref(false);
const alertSuccess = ref(false);
const PendingGoldBoxBuyLoading = ref(false);
const GoldBoxBuySubmitLoading = ref(false);
const tab = ref(null);
const PendingGoldBoxBuyHeader = ref([
    {
        title: 'نام',
        key: 'buyer.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'buyer.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'buyer.phoneNumber',
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
const PendingGoldBoxBuySearch = ref();
const PendingGoldBoxBuyData = ref();
const CompleteGoldBoxBuySearch = ref();
const CompleteGoldBoxBuyHeader = ref([
    {
        title: 'نام',
        key: 'buyer.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'buyer.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'buyer.phoneNumber',
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
const FailedGoldBoxBuyHeader = ref([
    {
        title: 'نام',
        key: 'buyer.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'buyer.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'buyer.phoneNumber',
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
])
const CompleteGoldBoxBuyData = ref();
const CompleteGoldBoxBuyLoading = ref();
const FailedGoldBoxBuyLoading = ref();
const FailedGoldBoxBuyData = ref();
const FailedGoldBoxBuySearch = ref();
const InitGoldBoxBuySearch = ref();
const InitGoldBoxBuyHeader = ref([
    {
        title: 'نام',
        key: 'buyer.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'buyer.lastName',
    },
    {
        title: 'شماره همراه',
        key: 'buyer.phoneNumber',
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
const InitGoldBoxBuyData = ref();
const InitGoldBoxBuyLoading = ref();
const GoldBoxBuyDetail = ref();
const GoldBoxBuyDialog = ref(false);
const GoldBoxBuySubmitDetail = ref({
    authority: '',
    id: '',
})
const DetailPayDialog = ref(false);
const DetailPayLoading = ref(false);

const GetPendingGoldBoxBuyList = async () => {
    try {
        PendingGoldBoxBuyLoading.value = true;
        const response = await GoldBoxService.BuyGoldBox(2);
        PendingGoldBoxBuyData.value = response.data;
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
        PendingGoldBoxBuyLoading.value = false;
    }
};

const GetCompleteGoldBoxBuyList = async () => {
    try {
        CompleteGoldBoxBuyLoading.value = true;
        const response = await GoldBoxService.BuyGoldBox(1);
        CompleteGoldBoxBuyData.value = response.data;
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
        CompleteGoldBoxBuyLoading.value = false;
    }
};

const GetFailedGoldBoxBuyList = async () => {
    try {
        FailedGoldBoxBuyLoading.value = true;
        const response = await GoldBoxService.BuyGoldBox(0);
        FailedGoldBoxBuyData.value = response.data;
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
        FailedGoldBoxBuyLoading.value = false;
    }
};

const GetInitGoldBoxBuyList = async () => {
    try {
        InitGoldBoxBuyLoading.value = true;
        const response = await GoldBoxService.BuyGoldBox(3);
        InitGoldBoxBuyData.value = response.data;
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
        InitGoldBoxBuyLoading.value = false;
    }
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PendingGoldBoxBuyInfo = (item) => {
    GoldBoxBuyDialog.value = true;
    GoldBoxBuyDetail.value = item;
    GoldBoxBuySubmitDetail.value.id = item.id;
    GoldBoxBuySubmitDetail.value.authority = item.authority;
    console.log(item);
    console.log(GoldBoxBuySubmitDetail.value)
}

const submitGoldBoxBuy = async () => {
    try {
        GoldBoxBuySubmitLoading.value = true;
        const response = await GoldBoxService.SubmitGoldboxBuy(GoldBoxBuySubmitDetail.value);
        successMsg.value = response.msg;
        alertSuccess.value = true;
        setTimeout(() => {
            alertSuccess.value = false;
        }, 5000)
        GetPendingGoldBoxBuyList();
        GetCompleteGoldBoxBuyList();
        GetFailedGoldBoxBuyList();
        GoldBoxBuyDialog.value = false;
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
        GoldBoxBuySubmitLoading.value = false;
    }
}

const PayInfo = async (item) => {
    try {
        DetailPayLoading.value = true;
        // const response = await GoldBoxService.SubmitGoldboxBuy(GoldBoxBuySubmitDetail.value);
        DetailPayDialog.value = true;
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
        DetailPayLoading.value = false;
    }
}

onMounted(() => {
    GetPendingGoldBoxBuyList();
    GetCompleteGoldBoxBuyList();
    GetFailedGoldBoxBuyList();
    GetInitGoldBoxBuyList();
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
