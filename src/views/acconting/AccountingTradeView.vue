<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center" @update:modelValue="changeTabs">
                    <v-tab value="one">در انتظار بررسی</v-tab>
                    <v-tab value="two">بررسی شده</v-tab>
                    <v-tab value="three">رد شده</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12">
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
                            <v-row class="filter my-3">
                                <v-col cols="6" md="3">
                                    <persian-date-picker v-model="filter.fromDate"
                                        placeholder="از تاریخ"></persian-date-picker>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <persian-date-picker type="time" v-model="filter.fromTime" placeholder="از زمان"
                                        format="HH:mm:ss"></persian-date-picker>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <persian-date-picker v-model="filter.toDate"
                                        placeholder="تا تاریخ"></persian-date-picker>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <persian-date-picker type="time" v-model="filter.toTime" placeholder="تا زمان"
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
                                    <v-text-field v-model="filter.goldWeight" label="ادمین" density="compact"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <v-text-field v-model="filter.goldWeight" label="حسابدار" density="compact"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col md="6" class="d-none d-md-flex">
                                </v-col>
                                <v-col cols="12" md="3">
                                    <div class="w-100 d-flex justify-end">
                                        <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block
                                            @click="SubmitFilter('pending')">به روز
                                            رسانی</v-btn>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <div class="w-100 d-flex justify-end">
                                        <v-btn prepend-icon="ri-file-excel-line" block>خروجی اکسل</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-card title="معاملات در انتظار بررسی صندوق طلا">
                             <ul class="listGuide">
         <li>
          معاملاتی که توسط کارشناس به صورت تلفنی ثبت شده‌اند و در حال انتظار برای پرداخت و تأیید حسابداری هستند.

         </li>
                  </ul>
                                <v-data-table :headers="PendingAccountingReviewHeader"
                                    :items="PendingAccountingReviewData" :loading="PendingAccountingReviewLoading">
                                    <template v-slot:item.totalPrice="{ item }">
                                        <p>{{ formatNumber(item.totalPrice) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'pending' ? 'در انتظار بررسی' : 'بررسی شده'"
                                                :color="item.status == 'pending' ? '#ff0000' : '#66666'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                    <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-survey-line" color="#d4af37"
                                            @click="PendingAccountingReviewInfo(item)"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="two">
                            <v-row class="filter my-3">
                                <v-col cols="6" md="3">
                                    <persian-date-picker v-model="filter.fromDate"
                                        placeholder="از تاریخ"></persian-date-picker>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <persian-date-picker type="time" v-model="filter.fromTime" placeholder="از زمان"
                                        format="HH:mm:ss"></persian-date-picker>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <persian-date-picker v-model="filter.toDate"
                                        placeholder="تا تاریخ"></persian-date-picker>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <persian-date-picker type="time" v-model="filter.toTime" placeholder="تا زمان"
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
                                    <v-text-field v-model="filter.goldWeight" label="ادمین" density="compact"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <v-text-field v-model="filter.goldWeight" label="حسابدار" density="compact"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col md="6" class="d-none d-md-flex">
                                </v-col>
                                <v-col cols="12" md="3">
                                    <div class="w-100 d-flex justify-end">
                                        <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block
                                            @click="SubmitFilter('completed')">به روز
                                            رسانی</v-btn>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <div class="w-100 d-flex justify-end">
                                        <v-btn prepend-icon="ri-file-excel-line" block>خروجی اکسل</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-card title="معاملات بررسی شده صندوق طلا">
                     <ul class="listGuide">
                     <li>
معاملاتی که مبلغ آن‌ها به حساب تعیین‌شده واریز شده و از سوی حسابداری تأیید گردیده‌اند.

                   </li>
                  </ul>
                                <v-data-table :headers="CompleteAccountingReviewHeader"
                                    :items="CompleteAccountingReviewData" :loading="CompleteAccountingReviewLoading">
                                    <template v-slot:item.amount="{ item }">
                                        <p>{{ formatNumber(item.amount) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'completed' ? 'بررسی شده' : 'در انتظار بررسی'"
                                                :color="item.status == 'completed' ? '#00853f' : '#66666'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="three">
                            <v-row class="filter my-3">
                                <v-col cols="6" md="3">
                                    <persian-date-picker v-model="filter.fromDate"
                                        placeholder="از تاریخ"></persian-date-picker>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <persian-date-picker type="time" v-model="filter.fromTime" placeholder="از زمان"
                                        format="HH:mm:ss"></persian-date-picker>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <persian-date-picker v-model="filter.toDate"
                                        placeholder="تا تاریخ"></persian-date-picker>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <persian-date-picker type="time" v-model="filter.toTime" placeholder="تا زمان"
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
                                    <v-text-field v-model="filter.goldWeight" label="ادمین" density="compact"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <v-text-field v-model="filter.goldWeight" label="حسابدار" density="compact"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col md="6" class="d-none d-md-flex">
                                </v-col>
                                <v-col cols="12" md="3">
                                    <div class="w-100 d-flex justify-end">
                                        <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block
                                            @click="SubmitFilter('failed')">به روز
                                            رسانی</v-btn>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <div class="w-100 d-flex justify-end">
                                        <v-btn prepend-icon="ri-file-excel-line" block>خروجی اکسل</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-card title="معاملات رد شده صندوق طلا">
                                    <ul class="listGuide ">
                   <li>
معاملاتی که مبلغ آن‌ها تسویه نشده یا به دلایل دیگری از سوی حسابداری تایید نشده است.
                   </li>

                  </ul>
                                <v-data-table :headers="rejectAccountingReviewHeader"
                                    :items="rejectAccountingReviewData" :loading="rejectAccountingReviewLoading">
                                    <template v-slot:item.amount="{ item }">
                                        <p>{{ formatNumber(item.amount) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'failed' ? 'رد شده' : 'در انتظار بررسی'"
                                                :color="item.status == 'failed' ? '#66666' : '#00853f'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>


        <!-- AccountingReview Dialog -->
        <v-dialog v-model="AccountingReviewDialog" max-width="700" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات فاکتور</p>
                </div>
                <v-row class="my-3 px-3">
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>نام: </p>
                            <p class="mx-2">{{ AccountingReviewDetail.buyer.firstName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ AccountingReviewDetail.buyer.lastName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>کد ملی: </p>
                            <p class="mx-2">{{ AccountingReviewDetail.buyer.nationalCode }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>شماره موبایل: </p>
                            <p class="mx-2">{{ AccountingReviewDetail.buyer.phoneNumber }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>مبلغ کل: </p>
                            <p class="mx-2">{{ formatNumber(AccountingReviewDetail.totalPrice) }} تومان</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>میزان طلا: </p>
                            <p class="mx-2">{{ AccountingReviewDetail.goldWeight }} گرم</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>قیمت طلا : </p>
                            <p class="mx-2">{{ formatNumber(AccountingReviewDetail.goldPrice) }} تومان</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>تاریخ : </p>
                            <p class="mx-2">{{ AccountingReviewDetail.date }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>زمان : </p>
                            <p class="mx-2">{{ AccountingReviewDetail.time }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>کارشناس ثبت کننده : </p>
                            <p class="mx-2">{{ AccountingReviewDetail.adminId }}</p>
                        </div>
                    </v-col>
                    <v-col cols="12" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>توضیحات : </p>
                            <p class="mx-2">{{ AccountingReviewDetail.description }}</p>
                        </div>
                    </v-col>
                </v-row>
                <div class="form-box">
                    <v-form ref="form" @submit.prevent="">
                        <v-textarea v-model="AccountingRevieItemDetail.description" label="توضیحات" variant="outlined"
                            rows="2"></v-textarea>
                        <div class="d-flex justify-space-between">
                            <v-btn type="submit" size="large" class="my-2" color="#388E3C"
                                :loading="AccountingReviewSubmitLoading" @click="submitAccountingReview">تایید
                                پرداخت</v-btn>
                            <v-btn type="submit" size="large" class="my-2" color="error"
                                :loading="AccountingReviewRejectLoading" @click="rejectAccountingReview">رد
                                پرداخت</v-btn>
                        </div>
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
import { router } from '@/plugins/router';
import AccountingService from '@/services/accounting/accounting';
import InPersonService from '@/services/inperson/inperson';
import WalletService from '@/services/wallet/wallet';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const alertError = ref(false);
const PendingAccountingReviewLoading = ref(false);
const AccountingReviewSubmitLoading = ref(false);
const AccountingReviewRejectLoading = ref(false);
const tab = ref(null);
const PendingAccountingReviewHeader = ref([
    {
        title: 'نام',
        key: 'buyer.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'buyer.lastName',
    },
    {
        title: 'شناسه پرداخت',
        key: 'invoiceId',
    },
    {
        title: 'مبلغ (تومان)',
        key: 'totalPrice',
    },
    {
        title: 'میزان طلا (گرم)',
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
        key: 'buyer.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'buyer.lastName',
    },
    {
        title: 'شناسه پرداخت',
        key: 'invoiceId',
    },
    {
        title: 'مبلغ (تومان)',
        key: 'totalPrice',
    },
    {
        title: 'میزان طلا (گرم)',
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
        title: 'وضعیت',
        key: 'status'
    },
]);
const CompleteAccountingReviewData = ref();
const CompleteAccountingReviewLoading = ref();
const AccountingReviewDetail = ref();
const AccountingReviewDialog = ref(false);
const AccountingRevieItemDetail = ref({
    description: '',
    id: '',
})
const rejectAccountingReviewSearch = ref();
const rejectAccountingReviewHeader = ref([
    {
        title: 'نام',
        key: 'buyer.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'buyer.lastName',
    },
    {
        title: 'شناسه پرداخت',
        key: 'invoiceId',
    },
    {
        title: 'مبلغ (تومان)',
        key: 'totalPrice',
    },
    {
        title: 'میزان طلا (گرم)',
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
        title: 'وضعیت',
        key: 'status'
    },
]
);
const rejectAccountingReviewData = ref();
const rejectAccountingReviewLoading = ref();
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

const GetPendingAccountingReviewList = async () => {
    try {
        PendingAccountingReviewLoading.value = true;
        const response = await AccountingService.PendingAccountingList();
        PendingAccountingReviewData.value = response.data;
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
        PendingAccountingReviewLoading.value = false;
    }
};

const GetCompleteAccountingReviewList = async () => {
    try {
        CompleteAccountingReviewLoading.value = true;
        const response = await AccountingService.CompleteAccountingList();
        CompleteAccountingReviewData.value = response.data;
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
        CompleteAccountingReviewLoading.value = false;
    }
};

const GetRejectAccountingReviewList = async () => {
    try {
        CompleteAccountingReviewLoading.value = true;
        const response = await AccountingService.rejectAccountingList();
        rejectAccountingReviewData.value = response.data;
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
        CompleteAccountingReviewLoading.value = false;
    }
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PendingAccountingReviewInfo = (item) => {
    AccountingReviewDialog.value = true;
    AccountingReviewDetail.value = item;
    AccountingRevieItemDetail.value.id = item.id;
}

const submitAccountingReview = async () => {
    try {
        AccountingReviewSubmitLoading.value = true;
        const response = await AccountingService.SubmitAccountingReview(AccountingRevieItemDetail.value);
        GetPendingAccountingReviewList();
        GetCompleteAccountingReviewList();
        GetRejectAccountingReviewList();
        AccountingReviewDialog.value = false;
        AccountingRevieItemDetail.value.description = '';
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
        AccountingReviewSubmitLoading.value = false;
    }
}

const rejectAccountingReview = async () => {
    try {
        AccountingReviewRejectLoading.value = true;
        const response = await AccountingService.RejectAccountingReview(AccountingRevieItemDetail.value);
        GetPendingAccountingReviewList();
        GetCompleteAccountingReviewList();
        GetRejectAccountingReviewList();
        AccountingReviewDialog.value = false;
        AccountingRevieItemDetail.value.description = '';
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
        AccountingReviewRejectLoading.value = false;
    }
}

const SubmitFilter = async (status) => {
    try {
        if (status == 'pending') {
            PendingAccountingReviewLoading.value = true;
        } else if (status == 'completed') {
            CompleteAccountingReviewLoading.value = true;
        } else if (status == 'failed') {
            rejectAccountingReviewLoading.value = true;
        }
        filter.value.status = status;
        const response = await InPersonService.SubmitFilterInvoice(filter.value);
        if (status == 'pending') {
            PendingAccountingReviewData.value = response.data;
        } else if (status == 'completed') {
            CompleteAccountingReviewData.value = response.data;
        } else if (status == 'failed') {
            rejectAccountingReviewData.value = response.data;
        }
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
        PendingAccountingReviewLoading.value = false;
        CompleteAccountingReviewLoading.value = false;
        rejectAccountingReviewLoading.value = false;
    }
}

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

const changeTabs = () => {
    filter.value.firstName = '';
    filter.value.lastName = '';
    filter.value.accounter = '';
    filter.value.admin = '';
    filter.value.endDate = '';
    filter.value.endTime = '';
    filter.value.goldPrice = '';
    filter.value.goldWeight = '';
    filter.value.invoiceId = '';
    filter.value.nationalCode = '';
    filter.value.phoneNumber = '';
    filter.value.startTime = '';
    filter.value.startDate = '';
}

onMounted(() => {
    GetPendingAccountingReviewList();
    GetCompleteAccountingReviewList();
    GetRejectAccountingReviewList();
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
  margin-right : 0.9rem


}
</style>
