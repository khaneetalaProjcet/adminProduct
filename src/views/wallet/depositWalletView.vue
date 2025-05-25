<template>
  <div>
    <v-row>
      <v-col>
        <v-tabs v-model="tab" align-tabs="center" @update:modelValue="changeTabs">
          <v-tab value="one">واریزی های نامشخص</v-tab>
          <v-tab value="two">واریزی های موفق</v-tab>
          <v-tab value="three">واریزی های ناموفق</v-tab>
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
                  <v-text-field v-model="filter.admin" label="ادمین" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.accounter
                    " label="حسابدار" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.invoiceId
                    " label="شماره فاکتور" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.shebaNumber
                    " label="شماره شبا" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.cardPan
                    " label="شماره کارت" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.amount
                    " label="مبلغ" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.description
                    " label="توضیحات" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col md="3" class="d-none d-md-flex">
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

              <v-card title="نامشخص">
                <template v-slot:text>

                  <ul class="listGuide">
                    <li>
                      درخواست برداشت مبلغ از کیف پول توسط کاربر ثبت شده و در حال بررسی توسط واحد حسابداری است.
                    </li>
                  </ul>
                  <v-text-field v-model="PendingDepositSearch" label="جستجو"
                    prepend-inner-icon="ri-search-line"></v-text-field>
                </template>
                <v-data-table :headers="PendingDepositHeader" :items="PendingDepositData" :search="PendingDepositSearch"
                  :loading="PendingDepositLoading">
                  <template v-slot:item.amount="{ item }">
                    <p>{{ formatNumber(item.amount) }}</p>
                  </template>
                  <template v-slot:item.status="{ item }">
                    <div>
                      <v-chip :text="item.status == 'pending' ? 'تایید نشده' : 'پرداخت موفق'"
                        :color="item.status == 'pending' ? '#ff0000' : '#66666'" size="small"></v-chip>
                    </div>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-icon class="me-2" size="small" icon="ri-refund-2-line" color="#d4af37"
                      @click="PendingDepositInfo(item)"></v-icon>
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
                  <v-text-field v-model="filter.admin" label="ادمین" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.accounter
                    " label="حسابدار" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.invoiceId
                    " label="شماره فاکتور" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.shebaNumber
                    " label="شماره شبا" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.cardPan
                    " label="شماره کارت" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.amount
                    " label="مبلغ" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.description
                    " label="توضیحات" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col md="3" class="d-none d-md-flex"></v-col>
                <v-col cols="12" md="3">
                  <div class="w-100 d-flex justify-end">
                    <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block @click="SubmitFilter('completed')">به
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

              <v-card title="موفق">

                <template v-slot:text>
                  <ul class="listGuide">
                    <li>
                      درخواست برداشت وجه از کیف پول توسط کاربر ثبت و مبلغ به حساب اعلام‌شده واریز شده است.
                    </li>
                  </ul>
                  <v-text-field v-model="CompleteDepositSearch" label="جستجو"
                    prepend-inner-icon="ri-search-line"></v-text-field>
                </template>
                <v-data-table :headers="CompleteDepositHeader" :items="CompleteDepositData"
                  :search="CompleteDepositSearch" :loading="CompleteDepositLoading">
                  <template v-slot:item.amount="{ item }">
                    <p>{{ formatNumber(item.amount) }}</p>
                  </template>
                  <template v-slot:item.status="{ item }">
                    <div>
                      <v-chip :text="item.status == 'completed' ? 'پرداخت موفق' : 'در انتظار پرداخت'"
                        :color="item.status == 'completed' ? '#00853f' : '#66666'" size="small"></v-chip>
                    </div>
                  </template>
                  <!-- <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-refund-2-line" color="#d4af37"
                                            @click="CompleteDepositInfo(item)"></v-icon>
                                    </template> -->
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
                  <v-text-field v-model="filter.admin" label="ادمین" density="compact"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.accounter
                    " label="حسابدار" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.invoiceId
                    " label="شماره فاکتور" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.shebaNumber
                    " label="شماره شبا" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.cardPan
                    " label="شماره کارت" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.amount
                    " label="مبلغ" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field v-model="filter.description
                    " label="توضیحات" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col md="3" class="d-none d-md-flex">
                </v-col>
                <v-col cols="12" md="3">
                  <div class="w-100 d-flex justify-end">
                    <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block @click="SubmitFilter('failed')">به
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

              <v-card title="ناموفق">
                <template v-slot:text>
                  <ul class="listGuide">
                    <li>
                      درخواست برداشت از کیف پول توسط کاربر لغو شده یا به دلایلی از سوی بخش حسابداری رد شده است.
                    </li>
                  </ul>
                  <v-text-field v-model="FailedDepositSearch" label="جستجو"
                    prepend-inner-icon="ri-search-line"></v-text-field>
                </template>
                <v-data-table :headers="FailedDepositHeader" :items="FailedDepositData" :search="FailedDepositSearch"
                  :loading="CompleteDepositLoading">
                  <template v-slot:item.amount="{ item }">
                    <p>{{ formatNumber(item.amount) }}</p>
                  </template>
                  <template v-slot:item.status="{ item }">
                    <div>
                      <v-chip :text="item.status == 'failed' ? 'پرداخت ناموفق' : 'در انتظار پرداخت'"
                        :color="item.status == 'failed' ? '#66666' : '#00853f'" size="small"></v-chip>
                    </div>
                  </template>
                  <!-- <template v-slot:item.action="{ item }">
                                        <v-icon class="me-2" size="small" icon="ri-refund-2-line" color="#d4af37"
                                            @click="CompleteDepositInfo(item)"></v-icon>
                                    </template> -->
                </v-data-table>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-col>
    </v-row>


    <!-- Deposit Dialog -->
    <v-dialog v-model="DepositDialog" max-width="600" class="dialog">
      <v-card class="dialog-card">
        <div class="k-dialog-title">
          <p>اطلاعات برداشت</p>
        </div>
        <div class="d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 user-dialog-info">
          <div class="d-flex flex-column w-100 px-4">
            <div class="d-flex align-items-center my-2">
              <p>نام: </p>
              <p class="mx-2">{{ DepositDetail.wallet.user.firstName }}</p>
            </div>
            <div class="d-flex align-items-center my-2">
              <p>مبلغ: </p>
              <p class="mx-2">{{ formatNumber(DepositDetail.amount) }} تومان</p>
            </div>
          </div>
          <div class="d-flex flex-column w-100 px-4">
            <div class="d-flex align-items-center my-2">
              <p>نام خانوادگی: </p>
              <p class="mx-2">{{ DepositDetail.wallet.user.lastName }}</p>
            </div>

            <div class="d-flex align-items-center my-2 user-price">
              <p>موجودی کیف پول: </p>
              <p class="mx-2">{{ formatNumber(DepositDetail.wallet.balance) }} تومان</p>
            </div>
          </div>
        </div>
        <div class="form-box">
          <v-form ref="form" @submit.prevent="submitDeposit">
            <v-btn type="submit" size="large" class="my-2" :loading="DepositSubmitLoading" block>بررسی مجدد
              پرداخت</v-btn>
          </v-form>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="بستن" @click="DepositDialog = false" size="large" class="m-3"></v-btn>
        </v-card-actions>
      </v-card>
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
import { router } from '@/plugins/router';
import WalletService from '@/services/wallet/wallet';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const successMsg = ref('');
const alertError = ref(false);
const alertSuccess = ref(false);
const PendingDepositLoading = ref(false);
const DepositSubmitLoading = ref(false);
const tab = ref(null);
const PendingDepositHeader = ref([
  {
    title: 'نام',
    key: 'wallet.user.firstName',
  },
  {
    title: 'نام خانوادگی',
    key: 'wallet.user.lastName',
  },
  {
    title: 'شماره همراه',
    key: 'wallet.user.phoneNumber',
  },
  {
    title: 'مبلغ (تومان)',
    key: 'amount',
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
const PendingDepositSearch = ref();
const PendingDepositData = ref();
const CompleteDepositSearch = ref();
const CompleteDepositHeader = ref([
  {
    title: 'نام',
    key: 'wallet.user.firstName',
  },
  {
    title: 'نام خانوادگی',
    key: 'wallet.user.lastName',
  },
  {
    title: 'شماره همراه',
    key: 'wallet.user.phoneNumber',
  },
  {
    title: 'مبلغ (تومان)',
    key: 'amount',
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
    title: 'شناسه واریز',
    key: 'invoiceId'
  },
  // {
  //     title: 'فعالیت',
  //     key: 'action'
  // }
]);
const FailedDepositHeader = ref([
  {
    title: 'نام',
    key: 'wallet.user.firstName',
  },
  {
    title: 'نام خانوادگی',
    key: 'wallet.user.lastName',
  },
  {
    title: 'شماره همراه',
    key: 'wallet.user.phoneNumber',
  },
  {
    title: 'مبلغ (تومان)',
    key: 'amount',
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
    title: 'شناسه واریز',
    key: 'invoiceId'
  },
  // {
  //     title: 'فعالیت',
  //     key: 'action'
  // }
])

const filter = ref({
  firstName: '',
  lastName: '',
  nationalCode: '',
  phoneNumber: '',
  type: 'deposite',
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
  cardPan: '',
  shebaNumber: '',
  withdrawalId: '',
  amount: '',
  description: '',
});


const CompleteDepositData = ref();
const CompleteDepositLoading = ref();
const FailedDepositLoading = ref();
const FailedDepositData = ref();
const FailedDepositSearch = ref();
const DepositDetail = ref();
const DepositDialog = ref(false);
const DepositSubmitDetail = ref({
  authority: '',
  id: '',
})

const GetPendingDepositList = async () => {
  try {
    PendingDepositLoading.value = true;
    const response = await WalletService.PendingDeposit();
    PendingDepositData.value = response.data;
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
    PendingDepositLoading.value = false;
  }
};

const GetCompleteDepositList = async () => {
  try {
    CompleteDepositLoading.value = true;
    const response = await WalletService.CompleteDeposit();
    CompleteDepositData.value = response.data;
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
    CompleteDepositLoading.value = false;
  }
};

const GetFailedDepositList = async () => {
  try {
    FailedDepositLoading.value = true;
    const response = await WalletService.FailedDeposit();
    FailedDepositData.value = response.data;
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
    FailedDepositLoading.value = false;
  }
};

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PendingDepositInfo = (item) => {
  DepositDialog.value = true;
  DepositDetail.value = item;
  DepositSubmitDetail.value.id = item.id;
  DepositSubmitDetail.value.authority = item.authority;
}

const submitDeposit = async () => {
  try {
    DepositSubmitLoading.value = true;
    const response = await WalletService.SubmitDeposit(DepositSubmitDetail.value);
    successMsg.value = response.msg;
    alertSuccess.value = true;
    setTimeout(() => {
      alertSuccess.value = false;
    }, 5000)
    GetPendingDepositList();
    GetCompleteDepositList();
    GetFailedDepositList();
    DepositDialog.value = false;
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
    DepositSubmitLoading.value = false;
  }
}


const SubmitFilter = async (status) => {
  try {
    if (status == 'pending') {
      PendingDepositLoading.value = true;
    } else if (status == 'completed') {
      CompleteDepositLoading.value = true;
    } else if (status == 'failed') {
      FailedDepositLoading.value = true;
    }
    filter.value.status = status;
    const response = await WalletService.SubmitFilterWallet(filter.value);
    if (status == 'pending') {
      PendingDepositData.value = response.data;
    } else if (status == 'completed') {
      CompleteDepositData.value = response.data;
    } else if (status == 'failed') {
      FailedDepositData.value = response.data;
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
    PendingDepositLoading.value = false;
    CompleteDepositLoading.value = false;
    FailedDepositLoading.value = false;
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
  filter.value.toDate = '';
  filter.value.toTime = '';
  filter.value.goldPrice = '';
  filter.value.goldWeight = '';
  filter.value.invoiceId = '';
  filter.value.nationalCode = '';
  filter.value.phoneNumber = '';
  filter.value.fromTime = '';
  filter.value.fromDate = '';
}


onMounted(() => {
  GetPendingDepositList();
  GetCompleteDepositList();
  GetFailedDepositList();
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
  margin: 0.2rem;
  margin-bottom: 2rem;

}
</style>
