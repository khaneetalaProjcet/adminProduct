<template>
    <v-row>
        <v-col cols="12" class="my-4">
            <v-row class="total-box">
                <v-col cols="12" md="4">
                    <div class="stat-box">
                        <span>دارایی کل :</span>
                        <v-progress-circular color="#d4af37" indeterminate :size="20"
                            v-if="statisticLoading"></v-progress-circular>
                        <span v-else>{{ (+filterStatistics.allGoldWeight + +filterStatistics.oldWeight).toFixed(5) }}
                            گرم</span>
                    </div>
                </v-col>
                <v-col cols="12" md="4">
                    <div class="stat-box">
                        <span>دارایی احراز شده ها :</span>
                        <v-progress-circular color="#d4af37" indeterminate :size="20"
                            v-if="statisticLoading"></v-progress-circular>
                        <span v-else>{{ (+filterStatistics.allGoldWeight).toFixed(5) }} گرم</span>
                    </div>
                </v-col>
                <v-col cols="12" md="4">
                    <div class="stat-box">
                        <span>دارایی احراز نشده ها :</span>
                        <v-progress-circular color="#d4af37" indeterminate :size="20"
                            v-if="statisticLoading"></v-progress-circular>
                        <span v-else>{{ (+filterStatistics.oldWeight).toFixed(5) }} گرم</span>
                    </div>
                </v-col>
                <!-- <v-col cols="12" md="4">
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
                </v-col> -->
            </v-row>
        </v-col>
    </v-row>
    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
        {{ errorMsg }}
    </v-alert>
</template>

<script setup>
import router from '@/plugins/router';
import ReportService from '@/services/report/report';
import { onMounted, ref } from 'vue';


const filterStatistics = ref({
    all: '-',
    allGoldWeight: null,
    oldWeight: null,
});
const errorMsg = ref('');
const alertError = ref(false);
const statisticLoading = ref(false);
const filter = ref({
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
})


const report = async () => {
    try {
        statisticLoading.value = true;
        const response = await ReportService.ReportHour(filter.value);
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
    report();
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

.stat-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    background-color: #fff;
    padding: 2rem 0.8rem;
    box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.1);
}
</style>
