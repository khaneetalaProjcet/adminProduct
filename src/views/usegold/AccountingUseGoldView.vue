<template>
  <div>
    <v-row>
      <v-col>
        <v-tabs v-model="tab" align-tabs="center" @update:modelValue="changeTabs">
          <v-tab value="one">نامشخص</v-tab>
          <v-tab value="two">موفق</v-tab>
          <v-tab value="three">ناموفق</v-tab>
          <v-tab value="four">اصلاحیه</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12">
        <v-card-text>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one">
              <v-row class="filter my-3">
                <v-col cols="6" md="3">
                  <persian-date-picker v-model="filter.startDate" placeholder="از تاریخ"></persian-date-picker>
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
                  <v-text-field v-model="filter.phoneNumber" label="شماره موبایل" density="compact" variant="outlined"
                    :rules="phoneRules" @input="limitNumber"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.nationalCode" label="کد ملی" density="compact" variant="outlined"
                    :rules="nationalCodeRules"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.goldPrice" label="قیمت طلا" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.goldWeight" label="وزن طلا" density="compact" variant="outlined"
                    :rules="validateWeight"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <!-- <v-select v-model="filter.branch" :items="branches" label="شعبه ها" variant="outlined"
                    item-title="name" item-value="id" @update:modelValue="defineSellers"></v-select> -->
                  <v-text-field v-model="filter.branch" label="شعبه" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <!-- <v-select v-model="filter.seller" :items="seller" label="کد فروشنده" variant="outlined"
                    item-title="code" item-value="id" v-if="filter.branch"></v-select> -->
                  <v-text-field v-model="filter.seller" label="فروشنده" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" class="d-none d-md-flex"></v-col>
                <v-col cols="12" md="3">
                  <div class="w-100 d-flex justify-end">
                    <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block @click="SubmitFilter('pending')">به
                      روز
                      رسانی</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="3">
                  <div class="w-100 d-flex justify-end">
                    <v-btn prepend-icon="ri-file-excel-line" :disabled="pendingExportExcel" @click="exportExcel"
                      :loading="exportLoading" block>خروجی اکسل</v-btn>
                  </div>
                </v-col>
              </v-row>

              <v-card title="تراکنش های استفاده نامشخص">

                <template v-slot:text>
                  <ul class="listGuide">
                    <li>
                      استفاده از صندوق طلا که ثبت نهایی نشده و در حالت تعلیق قرار دارد.
                    </li>
                  </ul>
                  <v-text-field v-model="PendingUseGoldSearch" label="جستجو"
                    prepend-inner-icon="ri-search-line"></v-text-field>
                </template>
                <v-data-table :headers="PendingUseGoldHeader" :items="PendingUseGoldData" :search="PendingUseGoldSearch"
                  :loading="PendingUseGoldLoading">
                  <template v-slot:item.status="{ item }">
                    <div>
                      <v-chip :text="item.status == 'pending' ? 'نامشخص' : 'بررسی شده'"
                        :color="item.status == 'pending' ? '#ff0000' : '#66666'" size="small"></v-chip>
                    </div>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                      @click="PendingUseGoldInfo(item)"></v-icon>
                  </template>
                </v-data-table>
              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item value="two">
              <v-row class="filter my-3">
                <v-col cols="6" md="3">
                  <persian-date-picker v-model="filter.startDate" placeholder="از تاریخ"></persian-date-picker>
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
                  <v-text-field v-model="filter.phoneNumber" label="شماره موبایل" density="compact" variant="outlined"
                    :rules="phoneRules" @input="limitNumber"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.nationalCode" label="کد ملی" density="compact" variant="outlined"
                    :rules="nationalCodeRules"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.goldPrice" label="قیمت طلا" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.goldWeight" label="وزن طلا" density="compact" variant="outlined"
                    :rules="validateWeight"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <!-- <v-select v-model="filter.branch" :items="branches" label="شعبه ها" variant="outlined"
                    item-title="name" item-value="id" @update:modelValue="defineSellers"></v-select> -->
                  <v-text-field v-model="filter.branch" label="شعبه" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <!-- <v-select v-model="filter.seller" :items="seller" label="کد فروشنده" variant="outlined"
                    item-title="code" item-value="id" v-if="filter.branch"></v-select> -->
                  <v-text-field v-model="filter.seller" label="فروشنده" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" class="d-none d-md-flex"></v-col>
                <v-col cols="12" md="3">
                  <div class="w-100 d-flex justify-end">
                    <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block @click="SubmitFilter('completed')">به
                      روز
                      رسانی</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="3">
                  <div class="w-100 d-flex justify-end">
                    <v-btn prepend-icon="ri-file-excel-line" :disabled="completeExportExcel" @click="exportExcel"
                      :loading="exportLoading" block>خروجی اکسل</v-btn>
                  </div>
                </v-col>
              </v-row>

              <v-card title="تراکنش های استفاده تایید شده">
                <template v-slot:text>
                  <ul class="listGuide">
                    <li>
                      استفاده از صندوق طلا که موفق بوده و مراحل آن به درستی سپری شده است. </li>
                  </ul>
                  <v-text-field v-model="CompleteUseGoldSearch" label="جستجو"
                    prepend-inner-icon="ri-search-line"></v-text-field>
                </template>
                <v-data-table :headers="CompleteUseGoldHeader" :items="CompleteUseGoldData"
                  :search="CompleteUseGoldSearch" :loading="CompleteUseGoldLoading">
                  <template v-slot:item.status="{ item }">
                    <div>
                      <v-chip :text="item.status == 'completed' ? 'موفق' : 'در انتظار بررسی'"
                        :color="item.status == 'completed' ? '#00853f' : '#66666'" size="small"></v-chip>
                    </div>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                      @click="CompleteUseGoldInfo(item)"></v-icon>
                  </template>
                </v-data-table>
              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item value="three">
              <v-row class="filter my-3">
                <v-col cols="6" md="3">
                  <persian-date-picker v-model="filter.startDate" placeholder="از تاریخ"></persian-date-picker>
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
                  <v-text-field v-model="filter.phoneNumber" label="شماره موبایل" density="compact" variant="outlined"
                    :rules="phoneRules" @input="limitNumber"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.nationalCode" label="کد ملی" density="compact" variant="outlined"
                    :rules="nationalCodeRules"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.goldPrice" label="قیمت طلا" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.goldWeight" label="وزن طلا" density="compact" variant="outlined"
                    :rules="validateWeight"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <!-- <v-select v-model="filter.branch" :items="branches" label="شعبه ها" variant="outlined"
                    item-title="name" item-value="id" @update:modelValue="defineSellers"></v-select> -->
                  <v-text-field v-model="filter.branch" label="شعبه" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <!-- <v-select v-model="filter.seller" :items="seller" label="کد فروشنده" variant="outlined"
                    item-title="code" item-value="id" v-if="filter.branch"></v-select> -->
                  <v-text-field v-model="filter.seller" label="فروشنده" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" class="d-none d-md-flex"></v-col>
                <v-col cols="12" md="3">
                  <div class="w-100 d-flex justify-end">
                    <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block @click="SubmitFilter('failed')">به
                      روز
                      رسانی</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="3">
                  <div class="w-100 d-flex justify-end">
                    <v-btn prepend-icon="ri-file-excel-line" :disabled="failedExportExcel" @click="exportExcel"
                      :loading="exportLoading" block>خروجی اکسل</v-btn>
                  </div>
                </v-col>
              </v-row>

              <v-card title="تراکنش های استفاده رد شده">

                <template v-slot:text>
                  <ul class="listGuide">
                    <li>
                      استفاده از صندوق طلا که به علت منصرف شدن کاربر و یا دلایل دیگر لغو شده است. </li>
                  </ul>
                  <v-text-field v-model="failedUseGoldSearch" label="جستجو"
                    prepend-inner-icon="ri-search-line"></v-text-field>
                </template>
                <v-data-table :headers="failedUseGoldHeader" :items="failedUseGoldData" :search="failedUseGoldSearch"
                  :loading="failedUseGoldLoading">
                  <template v-slot:item.status="{ item }">
                    <div>
                      <v-chip :text="item.status == 'failed' ? 'رد شده' : 'در انتظار بررسی'"
                        :color="item.status == 'failed' ? '#66666' : '#00853f'" size="small"></v-chip>
                    </div>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                      @click="failedUseGoldInfo(item)"></v-icon>
                  </template>
                </v-data-table>
              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item value="four">
              <v-card title="تراکنش های استفاده اصلاح شده">

                <template v-slot:text>
                  <ul class="listGuide">
                    <li>تراکنش های اصلاحی، تراکنش هایی هستند که به اشتباه ثبت شده اند و ادمین سند اصلاح برای آنها ثبت
                      میکند</li>
                  </ul>
                </template>
                <v-data-table :headers="ReverseUseGoldHeader" :items="ReverseUseGoldData"
                  :loading="ReverseUseGoldLoading">

                  <!-- <template v-slot:item.action="{ item }">
                    <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"></v-icon>
                  </template> -->

                  <template v-slot:item.status="{ item }">
                    <div>
                      <v-chip text="اصلاحی" color="#ff0000" size="small"></v-chip>
                    </div>
                  </template>
                </v-data-table>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-col>
    </v-row>


    <!-- UseGold Dialog -->
    <v-dialog v-model="UseGoldDialog" max-width="700" class="dialog">
      <v-card class="dialog-card">
        <div class="k-dialog-title">
          <p>اطلاعات استفاده از صندوق طلا</p>
        </div>
        <v-row class="my-3 px-3">
          <v-col cols="12" md="6" class="my-1">
            <div class="d-flex align-items-center">
              <p>نام: </p>
              <p class="mx-2">{{ UseGoldDetail.user.firstName }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-1">
            <div class="d-flex align-items-center">
              <p>نام خانوادگی: </p>
              <p class="mx-2">{{ UseGoldDetail.user.lastName }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-1">
            <div class="d-flex align-items-center">
              <p>کد ملی: </p>
              <p class="mx-2">{{ UseGoldDetail.user.nationalCode }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-1">
            <div class="d-flex align-items-center">
              <p>شماره موبایل: </p>
              <p class="mx-2">{{ UseGoldDetail.user.phoneNumber }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-1">
            <div class="d-flex align-items-center">
              <p>وزن طلا: </p>
              <p class="mx-2">{{ UseGoldDetail.goldWeight }} گرم</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-1">
            <div class="d-flex align-items-center">
              <p>قیمت لحظه ای طلا:</p>
              <p class="mx-2">{{ formatNumber(UseGoldDetail.goldPrice) }} تومان</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-1">
            <div class="d-flex align-items-center">
              <p>تاریخ استفاده:</p>
              <p class="mx-2">{{ UseGoldDetail.date }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-1">
            <div class="d-flex align-items-center">
              <p>زمان استفاده:</p>
              <p class="mx-2">{{ UseGoldDetail.time }}</p>
            </div>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="12" md="6" class="my-1">
            <div class="d-flex align-items-center">
              <p>شعبه:</p>
              <p class="mx-2">{{ UseGoldDetail.seller.branch.name }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-1">
            <div class="d-flex align-items-center">
              <p>فروشنده:</p>
              <p class="mx-2">{{ UseGoldDetail.seller.firstName }} {{ UseGoldDetail.seller.lastName }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-1">
            <div class="d-flex align-items-center">
              <p>کد فروشنده:</p>
              <p class="mx-2">{{ UseGoldDetail.seller.code }}</p>
            </div>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="بستن" @click="UseGoldDialog = false" size="large" class="m-3"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
      {{ errorMsg }}
    </v-alert>
  </div>
</template>

<script setup>
import { router } from '@/plugins/router';
import InPersonService from '@/services/inperson/inperson';
import WalletService from '@/services/wallet/wallet';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const alertError = ref(false);
const PendingUseGoldLoading = ref(false);
const tab = ref(null);
const PendingUseGoldHeader = ref([
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
    title: 'میزان طلا (گرم)',
    key: 'goldWeight',
  },
  {
    title: 'قیمت لحظه ای (تومان)',
    key: 'goldPrice',
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
const PendingUseGoldSearch = ref();
const PendingUseGoldData = ref();
const CompleteUseGoldSearch = ref();
const completeExportExcel = ref(true);
const failedExportExcel = ref(true);
const pendingExportExcel = ref(true);
const exportLink = ref('');
const exportLoading = ref(false);
const branches = ref([]);
const CompleteUseGoldHeader = ref([
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
    title: 'میزان طلا (گرم)',
    key: 'goldWeight',
  },
  {
    title: 'قیمت لحظه ای (تومان)',
    key: 'goldPrice',
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
const seller = ref([]);
const sellerLoading = ref(false);
const CompleteUseGoldData = ref();
const CompleteUseGoldLoading = ref();
const ReverseUseGoldHeader = ref([
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
    title: 'میزان طلا (گرم)',
    key: 'goldWeight',
  },
  {
    title: 'قیمت لحظه ای (تومان)',
    key: 'goldPrice',
  },
  {
    title: 'اصلاح کننده',
    key: 'reverser',
  },
  {
    title: 'صادر کننده',
    key: 'adminId',
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
  // {
  //   title: 'فعالیت',
  //   key: 'action'
  // }
]);
const ReverseUseGoldData = ref();
const ReverseUseGoldLoading = ref();
const UseGoldDetail = ref();
const UseGoldDialog = ref(false);
const failedUseGoldSearch = ref();
const failedUseGoldHeader = ref([
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
    title: 'میزان طلا (گرم)',
    key: 'goldWeight',
  },
  {
    title: 'قیمت لحظه ای (تومان)',
    key: 'goldPrice',
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
]
);
const filter = ref({
  firstName: '',
  lastName: '',
  nationalCode: '',
  phoneNumber: '',
  tradeType: 1,
  type: 'buy',
  goldPrice: '',
  goldWeight: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  branch: '',
  seller: '',
  invoiceId: '',
  status: '',
});
const failedUseGoldData = ref();
const failedUseGoldLoading = ref();
const branchLoading = ref();

const GetPendingUseGoldList = async () => {
  try {
    PendingUseGoldLoading.value = true;
    const response = await WalletService.UseGoldList('pending');
    PendingUseGoldData.value = response.data;
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
    PendingUseGoldLoading.value = false;
  }
};

const GetCompleteUseGoldList = async () => {
  try {
    CompleteUseGoldLoading.value = true;
    const response = await WalletService.UseGoldList('completed');
    CompleteUseGoldData.value = response.data;
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
    CompleteUseGoldLoading.value = false;
  }
};

const GetfailedUseGoldList = async () => {
  try {
    failedUseGoldLoading.value = true;
    const response = await WalletService.UseGoldList('failed');
    failedUseGoldData.value = response.data;
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
    failedUseGoldLoading.value = false;
  }
};

const GetReverseUseGoldList = async () => {
  try {
    ReverseUseGoldLoading.value = true;
    const response = await WalletService.UseGoldList('reversed');
    ReverseUseGoldData.value = response.data;
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
    ReverseUseGoldLoading.value = false;
  }
};

const PendingUseGoldInfo = (item) => {
  UseGoldDialog.value = true;
  UseGoldDetail.value = item;
}

const CompleteUseGoldInfo = (item) => {
  UseGoldDialog.value = true;
  UseGoldDetail.value = item;
}

const failedUseGoldInfo = (item) => {
  UseGoldDialog.value = true;
  UseGoldDetail.value = item;
}

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const SubmitFilter = async (status) => {
  try {
    if (status == 'pending') {
      PendingUseGoldLoading.value = true;
    } else if (status == 'completed') {
      CompleteUseGoldLoading.value = true;
    } else if (status == 'failed') {
      failedUseGoldLoading.value = true;
    }
    filter.value.status = status;
    const response = await InPersonService.SubmitFilterUsegoldInvoice(filter.value);
    exportLink.value = response.link;
    if (status == 'pending') {
      pendingExportExcel.value = false;
      PendingUseGoldData.value = response.data;
    } else if (status == 'completed') {
      completeExportExcel.value = false;
      CompleteUseGoldData.value = response.data;
    } else if (status == 'failed') {
      failedExportExcel.value = false;
      failedUseGoldData.value = response.data;
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
    PendingUseGoldLoading.value = false;
    CompleteUseGoldLoading.value = false;
    failedUseGoldLoading.value = false;
  }
}

const defineSellers = async (id) => {
  if (filter.value.seller != '') {
    filter.value.seller = '';
  }
  try {
    sellerLoading.value = true;
    const response = await InPersonService.GetSellers(id);
    seller.value = response.data;
    return response;
  } catch (error) {
    if (error.response.status == 401) {
      localStorage.clear();
      router.replace("/Login");
    }
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 5000);
  } finally {
    sellerLoading.value = false;
  }
};

const GetBranches = async () => {
  try {
    branchLoading.value = true;
    const response = await InPersonService.GetBranches();
    branches.value = response.data;
    return response;
  } catch (error) {
    if (error.response.status == 401) {
      localStorage.clear();
      router.replace("/Login");
    }
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 5000);
  } finally {
    branchLoading.value = false;
  }
};

const exportExcel = async () => {
  exportLoading.value = true;
  window.location.href = exportLink.value;
  setTimeout(() => {
    exportLoading.value = false;
  }, 5000);
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
  filter.value.startDate = '';
  filter.value.endTime = '';
  filter.value.goldPrice = '';
  filter.value.goldWeight = '';
  filter.value.invoiceId = '';
  filter.value.nationalCode = '';
  filter.value.phoneNumber = '';
  filter.value.startTime = '';
  filter.value.endDate = '';
  filter.value.branch = '';
  filter.value.seller = '';
}


onMounted(() => {
  GetPendingUseGoldList();
  GetCompleteUseGoldList();
  GetfailedUseGoldList();
  GetReverseUseGoldList();
  GetBranches();
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
  padding: 0.2em;
  margin: 0.2rem;
  margin-bottom: 2rem;
  margin-left: 1rem
}
</style>
