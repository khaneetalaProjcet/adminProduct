<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card-text>
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
              <v-text-field v-model="filter.admin" label="ادمین" density="compact" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="6" md="3">
              <v-text-field v-model="filter.accounter" label="حسابدار" density="compact"
                variant="outlined"></v-text-field>
            </v-col>
            <v-col md="6" class="d-none d-md-flex">
            </v-col>
            <v-col cols="12" md="3">
              <div class="w-100 d-flex justify-end">
                <v-btn prepend-icon="ri-loop-left-line" variant="tonal" block @click="SubmitFilter('completed')">به روز
                  رسانی</v-btn>
              </div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="w-100 d-flex justify-end">
                <v-btn prepend-icon="ri-file-excel-line" block :disabled="completeExportExcel" @click="exportExcel"
                  :loading="exportLoading">خروجی
                  اکسل</v-btn>
              </div>
            </v-col>
          </v-row>
          <v-card title="فروش صندوق طلا">
            <ul class="listGuide ">
              <li>

                ثبت معامله فروش صندوق طلا به صورت تلفنی توسط کارشناس انجام شده و مبلغ به حساب کاربر توسط بخش حسابداری
                بازگردانده می‌شود.

              </li>

            </ul>
            <v-data-table :headers="GoldBoxSellReviewHeader" :items="GoldBoxSellReviewData"
              :loading="GoldBoxSellReviewLoading">
              <template v-slot:item.totalPrice="{ item }">
                <p>{{ formatNumber(item.totalPrice) }}</p>
              </template>
              <template v-slot:item.status="{ item }">
                <div>
                  <v-chip :text="item.status == 'completed' ? 'برداشت شده' : 'در انتظار برداشت'"
                    :color="item.status == 'completed' ? '#ff0000' : '#66666'" size="small"></v-chip>
                </div>
              </template>
            </v-data-table>
          </v-card>
        </v-card-text>
      </v-col>
    </v-row>


    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
      {{ errorMsg }}
    </v-alert>
  </div>
</template>

<script setup>
import { router } from '@/plugins/router';
import AccountingService from '@/services/accounting/accounting';
import InPersonService from '@/services/inperson/inperson';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const alertError = ref(false);
const GoldBoxSellReviewLoading = ref(false);
const GoldBoxSellReviewHeader = ref([
  {
    title: 'نام',
    key: 'seller.firstName',
  },
  {
    title: 'نام خانوادگی',
    key: 'seller.lastName',
  },
  {
    title: 'شناسه پرداخت',
    key: 'invoiceId',
  },
  {
    title: 'مبلغ (تومان)',
    key: 'totalPrice',
  },
  {
    title: 'میزان طلا (گرم)',
    key: 'goldWeight',
  },
  {
    title: 'قیمت طلا (تومان)',
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
    title: 'کارشناس',
    key: 'accounterId',
  },
  {
    title: 'وضعیت',
    key: 'status'
  },
]);

const filter = ref({
  firstName: '',
  lastName: '',
  nationalCode: '',
  phoneNumber: '',
  tradeType: 1,
  type: 'sell',
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
const exportLink = ref('');
const exportLoading = ref(false);
const GoldBoxSellReviewData = ref();


const GetGoldboxSellList = async () => {
  try {
    GoldBoxSellReviewLoading.value = true;
    const response = await AccountingService.GoldBoxSellList();
    GoldBoxSellReviewData.value = response.data;
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
    GoldBoxSellReviewLoading.value = false;
  }
};

const SubmitFilter = async (status) => {
  try {
    GoldBoxSellReviewLoading.value = true;
    filter.value.status = status;
    const response = await InPersonService.SubmitFilterInvoice(filter.value);
    GoldBoxSellReviewData.value = response.data;
    exportLink.value = response.link;
    completeExportExcel.value = true;
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
    GoldBoxSellReviewLoading.value = false;
  }
}

const exportExcel = async () => {
  exportLoading.value = true;
  window.location.href = exportLink.value;
  setTimeout(() => {
    exportLoading.value = false;
  }, 5000);
}

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

onMounted(() => {
  GetGoldboxSellList();
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
  padding: 0.5rem;
  margin: 0.1rem;
  margin-bottom: 2rem;
  margin-right: 0.9rem
}
</style>
