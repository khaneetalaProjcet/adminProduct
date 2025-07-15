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
                                            <v-text-field v-model="remittanceForm.phoneNumber" label="شماره همراه"
                                                variant="outlined" :rules="phoneRules"
                                                @input="limitNumber"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4" class="d-none d-md-flex"></v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                            <v-card-actions class="btn-box first-step">
                                <v-btn @click="nextStep" color="primary" size="large" variant="elevated"
                                    :loading="stepOneLoading" :disabled="!isFormValid">
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
                                                <div class="d-flex" v-if="userVerificationDetail.userVerified">
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
                                                variant="outlined" v-if="userVerificationDetail.userVerified == false"
                                                :rules="nationalCodeRules" @input="validateNationalCode"></v-text-field>
                                            <div class="d-flex" v-else>
                                                <p class="mb-0">کد ملی : </p>
                                                <p class="mb-0">{{ userInfo.nationalCode }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="4" md="3" class="my-3"
                                            v-if="userVerificationDetail.userVerified == false">
                                        </v-col>
                                        <v-col cols="4" md="2" class="my-3"
                                            v-if="userVerificationDetail.userVerified == false">
                                            <v-select v-model="selectedDate" label="روز تولد" :items="persianDates"
                                                variant="outlined" item-title="name" item-value="value"
                                                @update:model-value="onDateSelected" class="first-select"
                                                :rules="[v => !!v || 'روز الزامی است']"></v-select>
                                        </v-col>
                                        <v-col cols="4" md="2" class="my-3"
                                            v-if="userVerificationDetail.userVerified == false">
                                            <v-select v-model="selectedMonth" label="ماه تولد" :items="persianMonths"
                                                variant="outlined" class="second-select" item-title="name"
                                                item-value="value" @update:model-value="onMonthSelected"
                                                :rules="[v => !!v || 'ماه الزامی است']"></v-select>
                                        </v-col>
                                        <v-col cols="4" md="2" class="my-3"
                                            v-if="userVerificationDetail.userVerified == false">
                                            <v-select v-model="selectedYear" label="سال تولد" :items="persianYears"
                                                variant="outlined" class="third-select" item-title="name"
                                                item-value="value" @update:model-value="onYearSelected"
                                                :rules="[v => !!v || 'سال الزامی است']"></v-select>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3"
                                            v-if="userVerificationDetail.userVerified == true">
                                            <div class="d-flex">
                                                <p class="mb-0">تاریخ تولد : </p>
                                                <p class="mb-0">{{ userInfo.birthDate }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">شماره همراه : </p>
                                                <p class="mb-0">{{ remittanceForm.phoneNumber }}</p>
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
                                    </v-row>
                                </v-container>
                            </v-form>
                            <v-card-actions class="btn-box">
                                <v-btn @click="prevStep" size="large">قبلی</v-btn>
                                <v-btn @click="identity" color="primary" size="large" variant="elevated"
                                    :disabled="!isFormValid" v-if="userVerificationDetail.userVerified == false"
                                    :loading="stepTwoLoading">
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
                                                        <h3 class="trade-step-title">ثبت حواله خرید</h3>
                                                                  <div class="d-flex justify-end my-1">
                <v-btn color="#930506" size="small" class="info-btn" @click="guideremitance">راهنما</v-btn>
                </div>
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
                                                    <v-text-field v-model="goldPriceForm.buyPrice"
                                                        label="قیمت طلا(تومان)" variant="outlined"></v-text-field>
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
                                                    <v-text-field v-model="remiitanceBuyForm.totalPrice"
                                                        label="مبلغ (تومان)" variant="outlined"
                                                        @input="buyGoldpriceConvert"
                                                        :disabled="goldPriceForm.buyPrice == '' ? true : false"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="2">
                                                    <div class="d-flex justify-center align-center h-100">
                                                        <v-icon class="me-2" size="small"
                                                            icon="ri-arrow-left-right-line" color="#0b8707"></v-icon>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-text-field v-model="remiitanceBuyForm.goldWeight"
                                                        label="وزن (گرم)" variant="outlined" :rules="validateWeight"
                                                        @input="buyGoldweightConvert"
                                                        :disabled="goldPriceForm.buyPrice == '' ? true : false"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field v-model="remiitanceBuyForm.invoiceId"
                                                        label="شناسه پرداخت" variant="outlined"></v-text-field>
                                                </v-col>
                                                <v-divider class="my-9"></v-divider>
                                                <v-col cols="12" md="3">
                                                    <div class="d-flex justify-start align-center h-100">
                                                        <p class="ma-0">اطلاعات حساب بانکی : </p>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <div class="d-flex justify-start align-center h-100">
                                                        <v-select v-model="remiitanceBuyForm.destCardPan"
                                                            :items="bankAccounts" label="به حساب" variant="outlined"
                                                            :rules="BankAccountRules" item-title="label"
                                                            item-value="item"></v-select>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="3" v-if="remiitanceBuyForm.destCardPan == 'سایر'">
                                                    <v-text-field v-model="otherBuyBankAccount" label="به حساب"
                                                        variant="outlined"></v-text-field>
                                                </v-col>
                                                <v-divider class="my-9"></v-divider>
                                                <v-col cols="12" md="3">
                                                    <div class="d-flex justify-start align-center h-100">
                                                        <p class="ma-0">زمان ثبت معامله : </p>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <persian-date-picker v-model="remiitanceBuyForm.date"
                                                        placeholder="تاریخ"></persian-date-picker>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <persian-date-picker type="time" v-model="remiitanceBuyForm.time"
                                                        placeholder="زمان"></persian-date-picker>
                                                </v-col>
                                                <v-col cols="12" md="3" class="d-none d-md-flex">
                                                </v-col>
                                                <v-col cols="12" class="mt-2">
                                                    <v-textarea label="توضیحات (اختیاری)" variant="outlined"
                                                        v-model="remiitanceBuyForm.description"></v-textarea>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                    <v-card-actions class="btn-box">
                                        <v-btn @click="prevStep" size="large">قبلی</v-btn>
                                        <v-btn @click="nextStep('buy')" color="primary" size="large" variant="elevated"
                                            :disabled="!isFormValid" :loading="stepThreeLoading">
                                            خرید
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
                                                        <h3 class="trade-step-title">ثبت حواله فروش</h3>
                                                                                                                      <div class="d-flex justify-end my-1">
                <v-btn color="#930506" size="small" class="info-btn" @click="guideremitancesell">راهنما</v-btn>
                </div>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" md="3">
                                                    <persian-date-picker v-model="goldPriceForm.date"
                                                        placeholder="تاریخ"></persian-date-picker>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <persian-date-picker type="time" v-model="goldPriceForm.time"
                                                        placeholder="زمان"></persian-date-picker>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-text-field v-model="goldPriceForm.sellPrice"
                                                        label="قیمت طلا(تومان)" variant="outlined"></v-text-field>
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
                                                    <v-text-field v-model="remiitanceSellForm.totalPrice"
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
                                                    <v-text-field v-model="remiitanceSellForm.goldWeight"
                                                        label="وزن (گرم)" variant="outlined" :rules="validateWeight"
                                                        @input="sellGoldweightConvert"
                                                        :disabled="goldPriceForm.sellPrice == '' ? true : false"></v-text-field>
                                                </v-col>
                                                <!-- <v-col cols="12" md="4">
                                                    <v-text-field v-model="remiitanceSellForm.invoiceId"
                                                        label="شناسه پرداخت" variant="outlined"></v-text-field>
                                                </v-col> -->

                                                <!-- <v-divider class="my-9"></v-divider> -->
                                                <!-- <v-col cols="12" md="3">
                                                    <div class="d-flex justify-start align-center h-100">
                                                        <p class="ma-0">اطلاعات حساب بانکی : </p>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <div class="d-flex justify-start align-center h-100">
                                                        <v-select v-model="remiitanceSellForm.destCardPan"
                                                            :items="bankAccounts" label="از حساب" variant="outlined"
                                                            :rules="BankAccountRules" item-title="label"
                                                            item-value="item"></v-select>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="3" v-if="remiitanceSellForm.destCardPan == 'سایر'">
                                                    <v-text-field v-model="otherSellBankAccount" label="از حساب"
                                                        variant="outlined"></v-text-field>
                                                </v-col> -->
                                                <v-divider class="my-9"></v-divider>
                                                <v-col cols="12" md="3">
                                                    <div class="d-flex justify-start align-center h-100">
                                                        <p class="ma-0">زمان ثبت معامله : </p>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <persian-date-picker v-model="remiitanceSellForm.date"
                                                        placeholder="تاریخ"></persian-date-picker>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <persian-date-picker type="time" v-model="remiitanceSellForm.time"
                                                        placeholder="زمان"></persian-date-picker>
                                                </v-col>
                                                <v-col cols="12" md="3" class="d-none d-md-flex"></v-col>
                                                <v-col cols="12">
                                                    <v-textarea label="توضیحات (اختیاری)" variant="outlined"
                                                        v-model="remiitanceSellForm.description"></v-textarea>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                    <v-card-actions class="btn-box">
                                        <v-btn @click="prevStep" size="large">قبلی</v-btn>
                                        <v-btn @click="nextStep('sell')" color="primary" size="large" variant="elevated"
                                            :disabled="!isFormValid" :loading="stepThreeLoading">
                                            فروش
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
                                                <h3 class="trade-step-title">حواله {{ InvoiceForm.type }}</h3>
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
                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p>تاریخ ثبت حواله : </p>
                                                <p v-if="InvoiceForm.type == 'خرید'">{{ remiitanceBuyForm.date }}</p>
                                                <p v-else>{{ remiitanceSellForm.date }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p>زمان ثبت حواله : </p>
                                                <p v-if="InvoiceForm.type == 'خرید'">{{ remiitanceBuyForm.time }}</p>
                                                <p v-else>{{ remiitanceSellForm.time }}</p>
                                            </div>
                                        </v-col>

                                        <v-col cols="6" md="3">
                                            <div class="invoice-box">
                                                <p>از حساب : </p>
                                                <p>{{ remiitanceBuyForm.destCardPan }}
                                                </p>
                                                <!-- <p v-else>{{ remiitanceSellForm.destCardPan }}</p> -->
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
                                    </v-row>
                                </v-container>
                            </v-form>
                            <v-card-actions class="btn-box">
                                <!-- <v-btn @click="prevStep" size="large">قبلی</v-btn> -->
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
    <v-dialog max-width="500" v-model="guidebuy">
      <v-card class="guideSectionStyle">
        <h2 class="guideSection-title">راهنما ثبت حواله خرید</h2>
        <ul>
          <li>
در ابتدا لازم است دو بخش مربوط به تاریخ و زمان را ثبت کنید تا امکان فعال‌سازی کادر استعلام قیمت طلا فراهم شود.

          </li>

          <li>
برای وارد کردن شناسه پرداخت، لازم است تنها از اعداد استفاده کنید.

          </li>

          <li>
مبلغی که کاربر پرداخت می‌کند، باید حتماً به همان حسابی که هنگام ثبت سفارش مشخص شده است واریز شود.
          </li>

          <li>
زمان ثبت معامله باید حتماً در همان لحظه انجام شود.
          </li>
        </ul>

      </v-card>
    </v-dialog>
    <v-dialog max-width="500" v-model="guidsell">
      <v-card class="guideSectionStyle">
        <h2 class="guideSection-title">راهنما ثبت حواله خرید</h2>
        <ul>
          <li>
در ابتدا لازم است دو بخش مربوط به تاریخ و زمان را ثبت کنید تا امکان فعال‌سازی کادر استعلام قیمت طلا فراهم شود.

          </li>

          <li>
            قیمت فروش طلا با یک درصد کارمزد نمایش داده می شود.
          </li>

          <li>
زمان ثبت معامله باید حتماً در همان لحظه انجام شود.
          </li>
        </ul>

      </v-card>
    </v-dialog>



</template>

<script setup>
import { router } from '@/plugins/router';
import GoldPriceService from '@/services/priceApi/price';
import RemiitanceService from '@/services/remittance/remiitance';
import jalaaliJs from 'jalaali-js';
import { ref } from 'vue';

const steps = ref([1, 2, 3, 4]);
const step = ref(1);
const formRefs = ref({});
const tab = ref(null);
const guidebuy = ref(false);
const guidsell= ref(false);
const stepOneLoading = ref(false);
const stepTwoLoading = ref(false);
const stepThreeLoading = ref(false);
const GoldPriceLoading = ref(false);
const successModal = ref(false);
const selectedDate = ref();
const selectedMonth = ref();
const selectedYear = ref();
const alertError = ref(false);
const errorMsg = ref('');
const otherBuyBankAccount = ref('');
const otherSellBankAccount = ref('');
const remittanceForm = ref({
    phoneNumber: '',
});
const userInfo = ref({
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
});

const goldPriceForm = ref({
    date: '',
    time: '',
    buyPrice: '',
    sellPrice: '',
    milliseconds: '',
})

const remiitanceBuyForm = ref({
    userId: '',
    goldPrice: '',
    goldWeight: '',
    description: '',
    totalPrice: '',
    invoiceId: '',
    phoneNumber: '',
    // originCardPan: '',
    destCardPan: '',
    date: '',
    time: '',
});

const remiitanceSellForm = ref({
    userId: '',
    goldPrice: '',
    goldWeight: '',
    description: '',
    totalPrice: '',
    invoiceId: '',
    phoneNumber: '',
    // originCardPan: '',
    // destCardPan: '',
    date: '',
    time: '',
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
    },
    user: {
        firstName: '',
        lastName: '',
        fatherName: '',
        phoneNumber: '',
        nationalCode: '',
    }
});

const userVerificationDetail = ref({
    userExist: '',
    userVerified: '',
});

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

const submitForm = async () => {
    successModal.value = true;
    setInterval(() => {
        successModal.value = false;
        remittanceForm.value.phoneNumber = '';
        step.value = 1;
    }, 3000)
};

const isCompleted = s => s < step.value;

const isFormValid = computed(() => {
    if (!formRefs.value[step.value]) return false;


    if (step.value === 3) {
        if (tab.value === "one") {
            const remiitanceBuyDateValid = !!remiitanceBuyForm.value.date;
            const remiitanceBuyTimeValid = !!remiitanceBuyForm.value.time;
            return (
                remiitanceBuyDateValid &&
                remiitanceBuyTimeValid
            );
        }
        else if (tab.value === "two") {
            const remiitanceSellDateValid = !!remiitanceSellForm.value.date;
            const remiitanceSellTimeValid = !!remiitanceSellForm.value.time;
            return (
                remiitanceSellDateValid &&
                remiitanceSellTimeValid
            );
        }
    }


    return formRefs.value[step.value].isValid;
});

const setFormRef = (el, index) => {
    if (el) {
        formRefs.value[index] = el;
    }
};

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
        return await AuthNumber();
    } else if (step.value === 2) {
        return true;
    } else if (step.value === 3) {
        if (type == 'buy') {
            return await remiitanceBuy();
        } else {
            return await remiitanceSell();
        }
    } else if (step.value === 4) {
        return true;
    }
}

const remiitanceBuy = async () => {
    try {
        stepThreeLoading.value = true;
        remiitanceBuyForm.value.userId = userInfo.value.id;
        remiitanceBuyForm.value.goldPrice = goldPriceForm.value.buyPrice;
        remiitanceBuyForm.value.phoneNumber = userInfo.value.phoneNumber;
        if (remiitanceBuyForm.value.destCardPan == 'سایر') {
            remiitanceBuyForm.value.destCardPan = otherBuyBankAccount.value;
        }
        const response = await RemiitanceService.CreateRemiitanceBuy(remiitanceBuyForm.value);
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
        InvoiceForm.value.wallet.balance = response?.data?.buyer?.wallet?.balance;
        InvoiceForm.value.wallet.goldWeight = response?.data?.buyer?.wallet?.goldWeight;
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
        stepThreeLoading.value = false;
    }
}

const remiitanceSell = async () => {
    try {
        stepThreeLoading.value = true;
        remiitanceSellForm.value.userId = userInfo.value.id;
        remiitanceSellForm.value.goldPrice = goldPriceForm.value.buyPrice;
        remiitanceSellForm.value.phoneNumber = userInfo.value.phoneNumber;
        // if (remiitanceSellForm.value.destCardPan == 'سایر') {
        //     remiitanceSellForm.value.destCardPan = otherSellBankAccount.value;
        // }
        const response = await RemiitanceService.CreateRemiitanceSell(remiitanceSellForm.value);
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
        InvoiceForm.value.wallet.balance = response?.data?.seller?.wallet?.balance;
        InvoiceForm.value.wallet.goldWeight = response?.data?.seller?.wallet?.goldWeight;
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
        stepThreeLoading.value = false;
    }
}

const AuthNumber = async () => {
    try {
        stepOneLoading.value = true;
        const response = await RemiitanceService.AuthNumberRemiitance(remittanceForm.value.phoneNumber);
        userVerificationDetail.value.userExist = response.data.userExist;
        userVerificationDetail.value.userVerified = response.data.userVerified;
        userInfo.value.id = response.data.user.id;
        userInfo.value.firstName = response.data.user.firstName;
        userInfo.value.lastName = response.data.user.lastName;
        userInfo.value.fatherName = response.data.user.fatherName;
        userInfo.value.gender = response.data.user.gender;
        userInfo.value.officeName = response.data.user.officeName;
        userInfo.value.phoneNumber = response.data.user.phoneNumber;
        userInfo.value.nationalCode = response.data.user.nationalCode;
        userInfo.value.isHaveBank = response.data.user.isHaveBank;
        userInfo.value.birthDate = response.data.user.birthDate;
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
        stepOneLoading.value = false;
    }
};

const identity = async () => {
    try {
        stepTwoLoading.value = true;
        userInfo.value.phoneNumber = remittanceForm.value.phoneNumber;
        const response = await RemiitanceService.AuthIdentityUser(userInfo.value);
        userInfo.value.fatherName = response.data.fatherName;
        userInfo.value.gender = response.data.gender;
        userInfo.value.isHaveBank = response.data.isHaveBank;
        userInfo.value.officeName = response.data.officeName;
        userInfo.value.firstName = response.data.firstName;
        userInfo.value.lastName = response.data.lastName;
        userVerificationDetail.value.userVerified = true;
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
        stepTwoLoading.value = false;
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

const getGoldPrice = async () => {
    convertDate()
    try {
        GoldPriceLoading.value = true;
        const response = await GoldPriceService.GoldPriceByTime(goldPriceForm.value.milliseconds);
        goldPriceForm.value.buyPrice = response.buyPrice;
        goldPriceForm.value.sellPrice = response.sellPrice;
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
        GoldPriceLoading.value = false;
    }
}


const prevStep = () => {
    if (step.value > 1) step.value--;
    selectedDate.value = '';
    selectedMonth.value = '';
    selectedYear.value = '';
    userInfo.value.nationalCode = '';
};


const phoneRules = [
    v => !!v || 'شماره همراه الزامی است',
    v => /^09\d{9}$/.test(v) || 'شماره معتبر نیست'
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
    (v) => !!v || 'مقدار ورودی نمی‌تواند خالی باشد',
    // (v) => /^\d+(\.\d{1,3})?$/.test(v) || 'فقط عدد مجاز است و حداکثر 3 رقم اعشار',
];

const BankAccountRules = [
    (v) => !!v || "حساب بانکی را انتخاب کنید!",
];

const validateInvoice = [
    v => !!v || 'شناسه پرداخت الزامی است',
]


const validateNationalCode = () => {
    userInfo.value.nationalCode = userInfo.value.nationalCode.replace(/\D/g, '').slice(0, 10);
    nationalCodeRules.every(rule => rule(userInfo.value.nationalCode) === true);
};


const limitNumber = () => {
    remittanceForm.value.phoneNumber = remittanceForm.value.phoneNumber.replace(/\D/g, '').slice(0, 11);
}

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

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const removeCommas = (str) => {
    return str.replace(/,/g, "");
};


const buyGoldpriceConvert = (e) => {
    const cursorPosition = e.target.selectionStart;
    const originalLength = remiitanceBuyForm.value.totalPrice.length;

    const rawValue = removeCommas(remiitanceBuyForm.value.totalPrice).replace(/[^0-9]/g, "");
    const numericValue = parseInt(rawValue || 0);

    remiitanceBuyForm.value.goldWeight = (
        numericValue / goldPriceForm.value.buyPrice
    ).toFixed(4);

    const formattedValue = formatNumberWithCommas(numericValue);

    remiitanceBuyForm.value.totalPrice = formattedValue;

    nextTick(() => {
        const newLength = formattedValue.length;
        const offset = newLength - originalLength;
        e.target.setSelectionRange(
            cursorPosition + offset,
            cursorPosition + offset
        );
    });
}


const buyGoldweightConvert = () => {
    remiitanceBuyForm.value.goldWeight = remiitanceBuyForm.value.goldWeight.replace(/[^0-9.]/g, "");
    const parts = remiitanceBuyForm.value.goldWeight.split(".");
    if (parts.length > 1) {
        remiitanceBuyForm.value.goldWeight = parts[0] + "." + parts.slice(1).join("");
    }

    if (parts.length > 1 && parts[1].length > 2) {
        remiitanceBuyForm.value.goldWeight = parts[0] + "." + parts[1].slice(0, 3);
    }

    remiitanceBuyForm.value.totalPrice = parseInt(
        remiitanceBuyForm.value.goldWeight * goldPriceForm.value.buyPrice
    );

    const calculatedPrice = parseInt(
        remiitanceBuyForm.value.goldWeight * goldPriceForm.value.buyPrice
    );
    remiitanceBuyForm.value.totalPrice = formatNumberWithCommas(calculatedPrice);
}



const sellGoldpriceConvert = (e) => {
    const cursorPosition = e.target.selectionStart;
    const originalLength = remiitanceSellForm.value.totalPrice.length;

    const rawValue = removeCommas(remiitanceSellForm.value.totalPrice).replace(/[^0-9]/g, "");
    const numericValue = parseInt(rawValue || 0);

    remiitanceSellForm.value.goldWeight = (
        numericValue / goldPriceForm.value.sellPrice
    ).toFixed(4);

    const formattedValue = formatNumberWithCommas(numericValue);

    remiitanceSellForm.value.totalPrice = formattedValue;

    nextTick(() => {
        const newLength = formattedValue.length;
        const offset = newLength - originalLength;
        e.target.setSelectionRange(
            cursorPosition + offset,
            cursorPosition + offset
        );
    });
}

const sellGoldweightConvert = () => {
    remiitanceSellForm.value.goldWeight = remiitanceSellForm.value.goldWeight.replace(/[^0-9.]/g, "");
    const parts = remiitanceSellForm.value.goldWeight.split(".");
    if (parts.length > 1) {
        remiitanceSellForm.value.goldWeight = parts[0] + "." + parts.slice(1).join("");
    }

    if (parts.length > 1 && parts[1].length > 2) {
        remiitanceSellForm.value.goldWeight = parts[0] + "." + parts[1].slice(0, 3);
    }

    remiitanceSellForm.value.totalPrice = parseInt(
        remiitanceSellForm.value.goldWeight * goldPriceForm.value.sellPrice
    );

    const calculatedPrice = parseInt(
        remiitanceSellForm.value.goldWeight * goldPriceForm.value.sellPrice
    );
    remiitanceSellForm.value.totalPrice = formatNumberWithCommas(calculatedPrice);
}

const guideremitance = () => {
  guidebuy.value = true ;
}
const guideremitancesell = () => {
  guidsell.value = true ;
}

</script>

<style scoped>
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

.guideSectionStyle {
  min-height: 14rem;
  padding: 0.9rem;

}

.guideSectionStyle li {
  margin: 1rem;
  font-weight: bold;
}


 .guideSection-title {
  margin: 0.8rem 0.5rem;
  color: #d4af37;
  font-weight: 400;
}

</style>
