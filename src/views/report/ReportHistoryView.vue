<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card title="تاریخچه گزارشات">
                        <template v-slot:text>
                            <v-text-field v-model="ReportListSearch" label="جستجو"
                                prepend-inner-icon="ri-search-line"></v-text-field>
                        </template>
                        <v-data-table :headers="ReportListHeader" :items="ReportListData" :search="ReportListSearch"
                            :loading="ReportListLoading">
                            <template v-slot:item.fullName="{ item }">
                                {{ item.firstName }} {{ item.lastName }}
                            </template>
                            <template v-slot:item.status="{ item }">
                                <v-chip v-if="item.status == 0" text="در انتظار پردازش" color="#1A237E"
                                    size="small"></v-chip>
                                <v-chip v-if="item.status == 1" text="در حال پردازش" color="#F9A825"
                                    size="small"></v-chip>
                                <v-chip v-if="item.status == 2" text="پردازش شده" color="#2E7D32" size="small"></v-chip>
                                <v-chip v-if="item.status == 3" text="به مشکل خورده" color="#B71C1C"
                                    size="small"></v-chip>
                            </template>
                            <template v-slot:item.action="{ item }">

                                <v-tooltip text="جزئیات" location="top">
                                    <template v-slot:activator="{ props }">
                                        <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                                            v-bind="props" @click="ReportInfo(item)">
                                        </v-icon>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="دانلود" location="top" v-if="item.status == 2">
                                    <template v-slot:activator="{ props }">
                                        <v-icon class="me-2" size="small" icon="ri-download-2-line" color="#2E7D32"
                                            v-bind="props" @click="ReportDownload(item)">
                                        </v-icon>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="پردازش مجدد" location="top" v-if="item.status == 3">
                                    <template v-slot:activator="{ props }">
                                        <v-icon class="me-2" size="small" icon="ri-repeat-line" color="#D32F2F"
                                            v-bind="props" @click="ReportRepeat(item)">
                                        </v-icon>
                                    </template>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>

    <v-dialog v-model="reportDetailDialog" max-width="600" class="dialog">
        <v-card class="dialog-card">
            <div class="k-dialog-title">
                <p>جزئیات گزارش</p>
            </div>
            <div class="d-flex">
                <v-row>
                    <v-col cols="6" md="4">
                        <div class="d-flex align-center py-6">
                            <span>نوع گزارش:</span>
                            <v-chip size="small" v-if="reportDetail.report == 1">واریز و برداشت</v-chip>
                            <v-chip v-if="reportDetail.report == 2">معاملات</v-chip>
                            <v-chip v-if="reportDetail.report == 3">کاربران</v-chip>

                            <!-- <v-chip v-if="item.status == 0" text="در انتظار پردازش" color="#1A237E"
                                size="small"></v-chip> -->
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" v-if="reportDetail.report == 3">
                        <div class="d-flex align-center py-6">
                            <span>وضعیت احراز:</span>
                            <span v-if="reportDetail.auth == 'approved'">احراز هویت شده</span>
                            <span v-if="reportDetail.auth == 'approved'">احراز هویت نشده</span>
                            <span v-if="reportDetail.auth == 'approved'">تمامی کاربران</span>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4">
                        <div class="d-flex align-center py-6">
                            <span>وضعیت معامله:</span>
                            <span v-if="reportDetail.status == 'completed'">موفق</span>
                            <span v-if="reportDetail.status == 'pending'">در انتظار</span>
                            <span v-if="reportDetail.status == 'failed'">ناموفق</span>
                            <span v-if="reportDetail.status == 'all'">همه</span>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4">
                        <div class="d-flex align-center py-6">
                            <span>کد ملی:</span>
                            <span>{{ reportDetail.nationalCode }}</span>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4">
                        <div class="d-flex align-center py-6">
                            <span>تاریخ شروع:</span>
                            <span>{{ reportDetail.startDate }}</span>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4">
                        <div class="d-flex align-center py-6">
                            <span>زمان شروع:</span>
                            <span>{{ reportDetail.startTime }}</span>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4">
                        <div class="d-flex align-center py-6">
                            <span>تاریخ پایان:</span>
                            <span>{{ reportDetail.endDate }}</span>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4">
                        <div class="d-flex align-center py-6">
                            <span>زمان پایان:</span>
                            <span>{{ reportDetail.endTime }}</span>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-card>
    </v-dialog>

    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
        {{ errorMsg }}
    </v-alert>

    <v-alert v-if="alertSuccess" color="success" border="bottom" elevation="2" class="k-alert alert-animatiton"
        closable>
        {{ successMsg }}
    </v-alert>
</template>

<script setup>
import router from '@/plugins/router';
import ReportService from '@/services/report/report';
import { onMounted, ref } from 'vue';

const ReportListSearch = ref('');
const errorMsg = ref('');
const alertError = ref(false);
const successMsg = ref("");
const alertSuccess = ref(false);
const isSellerValid = ref(false);
const AddSellerLoading = ref(false);
const ReportListHeader = ref([
    {
        title: 'تاریخ',
        key: 'date',
    },
    {
        title: 'زمان',
        key: 'time',
    },
    {
        title: 'گزارش گیرنده',
        key: 'fullName',
    },
    {
        title: 'وضعیت',
        key: 'status',
    },
    {
        title: 'فعالیت',
        key: 'action',
    },
]);
const addSellerDetail = ref({
    firstName: null,
    lastName: null,
    phoneNumber: null,
})
const sellerDialog = ref(false);
const downloadLoading = ref(false);
const ReportListData = ref([]);
const ReportListLoading = ref(false);
const reportDetailDialog = ref(false);
const reportDetail = ref({
    auth: '-',
    deal: '-',
    endDate: '-',
    endTime: '-',
    nationalCode: '-',
    report: '-',
    startDate: '-',
    startTime: '-',
    status: '-',
    type: '-',
})



const GetReportList = async () => {
    try {
        ReportListLoading.value = true;
        const response = await ReportService.ReportHistoryList();
        ReportListData.value = response.data;
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
        ReportListLoading.value = false;
    }
}

const ReportDownload = (item) => {
    window.location.href = item.link;
}

const ReportInfo = (item) => {
    reportDetailDialog.value = true;
    let data = JSON.parse(item.reportBody)
    reportDetail.value.auth = data.auth;
    reportDetail.value.deal = data.deal;
    reportDetail.value.endDate = data.endDate;
    reportDetail.value.endTime = data.endTime;
    reportDetail.value.nationalCode = data.nationalCode;
    reportDetail.value.report = data.report;
    reportDetail.value.startDate = data.startDate;
    reportDetail.value.startTime = data.startTime;
    reportDetail.value.status = data.status;
    reportDetail.value.type = data.type;
}


const ReportRules = [
    v => !!v || 'این فیلد الزامی است'
];

const phoneRules = [
    v => !!v || 'شماره همراه الزامی است',
    v => /^09\d{9}$/.test(v) || 'شماره معتبر نیست'
];


onMounted(() => {
    GetReportList()
})
</script>

<style scoped>
.k-alert {
    position: absolute;
    top: 10px;
    left: 40%;
    font-size: 12px;
    padding: 10px !important;
    z-index: 1000000;
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
</style>
