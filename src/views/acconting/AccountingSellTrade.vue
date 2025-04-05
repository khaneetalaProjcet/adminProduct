<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card-text>
                    <v-card title="فروش صندوق طلا">
                        <template v-slot:text>
                            <v-text-field v-model="GoldBoxSellReviewSearch" label="جستجو"
                                prepend-inner-icon="ri-search-line"></v-text-field>
                        </template>
                        <v-data-table :headers="GoldBoxSellReviewHeader" :items="GoldBoxSellReviewData"
                            :search="GoldBoxSellReviewSearch" :loading="GoldBoxSellReviewLoading">
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


        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>
    </div>
</template>

<script setup>
import AccountingService from '@/services/accounting/accounting';
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
const GoldBoxSellReviewSearch = ref();
const GoldBoxSellReviewData = ref();


const GetGoldboxSellList = async () => {
    try {
        GoldBoxSellReviewLoading.value = true;
        const response = await AccountingService.GoldBoxSellList();
        GoldBoxSellReviewData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        GoldBoxSellReviewLoading.value = false;
    }
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

onMounted(() => {
    GetGoldboxSellList();
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
</style>
