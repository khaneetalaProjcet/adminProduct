<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center" @update:modelValue="changeTabs">
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
                                        <v-btn prepend-icon="ri-file-excel-line" block :disabled="pendingExportExcel"
                                            @click="exportExcel" :loading="exportLoading">خروجی اکسل</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-card title="نامشخص">
                                <ul class="listGuide ">
                                    <li>
                                        خریدهایی که کاربر تا مرحله ورود به درگاه بانکی پیش رفته است، اما به دلیل انصراف
                                        یا بروز اختلال در درگاه بانکی تکمیل نشده‌اند.
                                    </li>
                                    <v-text-field v-model="searchPending" label="جستجو"
                                        prepend-inner-icon="ri-search-line" class="my-3"></v-text-field>
                                </ul>
                                <v-data-table :headers="PendingGoldBoxBuyHeader" :items="PendingGoldBoxBuyData"
                                    :loading="PendingGoldBoxBuyLoading" :page="currentNewPagePending"
                                    :items-per-page="itemsNewPerPagePending" :server-items-length="totalNewItemsPending"
                                    :items-per-page-options="itemsPerPageOptionsPending"
                                    @update:options="handleOptionsChangeNewUserPending">
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
                                    <template v-slot:bottom>
                                        <div class="text-center pt-2">
                                            <v-pagination v-model="currentNewPagePending" :length="totalPagesPending"
                                                :total-visible="4"></v-pagination>
                                        </div>
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
                                        <v-btn prepend-icon="ri-file-excel-line" block :disabled="completeExportExcel"
                                            @click="exportExcel" :loading="exportLoading">خروجی اکسل</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-card title="موفق">
                                <ul class="listGuide">
                                    <li>
                                        خریدهایی که تمامی مراحل به‌درستی انجام شده و مبلغ نیز از طریق درگاه بانکی پرداخت
                                        گردیده است.
                                    </li>
                                    <v-text-field v-model="searchComplete" label="جستجو"
                                        prepend-inner-icon="ri-search-line" class="my-3"></v-text-field>
                                </ul>
                                <v-data-table :headers="CompleteGoldBoxBuyHeader" :items="CompleteGoldBoxBuyData"
                                    :loading="CompleteGoldBoxBuyLoading" :page="currentNewPageComplete"
                                    :items-per-page="itemsNewPerPageComplete"
                                    :server-items-length="totalNewItemsComplete"
                                    :items-per-page-options="itemsPerPageOptionsComplete"
                                    @update:options="handleOptionsChangeNewUserComplete">
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
                                    <template v-slot:bottom>
                                        <div class="text-center pt-2">
                                            <v-pagination v-model="currentNewPageComplete" :length="totalPagesComplete"
                                                :total-visible="4"></v-pagination>
                                        </div>
                                    </template>
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
                                        <v-btn prepend-icon="ri-file-excel-line" block :disabled="failedExportExcel"
                                            @click="exportExcel" :loading="exportLoading">خروجی اکسل</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-card title="ناموفق">
                                <ul class="listGuide">
                                    <li>
                                        خریدهایی که تمام مراحل آن به طور صحیح انجام شده است اما به دلیل انصراف کاربر یا
                                        سایر عوامل نهایی نشده
                                        است.
                                    </li>
                                </ul>
                                <v-text-field v-model="searchFailed" label="جستجو" prepend-inner-icon="ri-search-line"
                                    class="ma-3"></v-text-field>
                                <v-data-table :headers="FailedGoldBoxBuyHeader" :items="FailedGoldBoxBuyData"
                                    :loading="FailedGoldBoxBuyLoading" :page="currentNewPageFailed"
                                    :items-per-page="itemsNewPerPageFailed" :server-items-length="totalNewItemsFailed"
                                    :items-per-page-options="itemsPerPageOptionsFailed"
                                    @update:options="handleOptionsChangeNewUserFailed">
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
                                    <template v-slot:bottom>
                                        <div class="text-center pt-2">
                                            <v-pagination v-model="currentNewPageFailed" :length="totalPagesFailed"
                                                :total-visible="4"></v-pagination>
                                        </div>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="four">
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
                                <v-col md="6" class="d-none d-md-flex">
                                </v-col>
                                <v-col cols="12" md="3">
                                    <div class="w-100 d-flex justify-end">
                                        <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block
                                            @click="SubmitFilter('init')">به روز
                                            رسانی</v-btn>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <div class="w-100 d-flex justify-end">
                                        <v-btn prepend-icon="ri-file-excel-line" block :disabled="initExportExcel"
                                            @click="exportExcel" :loading="exportLoading">خروجی اکسل</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-card title="پرداخت نشده">
                                <ul class="listGuide">
                                    <li>
                                        خریدهایی که تا مرحله صدور فاکتور پیش رفته‌اند اما به دلیل لغو یا عدم پرداخت به
                                        سرانجام نرسیده‌اند.
                                    </li>
                                </ul>

                                <v-text-field v-model="searchInit" label="جستجو" prepend-inner-icon="ri-search-line"
                                    class="ma-3"></v-text-field>

                                <v-data-table :headers="InitGoldBoxBuyHeader" :items="InitGoldBoxBuyData"
                                    :loading="InitGoldBoxBuyLoading" :page="currentNewPageInit"
                                    :items-per-page="itemsNewPerPageInit" :server-items-length="totalNewItemsInit"
                                    :items-per-page-options="itemsPerPageOptionsInit"
                                    @update:options="handleOptionsChangeNewUserInit">
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
                                            @click="PayInfo(item)"></v-icon>
                                    </template>
                                    <template v-slot:bottom>
                                        <div class="text-center pt-2">
                                            <v-pagination v-model="currentNewPageInit" :length="totalPagesInit"
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
                <div class="d-flex my-6">
                    <p>{{ payDetail }}</p>
                </div>
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
import GoldBoxService from '@/services/goldBox/goldbox';
import InPersonService from '@/services/inperson/inperson';
import { debounce } from 'lodash';
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
const PendingGoldBoxBuyData = ref();
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
const payDetail = ref('');

const filter = ref({
    firstName: '',
    lastName: '',
    nationalCode: '',
    phoneNumber: '',
    tradeType: 0,
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
const initExportExcel = ref(true);
const exportLink = ref('');
const exportLoading = ref(false);


const itemsNewPerPagePending = ref(50);
const currentNewPagePending = ref(1)
const itemsPerPageOptionsPending = ref([10, 25]);
const totalNewItemsPending = ref(0);
const totalPagesPending = ref(1);
const searchPending = ref('');

const itemsNewPerPageComplete = ref(50);
const currentNewPageComplete = ref(1)
const itemsPerPageOptionsComplete = ref([10, 25]);
const totalNewItemsComplete = ref(0);
const totalPagesComplete = ref(1);
const searchComplete = ref('');

const itemsNewPerPageFailed = ref(50);
const currentNewPageFailed = ref(1)
const itemsPerPageOptionsFailed = ref([10, 25]);
const totalNewItemsFailed = ref(0);
const totalPagesFailed = ref(1);
const searchFailed = ref('');

const itemsNewPerPageInit = ref(50);
const currentNewPageInit = ref(1)
const itemsPerPageOptionsInit = ref([10, 25]);
const totalNewItemsInit = ref(0);
const totalPagesInit = ref(1);
const searchInit = ref('');

const GetPendingGoldBoxBuyList = async () => {
    try {
        PendingGoldBoxBuyLoading.value = true;
        const response = await GoldBoxService.BuyGoldBox({
            page: currentNewPagePending.value,
            perPage: itemsNewPerPagePending.value,
            search: searchPending.value,
        }, 2);
        totalNewItemsPending.value = response.data.totalItems;
        PendingGoldBoxBuyData.value = response.data.transActions;
        totalPagesPending.value = Math.ceil(totalNewItemsPending.value / itemsNewPerPagePending.value)
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

const handleOptionsChangeNewUserPending = (options) => {
    currentNewPagePending.value = options.page;
    itemsNewPerPagePending.value = options.itemsPerPage;
    GetPendingGoldBoxBuyList();
};

watch(
    searchPending,
    debounce(() => {
        GetPendingGoldBoxBuyList()
    }, 1000)
)

watch([currentNewPagePending, itemsNewPerPagePending], () => {
  GetPendingGoldBoxBuyList();
});

const GetCompleteGoldBoxBuyList = async () => {
    try {
        CompleteGoldBoxBuyLoading.value = true;
        const response = await GoldBoxService.BuyGoldBox({
            page: currentNewPageComplete.value,
            perPage: itemsNewPerPageComplete.value,
            search: searchComplete.value,
        }, 1);
        totalNewItemsComplete.value = response.data.totalItems;
        CompleteGoldBoxBuyData.value = response.data.transActions;
        totalPagesComplete.value = Math.ceil(totalNewItemsComplete.value / itemsNewPerPageComplete.value)
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

const handleOptionsChangeNewUserComplete = (options) => {
    currentNewPageComplete.value = options.page;
    itemsNewPerPageComplete.value = options.itemsPerPage;
    GetCompleteGoldBoxBuyList();
};

watch(
    searchComplete,
    debounce(() => {
        GetCompleteGoldBoxBuyList()
    }, 1000)
);

watch([currentNewPageComplete, itemsNewPerPageComplete], () => {
  GetCompleteGoldBoxBuyList();
});

const GetFailedGoldBoxBuyList = async () => {
    try {
        FailedGoldBoxBuyLoading.value = true;
        const response = await GoldBoxService.BuyGoldBox({
            page: currentNewPageFailed.value,
            perPage: itemsNewPerPageFailed.value,
            search: searchFailed.value,
        }, 0);
        totalNewItemsFailed.value = response.data.totalItems;
        FailedGoldBoxBuyData.value = response.data.transActions;
        totalPagesFailed.value = Math.ceil(totalNewItemsFailed.value / itemsNewPerPageFailed.value)
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

const handleOptionsChangeNewUserFailed = (options) => {
    currentNewPageFailed.value = options.page;
    itemsNewPerPageFailed.value = options.itemsPerPage;
    GetFailedGoldBoxBuyList();
};

watch([currentNewPageFailed, itemsNewPerPageFailed], () => {
  GetFailedGoldBoxBuyList();
});

watch(
    searchFailed,
    debounce(() => {
        GetFailedGoldBoxBuyList()
    }, 1000)
)

const GetInitGoldBoxBuyList = async () => {
    try {
        InitGoldBoxBuyLoading.value = true;
        const response = await GoldBoxService.BuyGoldBox({
            page: currentNewPageInit.value,
            perPage: itemsNewPerPageInit.value,
            search: searchInit.value,
        }, 3);
        totalNewItemsInit.value = response.data.totalItems;
        InitGoldBoxBuyData.value = response.data.transActions;
        totalPagesInit.value = Math.ceil(totalNewItemsInit.value / itemsNewPerPageInit.value)
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

const handleOptionsChangeNewUserInit = (options) => {
    currentNewPageInit.value = options.page;
    itemsNewPerPageInit.value = options.itemsPerPage;
    GetInitGoldBoxBuyList();
};

watch(
    searchPending,
    debounce(() => {
        GetPendingGoldBoxBuyList()
    }, 1000)
);

watch([currentNewPageInit, itemsNewPerPageInit], () => {
  GetInitGoldBoxBuyList();
});

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

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
    filter.value.destCardPan = '';
}

const PendingGoldBoxBuyInfo = (item) => {
    GoldBoxBuyDialog.value = true;
    GoldBoxBuyDetail.value = item;
    GoldBoxBuySubmitDetail.value.id = item.id;
    GoldBoxBuySubmitDetail.value.authority = item.authority;
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
        const response = await GoldBoxService.payInfo(item.authority);
        DetailPayDialog.value = true;
        payDetail.value = response.data
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

const SubmitFilter = async (status) => {
    try {
        if (status == 'pending') {
            PendingGoldBoxBuyLoading.value = true;
        } else if (status == 'completed') {
            CompleteGoldBoxBuyLoading.value = true;
        } else if (status == 'failed') {
            FailedGoldBoxBuyLoading.value = true;
        } else if (status == 'init') {
            InitGoldBoxBuyLoading.value = true;
        }
        filter.value.status = status;
        const response = await InPersonService.SubmitFilterInvoice(filter.value);
        exportLink.value = response.link;
        if (status == 'pending') {
            PendingGoldBoxBuyData.value = response.data.transActions;
            pendingExportExcel.value = false;
        } else if (status == 'completed') {
            CompleteGoldBoxBuyData.value = response.data.transActions;
            completeExportExcel.value = false;
        } else if (status == 'failed') {
            FailedGoldBoxBuyData.value = response.data.transActions;
            failedExportExcel.value = false;
        } else if (status == 'init') {
            InitGoldBoxBuyData.value = response.data.transActions;
            initExportExcel.value = false;
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
        PendingGoldBoxBuyLoading.value = false;
        CompleteGoldBoxBuyLoading.value = false;
        FailedGoldBoxBuyLoading.value = false;
        InitGoldBoxBuyLoading.value = false;
    }
}

const exportExcel = async () => {
    exportLoading.value = true;
    window.location.href = exportLink.value;
    setTimeout(() => {
        exportLoading.value = false;
    }, 5000);
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
