<template>
  <div>
    <v-row>
      <v-col>
        <v-tabs v-model="tab" align-tabs="center" @update:modelValue="changeTabs">
          <v-tab value="one">کاربران احراز شده</v-tab>
          <v-tab value="two">کاربران درانتظار احراز</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12">
        <v-card-text>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one">
              <v-row class="filter my-3">
                <v-col cols="6" md="3">
                  <persian-date-picker v-model="searchFilter.startDate" placeholder="از تاریخ"></persian-date-picker>
                </v-col>
                <v-col cols="6" md="3">
                  <persian-date-picker type="time" v-model="searchFilter.startTime" placeholder="از زمان"
                    format="HH:mm:ss"></persian-date-picker>
                </v-col>
                <v-col cols="6" md="3">
                  <persian-date-picker v-model="searchFilter.endDate" placeholder="تا تاریخ"></persian-date-picker>
                </v-col>
                <v-col cols="6" md="3">
                  <persian-date-picker type="time" v-model="searchFilter.endTime" placeholder="تا زمان"
                    format="HH:mm:ss"></persian-date-picker>
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
                  <v-text-field v-model="searchFilter.phoneNumber" label="شماره موبایل" density="compact"
                    variant="outlined" :rules="phoneRules" @input="limitNumber"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="searchFilter.nationalCode" label="کد ملی" density="compact" variant="outlined"
                    :rules="nationalCodeRules"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="searchFilter.goldPrice" label="قیمت طلا" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="searchFilter.goldWeight" label="وزن طلا" density="compact" variant="outlined"
                    :rules="validateWeight"></v-text-field>
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
                    <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block @click="SubmitFilter('pending')">به
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
              <v-card title="کاربران احراز هویت شده">

                <template v-slot:text>
                  <ul class="listGuide">
                    <li>
                      کاربرانی که فرآیند ثبت نام خود را به اتمام رسانده‌اند و هویتشان با اطلاعات ارائه‌شده مطابقت دارد.
                    </li>

                  </ul>
                  <!-- <v-text-field v-model="search" label="جستجو" prepend-inner-icon="ri-search-line"
                    @input="onSearchInput"></v-text-field> -->
                  <v-text-field v-model="search" label="جستجو" prepend-inner-icon="ri-search-line"></v-text-field>
                </template>

                <v-data-table :page="currentNewPage" :items-per-page="itemsNewPerPage" :headers="userHeader"
                  :items="userData" :search="search" :loading="userLoading" :server-items-length="totalNewItems"
                  :items-per-page-options="itemsPerPageOptions" @update:options="handleOptionsChangeNewUser">
                  <template v-slot:item.wallet.balance="{ item }">
                    <p>{{ formatNumber(item?.wallet?.balance) }}</p>
                  </template>
                  <template v-slot:item.isHaveBank="{ item }">
                    <v-icon size="small" icon="ri-close-line" color="#c9190c" v-if="item.isHaveBank == false"></v-icon>
                    <v-icon size="small" icon="ri-check-line" color="#0b8707"
                      v-else-if="item.isHaveBank == true"></v-icon>
                  </template>
                  <template v-slot:item.oldUserCheck="{ item }">
                    <v-icon size="small" icon="ri-close-line" color="#c9190c"
                      v-if="item.oldUserCheck == false"></v-icon>
                    <v-icon size="small" icon="ri-check-line" color="#0b8707"
                      v-else-if="item.oldUserCheck == true"></v-icon>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                      @click="userInfo(item)"></v-icon>
                    <v-icon class="me-2" size="small" icon="ri-exchange-funds-line" color="#c9190c"
                      :loading="transferLoading" @click="userTransfer(item)"></v-icon>
                  </template>
                  <template v-slot:bottom>
                    <div class="text-center pt-2">
                      <v-pagination v-model="currentNewPage" :length="totalNewPages" :total-visible="4"></v-pagination>
                    </div>
                  </template>
                </v-data-table>
              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item value="two">

              <v-row class="filter my-3">
                <v-col cols="6" md="3">
                  <persian-date-picker v-model="searchFilter.startDate" placeholder="از تاریخ"></persian-date-picker>
                </v-col>
                <v-col cols="6" md="3">
                  <persian-date-picker type="time" v-model="searchFilter.startTime" placeholder="از زمان"
                    format="HH:mm:ss"></persian-date-picker>
                </v-col>
                <v-col cols="6" md="3">
                  <persian-date-picker v-model="searchFilter.endDate" placeholder="تا تاریخ"></persian-date-picker>
                </v-col>
                <v-col cols="6" md="3">
                  <persian-date-picker type="time" v-model="searchFilter.endTime" placeholder="تا زمان"
                    format="HH:mm:ss"></persian-date-picker>
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
                  <v-text-field v-model="searchFilter.phoneNumber" label="شماره موبایل" density="compact"
                    variant="outlined" :rules="phoneRules" @input="limitNumber"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="searchFilter.nationalCode" label="کد ملی" density="compact" variant="outlined"
                    :rules="nationalCodeRules"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="searchFilter.goldPrice" label="قیمت طلا" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="searchFilter.goldWeight" label="وزن طلا" density="compact" variant="outlined"
                    :rules="validateWeight"></v-text-field>
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
                    <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block @click="SubmitFilter('pending')">به
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
              <v-card title="کاربران در انتظار احراز">
                <template v-slot:text>

                  <ul class="listGuide">
                    <li>
                      کاربرانی که ثبت‌ نام خود را تکمیل نکرده و فرآیند احراز هویت را به‌طور صحیح انجام نداده‌اند.
                    </li>

                  </ul>


                  <v-text-field v-model="OldSearch" label="جستجو" prepend-inner-icon="ri-search-line"></v-text-field>
                </template>
                <v-data-table :page="currentPage" :items-per-page="itemsPerPage" :headers="OldUserHeader"
                  :items="OldUser" :loading="oldUserLoading" :server-items-length="totalItems"
                  :items-per-page-options="itemsPerPageOptions" @update:options="handleOptionsChange">
                  <template v-slot:item?.wallet?.balance="{ item }">
                    <p>{{ formatNumber(item.wallet.balance) }}</p>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                      @click="userInfo(item)"></v-icon>
                    <v-icon class="me-2" size="small" icon="ri-user-follow-line" color="#FF3131"
                      @click="VerifyUser(item)"></v-icon>
                  </template>
                  <template v-slot:bottom>
                    <div class="text-center pt-2">
                      <v-pagination v-model="currentPage" :length="totalPages" :total-visible="4"></v-pagination>
                    </div>
                  </template>
                </v-data-table>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-col>
    </v-row>

    <!-- user info modal -->
    <v-dialog v-model="UserInfoDialog" max-width="600" class="dialog">
      <v-card class="dialog-card">
        <div class="k-dialog-title">
          <p>اطلاعات کاربران</p>
        </div>
        <div class="d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 user-dialog-info">
          <div class="d-flex flex-column w-100 px-4">
            <div class="d-flex align-items-center my-2">
              <p>نام: </p>
              <p class="mx-2">{{ UserInfo.firstName }}</p>
            </div>
            <div class="d-flex align-items-center my-2">
              <p>نام خانوادگی: </p>
              <p class="mx-2">{{ UserInfo.lastName }}</p>
            </div>
            <div class="d-flex align-items-center my-2">
              <p>نام پدر: </p>
              <p class="mx-2">{{ UserInfo.fatherName }}</p>
            </div>
            <div class="d-flex align-items-center my-2 user-price">
              <p>موجودی کیف پول: </p>
              <p class="mx-2">{{ formatNumber(UserInfo.wallet.balance) }} تومان</p>
            </div>
            <!-- <div class="d-flex align-items-center my-2">
              <p>شماره کارت: </p>
              <p class="mx-2">{{ UserInfo.bankAccounts[0]?.cardNumber }}</p>
            </div> -->
            <div class="d-flex align-items-center my-2">
              <p>تاریخ احراز هویت: </p>
              <p class="mx-2" v-if="UserInfo.date != null">{{ UserInfo.date }}</p>
              <p v-else>-</p>
            </div>
            <div class="d-flex align-items-center my-2">
              <p>ساعت احراز هویت: </p>
              <p class="mx-2" v-if="UserInfo.time != null">{{ UserInfo.time }}</p>
              <p class="mx-2" v-else>-</p>
            </div>
          </div>
          <div class="d-flex flex-column w-100 px-4">
            <div class="d-flex align-items-center my-2">
              <p>تاریخ تولد: </p>
              <p class="mx-2">{{ UserInfo.birthDate }}</p>
            </div>
            <div class="d-flex align-items-center my-2">
              <p>کد ملی: </p>
              <p class="mx-2">{{ UserInfo.nationalCode }}</p>
            </div>
            <div class="d-flex align-items-center my-2">
              <p>شماره همراه: </p>
              <p class="mx-2">{{ UserInfo.phoneNumber }}</p>
            </div>
            <div class="d-flex align-items-center my-2 user-price">
              <p>موجودی طلا: </p>
              <p class="mx-2">{{ UserInfo.wallet.goldWeight }} گرم</p>
            </div>
            <!-- <div class="d-flex align-items-center my-2">
              <p>شماره شبا: </p>
              <p class="mx-2">{{ UserInfo.bankAccounts[0]?.shebaNumber }}</p>
            </div> -->
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="بستن" @click="UserInfoDialog = false" size="large" class="m-3"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- verify user -->
    <v-dialog v-model="VerifyDialog" max-width="600" class="dialog" persistent>
      <v-form ref="form" @submit.prevent="sumbitVerify(item)">
        <v-card class="dialog-card">
          <div class="k-dialog-title">
            <p>احراز هویت</p>
          </div>
          <v-row class="my-5">
            <v-col cols="12" md="6" class="my-3">
              <v-text-field v-model="VerifyInfo.phoneNumber" label="شماره همراه" :rules="phoneRules"
                @input="limitInput"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="my-3">
              <v-text-field v-model="VerifyInfo.nationalCode" label="کد ملی" :rules="nationalCodeRules"
                @input="validateNationalCode"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="my-3">
              <v-select v-model="selectedDate" label="روز تولد" :items="persianDates" variant="outlined"
                item-title="name" item-value="value" @update:model-value="onDateSelected" class="first-select"
                :rules="[v => !!v || 'روز الزامی است']"></v-select>
            </v-col>
            <v-col cols="12" md="4" class="my-3">
              <v-select v-model="selectedMonth" label="ماه تولد" :items="persianMonths" variant="outlined"
                class="second-select" item-title="name" item-value="value" @update:model-value="onMonthSelected"
                :rules="[v => !!v || 'ماه الزامی است']"></v-select>
            </v-col>
            <v-col cols="12" md="4" class="my-3">
              <v-select v-model="selectedYear" label="سال تولد" :items="persianYears" variant="outlined"
                class="third-select" item-title="name" item-value="value" @update:model-value="onYearSelected"
                :rules="[v => !!v || 'سال الزامی است']"></v-select>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="بستن" @click="VerifyDialog = false" size="large" class="m-3"></v-btn>
            <v-btn type="submit" size="large" class="m-3" variant="tonal" text="ثبت" :loading="verifyLoading"></v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
      {{ errorMsg }}
    </v-alert>
    <v-alert v-if="alertSuccess" color="success" border="bottom" elevation="2" class="k-alert alert-animatiton"
      closable>
      {{ successMsg }}
    </v-alert>
  </div>
</template>

<script setup>
import UserService from '@/services/user/user';
import { onMounted, ref, watch } from 'vue';
import { debounce } from 'lodash'
import { router } from '@/plugins/router';

const userLoading = ref(false);
const oldUserLoading = ref(false);
const search = ref('');
const OldSearch = ref("")
const tab = ref(null);
const errorMsg = ref('');
const alertError = ref(false);
const userData = ref();
const OldUser = ref();
const UserInfoDialog = ref(false);
const VerifyDialog = ref(false);
const verifyLoading = ref(false);
const transferLoading = ref(false);
const itemsPerPage = ref(50);
const itemsNewPerPage = ref(50);
const currentPage = ref(1);
const currentNewPage = ref(1)
const itemsPerPageOptions = ref([10, 25]);
const totalItems = ref(0);
const totalNewItems = ref(0);
const totalPages = ref(1);
const totalNewPages = ref(1);
const successMsg = ref("");
const alertSuccess = ref(false);
const userHeader = ref([
  {
    title: 'نام',
    key: 'firstName',
  },
  {
    title: 'نام خانوادگی',
    key: 'lastName',
  },
  {
    title: 'شماره همراه',
    key: 'phoneNumber',
  },
  {
    title: 'کد ملی',
    key: 'nationalCode',
  },
  {
    title: 'دارایی طلا (گرم)',
    key: 'wallet.goldWeight',
  },
  {
    title: 'دارایی تومانی',
    key: 'wallet.balance',
  },
  {
    title: 'شهر',
    key: 'officeName',
  },
  {
    title: 'کارت بانکی',
    key: 'isHaveBank'
  },
  {
    title: 'انتقال یافته',
    key: 'oldUserCheck',
  },
  {
    title: 'فعالیت',
    key: 'action'
  }
]);
const OldUserHeader = ref([
  {
    title: 'نام',
    key: 'firstName',
  },
  {
    title: 'نام خانوادگی',
    key: 'lastName',
  },
  {
    title: 'شماره همراه',
    key: 'phoneNumber',
  },
  {
    title: 'کد ملی',
    key: 'nationalCode',
  },
  {
    title: 'دارایی طلا (گرم)',
    key: 'wallet.goldWeight',
  },
  {
    title: 'دارایی تومانی',
    key: 'wallet.balance',
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


const VerifyInfo = ref({
  phoneNumber: '',
  nationalCode: '',
  birthDate: '',
  id: '',
})

const UserInfo = ref();


const selectedDate = ref();
const selectedMonth = ref();
const selectedYear = ref();

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


const Getuser = async () => {
  try {
    userLoading.value = true;
    const response = await UserService.Alluser({
      page: currentNewPage.value,
      perPage: itemsNewPerPage.value,
      search: search.value,
    });
    totalNewItems.value = response.data.totalItem;
    userData.value = response.data.users;
    totalNewPages.value = Math.ceil(totalNewItems.value / itemsNewPerPage.value)
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
    userLoading.value = false;
  }
};


const GetOldUser = async () => {
  try {
    oldUserLoading.value = true;
    const response = await UserService.oldUser({
      page: currentPage.value,
      perPage: itemsPerPage.value,
      search: OldSearch.value,
    });
    totalItems.value = response.data.totalItem;
    OldUser.value = response.data.users;
    totalPages.value = Math.ceil(totalItems.value / itemsPerPage.value)
  } catch (error) {
    if (error.response.status == 401) {
      localStorage.clear();
      router.replace("/login");
    }
    errorMsg.value = error.response.error || 'خطایی رخ داده است!';
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 10000)
  } finally {
    oldUserLoading.value = false;
  }
};

const handleOptionsChange = (options) => {
  currentPage.value = options.page;
  itemsPerPage.value = options.itemsPerPage;
  GetOldUser();
};

const handleOptionsChangeNewUser = (options) => {
  currentNewPage.value = options.page;
  itemsNewPerPage.value = options.itemsPerPage;
  Getuser();
}

const onSearchInput = () => {
  currentPage.value = 1
  handleOptionsChange({
    page: currentPage.value,
    itemsPerPage: itemsPerPage.value
  })
};


watch([currentPage, itemsPerPage], () => {
  GetOldUser();
});


watch([currentNewPage, itemsNewPerPage], () => {
  Getuser();
});

watch(
  OldSearch,
  debounce(() => {
    GetOldUser()
  }, 1000)
)

watch(
  search,
  debounce(() => {
    Getuser()
  }, 1000)
)


const userTransfer = async (item) => {
  try {
    transferLoading.value = true;
    const response = await UserService.transferData(item.id);
    successMsg.value = response.msg;
    alertSuccess.value = true;
    setTimeout(() => {
      alertSuccess.value = false;
    }, 10000)
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
    transferLoading.value = false;
  }
};

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const userInfo = (item) => {
  UserInfoDialog.value = true;
  UserInfo.value = item;
}

const VerifyUser = (item) => {
  VerifyDialog.value = true;
  VerifyInfo.value.id = item.id;
  VerifyInfo.value.phoneNumber = item.phoneNumber;
  VerifyInfo.value.nationalCode = item.nationalCode;
}

const sumbitVerify = async () => {
  try {
    verifyLoading.value = true;
    const response = await UserService.VerifyUser(VerifyInfo.value);
    VerifyDialog.value = false;
    GetOldUser();
    Getuser();
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
    verifyLoading.value = false;
  }
}

const limitInput = () => {
  VerifyInfo.value.phoneNumber = VerifyInfo.value.phoneNumber
    .replace(/[٠-٩۰-۹]/g, (d) =>
      String.fromCharCode(d.charCodeAt(0) - (d.charCodeAt(0) >= 0x06F0 ? 1728 : 1584))
    )
    .replace(/\D/g, '')
    .slice(0, 11);
}

const validateNationalCode = () => {
  VerifyInfo.value.nationalCode = VerifyInfo.value.nationalCode.replace(/\D/g, '').slice(0, 10);
  nationalCodeRules.every(rule => rule(VerifyInfo.value.nationalCode) === true);
};

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
    VerifyInfo.value.birthDate = `${selectedYear.value}${month}${day}`;
  }
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
  Getuser();
  GetOldUser();
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
