<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card-text>
                    <v-row class="filter my-3">
                        <v-col cols="6" md="3">
                            <persian-date-picker v-model="filter.startDate"
                                placeholder="از تاریخ"></persian-date-picker>
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
                            <v-text-field v-model="filter.phoneNumber" label="شماره موبایل" density="compact"
                                variant="outlined" :rules="phoneRules" @input="limitNumber"></v-text-field>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-text-field v-model="filter.nationalCode" label="کد ملی" density="compact"
                                variant="outlined" :rules="nationalCodeRules"></v-text-field>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-text-field v-model="filter.goldPrice" label="قیمت طلا" density="compact"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-text-field v-model="filter.goldWeight" label="وزن طلا" density="compact"
                                variant="outlined" :rules="validateWeight"></v-text-field>
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
                                <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block disabled
                                    @click="SubmitFilter('complete')">به روز
                                    رسانی</v-btn>
                            </div>
                        </v-col>
                        <v-col cols="12" md="3">
                            <div class="w-100 d-flex justify-end">
                                <v-btn prepend-icon="ri-file-excel-line" block :disabled="completeExportExcel"
                                    @click="exportExcel" :loading="exportLoading">خروجی
                                    اکسل</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                    <v-card title="عودت کیف پول">
                        <ul class="listGuide ">
                            <li>
                                <span>عودت کیف پول نشان دهنده تراکنش افرادی هست که با کارتی غیر از کارت بانکی خود اقدام
                                    به شارژ کیف پول کرده اند.
                                </span>
                            </li>
                        </ul>
                        <v-data-table :headers="returnChargeHeader" :items="returnChargeData"
                            :loading="returnChargeLoading">
                            <template v-slot:item.amount="{ item }">
                                <p>{{ formatNumber(item.amount) }}</p>
                            </template>
                            <template v-slot:item.status="{ item }">
                                <div>
                                    <v-chip :text="item.status == 'completed' ? 'تایید شده' : 'رد شده توسط حسابدار'"
                                        :color="item.status == 'completed' ? '#66666' : '#ff0000'"
                                        size="small"></v-chip>
                                </div>
                            </template>
                            <template v-slot:item.action="{ item }">
                                <div class="d-flex">
                                    <v-icon class="me-2" size="small" icon="ri-refund-2-line" color="#d4af37"
                                        @click="updateReturnInfo(item)"></v-icon>
                                    <v-icon class="me-2" size="small" icon="ri-close-line" color="#c9190c"
                                        @click="withdrawInfo(item)"></v-icon>
                                </div>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-card-text>
            </v-col>
        </v-row>


        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>

        <v-dialog v-model="withdrawWalletDialog" max-width="700" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات عودت</p>
                </div>
                <v-row class="my-3 px-3">
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>نام: </p>
                            <p class="mx-2">{{ returnWalletDetail?.user?.firstName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ returnWalletDetail?.user?.lastName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>شماره موبایل: </p>
                            <p class="mx-2">{{ returnWalletDetail?.user?.phoneNumber }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>شماره کارت: </p>
                            <p class="mx-2">{{ returnWalletDetail?.CartNumber }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>شماره شبا: </p>
                            <p class="mx-2">{{ returnWalletDetail?.shebaNumber }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>مبلغ: </p>
                            <p class="mx-2">{{ formatNumber(returnWalletDetail?.amount) }} تومان</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>توضیحات حسابدار: </p>
                            <p class="mx-2">{{ returnWalletDetail?.reason }}</p>
                        </div>
                    </v-col>
                </v-row>
                <div class="form-box">
                    <v-form ref="form" v-model="isValid" @submit.prevent="submitWithdraw">
                        <v-text-field v-model="withdrawalDetail.invoiceId" label="شناسه پرداخت"
                            :rules="withdrawalIdRule" class="my-2"></v-text-field>
                        <v-btn type="submit" :disabled="!isValid" size="large" class="my-2"
                            :loading="WithdrawSubmitLoading" block>ثبت</v-btn>
                    </v-form>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بستن" @click="withdrawWalletDialog = false" size="large" class="m-3"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="updateReturnDialog" max-width="700" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>به روز رسانی اطلاعات</p>
                </div>
                <div class="form-box">
                    <v-form ref="form" v-model="isValid" @submit.prevent="updateReturn">
                        <v-row>
                            <v-col cols="6" class="my-2">
                                <v-text-field v-model="updateDetail.amount" label="(تومان)مبلغ"
                                    class="my-2"></v-text-field>
                            </v-col>
                            <v-col cols="6" class="my-2">
                                <v-text-field v-model="updateDetail.CartNumber" label="شماره کارت مبدا"
                                    class="my-2"></v-text-field>
                            </v-col>
                            <v-col cols="6" class="my-2">
                                <v-text-field v-model="updateDetail.shebaNumber" label="شماره شبا"
                                    class="my-2"></v-text-field>
                            </v-col>
                            <v-col cols="6" class="my-2">
                                <v-text-field v-model="updateDetail.destCartNumber" label="شماره کارت مقصد"
                                    class="my-2"></v-text-field>
                            </v-col>
                            <v-col cols="6" class="my-2">
                                <persian-date-picker type="date" v-model="updateDetail.date"
                                    placeholder="تاریخ"></persian-date-picker>
                            </v-col>
                            <v-col cols="6" class="my-2">
                                <persian-date-picker type="time" v-model="updateDetail.time"
                                    placeholder="زمان"></persian-date-picker>
                            </v-col>
                        </v-row>
                        <v-btn type="submit" size="large" class="my-2" :loading="updateLoading" block>به روز
                            رسانی</v-btn>
                    </v-form>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بستن" @click="updateReturnDialog = false" size="large" class="m-3"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <!-- returnWallet Dialog -->
        <!-- <v-dialog v-model="returnWalletDialog" max-width="700" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات واریز</p>
                </div>
                <v-row class="my-3 px-3">
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>نام: </p>
                            <p class="mx-2">{{ returnWalletDetail?.user?.firstName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ returnWalletDetail?.user?.lastName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>کد ملی: </p>
                            <p class="mx-2">{{ returnWalletDetail?.user?.nationalCode }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>شماره موبایل: </p>
                            <p class="mx-2">{{ returnWalletDetail?.user?.phoneNumber }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>مبلغ: </p>
                            <p class="mx-2">{{ formatNumber(returnWalletDetail?.amount) }} تومان</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>تاریخ : </p>
                            <p class="mx-2">{{ returnWalletDetail?.date }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>زمان : </p>
                            <p class="mx-2">{{ returnWalletDetail?.time }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>شماره پیگیری :</p>
                            <p class="mx-2">{{ returnWalletDetail?.invoiceId }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>موجودی کیف پول :</p>
                            <p class="mx-2">{{ formatNumber(returnWalletDetail?.user?.wallet?.balance) }} تومان</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>کارشناس ثبت کننده : </p>
                            <p class="mx-2">{{ returnWalletDetail?.admin }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>شماره کارت :</p>
                            <p class="mx-2">{{ returnWalletDetail?.CartNumber }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>وضعیت کارت : </p>
                            <v-chip :text="returnWalletDetail?.check == true ? 'احراز شده' : 'احراز نشده'"
                                :color="returnWalletDetail?.check == true ? '#15904f' : '#ff0000'"
                                size="small"></v-chip>
                        </div>
                    </v-col>
                    <v-col cols="12" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>شماره شبا : </p>
                            <p class="mx-2">{{ returnWalletDetail?.shebaNumber }}</p>
                        </div>
                    </v-col>
                </v-row>
                <div class="form-box">
                    <v-form ref="form" @submit.prevent="">
                        <v-textarea v-model="returnWalletDetail.description" label="توضیحات" variant="outlined"
                            rows="2"></v-textarea>
                        <div class="d-flex justify-space-between">
                            <v-btn type="submit" size="large" class="my-2" color="#388E3C"
                                :loading="returnWalletSubmitLoading" @click="submitreturnWallet(1)">تایید واریز
                            </v-btn>
                            <v-btn type="submit" size="large" class="my-2" color="error"
                                :loading="returnWalletRejectLoading" @click="submitreturnWallet(2)">رد واریز
                            </v-btn>
                        </div>
                    </v-form>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بستن" @click="returnWalletDialog = false" size="large" class="m-3"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
    </div>
</template>

<script setup>
import { router } from '@/plugins/router';
import WalletService from '@/services/wallet/wallet';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const alertError = ref(false);
const returnChargeLoading = ref(false);
const withdrawWalletDialog = ref(false);
const updateReturnDialog = ref(false);
const updateLoading = ref(false);
const isValid = ref(false);
const returnChargeHeader = ref([
    {
        title: 'نام',
        key: 'user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'user.lastName',
    },
    {
        title: 'کد ملی',
        key: 'user.nationalCode',
    },
    {
        title: 'شماره پیگیری واریز',
        key: 'invoiceId',
    },
    {
        title: 'مبلغ (تومان)',
        key: 'amount',
    },
    {
        title: 'کارشناس',
        key: 'admin',
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
    },
]);
const WithdrawSubmitLoading = ref(false);
const withdrawalDetail = ref({
    invoiceId: '',
    id: '',
})
const filter = ref({
    firstName: '',
    lastName: '',
    nationalCode: '',
    phoneNumber: '',
    tradeType: 1,
    type: 'sell',
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
    destCardPan: '',
});
const completeExportExcel = ref(true);
const exportLink = ref('');
const exportLoading = ref(false);
const returnChargeData = ref();
const returnWalletDetail = ref({
    description: '',
    id: '',
});
const updateDetail = ref({});


const GetReturnreturnWalletList = async () => {
    try {
        returnChargeLoading.value = true;
        const response = await WalletService.returnChargeList();
        returnChargeData.value = response.data;
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
        returnChargeLoading.value = false;
    }
};

const withdrawInfo = (item) => {
    withdrawWalletDialog.value = true;
    returnWalletDetail.value = item;
    withdrawalDetail.value.id = item.id;
};

const updateReturnInfo = (item) => {
    updateReturnDialog.value = true;
    updateDetail.value = item;
}

const updateReturn = async () => {
    try {
        updateLoading.value = true;
        const response = await WalletService.sumbitUpdateWallet(updateDetail.value);
        GetReturnreturnWalletList();
        updateReturnDialog.value = false;
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
        updateLoading.value = false;
    }
}

const submitWithdraw = async () => {
    try {
        WithdrawSubmitLoading.value = true;
        const response = await WalletService.submitWithdrawCharge(withdrawalDetail.value);
        GetReturnreturnWalletList();
        withdrawWalletDialog.value = false;
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

// const submitreturnWallet = async (status) => {
//     try {
//         if (status == 1) {
//             returnWalletSubmitLoading.value = true;
//         } else {
//             returnWalletRejectLoading.value = true;
//         }
//         const response = await WalletService.submitAccountingCharge(returnWalletDetail.value, status);
//         GetreturnWalletList();
//         returnWalletDialog.value = false;
//         return response
//     } catch (error) {
//         if (error.response.status == 401) {
//             localStorage.clear();
//             router.replace("/login");
//         }
//         errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
//         alertError.value = true;
//         setTimeout(() => {
//             alertError.value = false;
//         }, 10000)
//     } finally {
//         returnWalletSubmitLoading.value = false;
//         returnWalletRejectLoading.value = false;
//     }
// }

const SubmitFilter = async (status) => {
    console.log(status);
    // try {
    //     returnChargeLoading.value = true;
    //     filter.value.status = status;
    //     const response = await InPersonService.SubmitFilterInvoice(filter.value);
    //     returnChargeData.value = response.data;
    //     exportLink.value = response.link;
    //     completeExportExcel.value = true;
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
    //     returnChargeLoading.value = false;
    // }
}

const exportExcel = async () => {
    exportLoading.value = true;
    window.location.href = exportLink.value;
    setTimeout(() => {
        exportLoading.value = false;
    }, 5000);
}

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const withdrawalIdRule = [
    (v) => !!v || 'شناسه پرداخت نمی‌تواند خالی باشد',
];

const nationalCodeRules = [
    (v) => /^\d{10}$/.test(v) || 'کد ملی باید ۱۰ رقم باشد',
    (v) => {
        if (!/^\d{10}$/.test(v)) return true;

        const check = +v[9];
        const sum = v.split('').slice(0, 9).reduce((acc, x, i) => acc + (+x * (10 - i)), 0) % 11;
        return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11) || 'کد ملی نامعتبر است';
    }
];

const limitNumber = () => {
    filter.value.phoneNumber = filter.value.phoneNumber.replace(/\D/g, '').slice(0, 11);
}

const phoneRules = [
    v => /^09\d{9}$/.test(v) || 'شماره معتبر نیست'
];

const validateWeight = [
    (v) => !!v,
    (v) => /^\d+(\.\d{1,3})?$/.test(v),
];

onMounted(() => {
    GetReturnreturnWalletList();
})


</script>

<style scoped>
.k-alert {
    position: fixed;
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

.listGuide {
    font-size: 12px;
    color: #2c3e50;
    font-weight: 500px;
    padding: 0.5rem;
    margin: 0.1rem;
    margin-bottom: 2rem;
    margin-right: 0.9rem
}
</style>
