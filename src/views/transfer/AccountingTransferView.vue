<template>
  <div>
    <v-row>
      <v-col>
        <v-tabs v-model="tab" align-tabs="center" @update:modelValue="changeTabs">
          <v-tab value="one">نامشخص</v-tab>
          <v-tab value="two">موفق</v-tab>
          <v-tab value="three">ناموفق</v-tab>
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
                  <v-text-field v-model="filter.accounter" label="حسابدار" density="compact"
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

              <v-card title="انتقال های نامشخص">

                <template v-slot:text>
                  <ul class="listGuide">
                    <li>
                      درخواست انتقال طلا که تا مرحله پایانی پیش رفته و از سوی کاربر صرف نطر شده است.
                    </li>
                  </ul>

                  <v-text-field v-model="PendingTransferGoldSearch" label="جستجو"
                    prepend-inner-icon="ri-search-line"></v-text-field>
                </template>
                <v-data-table :headers="PendingTransferGoldHeader" :items="PendingTransferGoldData"
                  :search="PendingTransferGoldSearch" :loading="PendingTransferGoldLoading">
                  <template v-slot:item.status="{ item }">
                    <div>
                      <v-chip :text="item.status == 'pending' ? 'نامشخص' : 'بررسی شده'"
                        :color="item.status == 'pending' ? '#ff0000' : '#66666'" size="small"></v-chip>
                    </div>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                      @click="PendingTransferGoldInfo(item)"></v-icon>
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
                  <v-text-field v-model="filter.accounter" label="حسابدار" density="compact"
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

              <v-card title="انتقال های موفق">

                <template v-slot:text>
                  <ul class="listGuide">
                    <li>
                      درخواست انتقال طلا که تمامی مراحل آن با موفقیت انجام شده است. </li>
                  </ul>
                  <v-text-field v-model="CompleteTransferGoldSearch" label="جستجو"
                    prepend-inner-icon="ri-search-line"></v-text-field>
                </template>
                <v-data-table :headers="CompleteTransferGoldHeader" :items="CompleteTransferGoldData"
                  :search="CompleteTransferGoldSearch" :loading="CompleteTransferGoldLoading">
                  <template v-slot:item.status="{ item }">
                    <div>
                      <v-chip :text="item.status == 'completed' ? 'موفق' : 'در انتظار بررسی'"
                        :color="item.status == 'completed' ? '#00853f' : '#66666'" size="small"></v-chip>
                    </div>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                      @click="CompleteTransferGoldInfo(item)"></v-icon>
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

              <v-card title="انتقال های ناموفق">

                <template v-slot:text>
                  <ul class="listGuide">
                    <li>
                      درخواست انتقال طلا که تا مراحل پایانی پیش رفته، اما به دلایل مختلف به نتیجه نرسیده است.
                    </li>
                  </ul>
                  <v-text-field v-model="failedTransferGoldSearch" label="جستجو"
                    prepend-inner-icon="ri-search-line"></v-text-field>
                </template>
                <v-data-table :headers="failedTransferGoldHeader" :items="failedTransferGoldData"
                  :search="failedTransferGoldSearch" :loading="failedTransferGoldLoading">
                  <template v-slot:item.status="{ item }">
                    <div>
                      <v-chip :text="item.status == 'failed' ? 'رد شده' : 'در انتظار بررسی'"
                        :color="item.status == 'failed' ? '#66666' : '#00853f'" size="small"></v-chip>
                    </div>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                      @click="failedTransferGoldInfo(item)"></v-icon>
                  </template>
                </v-data-table>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-col>
    </v-row>


    <!-- TransferGold Dialog -->
    <v-dialog v-model="TransferGoldDialog" max-width="700" class="dialog">
      <v-card class="dialog-card">
        <div class="k-dialog-title">
          <p>اطلاعات انتقال</p>
        </div>
        <v-row class="my-3 px-3">
          <v-col cols="12" class="mb-3">
            <div class="d-flex justify-start">
              <h3>اطلاعات انتقال دهنده</h3>
            </div>
          </v-col>
          <v-col cols="6" md="4" class="my-1">
            <div class="d-flex align-items-center">
              <p>نام انتقال دهنده: </p>
              <p class="mx-2">{{ TransferGoldDetail.sender.firstName }}</p>
            </div>
          </v-col>
          <v-col cols="6" md="4" class="my-1">
            <div class="d-flex align-items-center">
              <p>نام خانوادگی: </p>
              <p class="mx-2">{{ TransferGoldDetail.sender.lastName }}</p>
            </div>
          </v-col>
          <v-col cols="6" md="4" class="my-1">
            <div class="d-flex align-items-center">
              <p>کد ملی: </p>
              <p class="mx-2">{{ TransferGoldDetail.sender.nationalCode }}</p>
            </div>
          </v-col>
          <v-col cols="6" md="4" class="my-1">
            <div class="d-flex align-items-center">
              <p>شماره موبایل: </p>
              <p class="mx-2">{{ TransferGoldDetail.sender.phoneNumber }}</p>
            </div>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="12" class="mb-3">
            <div class="d-flex justify-start">
              <h3>اطلاعات گیرنده</h3>
            </div>
          </v-col>
          <v-col cols="6" md="4" class="my-1">
            <div class="d-flex align-items-center">
              <p>نام : </p>
              <p class="mx-2">{{ TransferGoldDetail.reciever.firstName }}</p>
            </div>
          </v-col>
          <v-col cols="6" md="4" class="my-1">
            <div class="d-flex align-items-center">
              <p>نام خانوادگی</p>
              <p class="mx-2">{{ TransferGoldDetail.reciever.lastName }}</p>
            </div>
          </v-col>
          <v-col cols="6" md="4" class="my-1">
            <div class="d-flex align-items-center">
              <p>کد ملی: </p>
              <p class="mx-2">{{ TransferGoldDetail.reciever.nationalCode }}</p>
            </div>
          </v-col>
          <v-col cols="6" md="4" class="my-1">
            <div class="d-flex align-items-center">
              <p>شماره تلفن</p>
              <p class="mx-2">{{ TransferGoldDetail.reciever.phoneNumber }}</p>
            </div>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="6" md="4" class="my-1">
            <div class="d-flex align-items-center">
              <p>وزن طلا: </p>
              <p class="mx-2">{{ TransferGoldDetail.goldWeight }}</p>
            </div>
          </v-col>
          <v-col cols="6" md="4" class="my-1">
            <div class="d-flex align-items-center">
              <p>تاریخ انتقال:</p>
              <p class="mx-2">{{ TransferGoldDetail.date }}</p>
            </div>
          </v-col>
          <v-col cols="6" md="4" class="my-1">
            <div class="d-flex align-items-center">
              <p>زمان انتقال:</p>
              <p class="mx-2">{{ TransferGoldDetail.time }}</p>
            </div>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="بستن" @click="TransferGoldDialog = false" size="large" class="m-3"></v-btn>
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
import WalletService from '@/services/wallet/wallet';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const alertError = ref(false);
const PendingTransferGoldLoading = ref(false);
const tab = ref(null);
const PendingTransferGoldHeader = ref([
  {
    title: 'نام فرستنده',
    key: 'sender.firstName',
  },
  {
    title: 'نام خانوادگی فرستنده',
    key: 'sender.lastName',
  },
  {
    title: 'نام گیرنده',
    key: 'reciever.firstName',
  },
  {
    title: 'نام خانوادگی گیرنده',
    key: 'reciever.lastName',
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
const PendingTransferGoldSearch = ref();
const PendingTransferGoldData = ref();
const CompleteTransferGoldSearch = ref();
const CompleteTransferGoldHeader = ref([
  {
    title: 'نام فرستنده',
    key: 'sender.firstName',
  },
  {
    title: 'نام خانوادگی فرستنده',
    key: 'sender.lastName',
  },
  {
    title: 'نام گیرنده',
    key: 'reciever.firstName',
  },
  {
    title: 'نام خانوادگی گیرنده',
    key: 'reciever.lastName',
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
const CompleteTransferGoldData = ref();
const CompleteTransferGoldLoading = ref();
const TransferGoldDetail = ref();
const TransferGoldDialog = ref(false);
const failedTransferGoldSearch = ref();
const failedTransferGoldHeader = ref([
  {
    title: 'نام فرستنده',
    key: 'sender.firstName',
  },
  {
    title: 'نام خانوادگی فرستنده',
    key: 'sender.lastName',
  },
  {
    title: 'نام گیرنده',
    key: 'reciever.firstName',
  },
  {
    title: 'نام خانوادگی گیرنده',
    key: 'reciever.lastName',
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
]
);
const failedTransferGoldData = ref();
const failedTransferGoldLoading = ref();
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


const GetPendingTransferGoldList = async () => {
  try {
    PendingTransferGoldLoading.value = true;
    const response = await WalletService.TransferGoldList('pending');
    PendingTransferGoldData.value = response.data;
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
    PendingTransferGoldLoading.value = false;
  }
};

const GetCompleteTransferGoldList = async () => {
  try {
    CompleteTransferGoldLoading.value = true;
    const response = await WalletService.TransferGoldList('completed');
    CompleteTransferGoldData.value = response.data;
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
    CompleteTransferGoldLoading.value = false;
  }
};

const GetfailedTransferGoldList = async () => {
  try {
    failedTransferGoldLoading.value = true;
    const response = await WalletService.TransferGoldList('failed');
    failedTransferGoldData.value = response.data;
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
    failedTransferGoldLoading.value = false;
  }
};

const PendingTransferGoldInfo = (item) => {
  TransferGoldDialog.value = true;
  TransferGoldDetail.value = item;
}

const CompleteTransferGoldInfo = (item) => {
  TransferGoldDialog.value = true;
  TransferGoldDetail.value = item;
}

const failedTransferGoldInfo = (item) => {
  TransferGoldDialog.value = true;
  TransferGoldDetail.value = item;
}

const SubmitFilter = async (status) => {
  console.log(status);

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
  GetPendingTransferGoldList();
  GetCompleteTransferGoldList();
  GetfailedTransferGoldList();
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

  margin: 0.2rem;
  margin-bottom: 2rem;
  margin-right: 1.5rem;
  margin-left: 1rem
}
</style>
