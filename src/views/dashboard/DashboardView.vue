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
import DashboardService from '@/services/dashboard/dashboard';
import { onMounted, ref } from 'vue';


const DahboardLoading = ref(false);
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
  xaxis: {
    categories: [],
  },
});

const DailyTradeseries = ref([
  {
    name: "میزان فروش صندوق طلا",
    data: [],
    color: "#d4af37",
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
        data: response.data.lineChart.data,
      },
    ];



    UserchartOptions.value = {
      ...UserchartOptions.value,
      labels: response.data.pieChart.label,
    };

    Userseries.value = response.data.pieChart.data;

    return response
  } catch (error) {
    errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 10000)
  } finally {
    DahboardLoading.value = false;
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
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  padding: 2px !important;
}
</style>
