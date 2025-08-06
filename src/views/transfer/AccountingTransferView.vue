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
                    <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block :loading="PendingTransferGoldLoading"
                      @click="SubmitFilter('pending')">به
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

              <v-card title="انتقال های نامشخص">

                <template v-slot:text>
                  <ul class="listGuide">
                    <li>
                      درخواست انتقال طلا که تا مرحله پایانی پیش رفته و از سوی کاربر صرف نطر شده است.
                    </li>
                  </ul>

                  <v-text-field v-model="searchPendingTransfer" label="جستجو"
                    prepend-inner-icon="ri-search-line"></v-text-field>
                </template>
                <v-data-table :headers="PendingTransferGoldHeader" :items="PendingTransferGoldData"
                  :loading="PendingTransferGoldLoading" :page="currentPagePendingTransfer"
                  :items-per-page="itemsPerPagePendingTransfer" :server-items-length="totalItemsPendingTransfer"
                  :items-per-page-options="itemsPerPageOptionsPendingTransfer"
                  @update:options="handleOptionsChangePendingTransfer">
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
                  <template v-slot:bottom>
                    <div class="text-center pt-2">
                      <v-pagination v-model="currentPagePendingTransfer" :length="totalPagesPendingTransfer"
                        :total-visible="4"></v-pagination>
                    </div>
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
                    <v-btn prepend-icon="ri-loop-left-line" variant="tonal" :loading="CompleteTransferGoldLoading" block
                      @click="SubmitFilter('complete')">به
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

              <v-card title="انتقال های موفق">

                <template v-slot:text>
                  <ul class="listGuide">
                    <li>
                      درخواست انتقال طلا که تمامی مراحل آن با موفقیت انجام شده است. </li>
                  </ul>
                  <v-text-field v-model="searchCompleteTransfer" label="جستجو"
                    prepend-inner-icon="ri-search-line"></v-text-field>
                </template>
                <v-data-table :headers="CompleteTransferGoldHeader" :items="CompleteTransferGoldData"
                  :loading="CompleteTransferGoldLoading" :page="currentPageCompleteTransfer"
                  :items-per-page="itemsPerPageCompleteTransfer" :server-items-length="totalItemsCompleteTransfer"
                  :items-per-page-options="itemsPerPageOptionsCompleteTransfer"
                  @update:options="handleOptionsChangeCompleteTransfer">
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
                  <template v-slot:bottom>
                    <div class="text-center pt-2">
                      <v-pagination v-model="currentPageCompleteTransfer" :length="totalPagesCompleteTransfer"
                        :total-visible="4"></v-pagination>
                    </div>
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
                    <v-btn prepend-icon="ri-loop-left-line" variant="tonal" :loading="failedTransferGoldLoading" block
                      @click="SubmitFilter('failed')">به
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

              <v-card title="انتقال های ناموفق">

                <template v-slot:text>
                  <ul class="listGuide">
                    <li>
                      درخواست انتقال طلا که تا مراحل پایانی پیش رفته، اما به دلایل مختلف به نتیجه نرسیده است.
                    </li>
                  </ul>
                  <v-text-field v-model="searchFailedTransfer" label="جستجو"
                    prepend-inner-icon="ri-search-line"></v-text-field>
                </template>
                <v-data-table :headers="failedTransferGoldHeader" :items="failedTransferGoldData"
                  :search="failedTransferGoldSearch" :loading="failedTransferGoldLoading"
                  :page="currentPageFailedTransfer" :items-per-page="itemsPerPageFailedTransfer"
                  :server-items-length="totalItemsFailedTransfer"
                  :items-per-page-options="itemsPerPageOptionsFailedTransfer"
                  @update:options="handleOptionsChangeFailedTransfer">
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
                  <template v-slot:bottom>
                    <div class="text-center pt-2">
                      <v-pagination v-model="currentPageFailedTransfer" :length="totalPagesFailedTransfer"
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
import { debounce } from 'lodash';

const errorMsg = ref('');
const alertError = ref(false);
const PendingTransferGoldLoading = ref(false);
const tab = ref(null);
const exportLoading = ref(false);
const exportLink = ref('');
const pendingExportExcel = ref(true);
const completeExportExcel = ref(true);
const failedExportExcel = ref(true);
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

const itemsPerPagePendingTransfer = ref(50);
const currentPagePendingTransfer = ref(1)
const itemsPerPageOptionsPendingTransfer = ref([10, 25]);
const totalItemsPendingTransfer = ref(0);
const totalPagesPendingTransfer = ref(1);
const searchPendingTransfer = ref('');

const itemsPerPageCompleteTransfer = ref(50);
const currentPageCompleteTransfer = ref(1)
const itemsPerPageOptionsCompleteTransfer = ref([10, 25]);
const totalItemsCompleteTransfer = ref(0);
const totalPagesCompleteTransfer = ref(1);
const searchCompleteTransfer = ref('');

const itemsPerPageFailedTransfer = ref(50);
const currentPageFailedTransfer = ref(1)
const itemsPerPageOptionsFailedTransfer = ref([10, 25]);
const totalItemsFailedTransfer = ref(0);
const totalPagesFailedTransfer = ref(1);
const searchFailedTransfer = ref('');


const GetPendingTransferGoldList = async () => {
  try {
    PendingTransferGoldLoading.value = true;
    const response = await WalletService.TransferGoldList({
      page: currentPagePendingTransfer.value,
      perPage: itemsPerPagePendingTransfer.value,
      search: searchPendingTransfer.value,
    }, 'pending');
    totalItemsPendingTransfer.value = response.data.totalItems;
    PendingTransferGoldData.value = response.data.transports;
    totalPagesPendingTransfer.value = Math.ceil(totalItemsPendingTransfer.value / itemsPerPagePendingTransfer.value)
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

const handleOptionsChangePendingTransfer = (options) => {
  currentPagePendingTransfer.value = options.page;
  itemsPerPagePendingTransfer.value = options.itemsPerPage;
  GetPendingTransferGoldList();
};

watch(
  searchPendingTransfer,
  debounce(() => {
    GetPendingTransferGoldList()
  }, 1000)
)

watch([currentPagePendingTransfer, itemsPerPagePendingTransfer], () => {
  GetPendingTransferGoldList();
});

const GetCompleteTransferGoldList = async () => {
  try {
    CompleteTransferGoldLoading.value = true;
    const response = await WalletService.TransferGoldList({
      page: currentPageCompleteTransfer.value,
      perPage: itemsPerPageCompleteTransfer.value,
      search: searchCompleteTransfer.value,
    }, 'completed');
    totalItemsCompleteTransfer.value = response.data.totalItems;
    CompleteTransferGoldData.value = response.data.transports;
    totalPagesCompleteTransfer.value = Math.ceil(totalItemsCompleteTransfer.value / itemsPerPageCompleteTransfer.value)
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

const handleOptionsChangeFailedTransfer = (options) => {
  currentPageCompleteTransfer.value = options.page;
  itemsPerPageCompleteTransfer.value = options.itemsPerPage;
  GetCompleteTransferGoldList();
};

watch(
  searchCompleteTransfer,
  debounce(() => {
    GetCompleteTransferGoldList()
  }, 1000)
)

watch([currentPageCompleteTransfer, itemsPerPageCompleteTransfer], () => {
  GetCompleteTransferGoldList();
});

const GetfailedTransferGoldList = async () => {
  try {
    failedTransferGoldLoading.value = true;
    const response = await WalletService.TransferGoldList({
      page: currentPageFailedTransfer.value,
      perPage: itemsPerPageFailedTransfer.value,
      search: searchFailedTransfer.value,
    }, 'failed');
    totalItemsFailedTransfer.value = response.data.totalItems;
    failedTransferGoldData.value = response.data.transports;
    totalPagesFailedTransfer.value = Math.ceil(totalItemsFailedTransfer.value / itemsPerPageFailedTransfer.value)
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

const handleOptionsChangeCompleteTransfer = (options) => {
  currentPageFailedTransfer.value = options.page;
  itemsPerPageFailedTransfer.value = options.itemsPerPage;
  GetfailedTransferGoldList();
};

watch(
  searchFailedTransfer,
  debounce(() => {
    GetfailedTransferGoldList()
  }, 1000)
)

watch([currentPageFailedTransfer, itemsPerPageFailedTransfer], () => {
  GetfailedTransferGoldList();
});

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
  try {
    if (status == 'pending') {
      PendingTransferGoldLoading.value = true;
    } else if (status == 'completed') {
      CompleteTransferGoldLoading.value = true;
    } else if (status == 'failed') {
      failedTransferGoldLoading.value = true;
    }
    filter.value.status = status;
    const response = await InPersonService.SubmitFilterInvoice(filter.value);
    exportLink.value = response.link;
    if (status == 'pending') {
      PendingTransferGoldData.value = response.data;
      pendingExportExcel.value = false;
    } else if (status == 'completed') {
      CompleteTransferGoldData.value = response.data;
      completeExportExcel.value = false;
    } else if (status == 'failed') {
      failedTransferGoldData.value = response.data;
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
    PendingTransferGoldLoading.value = false;
    CompleteTransferGoldLoading.value = false;
    failedTransferGoldLoading.value = false;
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

const exportExcel = async () => {
  exportLoading.value = true;
  window.location.href = exportLink.value;
  setTimeout(() => {
    exportLoading.value = false;
  }, 5000);
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
