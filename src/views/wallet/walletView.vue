<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card-text>
          <v-row class="filter my-3">
            <v-col cols="6" md="3">
              <persian-date-picker v-model="filter.fromDate" placeholder="از تاریخ"></persian-date-picker>
            </v-col>
            <v-col cols="6" md="3">
              <persian-date-picker type="time" v-model="filter.fromTime" placeholder="از زمان"
                format="HH:mm:ss"></persian-date-picker>
            </v-col>
            <v-col cols="6" md="3">
              <persian-date-picker v-model="filter.toDate" placeholder="تا تاریخ"></persian-date-picker>
            </v-col>
            <v-col cols="6" md="3">
              <persian-date-picker type="time" v-model="filter.toTime" placeholder="تا زمان"
                format="HH:mm:ss"></persian-date-picker>
            </v-col>
            <v-col cols="6" md="3">
              <v-text-field v-model="filter.firstName" label="نام" density="compact" variant="outlined"></v-text-field>
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
                <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block @click="SubmitFilter('pending')">به روز
                  رسانی</v-btn>
              </div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="w-100 d-flex justify-end">
                <v-btn prepend-icon="ri-file-excel-line" block>خروجی اکسل</v-btn>
              </div>
            </v-col>
          </v-row>

          <v-card title="کیف پول ها">

            <template v-slot:text>
              <ul class="listGuide">
                <li>
                  تمام فعالیت‌های مالی کیف پول کاربر در این صفحه نمایش داده می‌شود.
                </li>
              </ul>

              <v-text-field v-model="WalletSearch" label="جستجو" prepend-inner-icon="ri-search-line"></v-text-field>
            </template>
            <v-data-table :headers="walletHeader" :items="walletData" :search="search" :loading="walletLoading">
              <template v-slot:item.balance="{ item }">
                <p>{{ formatNumber(item.balance) }}</p>
              </template>
              <template v-slot:item.action="{ item }">
                <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                  @click="walletInfo(item)"></v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-card-text>
      </v-col>
    </v-row>


    <template>
      <div class="text-center pa-4">
        <v-dialog v-model="walletSheet" transition="dialog-bottom-transition" fullscreen>
          <v-card>
            <v-toolbar class="px-7">
              <v-toolbar-title> کیف پول {{ walletDetail.user.firstName }} {{ walletDetail.user.lastName
              }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon="ri-close-large-line" color="#000" @click="walletSheet = false"></v-btn>
            </v-toolbar>
            <v-container>
              <v-row class="wallet-info-box">
                <v-col cols="6" md="3" class="my-3">
                  <div class="content">
                    <p class="title">نام: </p>
                    <p class="desc">{{ walletDetail.user.firstName }}</p>
                  </div>
                </v-col>
                <v-col cols="6" md="3" class="my-3">
                  <div class="content">
                    <p class="title">نام خانوادگی: </p>
                    <p class="desc">{{ walletDetail.user.lastName }}</p>
                  </div>
                </v-col>
                <v-col cols="6" md="3" class="my-3">
                  <div class="content">
                    <p class="title">شماره موبایل: </p>
                    <p class="desc">{{ walletDetail.user.phoneNumber }}</p>
                  </div>
                </v-col>
                <v-col cols="6" md="3" class="my-3">
                  <div class="content">
                    <p class="title">کدملی: </p>
                    <p class="desc">{{ walletDetail.user.nationalCode }}</p>
                  </div>
                </v-col>
                <v-col cols="6" md="3" class="my-3">
                  <div class="content">
                    <p class="title">دارایی طلایی: </p>
                    <p class="desc">{{ walletDetail.goldWeight }} گرم</p>
                  </div>
                </v-col>
                <v-col cols="6" md="3" class="my-3">
                  <div class="content">
                    <p class="title">دارایی تومانی: </p>
                    <p class="desc">{{ formatNumber(walletDetail.balance) }} تومان</p>
                  </div>
                </v-col>
                <v-col cols="6" md="3" class="my-3">
                  <div class="content">
                    <p class="title">تعداد تراکنش ها: </p>
                    <p class="desc">{{ walletDetail.transactions.length }}</p>
                  </div>
                </v-col>
                <v-col cols="6" md="3" class="my-3">
                  <div class="content">
                    <p class="title red">در انتظار برداشت: </p>
                    <p class="desc">{{ formatNumber(walletDetail.blocked) }} تومان</p>
                  </div>
                </v-col>
                <v-divider class="my-10"></v-divider>
                <v-col cols="12" class="my-2">
                  <v-data-table :headers="walletTransactionHeader" :items="walletDetail.transactions"
                    :search="transactionSearch" :loading="walletLoading">
                    <template v-slot:item.amount="{ item }">
                      <p>{{ formatNumber(item.amount) }}</p>
                    </template>
                    <template v-slot:item.status="{ item }">
                      <div>
                        <v-chip
                          :text="item.status == 'completed' ? 'موفق' : (item.status) == 'pending' ? 'نامشخص' : 'ناموفق'"
                          :color="item.status == 'completed' ? '#00853f' : (item.status) == 'pending' ? '#666666' : '#ff0000'"
                          size="small"></v-chip>
                      </div>
                    </template>
                    <template v-slot:item.type="{ item }">
                      <div>
                        <v-chip color="#000" size="small">
                          <v-icon :icon="item.type == 'deposit' ? 'ri-arrow-up-long-line' : 'ri-arrow-down-long-line'"
                            start></v-icon>
                          {{ item.type == 'deposit' ? 'واریز' : 'برداشت' }}
                        </v-chip>
                      </div>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
      {{ errorMsg }}
    </v-alert>
  </div>
</template>

<script setup>
import { router } from '@/plugins/router';
import WalletService from '@/services/wallet/wallet';
import { onMounted, ref } from 'vue';



const search = ref('');
const errorMsg = ref('');
const alertError = ref(false);
const walletLoading = ref(false);
const walletSheet = ref(false);
const walletTransactionHeader = ref([
  {
    title: 'نوع تراکنش',
    key: 'type',
  },
  {
    title: 'مبلغ (تومان)',
    key: 'amount',
  },
  {
    title: 'وضعیت',
    key: 'status',
  },
  {
    title: 'تاریخ',
    key: 'date',
  },
  {
    title: 'زمان',
    key: 'time',
  },
])
const transactionSearch = ref('');
const walletHeader = ref([
  {
    title: 'نام',
    key: 'user.firstName',
  },
  {
    title: 'نام خانوادگی',
    key: 'user.lastName',
  },
  {
    title: 'دارایی تومانی',
    key: 'balance',
  },
  {
    title: 'دارایی طلا (گرم)',
    key: 'goldWeight',
  },
  {
    title: 'در انتظار برداشت',
    key: 'blocked',
  },
  {
    title: 'تعداد تراکنش ها',
    key: 'transactions.length',
  },
  {
    title: 'فعالیت',
    key: 'action'
  }
]);
const WalletSearch = ref();
const walletData = ref();
const walletDetail = ref();

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

const GetWallet = async () => {
  try {
    walletLoading.value = true;
    const response = await WalletService.AllWallet();
    walletData.value = response.data;
    console.log(walletData.value)
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
    walletLoading.value = false;
  }
};

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const walletInfo = (item) => {
  walletSheet.value = true;
  walletDetail.value = item;
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

onMounted(() => {
  GetWallet();
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

.wallet-info-box div.content {
  display: flex;
  padding: 0.5rem 0;
  border-bottom: 1px solid #d4af37;
}

.wallet-info-box .title {
  font-weight: bold;
  margin: 0 0.4rem;
}

.wallet-info-box .title.red {
  color: red;
}

.wallet-info-box .desc {
  margin: 0 0.4rem;
}

.v-table thead {
  border-radius: 8px 8px 0 0 !important;
}

.listGuide {
  font-size: 12px;
  color: #2c3e50;
  font-weight: 500px;

  margin: 0.2rem;
  margin-bottom: 2rem;
  margin-right: 1rem;
  margin-left: 1rem
}
</style>
