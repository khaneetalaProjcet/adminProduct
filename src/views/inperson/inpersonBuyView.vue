<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center" @update:modelValue="changeTabs">
                    <v-tab value="one">خرید حضوری در انتظار</v-tab>
                    <v-tab value="two">خرید حضوری موفق</v-tab>
                    <v-tab value="three">خرید حضوری ناموفق</v-tab>
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
                            <v-card title="در انتظار تایید">
                                <ul class="listGuide">
                                    <li>
                                        معاملاتی که توسط کارشناس بخش حضوری ثبت شده‌اند و در مرحله انتظار برای تایید
                                        پرداخت هستند
                                    </li>
                                </ul>

                                <v-data-table :headers="PendingInPersonBuyHeader" :items="PendingInPersonBuyData"
                                    :loading="PendingInPersonBuyLoading">
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
                                            @click="PendingInPersonBuyInfo(item)"></v-icon>
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
                            <v-card title="موفق">
                                <ul class="listGuide">
                                    <li>
                                        خرید حضوری که پرداخت آن با موفقیت انجام شده و توسط واحد حسابداری تأیید گردیده
                                        است.
                                    </li>
                                </ul>
                                <v-data-table :headers="CompleteInPersonBuyHeader" :items="CompleteInPersonBuyData"
                                    :loading="CompleteInPersonBuyLoading">
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
                                            @click="CompleteInPersonBuyInfo(item)"></v-icon>
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
                            <v-card title="ناموفق">
                                <ul class="listGuide">
                                    <li>
                                        خرید حضوری که به علت عدم موفقیت در پرداخت یا سایر دلایل توسط کارشناس بخش حضوری
                                        لغو شده باشد.
                                    </li>
                                </ul>
                                <v-data-table :headers="FailedInPersonBuyHeader" :items="FailedInPersonBuyData"
                                    :loading="FailedInPersonBuyLoading">
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
                                            @click="CompleteInPersonBuyInfo(item)"></v-icon>
                                    </template> -->
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>

        <!-- InPersonBuy Dialog -->
        <v-dialog v-model="InPersonBuyDialog" max-width="700" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات فاکتور</p>
                </div>
                <v-row class="my-3 px-3">
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>نام: </p>
                            <p class="mx-2">{{ InPersonBuyDetail.buyer.firstName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ InPersonBuyDetail.buyer.lastName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>کد ملی: </p>
                            <p class="mx-2">{{ InPersonBuyDetail.buyer.nationalCode }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>شماره موبایل: </p>
                            <p class="mx-2">{{ InPersonBuyDetail.buyer.phoneNumber }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>مبلغ کل: </p>
                            <p class="mx-2">{{ formatNumber(InPersonBuyDetail.totalPrice) }} تومان</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>میزان طلا: </p>
                            <p class="mx-2">{{ InPersonBuyDetail.goldWeight }} گرم</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>قیمت طلا : </p>
                            <p class="mx-2">{{ formatNumber(InPersonBuyDetail.goldPrice) }} تومان</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>تاریخ : </p>
                            <p class="mx-2">{{ InPersonBuyDetail.date }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>زمان : </p>
                            <p class="mx-2">{{ InPersonBuyDetail.time }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>کارشناس ثبت کننده : </p>
                            <p class="mx-2">{{ InPersonBuyDetail.adminId }}</p>
                        </div>
                    </v-col>
                    <v-col cols="12" class="my-1">
                        <div class="d-flex align-items-center">
                            <p>توضیحات کارشناس : </p>
                            <p class="mx-2">{{ InPersonBuyDetail.description }}</p>
                        </div>
                    </v-col>
                </v-row>
                <div class="form-box">
                    <v-form ref="form" @submit.prevent="">
                        <v-textarea v-model="InPersonBuySubmitDetail.description" label="توضیحات" variant="outlined"
                            rows="2"></v-textarea>
                        <div class="d-flex justify-space-between mt-5">
                            <v-btn type="submit" size="large" class="my-2" color="#388E3C"
                                :loading="submitInpersonBuyLoading" @click="submitInPersonBuy(1)">تایید
                                پرداخت</v-btn>
                            <v-btn type="submit" size="large" class="my-2" color="error"
                                :loading="rejectInpersonBuyLoading" @click="rejectInPersonBuy(0)">رد
                                پرداخت</v-btn>
                        </div>
                    </v-form>
                </div>
            </v-card>
        </v-dialog>




        <!-- <v-dialog v-model="InPersonBuyDialog" max-width="600" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات خرید</p>
                </div>
                <div class="d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 user-dialog-info">
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام: </p>
                            <p class="mx-2">{{ InPersonBuyDetail.buyer.firstName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2 user-price">
                            <p>کد ملی: </p>
                            <p class="mx-2">{{ InPersonBuyDetail.buyer.nationalCode }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>مبلغ کل: </p>
                            <p class="mx-2">{{ formatNumber(InPersonBuyDetail.totalPrice) }} تومان</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>کارشناس: </p>
                            <p class="mx-2">{{ InPersonBuyDetail.adminId }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>حساب بانکی مقصد: </p>
                            <p class="mx-2"></p>
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ InPersonBuyDetail.buyer.lastName }}</p>
                        </div>

                        <div class="d-flex align-items-center my-2 user-price">
                            <p>قیمت لحظه ای طلا: </p>
                            <p class="mx-2">{{ formatNumber(InPersonBuyDetail.goldPrice) }} تومان</p>
                        </div>
                        <div class="d-flex align-items-center my-2 user-price">
                            <p>وزن طلای خریداری شده: </p>
                            <p class="mx-2">{{ formatNumber(InPersonBuyDetail.goldWeight) }} تومان</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>توضیحات: </p>
                            <p class="mx-2">{{ InPersonBuyDetail.description }}</p>
                        </div>
                    </div>
                </div>
                <div class="form-box">
                    <v-form ref="form" @submit.prevent="submitInPersonBuy">

                    </v-form>
                </div>
                <v-card-actions class="d-flex justify-space-between">
                    <v-btn>تایید</v-btn>
                    <v-btn>رد</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->


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
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const successMsg = ref('');
const alertError = ref(false);
const alertSuccess = ref(false);
const PendingInPersonBuyLoading = ref(false);
const submitInpersonBuyLoading = ref(false);
const rejectInpersonBuyLoading = ref(false);
const tab = ref(null);
const filter = ref({
    firstName: '',
    lastName: '',
    nationalCode: '',
    phoneNumber: '',
    tradeType: 2,
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

const PendingInPersonBuyHeader = ref([
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
const PendingInPersonBuyData = ref();
const CompleteInPersonBuyHeader = ref([
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
]);
const FailedInPersonBuyHeader = ref([
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
])
const CompleteInPersonBuyData = ref();
const CompleteInPersonBuyLoading = ref();
const FailedInPersonBuyLoading = ref();
const FailedInPersonBuyData = ref();
const InPersonBuyDetail = ref();
const InPersonBuyDialog = ref(false);
const InPersonBuySubmitDetail = ref({
    description: '',
    id: '',
    status: '',
});


const GetPendingInPersonBuyList = async () => {
    try {
        PendingInPersonBuyLoading.value = true;
        const response = await InPersonService.InPersonBuy('pending');
        PendingInPersonBuyData.value = response.data;
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
        PendingInPersonBuyLoading.value = false;
    }
};

const GetCompleteInPersonBuyList = async () => {
    try {
        CompleteInPersonBuyLoading.value = true;
        const response = await InPersonService.InPersonBuy('completed');
        CompleteInPersonBuyData.value = response.data;
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
        CompleteInPersonBuyLoading.value = false;
    }
};

const GetFailedInPersonBuyList = async () => {
    try {
        FailedInPersonBuyLoading.value = true;
        const response = await InPersonService.InPersonBuy('failed');
        FailedInPersonBuyData.value = response.data;
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
        FailedInPersonBuyLoading.value = false;
    }
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PendingInPersonBuyInfo = (item) => {
    InPersonBuyDialog.value = true;
    InPersonBuyDetail.value = item;
    InPersonBuySubmitDetail.value.id = item.id;
}

const submitInPersonBuy = async (status) => {
    try {
        submitInpersonBuyLoading.value = true;
        InPersonBuySubmitDetail.value.status = status;
        const response = await InPersonService.SubmitInPersonBuy(InPersonBuySubmitDetail.value);
        successMsg.value = response.msg;
        alertSuccess.value = true;
        setTimeout(() => {
            alertSuccess.value = false;
        }, 5000)
        GetPendingInPersonBuyList();
        GetCompleteInPersonBuyList();
        GetFailedInPersonBuyList();
        InPersonBuyDialog.value = false;
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
        submitInpersonBuyLoading.value = false;
    }
}

const rejectInPersonBuy = async (status) => {
    try {
        rejectInpersonBuyLoading.value = true;
        InPersonBuySubmitDetail.value.status = status;
        const response = await InPersonService.SubmitInPersonBuy(InPersonBuySubmitDetail.value);
        successMsg.value = response.msg;
        alertSuccess.value = true;
        setTimeout(() => {
            alertSuccess.value = false;
        }, 5000)
        GetPendingInPersonBuyList();
        GetCompleteInPersonBuyList();
        GetFailedInPersonBuyList();
        InPersonBuyDialog.value = false;
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
        rejectInpersonBuyLoading.value = false;
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


const SubmitFilter = async (status) => {
    try {
        if (status == 'pending') {
            PendingInPersonBuyLoading.value = true;
        } else if (status == 'completed') {
            CompleteInPersonBuyLoading.value = true;
        } else if (status == 'failed') {
            FailedInPersonBuyLoading.value = true;
        }
        filter.value.status = status;
        const response = await InPersonService.SubmitFilterInvoice(filter.value);
        if (status == 'pending') {
            PendingInPersonBuyData.value = response?.data;
            console.log(PendingInPersonBuyData.value)
        } else if (status == 'completed') {
            CompleteInPersonBuyData.value = response?.data;
            console.log(CompleteInPersonBuyData.value)
        } else {
            FailedInPersonBuyData.value = response?.data;
            console.log(FailedInPersonBuyData.value)
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
        PendingInPersonBuyLoading.value = false;
        CompleteInPersonBuyLoading.value = false;
        FailedInPersonBuyLoading.value = false;
    }
}

onMounted(() => {
    GetPendingInPersonBuyList();
    GetCompleteInPersonBuyList();
    GetFailedInPersonBuyList();
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
