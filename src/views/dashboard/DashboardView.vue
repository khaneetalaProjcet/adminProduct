<template>
  <v-row>
    <v-col cols="12" md="4">
      <div class="box">
        <div class="icon-box">
          <VIcon icon="ri-user-line" class="icon" />
        </div>
        <div class="my-2 d-flex justify-space-between align-center w-100">
          <p>کاربران احراز شده</p>
          <p>2,500 نفر</p>
        </div>
        <div class="my-2 d-flex justify-space-between align-center">
          <p>کاربران در انتظار</p>
          <p>2,500 نفر</p>
        </div>
        <div class="my-2 d-flex justify-space-between align-center total">
          <p>همه کاربران</p>
          <p>2,500 نفر</p>
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
          <p>14,000 معامله</p>
        </div>
        <div class="my-2 d-flex justify-space-between align-center">
          <p>معاملات نامشخص</p>
          <p>2,500 معامله</p>
        </div>
        <div class="my-2 d-flex justify-space-between align-center total">
          <p>معاملات ناموفق</p>
          <p>2,000 معامله</p>
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
          <p>2485 گرم</p>
        </div>
        <div class="my-2 d-flex justify-space-between align-center">
          <p>طلای فروخته شده</p>
          <p>1850 گرم</p>
        </div>
        <div class="my-2 d-flex justify-space-between align-center total">
          <p>مجموع طلای معامله شده</p>
          <p>20000 گرم</p>
        </div>
      </div>
    </v-col>
    <v-col cols="12">
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </v-col>
  </v-row>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

// ثبت کردن ماژول‌های موردنیاز Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)
const chartData = ref({
  labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  datasets: [{ data: [40, 20, 12, 50, 96, 12, 8, 70, 59, 63, 48, 50], backgroundColor: '#00603A', }],
})
let delayed;
const chartOptions = ref({
  responsive: true,
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: (context) => {
      let delay = 0;
      if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
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
</style>
