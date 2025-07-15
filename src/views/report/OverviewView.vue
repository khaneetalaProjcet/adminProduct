<template>
  <v-row>
    <v-col cols="12" md="4">
      <div class="box">
        <div class="icon-box">
          <VIcon icon="ri-user-line" class="icon" />
        </div>
        <div class="my-2 d-flex justify-space-between align-center w-100">
          <p>کاربران احراز شده</p>
          <v-progress-circular color="#d4af37" indeterminate :size="20" v-if="DahboardLoading"></v-progress-circular>
          <p v-else>{{ Statistics.successUsers }} نفر</p>
        </div>
        <div class="my-2 d-flex justify-space-between align-center">
          <p>کاربران در انتظار</p>
          <v-progress-circular color="#d4af37" indeterminate :size="20" v-if="DahboardLoading"></v-progress-circular>
          <p v-else>{{ Statistics.failedUsers }} نفر</p>
        </div>
        <div class="my-2 d-flex justify-space-between align-center total">
          <p>همه کاربران</p>
          <v-progress-circular color="#d4af37" indeterminate :size="20" v-if="DahboardLoading"></v-progress-circular>
          <p v-else>{{ Statistics.allUsers }} نفر</p>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="4">
      <div class="box">
        <div class="icon-box">
          <VIcon icon="ri-p2p-line" class="icon" />
        </div>
        <div class="my-2 d-flex justify-space-between align-center w-100">
          <p>معاملات موفق</p>
          <v-progress-circular color="#d4af37" indeterminate :size="20" v-if="DahboardLoading"></v-progress-circular>
          <p v-else>{{ Statistics.completeTransactions }} معامله</p>
        </div>
        <div class="my-2 d-flex justify-space-between align-center">
          <p>معاملات نامشخص</p>
          <v-progress-circular color="#d4af37" indeterminate :size="20" v-if="DahboardLoading"></v-progress-circular>
          <p v-else>{{ Statistics.pendingsTransactions }} معامله</p>
        </div>
        <div class="my-2 d-flex justify-space-between align-center total">
          <p>معاملات ناموفق</p>
          <v-progress-circular color="#d4af37" indeterminate :size="20" v-if="DahboardLoading"></v-progress-circular>
          <p v-else>{{ Statistics.failedTransactions }} معامله</p>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="4">
      <div class="box">
        <div class="icon-box">
          <VIcon icon="ri-exchange-dollar-fill" class="icon" />
        </div>
        <div class="my-2 d-flex justify-space-between align-center w-100">
          <p>طلای خریداری شده</p>
          <v-progress-circular color="#d4af37" indeterminate :size="20" v-if="DahboardLoading"></v-progress-circular>
          <p v-else>{{ Statistics.allBuy }} گرم</p>
        </div>
        <div class="my-2 d-flex justify-space-between align-center">
          <p>طلای فروخته شده</p>
          <v-progress-circular color="#d4af37" indeterminate :size="20" v-if="DahboardLoading"></v-progress-circular>
          <p v-else>{{ Statistics.allSell }} گرم</p>
        </div>
        <div class="my-2 d-flex justify-space-between align-center total">
          <p>مجموع طلای معامله شده</p>
          <v-progress-circular color="#d4af37" indeterminate :size="20" v-if="DahboardLoading"></v-progress-circular>
          <p v-else>{{ Statistics.allWeight }} گرم</p>
        </div>
      </div>
    </v-col>
    <v-col cols="12">
      <div class="box h-100">
        <div class="icon-box">
          <VIcon icon="ri-bar-chart-box-ai-line" class="icon" />
        </div>
        <v-row class="my-4">
          <v-col cols="12" md="3" class="my-2">
            <persian-date-picker v-model="filter.startDate" placeholder="از تاریخ"
              class="custom-datepicker"></persian-date-picker>
          </v-col>
          <v-col cols="12" md="3" class="my-2">
            <persian-date-picker v-model="filter.endDate" placeholder="تا تاریخ"
              class="custom-datepicker"></persian-date-picker>
          </v-col>
          <v-col cols="12" md="3" class="my-2">
            <persian-date-picker type="time" v-model="filter.startTime" placeholder="از زمان" format="HH:mm:ss"
              class="custom-datepicker"></persian-date-picker>
          </v-col>
          <v-col cols="12" md="3" class="my-2">
            <persian-date-picker type="time" v-model="filter.endTime" placeholder="تا زمان" format="HH:mm:ss"
              class="custom-datepicker"></persian-date-picker>
          </v-col>
          <v-col cols="12">
            <div class="d-flex justify-end">
              <v-btn class="px-15" color="#b08c4d" @click="reportWithHour">محاسبه</v-btn>
            </div>
          </v-col>
          <v-col cols="12" class="my-4">
            <v-row class="total-box">
              <v-col cols="12" md="4">
                <div class="d-flex justify-space-between font-weight-bold">
                  <span>دارایی کل :</span>
                  <v-progress-circular color="#d4af37" indeterminate :size="20"
                    v-if="statisticLoading"></v-progress-circular>
                  <span v-else>{{ (+filterStatistics.allGoldWeight + +filterStatistics.oldWeight).toFixed(5) }}
                    گرم</span>
                </div>
              </v-col>
              <v-col cols="12" md="4" class="middle-border">
                <div class="d-flex justify-space-between">
                  <span>دارایی احراز شده ها :</span>
                  <v-progress-circular color="#d4af37" indeterminate :size="20"
                    v-if="statisticLoading"></v-progress-circular>
                  <span v-else>{{ (+filterStatistics.allGoldWeight).toFixed(5) }} گرم</span>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="d-flex justify-space-between">
                  <span>دارایی احراز نشده ها :</span>
                  <v-progress-circular color="#d4af37" indeterminate :size="20"
                    v-if="statisticLoading"></v-progress-circular>
                  <span v-else>{{ (+filterStatistics.oldWeight).toFixed(5) }} گرم</span>
                </div>
              </v-col>
            </v-row>
            <!-- <div class="total-box">
              <span>موجودی کل صندوق طلا: </span>
              <span>{{ (+filterStatistics.allGoldWeight).toFixed(5) }}</span>
            </div> -->
          </v-col>
          <v-col cols="12" class="my-4">
            <v-row class="total-box-light">
              <v-col cols="12" md="4">
                <div class="d-flex justify-space-between font-weight-bold">
                  <span>کل مبلغ درگاه بانک :</span>
                  <v-progress-circular color="#d4af37" indeterminate :size="20"
                    v-if="statisticLoading"></v-progress-circular>
                  <span v-else>{{ }} تومان</span>
                </div>
              </v-col>
              <v-col cols="12" md="4" class="middle-border">
                <div class="d-flex justify-space-between">
                  <span>شارژ کیف پول :</span>
                  <v-progress-circular color="#d4af37" indeterminate :size="20"
                    v-if="statisticLoading"></v-progress-circular>
                  <span v-else>{{ }} تومان</span>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="d-flex justify-space-between">
                  <span>خرید طلا :</span>
                  <v-progress-circular color="#d4af37" indeterminate :size="20"
                    v-if="statisticLoading"></v-progress-circular>
                  <span v-else>{{ }} تومان</span>
                </div>
              </v-col>
            </v-row>
            <!-- <div class="total-box">
              <span>موجودی کل صندوق طلا: </span>
              <span>{{ (+filterStatistics.allGoldWeight).toFixed(5) }}</span>
            </div> -->
          </v-col>
          <v-col cols="12" md="6" class="my-2">
            <div class="d-flex justify-space-between">
              <p>طلای فروخته شده:</p>
              <v-progress-circular color="#d4af37" indeterminate :size="20"
                v-if="statisticLoading"></v-progress-circular>
              <p v-else>{{ filterStatistics.sold }} گرم</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-2">
            <div class="d-flex justify-space-between">
              <p>طلای خریداری شده:</p>
              <v-progress-circular color="#d4af37" indeterminate :size="20"
                v-if="statisticLoading"></v-progress-circular>
              <p v-else>{{ filterStatistics.bought }} گرم</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-2">
            <div class="d-flex justify-space-between">
              <p> مجموع موجودی های ریالی:</p>
              <v-progress-circular color="#d4af37" indeterminate :size="20"
                v-if="statisticLoading"></v-progress-circular>
              <p v-else>{{ formatNumber(filterStatistics.allBalance) }} تومان</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-2">
            <div class="d-flex justify-space-between">
              <p>برداشت های تایید شده:</p>
              <v-progress-circular color="#d4af37" indeterminate :size="20"
                v-if="statisticLoading"></v-progress-circular>
              <p v-else>{{ formatNumber(filterStatistics.succeedWithdraw) }} تومان</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-2">
            <div class="d-flex justify-space-between stat-bold">
              <p>مجموع واریزی ها:</p>
              <v-progress-circular color="#d4af37" indeterminate :size="20"
                v-if="statisticLoading"></v-progress-circular>
              <p v-else>{{ formatNumber(filterStatistics.deposit) }} تومان</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-2">
            <div class="d-flex justify-space-between stat-bold">
              <p>خالص طلای معامله شده:</p>
              <v-progress-circular color="#d4af37" indeterminate :size="20"
                v-if="statisticLoading"></v-progress-circular>
              <p v-else>{{ filterStatistics.all }} گرم</p>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="my-2">
          <v-col cols="12" md="6">
            <div class="d-flex justify-space-between align-center">
              <p>خرید حضوری : </p>
              <v-progress-circular color="#d4af37" indeterminate :size="20"
                v-if="statisticLoading"></v-progress-circular>
              <p v-else>{{ filterStatistics.inpersonBought }} گرم</p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="d-flex justify-space-between align-center">
              <p>فروش حضوری : </p>
              <v-progress-circular color="#d4af37" indeterminate :size="20"
                v-if="statisticLoading"></v-progress-circular>
              <p v-else>{{ filterStatistics.inpersonSold }} گرم</p>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="my-2">
          <v-col cols="12" md="6">
            <div class="d-flex justify-space-between align-center">
              <p>خرید آنلاین : </p>
              <v-progress-circular color="#d4af37" indeterminate :size="20"
                v-if="statisticLoading"></v-progress-circular>
              <p v-else>{{ filterStatistics.bought }} گرم</p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="d-flex justify-space-between align-center">
              <p>فروش آنلاین : </p>
              <v-progress-circular color="#d4af37" indeterminate :size="20"
                v-if="statisticLoading"></v-progress-circular>
              <p v-else>{{ filterStatistics.sold }} گرم</p>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="my-2">
          <v-col cols="12" md="6">
            <div class="d-flex justify-space-between align-center">
              <p>خرید تلفنی : </p>
              <v-progress-circular color="#d4af37" indeterminate :size="20"
                v-if="statisticLoading"></v-progress-circular>
              <p v-else>{{ filterStatistics.phoneBought }} گرم</p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="d-flex justify-space-between align-center">
              <p>فروش تلفنی : </p>
              <v-progress-circular color="#d4af37" indeterminate :size="20"
                v-if="statisticLoading"></v-progress-circular>
              <p v-else>{{ filterStatistics.phoneSold }} گرم</p>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="my-2">
          <v-col cols="12" md="6">
            <div class="d-flex justify-space-between align-center">
              <p>خرید حواله ای : </p>
              <v-progress-circular color="#d4af37" indeterminate :size="20"
                v-if="statisticLoading"></v-progress-circular>
              <p v-else>{{ filterStatistics.REMMITANCEBought }} گرم</p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="d-flex justify-space-between align-center">
              <p>فروش فروش حواله ای : </p>
              <v-progress-circular color="#d4af37" indeterminate :size="20"
                v-if="statisticLoading"></v-progress-circular>
              <p v-else>{{ filterStatistics.REMMITANCESold }} گرم</p>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <div class="box">
        <apexchart width="100%" type="bar" :options="MountlyBuychartOptions" :series="MountlyBuyseries"></apexchart>
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <div class="box">
        <apexchart width="100%" type="line" :options="DailyTradechartOptions" :series="DailyTradeseries"></apexchart>
      </div>
    </v-col>
    <v-col cols="12" md="4">
      <div class="box">
        <apexchart width="100%" type="pie" :options="UserchartOptions" :series="Userseries"></apexchart>
      </div>
    </v-col>
  </v-row>
  <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
    {{ errorMsg }}
  </v-alert>
</template>

<script setup>
import { router } from '@/plugins/router';
import DashboardService from '@/services/dashboard/dashboard';
import ReportService from '@/services/report/report';
import { onMounted, ref } from 'vue';


const DahboardLoading = ref(false);
const statisticLoading = ref(false);
const Statistics = ref({
  successUsers: '-',
  failedUsers: '-',
  allUsers: '-',
  pendingsTransactions: '-',
  failedTransactions: '-',
  completeTransactions: '-',
  allTransActions: '-',
  allBuy: '-',
  allSell: '-',
  allWeight: '-',
  buyChart: {},
})

const filter = ref({
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
})
const filterStatistics = ref({
  all: '-',
  sold: '-',
  bought: '-',
  allBalance: '-',
  succeedWithdraw: '-',
  inpersonBought: '-',
  inpersonSold: '-',
  phoneBought: '-',
  phoneSold: '-',
  REMMITANCEBought: '-',
  REMMITANCESold: '-',
  deposit: '-',
  allGoldWeight: null,
  oldWeight: null,
})
const errorMsg = ref('');
const alertError = ref(false);
const MountlyBuychartOptions = ref({
  chart: {
    fontFamily: "YekanBakhFaNum",
  },
  title: {
    text: "حجم معاملات ماهانه صندوق طلا",
    align: "center",
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
    },
  },
  xaxis: {
    categories: [],
  },
});

const MountlyBuyseries = ref([
  {
    name: "میزان فروش صندوق طلا",
    data: [],
    color: "#d4af37",
  },
]);


const DailyTradechartOptions = ref({
  chart: {
    fontFamily: "YekanBakhFaNum",
  },
  title: {
    text: "حجم معاملات روزانه صندوق طلا",
    align: "center",
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
    },
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  xaxis: {
    categories: [],
  },
  colors: ["#FF3131", "#008000"],
});

const DailyTradeseries = ref([
  {
    name: "میزان فروش صندوق طلا",
    data: [],
  },
]);


const UserchartOptions = ref({
  chart: {
    type: "pie",
    fontFamily: "YekanBakhFaNum",
  },
  title: {
    text: "احراز هویت کاربران",
    align: "center",
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
    },
  },
  colors: ["#fcc428", "#d4af37"],
  labels: [],
});

const Userseries = ref([]);

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const GetStatistics = async () => {
  try {
    DahboardLoading.value = true;
    const response = await DashboardService.Dashboard();
    Statistics.value.allBuy = response.data.allBuy;
    Statistics.value.allSell = response.data.allSell;
    Statistics.value.allTransActions = response.data.allTransActions;
    Statistics.value.allUsers = response.data.allUsers;
    Statistics.value.allWeight = response.data.allWeight;
    Statistics.value.completeTransactions = response.data.completeTransactions;
    Statistics.value.failedTransactions = response.data.failedTransactions;
    Statistics.value.failedUsers = response.data.failedUsers;
    Statistics.value.pendingsTransactions = response.data.pendingsTransactions;
    Statistics.value.successUsers = response.data.successUsers;
    Statistics.value.buyChart = response.data.buyChart;
    MountlyBuychartOptions.value = {
      ...MountlyBuychartOptions.value,
      xaxis: {
        categories: response.data.barChart.label,
      },
    };

    MountlyBuyseries.value = [
      {
        name: "فروش ماهانه صندوق طلا",
        data: response.data.barChart.data,
      },
    ];


    DailyTradechartOptions.value = {
      ...DailyTradechartOptions.value,
      xaxis: {
        categories: response.data.lineChart.label,
      },
    };

    DailyTradeseries.value = [
      {
        name: "فروش ماهانه صندوق طلا",
        data: response.data.lineChart[0].data
      },
      {
        name: "خرید ماهانه صندوق طلا",
        data: response.data.lineChart[1].data
      },
    ];



    UserchartOptions.value = {
      ...UserchartOptions.value,
      labels: response.data.pieChart.label,
    };

    Userseries.value = response.data.pieChart.data;

    return response
  } catch (error) {
    if (error.response.status == 401) {
      localStorage.clear();
      router.replace("/login");
    }
    errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 10000)
  } finally {
    DahboardLoading.value = false;
  }
}

const reportWithHour = async () => {
  try {
    statisticLoading.value = true;
    const response = await ReportService.ReportHour(filter.value);
    filterStatistics.value.all = response.data.all;
    filterStatistics.value.bought = response.data.bought;
    filterStatistics.value.deposit = response.data.deposit;
    filterStatistics.value.allBalance = response.data.allBalance;
    filterStatistics.value.sold = response.data.sold;
    filterStatistics.value.succeedWithdraw = response.data.succeedWithdraw;
    filterStatistics.value.REMMITANCEBought = response.data.REMMITANCEBought;
    filterStatistics.value.REMMITANCESold = response.data.REMMITANCESold;
    filterStatistics.value.inpersonBought = response.data.inpersonBought;
    filterStatistics.value.inpersonSold = response.data.inpersonSold;
    filterStatistics.value.phoneBought = response.data.phoneBought;
    filterStatistics.value.phoneSold = response.data.phoneSold;
    filterStatistics.value.allGoldWeight = response.data.allGoldWeight;
    filterStatistics.value.oldWeight = response.data.oldWeight;
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
    statisticLoading.value = false;
  }
}


onMounted(() => {
  GetStatistics();
})


</script>

<style scoped>
.box {
  border-radius: 8px;
  padding: 0.5rem 1rem;
  background-color: #fff;
  box-shadow: 0px 5px 5px 0px rgba(106, 106, 106, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.box p {
  margin: 0.2rem 0;
}

.total {
  font-weight: bold;
}

.icon-box {
  margin-top: 0.2rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 4px;
  background-color: rgba(255, 196, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.k-alert {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  padding: 2px !important;
}

.stat-bold {
  font-weight: bold;
}

.total-box {
  background-color: rgba(255, 196, 0, 0.2);
  box-shadow: 0px 8px 10px -9px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 8px;
}

.total-box-light {
  background-color: rgba(255, 0, 0, 0.2);
  box-shadow: 0px 8px 10px -9px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 8px;
}

.middle-border {
  border-right: 2px solid #d4d4d4;
  border-left: 2px solid #d4d4d4;
}
</style>
