<template>
    <v-form @submit.prevent="submitExport">
        <v-container class="filter-container">
            <v-row>
                <v-col cols="6" md="4" class="my-3">
                    <v-select v-model="filterList.report" :items="reportType" label="نوع گزارش" variant="outlined"
                        :rules="[v => !!v || 'حداقل یک مورد الزامیست']" item-title="label"
                        item-value="value"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="4" class="my-4">
                    <div class="d-flex justify-start align-center">
                        <p class="mb-0">زمان شروع: </p>
                    </div>
                </v-col>
                <v-col cols="6" md="4" class="my-4">
                    <persian-date-picker v-model="filterList.startDate" placeholder="تاریخ"></persian-date-picker>
                </v-col>
                <v-col cols="6" md="4" class="my-4">
                    <persian-date-picker type="time" v-model="filterList.startTime" placeholder="زمان"
                        format="HH:mm:ss"></persian-date-picker>
                </v-col>

                <v-col cols="6" md="4" class="my-4">
                    <div class="d-flex justify-start align-center">
                        <p class="mb-0">زمان پایان: </p>
                    </div>
                </v-col>
                <v-col cols="6" md="4" class="my-4">
                    <persian-date-picker v-model="filterList.endDate" placeholder="تاریخ"></persian-date-picker>
                </v-col>
                <v-col cols="6" md="4" class="my-4">
                    <persian-date-picker type="time" v-model="filterList.endTime" placeholder="زمان"
                        format="HH:mm:ss"></persian-date-picker>
                </v-col>
                <v-col cols="6" md="4" class="my-4" v-if="filterList.report == 1">
                    <v-select v-model="filterList.type" :items="TransactionType" label="نوع انتقال" variant="outlined"
                        item-title="label" item-value="value"></v-select>
                </v-col>
                <v-col cols="6" md="4" class="my-4" v-if="filterList.report == 2">
                    <v-select v-model="filterList.type" :items="TradeType" label="نوع معامله" variant="outlined"
                        item-title="label" item-value="value"></v-select>
                </v-col>
                <v-col cols="6" md="4" class="my-4" v-if="filterList.report == 2">
                    <v-select v-model="filterList.deal" :items="DealType" label="نوع ثبت" variant="outlined"
                        item-title="label" item-value="value"></v-select>
                </v-col>
                <v-col cols="6" md="4" class="my-4" v-if="filterList.report != 3">
                    <v-select v-model="filterList.status" :items="statusType" label="وضعیت" variant="outlined"
                        item-title="label" item-value="value"></v-select>
                </v-col>
                <v-col cols="6" md="4" class="my-4" v-if="filterList.report != 3">
                    <v-text-field v-model="filterList.nationalCode" label="کد ملی" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6" md="4" class="my-4" v-if="filterList.report == 3">
                    <v-select v-model="filterList.auth" :items="authType" label="وضعیت کاربران" variant="outlined"
                        item-title="label" item-value="value"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <div class="d-flex flex-column justify-start">
                        <a class="download-link my-1" v-for="(item, i) in reportData.link" :key="i" :href="item"
                            v-if="reportData.link != ''">دانلود گزارش {{ i + 1 }}</a>
                    </div>
                </v-col>
                <v-col cols="12">
                    <div class="d-flex justify-end">
                        <v-btn type="submit" :loading="filterLoading">ایجاد گزارش</v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script setup>
import ReportService from '@/services/report/report';
import { ref } from 'vue';

const filterLoading = ref(false);
const errorMsg = ref('');
const alertError = ref(false);
const filterList = ref({
    report: 1,
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    type: 'all',
    deal: 'all',
    status: 'all',
    nationalCode: '',
    auth: '',
})
const reportData = ref({
    link: [],
});

const reportType = ref([
    { value: 1, label: 'واریز و برداشت' },
    { value: 2, label: 'معاملات' },
    { value: 3, label: 'کاربران' },
])

const TransactionType = ref([
    { value: 'all', label: 'همه' },
    { value: 'deposit', label: 'واریز' },
    { value: 'withdraw', label: 'برداشت' },
]);

const TradeType = ref([
    { value: 'all', label: 'همه' },
    { value: 'sell', label: 'خرید' },
    { value: 'buy', label: 'فروش' },
]);

const authType = ref([
    { value: 'all', label: 'همه' },
    { value: 'approved', label: 'احراز شده' },
    { value: 'pebding', label: 'در انتظار احراز' },
]);

const DealType = ref([
    { value: 'all', label: 'همه' },
    { value: 'fromPhone', label: 'تلفنی' },
    { value: 'inPerson', label: 'حضوری' },
    { value: 'fromGateway', label: 'آنلاین' },
]);

const statusType = ref([
    { value: 'all', label: 'همه' },
    { value: 'completed', label: 'موفق' },
    { value: 'failed', label: 'ناموفق' },
    { value: 'pending', label: 'در انتظار' },
]);

const submitExport = async () => {
    try {
        filterLoading.value = true;
        const response = await ReportService.ReportSubmit(filterList.value);
        reportData.value.link.push(response[1])
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        filterLoading.value = false;
    }
}

</script>

<style scoped>
.filter-container {
    background-color: #fff;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.download-link {
    color: red;
    background-color: #e2e2e2;
    padding: 0.5rem;
    border-radius: 8px;
}
</style>
