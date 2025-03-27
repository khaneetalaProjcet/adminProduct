<template>
    <v-row>
        <v-col cols="12">
            <v-stepper v-model="step">
                <v-stepper-header>
                    <v-stepper-item v-for="s in steps" :key="s" :complete="isCompleted(s)" :title="`مرحله ${s}`"
                        :value="s" :icon="isCompleted(s) ? 'ri-check-line' : 'ri-close-line'"
                        :color="isCompleted(s) ? '#0b8707' : '#c7c3c3'" class="custom-stepper-icon" />
                </v-stepper-header>
                <v-stepper-window>
                    <v-stepper-window-item :value="1">
                        <v-card class="step-card">
                            <v-form :ref="(el) => setFormRef(el, 1)">
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <div class="d-flex">
                                                <h3 class="trade-step-title">احراز هویت</h3>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="4" class="d-none d-md-flex"></v-col>
                                        <v-col cols="12" md="4">
                                            <v-text-field v-model="inPersonForm.phoneNumber" label="شماره همراه"
                                                variant="outlined" :rules="phoneRules" @input="limitNumber"
                                                :disabled="otpVerification != false"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4" class="d-none d-md-flex"></v-col>
                                    </v-row>
                                    <v-row v-if="otpVerification != false">
                                        <v-col cols="12" md="4" class="d-none d-md-flex"></v-col>
                                        <v-col cols="12" md="4">
                                            <v-otp-input :length="4" v-model="inPersonForm.otp" type="number"
                                                :rules="otpRules" variant="outlined" class="otp-input"></v-otp-input>
                                        </v-col>
                                        <v-col cols="12" md="4" class="d-none d-md-flex"></v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                            <v-card-actions class="btn-box first-step">
                                <v-btn @click="sendOtp" color="primary" size="large" variant="elevated"
                                    :disabled="!isFormValid" v-if="otpVerification == false" :loading="otpLoading">
                                    ارسال کد تایید
                                </v-btn>
                                <v-btn @click="nextStep" color="primary" size="large" variant="elevated"
                                    :loading="stepOneLoading" :disabled="!isFormValid" v-else>
                                    بعدی
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-window-item>
                    <v-stepper-window-item :value="2">
                        <v-card class="step-card">
                            <v-form :ref="(el) => setFormRef(el, 2)">
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <div class="w-100 d-flex justify-space-between align-items-center">
                                                <h3 class="trade-step-title">اطلاعات کاربر</h3>
                                                <div class="d-flex" v-if="userInfo.isVerified == 1">
                                                    <p class="mb-0">کاربر احراز هویت شده است</p>
                                                    <v-icon class="me-2" size="small" icon="ri-check-line"
                                                        color="#0b8707"></v-icon>
                                                </div>
                                                <div class="d-flex" v-else>
                                                    <p class="mb-0">کاربر احراز هویت نشده است</p>
                                                    <v-icon class="me-2" size="small" icon="ri-close-line"
                                                        color="#c9190c"></v-icon>
                                                </div>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <v-text-field v-model="userInfo.nationalCode" label="کد ملی"
                                                variant="outlined" v-if="userInfo.isVerified != 1"
                                                :rules="nationalCodeRules" @input="validateNationalCode"></v-text-field>
                                            <div class="d-flex" v-else>
                                                <p class="mb-0">کد ملی : </p>
                                                <p class="mb-0">{{ userInfo.nationalCode }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="4" md="3" class="my-3" v-if="userInfo.isVerified != 1">
                                        </v-col>
                                        <v-col cols="4" md="2" class="my-3" v-if="userInfo.isVerified != 1">
                                            <v-select v-model="selectedDate" label="روز تولد" :items="persianDates"
                                                variant="outlined" item-title="name" item-value="value"
                                                @update:model-value="onDateSelected" class="first-select"
                                                :rules="[v => !!v || 'روز الزامی است']"></v-select>
                                        </v-col>
                                        <v-col cols="4" md="2" class="my-3" v-if="userInfo.isVerified != 1">
                                            <v-select v-model="selectedMonth" label="ماه تولد" :items="persianMonths"
                                                variant="outlined" class="second-select" item-title="name"
                                                item-value="value" @update:model-value="onMonthSelected"
                                                :rules="[v => !!v || 'ماه الزامی است']"></v-select>
                                        </v-col>
                                        <v-col cols="4" md="2" class="my-3" v-if="userInfo.isVerified != 1">
                                            <v-select v-model="selectedYear" label="سال تولد" :items="persianYears"
                                                variant="outlined" class="third-select" item-title="name"
                                                item-value="value" @update:model-value="onYearSelected"
                                                :rules="[v => !!v || 'سال الزامی است']"></v-select>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3" v-if="userInfo.isVerified == 1">
                                            <div class="d-flex">
                                                <p class="mb-0">تاریخ تولد : </p>
                                                <p class="mb-0">{{ userInfo.birthDate }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">شماره همراه : </p>
                                                <p class="mb-0">{{ userInfo.phoneNumber }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">جنسیت : </p>
                                                <p class="mb-0" v-if="userInfo.gender == true">مرد</p>
                                                <p class="mb-0" v-else-if="userInfo.gender == false">زن</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">نام : </p>
                                                <p class="mb-0">{{ userInfo.firstName }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">نام خانوادگی : </p>
                                                <p class="mb-0">{{ userInfo.lastName }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">نام پدر : </p>
                                                <p class="mb-0">{{ userInfo.fatherName }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">شهر : </p>
                                                <p class="mb-0">{{ userInfo.officeName }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">کارت بانکی : </p>
                                                <v-icon size="small" icon="ri-close-line" color="#c9190c"
                                                    v-if="userInfo.isHaveBank == false"></v-icon>
                                                <v-icon size="small" icon="ri-check-line" color="#0b8707"
                                                    v-else-if="userInfo.isHaveBank == true"></v-icon>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">موجودی صندوق طلا : </p>
                                                <p class="mb-0">{{ userInfo.wallet.goldWeight }}</p>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                            <v-card-actions class="btn-box">
                                <v-btn @click="prevStep" size="large">قبلی</v-btn>
                                <v-btn @click="IdentityUser" color="primary" size="large" variant="elevated"
                                    :disabled="!isFormValid" v-if="userInfo.isVerified != 1" :loading="stepTwoLoading">
                                    استعلام هویت
                                </v-btn>
                                <v-btn @click="nextStep" color="primary" size="large" variant="elevated"
                                    :loading="stepTwoLoading" v-else>
                                    بعدی
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-window-item>
                    <v-stepper-window-item :value="3">
                        <v-card class="step-card">
                            <v-tabs v-model="tab">
                                <v-tab value="one">خرید</v-tab>
                                <v-tab value="two">فروش</v-tab>
                            </v-tabs>

                            <v-tabs-window v-model="tab">
                                <!-- buy -->
                                <v-tabs-window-item value="one">
                                    <v-form :ref="(el) => setFormRef(el, 3)">
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12">
                                                    <div class="w-100 d-flex justify-space-between align-items-center">
                                                        <h3 class="trade-step-title">ثبت خرید</h3>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <v-row class="">
                                                <v-col cols="12" md="3">
                                                    <persian-date-picker v-model="goldPriceForm.date"
                                                        placeholder="تاریخ"></persian-date-picker>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <persian-date-picker type="time" v-model="goldPriceForm.time"
                                                        placeholder="زمان"></persian-date-picker>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <div class="livePrice-box py-2">
                                                        <p>قیمت طلا : </p>
                                                        <p>{{ formatNumber(goldPriceForm.buyPrice) }} تومان</p>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-btn @click="getGoldPrice" class="h-100 py-2" color="primary"
                                                        size="large" variant="elevated" block
                                                        :loading="GoldPriceLoading">
                                                        استعلام قیمت طلا
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" md="3">
                                                    <v-text-field v-model="tradeBuyForm.totalPrice" label="مبلغ (تومان)"
                                                        variant="outlined" @input="buyGoldpriceConvert"
                                                        :disabled="goldPriceForm.buyPrice == '' ? true : false"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="2">
                                                    <div class="d-flex justify-center align-center h-100">
                                                        <v-icon class="me-2" size="small"
                                                            icon="ri-arrow-left-right-line" color="#0b8707"></v-icon>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-text-field v-model="tradeBuyForm.goldWeight" label="وزن (گرم)"
                                                        variant="outlined" :rules="validateWeight"
                                                        @input="buyGoldweightConvert"
                                                        :disabled="goldPriceForm.buyPrice == '' ? true : false"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field v-model="tradeBuyForm.invoiceId" label="شناسه پرداخت"
                                                        variant="outlined" :rules="validateInvoice"></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-textarea label="توضیحات (اختیاری)" variant="outlined"
                                                        v-model="tradeBuyForm.description"></v-textarea>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                    <v-card-actions class="btn-box">
                                        <v-btn @click="prevStep" size="large">قبلی</v-btn>
                                        <v-btn @click="nextStep('buy')" color="primary" size="large" variant="elevated"
                                            :disabled="!isFormValid" :loading="stepThreeLoading">
                                            خرید نهایی
                                        </v-btn>
                                    </v-card-actions>
                                </v-tabs-window-item>

                                <!-- sell -->
                                <v-tabs-window-item value="two">
                                    <v-form :ref="(el) => setFormRef(el, 3)">
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12">
                                                    <div class="w-100 d-flex justify-space-between align-items-center">
                                                        <h3 class="trade-step-title">ثبت فروش</h3>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <v-row class="">
                                                <v-col cols="12" md="3">
                                                    <persian-date-picker v-model="goldPriceForm.date"
                                                        placeholder="تاریخ"></persian-date-picker>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <persian-date-picker type="time" v-model="goldPriceForm.time"
                                                        placeholder="زمان"></persian-date-picker>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <div class="livePrice-box">
                                                        <p>قیمت طلا : </p>
                                                        <p>{{ formatNumber(goldPriceForm.sellPrice) }} تومان</p>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-btn @click="getGoldPrice" class="h-100" color="primary"
                                                        size="large" variant="elevated" block
                                                        :loading="GoldPriceLoading">
                                                        استعلام قیمت طلا
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" md="3">
                                                    <v-text-field v-model="tradeSellForm.totalPrice"
                                                        label="مبلغ (تومان)" variant="outlined"
                                                        @input="sellGoldpriceConvert"
                                                        :disabled="goldPriceForm.sellPrice == '' ? true : false"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="2">
                                                    <div class="d-flex justify-center align-center h-100">
                                                        <v-icon class="me-2" size="small"
                                                            icon="ri-arrow-left-right-line" color="#0b8707"></v-icon>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-text-field v-model="tradeSellForm.goldWeight" label="وزن (گرم)"
                                                        variant="outlined" :rules="validateWeight"
                                                        @input="sellGoldweightConvert"
                                                        :disabled="goldPriceForm.sellPrice == '' ? true : false"></v-text-field>
                                                </v-col>
                                                <!-- <v-col cols="12" md="4">
                                                    <v-text-field v-model="tradeSellForm.invoiceId" label="شناسه پرداخت"
                                                        variant="outlined" :rules="validateInvoice"></v-text-field>
                                                </v-col> -->
                                                <v-col cols="12">
                                                    <v-textarea label="توضیحات (اختیاری)" variant="outlined"
                                                        v-model="tradeSellForm.description"></v-textarea>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                    <v-card-actions class="btn-box">
                                        <v-btn @click="prevStep" size="large">قبلی</v-btn>
                                        <v-btn @click="nextStep('sell')" color="primary" size="large" variant="elevated"
                                            :disabled="!isFormValid" :loading="stepThreeLoading">
                                            فروش نهایی
                                        </v-btn>
                                    </v-card-actions>
                                </v-tabs-window-item>
                            </v-tabs-window>
                        </v-card>
                    </v-stepper-window-item>
                    <v-stepper-window-item :value="4">
                        <v-card class="step-card">
                            <v-form :ref="(el) => setFormRef(el, 4)">
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <div class="w-100 d-flex justify-space-between align-items-center">
                                                <h3 class="trade-step-title">فاکتور {{ InvoiceForm.type }}</h3>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <div class="d-flex">
                                                <h4>اطلاعات کاربر</h4>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p>نام : </p>
                                                <p>{{ InvoiceForm.user.firstName }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p>نام خانوادگی : </p>
                                                <p>{{ InvoiceForm.user.lastName }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p>نام پدر : </p>
                                                <p>{{ InvoiceForm.user.fatherName }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p>کد ملی : </p>
                                                <p>{{ InvoiceForm.user.nationalCode }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p> شماره همراه : </p>
                                                <p>{{ InvoiceForm.user.phoneNumber }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p>کارشناس : </p>
                                                <p>{{ InvoiceForm.adminId }}</p>
                                            </div>
                                        </v-col>
                                        <v-divider></v-divider>
                                        <v-col cols="12">
                                            <div class="d-flex">
                                                <h4>اطلاعات معامله</h4>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p>وزن طلا : </p>
                                                <p>{{ InvoiceForm.goldWeight }} گرم</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p>قیمت طلا : </p>
                                                <p>{{ formatNumber(InvoiceForm.goldPrice) }} تومان</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p>قیمت کل : </p>
                                                <p>{{ formatNumber(InvoiceForm.totalPrice) }} تومان</p>
                                            </div>
                                        </v-col>
                                        <v-divider></v-divider>
                                        <v-col cols="12">
                                            <div class="d-flex">
                                                <h4>اطلاعات کیف پول</h4>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p> موجودی کیف پول : </p>
                                                <p>{{ formatNumber(InvoiceForm.wallet.balance) }} تومان</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p>دارایی طلا: </p>
                                                <p>{{ InvoiceForm.wallet.goldWeight }} گرم</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p>مبلغ در انتظار برداشت : </p>
                                                <p>{{ formatNumber(InvoiceForm.wallet.blocked) }} تومان</p>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                            <v-card-actions class="btn-box">
                                <v-btn @click="prevStep" size="large">قبلی</v-btn>
                                <v-btn @click="submitForm" color="primary" size="large" variant="elevated">
                                    اتمام نمایش
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-window-item>
                </v-stepper-window>
            </v-stepper>
        </v-col>
    </v-row>
    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
        {{ errorMsg }}
    </v-alert>

    <v-dialog v-model="successModal" max-width="500" persistent>
        <v-card title="تایید فاکتور" class="modal-card">
            <v-icon class="mt-3 mb-6" icon="ri-checkbox-circle-fill" color="#0b8707"></v-icon>
            <h4>
                فاکتور {{ InvoiceForm.user.firstName }} {{ InvoiceForm.user.lastName }} با موفقیت ثبت شد
            </h4>
        </v-card>
    </v-dialog>
</template>

<script setup>
import InPersonService from '@/services/inperson/inperson';
import GoldPriceService from '@/services/priceApi/price';
import jalaaliJs from 'jalaali-js';
import { ref } from 'vue';

const steps = ref([1, 2, 3, 4]);
const step = ref(1);
const tab = ref(null);
const formRefs = ref({});
const stepOneLoading = ref(false);
const stepTwoLoading = ref(false);
const stepThreeLoading = ref(false);
const GoldPriceLoading = ref(false);
const successModal = ref(false);
const otpLoading = ref(false);
const otpVerification = ref(false);
const selectedDate = ref();
const selectedMonth = ref();
const selectedYear = ref();
const alertError = ref(false);
const errorMsg = ref('');
const inPersonForm = ref({
    phoneNumber: '',
    otp: '',
});

const userInfo = ref({
    isVerified: '',
    id: '',
    firstName: '',
    birthDate: '',
    lastName: '',
    fatherName: '',
    gender: '',
    officeName: '',
    phoneNumber: '',
    nationalCode: '',
    isHaveBank: '',
    wallet: {
        id: '',
        goldWeight: '',
        balance: '',
    }
});

const tradeBuyForm = ref({
    nationalCode: '',
    goldPrice: '',
    goldWeight: '',
    description: '',
    totalPrice: '',
    invoiceId: '',
});

const tradeSellForm = ref({
    nationalCode: '',
    goldPrice: '',
    goldWeight: '',
    description: '',
    totalPrice: '',
    invoiceId: '',
});

const goldPriceForm = ref({
    date: '',
    time: '',
    buyPrice: '',
    sellPrice: '',
    milliseconds: '',
});

const InvoiceForm = ref({
    type: '',
    goldPrice: '',
    goldWeight: '',
    totalPrice: '',
    date: '',
    time: '',
    adminId: '',
    wallet: {
        goldWeight: '',
        balance: '',
        blocked: '',
    },
    user: {
        firstName: '',
        lastName: '',
        fatherName: '',
        phoneNumber: '',
        nationalCode: '',
    }
})

const persianDates = ref([
    { name: "1", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
    { name: "6", value: 6 },
    { name: "7", value: 7 },
    { name: "8", value: 8 },
    { name: "9", value: 9 },
    { name: "10", value: 10 },
    { name: "11", value: 11 },
    { name: "12", value: 12 },
    { name: "13", value: 13 },
    { name: "14", value: 14 },
    { name: "15", value: 15 },
    { name: "16", value: 16 },
    { name: "17", value: 17 },
    { name: "18", value: 18 },
    { name: "19", value: 19 },
    { name: "20", value: 20 },
    { name: "21", value: 21 },
    { name: "22", value: 22 },
    { name: "23", value: 23 },
    { name: "24", value: 24 },
    { name: "25", value: 25 },
    { name: "26", value: 26 },
    { name: "27", value: 27 },
    { name: "28", value: 28 },
    { name: "29", value: 29 },
    { name: "30", value: 30 },
    { name: "31", value: 31 },
]);

const persianMonths = ref([
    { name: "فروردین", value: 1 },
    { name: "اردیبهشت", value: 2 },
    { name: "خرداد", value: 3 },
    { name: "تیر", value: 4 },
    { name: "مرداد", value: 5 },
    { name: "شهریور", value: 6 },
    { name: "مهر", value: 7 },
    { name: "آبان", value: 8 },
    { name: "آذر", value: 9 },
    { name: "دی", value: 10 },
    { name: "بهمن", value: 11 },
    { name: "اسفند", value: 12 },
]);

const persianYears = ref([
    { name: "1300", value: 1300 },
    { name: "1301", value: 1301 },
    { name: "1302", value: 1302 },
    { name: "1303", value: 1303 },
    { name: "1304", value: 1304 },
    { name: "1305", value: 1305 },
    { name: "1306", value: 1306 },
    { name: "1307", value: 1307 },
    { name: "1308", value: 1308 },
    { name: "1309", value: 1309 },
    { name: "1310", value: 1310 },
    { name: "1311", value: 1311 },
    { name: "1312", value: 1312 },
    { name: "1313", value: 1313 },
    { name: "1314", value: 1314 },
    { name: "1315", value: 1315 },
    { name: "1316", value: 1316 },
    { name: "1317", value: 1317 },
    { name: "1318", value: 1318 },
    { name: "1319", value: 1319 },
    { name: "1320", value: 1320 },
    { name: "1321", value: 1321 },
    { name: "1322", value: 1322 },
    { name: "1323", value: 1323 },
    { name: "1324", value: 1324 },
    { name: "1325", value: 1325 },
    { name: "1326", value: 1326 },
    { name: "1327", value: 1327 },
    { name: "1328", value: 1328 },
    { name: "1329", value: 1329 },
    { name: "1330", value: 1330 },
    { name: "1331", value: 1331 },
    { name: "1332", value: 1332 },
    { name: "1333", value: 1333 },
    { name: "1334", value: 1334 },
    { name: "1335", value: 1335 },
    { name: "1336", value: 1336 },
    { name: "1337", value: 1337 },
    { name: "1338", value: 1338 },
    { name: "1339", value: 1339 },
    { name: "1340", value: 1340 },
    { name: "1341", value: 1341 },
    { name: "1342", value: 1342 },
    { name: "1343", value: 1343 },
    { name: "1344", value: 1344 },
    { name: "1345", value: 1345 },
    { name: "1346", value: 1346 },
    { name: "1347", value: 1347 },
    { name: "1348", value: 1348 },
    { name: "1349", value: 1349 },
    { name: "1350", value: 1350 },
    { name: "1351", value: 1351 },
    { name: "1352", value: 1352 },
    { name: "1353", value: 1353 },
    { name: "1354", value: 1354 },
    { name: "1355", value: 1355 },
    { name: "1356", value: 1356 },
    { name: "1357", value: 1357 },
    { name: "1358", value: 1358 },
    { name: "1359", value: 1359 },
    { name: "1360", value: 1360 },
    { name: "1361", value: 1361 },
    { name: "1362", value: 1362 },
    { name: "1363", value: 1363 },
    { name: "1364", value: 1364 },
    { name: "1365", value: 1365 },
    { name: "1366", value: 1366 },
    { name: "1367", value: 1367 },
    { name: "1368", value: 1368 },
    { name: "1369", value: 1369 },
    { name: "1370", value: 1370 },
    { name: "1371", value: 1371 },
    { name: "1372", value: 1372 },
    { name: "1373", value: 1373 },
    { name: "1374", value: 1374 },
    { name: "1375", value: 1375 },
    { name: "1376", value: 1376 },
    { name: "1377", value: 1377 },
    { name: "1378", value: 1378 },
    { name: "1379", value: 1379 },
    { name: "1380", value: 1380 },
    { name: "1381", value: 1381 },
    { name: "1382", value: 1382 },
    { name: "1383", value: 1383 },
    { name: "1384", value: 1384 },
    { name: "1385", value: 1385 },
    { name: "1386", value: 1386 },
    { name: "1387", value: 1387 },
    { name: "1388", value: 1388 },
    { name: "1389", value: 1389 },
    { name: "1390", value: 1390 },
    { name: "1391", value: 1391 },
    { name: "1392", value: 1392 },
    { name: "1393", value: 1393 },
    { name: "1394", value: 1394 },
    { name: "1395", value: 1395 },
    { name: "1396", value: 1396 },
    { name: "1397", value: 1397 },
    { name: "1398", value: 1398 },
    { name: "1399", value: 1399 },
    { name: "1400", value: 1400 },
    { name: "1401", value: 1401 },
    { name: "1402", value: 1402 },
    { name: "1403", value: 1403 }
]);

const isCompleted = s => s < step.value;

const setFormRef = (el, index) => {
    if (el) {
        formRefs.value[index] = el;
    }
};

const submitForm = async () => {
    successModal.value = true;
    setInterval(() => {
        successModal.value = false;
        otpVerification.value = false;
        inPersonForm.value.phoneNumber = '';
        inPersonForm.value.otp = '';
        step.value = 1;
    }, 3000)
};

const prevStep = () => {
    if (step.value > 1) step.value--;
    otpVerification.value = false;
    selectedDate.value = '';
    selectedMonth.value = '';
    selectedYear.value = '';
    userInfo.value.nationalCode = '';
    inPersonForm.value.otp = '';
    inPersonForm.value.phoneNumber = '';
};


const isFormValid = computed(() => {
    if (!formRefs.value[step.value]) return false;
    if (otpVerification.value && inPersonForm.value.otp?.length !== 4) {
        return false;
    }
    return formRefs.value[step.value].isValid;
});

const nextStep = async (type) => {
    const form = formRefs.value[step.value];
    if (form) {
        const { valid } = await form.validate();
        if (valid) {
            const apiSuccess = await TradeRequest(type);
            if (apiSuccess)
                step.value++;
        }
    }
};


const TradeRequest = async (type) => {
    if (step.value === 1) {
        return await AuthUser();
    } else if (step.value === 2) {
        return true;
    } else if (step.value === 3) {
        if (type == 'buy') {
            return await TradeBuy();
        } else {
            return await TradeSell();
        }
    } else if (step.value === 4) {
        return true;
    }
}

const sendOtp = async () => {
    try {
        otpLoading.value = true;
        const response = await InPersonService.sendOtp(inPersonForm.value.phoneNumber);
        otpVerification.value = true;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        otpLoading.value = false;
    }
}

const AuthUser = async () => {
    try {
        stepOneLoading.value = true;
        const response = await InPersonService.submitOtp(inPersonForm.value);
        if (response.data.isVerified == 0) {
            userInfo.value.isVerified = response.data.isVerified;
        } else {
            userInfo.value.id = response?.data?.id;
            userInfo.value.isVerified = response?.data?.isVerified;
            userInfo.value.firstName = response?.data?.firstName;
            userInfo.value.lastName = response?.data?.lastName;
            userInfo.value.fatherName = response?.data?.fatherName;
            userInfo.value.gender = response?.data?.gender;
            userInfo.value.isHaveBank = response?.data?.isHaveBank;
            userInfo.value.nationalCode = response?.data?.nationalCode;
            userInfo.value.birthDate = response?.data?.birthDate;
            userInfo.value.officeName = response?.data?.officeName;
            userInfo.value.phoneNumber = response?.data?.phoneNumber;
            userInfo.value.wallet.balance = response?.data?.wallet?.balance;
            userInfo.value.wallet.goldWeight = response?.data?.wallet?.goldWeight;
            userInfo.value.wallet.id = response?.data?.wallet?.id;
        }
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        stepOneLoading.value = false;
    }
}

const IdentityUser = async () => {
    try {
        stepTwoLoading.value = true;
        const response = await InPersonService.identityUser(userInfo.value);
        userInfo.value.isVerified = response.data.isVerified;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        stepTwoLoading.value = false;
    }
}


const getGoldPrice = async () => {
    convertDate()
    try {
        GoldPriceLoading.value = true;
        const response = await GoldPriceService.GoldPriceByTime(goldPriceForm.value.milliseconds);
        goldPriceForm.value.buyPrice = response.buyPrice;
        goldPriceForm.value.sellPrice = response.sellPrice;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        GoldPriceLoading.value = false;
    }
}


const TradeBuy = async () => {
    try {
        stepThreeLoading.value = true;
        tradeBuyForm.value.nationalCode = userInfo.value.nationalCode;
        tradeBuyForm.value.goldPrice = goldPriceForm.value.buyPrice;
        console.log(tradeBuyForm.value)
        const response = await InPersonService.CreateBuy(tradeBuyForm.value);
        InvoiceForm.value.type = 'خرید';
        InvoiceForm.value.adminId = response?.data?.adminId;
        InvoiceForm.value.date = response?.data?.date;
        InvoiceForm.value.time = response?.data?.time;
        InvoiceForm.value.goldPrice = response?.data?.goldPrice;
        InvoiceForm.value.goldWeight = response?.data?.goldWeight;
        InvoiceForm.value.totalPrice = response?.data?.totalPrice;
        InvoiceForm.value.user.firstName = response?.data?.buyer?.firstName;
        InvoiceForm.value.user.lastName = response?.data?.buyer?.lastName;
        InvoiceForm.value.user.fatherName = response?.data?.buyer?.fatherName;
        InvoiceForm.value.user.nationalCode = response?.data?.buyer?.nationalCode;
        InvoiceForm.value.user.phoneNumber = response?.data?.buyer?.phoneNumber;
        InvoiceForm.value.wallet.balance = response?.data?.wallet?.balance;
        InvoiceForm.value.wallet.blocked = response?.data?.wallet?.blocked;
        InvoiceForm.value.wallet.goldWeight = response?.data?.wallet?.goldWeight;
        console.log(InvoiceForm.value)
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        stepThreeLoading.value = false;
    }
}


const TradeSell = async () => {
    try {
        stepThreeLoading.value = true;
        tradeSellForm.value.nationalCode = userInfo.value.nationalCode;
        tradeSellForm.value.goldPrice = goldPriceForm.value.buyPrice;
        const response = await InPersonService.CreateSell(tradeSellForm.value);
        InvoiceForm.value.type = 'فروش';
        InvoiceForm.value.adminId = response?.data?.adminId;
        InvoiceForm.value.date = response?.data?.date;
        InvoiceForm.value.time = response?.data?.time;
        InvoiceForm.value.goldPrice = response?.data?.goldPrice;
        InvoiceForm.value.goldWeight = response?.data?.goldWeight;
        InvoiceForm.value.totalPrice = response?.data?.totalPrice;
        InvoiceForm.value.user.firstName = response?.data?.seller?.firstName;
        InvoiceForm.value.user.lastName = response?.data?.seller?.lastName;
        InvoiceForm.value.user.fatherName = response?.data?.seller?.fatherName;
        InvoiceForm.value.user.nationalCode = response?.data?.seller?.nationalCode;
        InvoiceForm.value.user.phoneNumber = response?.data?.seller?.phoneNumber;
        InvoiceForm.value.wallet.balance = response?.data?.wallet?.balance;
        InvoiceForm.value.wallet.blocked = response?.data?.wallet?.blocked;
        InvoiceForm.value.wallet.goldWeight = response?.data?.wallet?.goldWeight;
        console.log(InvoiceForm.value)
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        stepThreeLoading.value = false;
    }
}


const convertDate = () => {
    const [year, month, day] = goldPriceForm.value.date.split('/').map(Number);
    const [hour, minute] = goldPriceForm.value.time.split(':').map(Number);
    const gregorianDate = jalaaliJs.toGregorian(year, month, day);

    const date = new Date(
        gregorianDate.gy,
        gregorianDate.gm - 1,
        gregorianDate.gd,
        hour,
        minute,
        0
    );

    goldPriceForm.value.milliseconds = date.getTime();
}



const limitNumber = () => {
    inPersonForm.value.phoneNumber = inPersonForm.value.phoneNumber.replace(/\D/g, '').slice(0, 11);
}

const phoneRules = [
    v => !!v || 'شماره همراه الزامی است',
    v => /^09\d{9}$/.test(v) || 'شماره معتبر نیست'
];

const otpRules = [
    (v) => !!v || "کد تایید را وارد کنید",
    (v) => v?.length === 4 || "کد تایید باید ۴ رقمی باشد"
]

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
    (v) => !!v || 'مقدار ورودی نمی‌تواند خالی باشد',
    (v) => /^\d+(\.\d{1,3})?$/.test(v) || 'فقط عدد مجاز است و حداکثر 3 رقم اعشار',
];

const validateInvoice = [
    v => !!v || 'شناسه پرداخت الزامی است',
]


const onDateSelected = (value) => {
    selectedDate.value = value;
    updateBirthDate();
};

const onMonthSelected = (value) => {
    selectedMonth.value = value;
    updateBirthDate();
};

const onYearSelected = (value) => {
    selectedYear.value = value;
    updateBirthDate();
};

const updateBirthDate = () => {
    if (selectedYear.value && selectedMonth.value && selectedDate.value) {
        const month = String(selectedMonth.value).padStart(2, '0');
        const day = String(selectedDate.value).padStart(2, '0');
        userInfo.value.birthDate = `${selectedYear.value}${month}${day}`;
    }
};

const validateNationalCode = () => {
    userInfo.value.nationalCode = userInfo.value.nationalCode.replace(/\D/g, '').slice(0, 10);
    nationalCodeRules.every(rule => rule(userInfo.value.nationalCode) === true);
};


const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};



const buyGoldpriceConvert = () => {
    tradeBuyForm.value.totalPrice = tradeBuyForm.value.totalPrice.replace(/[^0-9]/g, '');
    tradeBuyForm.value.goldWeight = (tradeBuyForm.value.totalPrice / goldPriceForm.value.buyPrice).toFixed(3);
}

const sellGoldpriceConvert = () => {
    tradeSellForm.value.totalPrice = tradeSellForm.value.totalPrice.replace(/[^0-9]/g, '');
    tradeSellForm.value.goldWeight = (tradeSellForm.value.totalPrice / goldPriceForm.value.sellPrice).toFixed(3);
}



const buyGoldweightConvert = () => {
    tradeBuyForm.value.goldWeight = tradeBuyForm.value.goldWeight.replace(/[^0-9.]/g, '');
    const parts = tradeBuyForm.value.goldWeight.split('.');
    if (parts.length > 1) {
        tradeBuyForm.value.goldWeight = parts[0] + '.' + parts.slice(1).join('');
    }

    if (parts.length > 1 && parts[1].length > 2) {
        tradeBuyForm.value.goldWeight = parts[0] + '.' + parts[1].slice(0, 3);
    }

    tradeBuyForm.value.totalPrice = parseInt(tradeBuyForm.value.goldWeight * goldPriceForm.value.buyPrice);
}

const sellGoldweightConvert = () => {
    tradeSellForm.value.goldWeight = tradeSellForm.value.goldWeight.replace(/[^0-9.]/g, '');
    const parts = tradeSellForm.value.goldWeight.split('.');
    if (parts.length > 1) {
        tradeSellForm.value.goldWeight = parts[0] + '.' + parts.slice(1).join('');
    }

    if (parts.length > 1 && parts[1].length > 2) {
        tradeSellForm.value.goldWeight = parts[0] + '.' + parts[1].slice(0, 3);
    }

    tradeSellForm.value.totalPrice = parseInt(tradeSellForm.value.goldWeight * goldPriceForm.value.sellPrice);
}

</script>

<style scoped>
.otp-input {
    direction: ltr;
}

.trade-step-title {
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #d4af37;
}

.step-card {
    min-height: 20rem;
    min-height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: none !important;
    padding: 0.5rem;
}

.btn-box.first-step {
    display: flex;
    justify-content: end;
}

.btn-box {
    display: flex;
    justify-content: space-between;
}

.k-alert {
    position: absolute;
    top: 10px;
    left: 40%;
    font-size: 12px;
    padding: 10px !important;
    z-index: 100000;
}

.livePrice-box {
    border: 1px solid #d4af37;
    border-radius: 5px;
    padding: 0.2rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    position: relative;
}

.livePrice-box p {
    margin-bottom: 0 !important;
}

.modal-card {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
}

.modal-card i {
    width: 80px;
    height: 80px;
}

.invoice-box {
    padding: 0.2rem 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
</style>
