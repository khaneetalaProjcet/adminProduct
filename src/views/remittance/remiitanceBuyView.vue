<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center" @update:modelValue="changeTabs">
                    <v-tab value="one">حواله های در انتظار</v-tab>
                    <v-tab value="two">حواله های موفق</v-tab>
                    <v-tab value="three">حواله های ناموفق</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12">
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
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
                                    <persian-date-picker v-model="filter.endDate"
                                        placeholder="تا تاریخ"></persian-date-picker>
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
                                <v-col cols="6" md="3">
                                    <v-select v-model="filter.destCardPan" :items="bankAccounts" label="حساب بانکی"
                                        variant="outlined" item-title="label"
                                        item-value="item"></v-select>
                                </v-col>

                                
                                <v-col md="3" class="d-none d-md-flex">
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
                                        <v-btn prepend-icon="ri-file-excel-line" block :disabled="pendingExportExcel"
                                            @click="exportExcel" :loading="exportLoading">خروجی اکسل</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-card title="در انتظار تایید">
                                <ul class="listGuide ">
                                    <li>
                                        درخواست خرید حواله که از سوی کاربر ثبت شده و در انتطار بررسی از سوی حسابداری می
                                        باشد.
                                    </li>

                                </ul>
                                <template v-slot:text>
                                    <v-text-field v-model="PendingRemiitanceBuySearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="PendingRemiitanceBuyHeader" :items="PendingRemiitanceBuyData"
                                    :search="PendingRemiitanceBuySearch" :loading="PendingRemiitanceBuyLoading">
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
                                            @click="PendingRemiitanceBuyInfo(item)"></v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="two">
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
                                    <persian-date-picker v-model="filter.endDate"
                                        placeholder="تا تاریخ"></persian-date-picker>
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
                                <v-col cols="6" md="3">
                                    <v-select v-model="filter.destCardPan" :items="bankAccounts" label="حساب بانکی"
                                        variant="outlined" item-title="label"
                                        item-value="item"></v-select>
                                </v-col>
                                <v-col md="3" class="d-none d-md-flex">
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
                                        <v-btn prepend-icon="ri-file-excel-line" block :disabled="completeExportExcel"
                                            @click="exportExcel" :loading="exportLoading">خروجی اکسل</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-card title="موفق">
                                <ul class="listGuide ">
                                    <li>

                                        درخواست خرید حواله که از سوی حسابداری تایید شده و با موفقیت انجام شده است.
                                    </li>

                                </ul>
                                <template v-slot:text>
                                    <v-text-field v-model="CompleteRemiitanceBuySearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="CompleteRemiitanceBuyHeader" :items="CompleteRemiitanceBuyData"
                                    :search="CompleteRemiitanceBuySearch" :loading="CompleteRemiitanceBuyLoading">
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
                                    <!-- <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-refund-2-line" color="#d4af37"
                                            @click="CompleteRemiitanceBuyInfo(item)"></v-icon>
                                    </template> -->
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="three">
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
                                    <persian-date-picker v-model="filter.endDate"
                                        placeholder="تا تاریخ"></persian-date-picker>
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
                                <v-col cols="6" md="3">
                                    <v-select v-model="filter.destCardPan" :items="bankAccounts" label="حساب بانکی"
                                        variant="outlined" item-title="label"
                                        item-value="item"></v-select>
                                </v-col>
                                <v-col md="3" class="d-none d-md-flex">
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
                                        <v-btn prepend-icon="ri-file-excel-line" block :disabled="failedExportExcel"
                                            @click="exportExcel" :loading="exportLoading">خروجی اکسل</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-card title="ناموفق">

                                <ul class="listGuide ">
                                    <li>

                                        درخواست خرید حواله که از سوی حسابداری تایید نشده و یا کاربر از خرید صرف نظر کرده
                                        است. </li>

                                </ul>
                                <template v-slot:text>
                                    <v-text-field v-model="FailedRemiitanceBuySearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="FailedRemiitanceBuyHeader" :items="FailedRemiitanceBuyData"
                                    :search="FailedRemiitanceBuySearch" :loading="CompleteRemiitanceBuyLoading">
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
                                    <!-- <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-refund-2-line" color="#d4af37"
                                            @click="CompleteRemiitanceBuyInfo(item)"></v-icon>
                                    </template> -->
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>


        <!-- RemmitanceBuy Dialog -->
        <v-dialog v-model="RemmitanceBuyDialog" max-width="600" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات خرید</p>
                </div>
                <div class="d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 user-dialog-info">
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام: </p>
                            <p class="mx-2">{{ RemmitanceBuyDetail.buyer.firstName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2 user-price">
                            <p>کد ملی: </p>
                            <p class="mx-2">{{ RemmitanceBuyDetail.buyer.nationalCode }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>مبلغ کل: </p>
                            <p class="mx-2">{{ formatNumber(RemmitanceBuyDetail.totalPrice) }} تومان</p>
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ RemmitanceBuyDetail.buyer.lastName }}</p>
                        </div>

                        <div class="d-flex align-items-center my-2 user-price">
                            <p>قیمت لحظه ای طلا: </p>
                            <p class="mx-2">{{ formatNumber(RemmitanceBuyDetail.goldPrice) }} تومان</p>
                        </div>
                        <div class="d-flex align-items-center my-2 user-price">
                            <p>وزن طلای خریداری شده: </p>
                            <p class="mx-2">{{ formatNumber(RemmitanceBuyDetail.goldWeight) }} گرم</p>
                        </div>
                    </div>
                </div>
                <div class="form-box">
                    <v-textarea v-model="RemmitanceBuySubmitDetail.description" label="توضیحات" variant="outlined"
                        rows="2"></v-textarea>
                    <div class="d-flex justify-space-between mt-5">
                        <v-btn type="submit" size="large" class="my-2" color="#388E3C"
                            :loading="acceptRemmitanceBuyLoading" @click="acceptRemmitanceBuy">تایید
                            پرداخت</v-btn>
                        <v-btn type="submit" size="large" class="my-2" color="error"
                            :loading="rejectRemmitanceBuyLoading" @click="rejectRemmitanceBuy">رد
                            پرداخت</v-btn>
                    </div>
                </div>
                <!-- <div class="form-box">
                    <v-form ref="form" @submit.prevent="submitRemmitanceBuy">
                        <v-btn type="submit" size="large" class="my-2" :loading="RemmitanceBuySubmitLoading" block>بررسی
                            مجدد
                            پرداخت</v-btn>
                    </v-form>
                </div> -->
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
import { router } from '@/plugins/router';
import InPersonService from '@/services/inperson/inperson';
import RemiitanceService from '@/services/remittance/remiitance';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const successMsg = ref('');
const alertError = ref(false);
const alertSuccess = ref(false);
const PendingRemiitanceBuyLoading = ref(false);
const rejectRemmitanceBuyLoading = ref(false);
const acceptRemmitanceBuyLoading = ref(false);
const RemmitanceBuySubmitDetail = ref({
    description: '',
    id: ''
});
const tab = ref(null);
const PendingRemiitanceBuyHeader = ref([
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
        title: 'شماره حساب مقصد',
        key: 'destCardPan'
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
const PendingRemiitanceBuySearch = ref();
const PendingRemiitanceBuyData = ref();
const CompleteRemiitanceBuySearch = ref();
const CompleteRemiitanceBuyHeader = ref([
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
        title: 'شماره حساب مقصد',
        key: 'destCardPan'
    },
    {
        title: 'شناسه پرداخت',
        key: 'invoiceId'
    },
    {
        title: 'وضعیت',
        key: 'status'
    },
]);
const FailedRemiitanceBuyHeader = ref([
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
        title: 'شماره حساب مقصد',
        key: 'destCardPan'
    },
    {
        title: 'شناسه پرداخت',
        key: 'invoiceId'
    },
    {
        title: 'وضعیت',
        key: 'status'
    },
])
const CompleteRemiitanceBuyData = ref();
const CompleteRemiitanceBuyLoading = ref();
const FailedRemiitanceBuyLoading = ref();
const FailedRemiitanceBuyData = ref();
const FailedRemiitanceBuySearch = ref();
const RemmitanceBuyDetail = ref();
const RemmitanceBuyDialog = ref(false);
const filter = ref({
    firstName: '',
    lastName: '',
    nationalCode: '',
    phoneNumber: '',
    tradeType: 3,
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
    destCardPan: '',
});
const completeExportExcel = ref(true);
const failedExportExcel = ref(true);
const pendingExportExcel = ref(true);
const exportLink = ref('');
const exportLoading = ref(false);
const bankAccounts = ref([
    { label: "کشاورزی (مطهر معصومی)", value: "0" },
    { label: "ملی (مطهر معصومی)", value: "1" },
    { label: "ملت (مطهر معصومی)", value: "2" },
    { label: "سپه (مطهر معصومی)", value: "3" },
    { label: "صادرات (مطهر معصومی)", value: "4" },
    { label: "کشاورزی (محمود معصومی)", value: "5" },
    { label: "ملی (محمود معصومی)", value: "6" },
    { label: "ملت (محمود معصومی)", value: "7" },
    { label: "سایر", value: "8" },
]);

const GetPendingRemiitanceBuyList = async () => {
    try {
        PendingRemiitanceBuyLoading.value = true;
        const response = await RemiitanceService.RemiitanceBuy('pending');
        PendingRemiitanceBuyData.value = response.data;
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
        PendingRemiitanceBuyLoading.value = false;
    }
};

const GetCompleteRemiitanceBuyList = async () => {
    try {
        CompleteRemiitanceBuyLoading.value = true;
        const response = await RemiitanceService.RemiitanceBuy('completed');
        CompleteRemiitanceBuyData.value = response.data;
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
        CompleteRemiitanceBuyLoading.value = false;
    }
};

const GetFailedRemiitanceBuyList = async () => {
    try {
        FailedRemiitanceBuyLoading.value = true;
        const response = await RemiitanceService.RemiitanceBuy('failed');
        FailedRemiitanceBuyData.value = response.data;
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
        FailedRemiitanceBuyLoading.value = false;
    }
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PendingRemiitanceBuyInfo = (item) => {
    RemmitanceBuyDialog.value = true;
    RemmitanceBuyDetail.value = item;
    RemmitanceBuySubmitDetail.value.id = item.id;
    RemmitanceBuySubmitDetail.value.authority = item.authority;
}

const acceptRemmitanceBuy = async () => {
    try {
        acceptRemmitanceBuyLoading.value = true;
        const response = await RemiitanceService.AcceptBuyRemmitance(RemmitanceBuySubmitDetail.value);
        successMsg.value = response.msg;
        alertSuccess.value = true;
        setTimeout(() => {
            alertSuccess.value = false;
        }, 5000)
        GetPendingRemiitanceBuyList();
        GetCompleteRemiitanceBuyList();
        GetFailedRemiitanceBuyList();
        RemmitanceBuyDialog.value = false;
        RemmitanceBuySubmitDetail.value.description = '';
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
        acceptRemmitanceBuyLoading.value = false;
    }
}

const rejectRemmitanceBuy = async () => {
    try {
        acceptRemmitanceBuyLoading.value = true;
        const response = await RemiitanceService.RejectBuyRemmitance(RemmitanceBuySubmitDetail.value);
        successMsg.value = response.msg;
        alertSuccess.value = true;
        setTimeout(() => {
            alertSuccess.value = false;
        }, 5000)
        GetPendingRemiitanceBuyList();
        GetCompleteRemiitanceBuyList();
        GetFailedRemiitanceBuyList();
        RemmitanceBuyDialog.value = false;
        RemmitanceBuySubmitDetail.value.description = '';
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
        acceptRemmitanceBuyLoading.value = false;
    }
}

const SubmitFilter = async (status) => {
    try {
        if (status == 'pending') {
            PendingRemiitanceBuyLoading.value = true;
        } else if (status == 'completed') {
            CompleteRemiitanceBuyLoading.value = true;
        } else if (status == 'failed') {
            FailedRemiitanceBuyLoading.value = true;
        }
        filter.value.status = status;
        const response = await InPersonService.SubmitFilterInvoice(filter.value);
        exportLink.value = response.link;
        if (status == 'pending') {
            PendingRemiitanceBuyData.value = response.data;
            pendingExportExcel.value = false;
        } else if (status == 'completed') {
            CompleteRemiitanceBuyData.value = response.data;
            completeExportExcel.value = false;
        } else if (status == 'failed') {
            FailedRemiitanceBuyData.value = response.data;
            failedExportExcel.value = false;
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
        PendingRemiitanceBuyLoading.value = false;
        CompleteRemiitanceBuyLoading.value = false;
        FailedRemiitanceBuyLoading.value = false;
    }
}

const exportExcel = async () => {
    exportLoading.value = true;
    window.location.href = exportLink.value;
    setTimeout(() => {
        exportLoading.value = false;
    }, 5000);
}

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
    filter.value.destCardPan = '';
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
};


const phoneRules = [
    v => /^09\d{9}$/.test(v) || 'شماره معتبر نیست'
];

const validateWeight = [
    (v) => !!v,
    (v) => /^\d+(\.\d{1,3})?$/.test(v),
];


onMounted(() => {
    GetPendingRemiitanceBuyList();
    GetCompleteRemiitanceBuyList();
    GetFailedRemiitanceBuyList();
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
