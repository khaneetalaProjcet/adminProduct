<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center">
                    <v-tab value="one">فروش های موفق</v-tab>
                    <v-tab value="two">فروش های ناموفق</v-tab>
                </v-tabs>
                
            </v-col>
            <v-col cols="12">
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
                            <v-card title="فروش موفق">
                                <template v-slot:text>
                                    <v-text-field v-model="CompleteGoldBoxSellSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="CompleteGoldBoxSellHeader" :items="CompleteGoldBoxSellData"
                                    :search="CompleteGoldBoxSellSearch" :loading="CompleteGoldBoxSellLoading">
                                    <template v-slot:item.totalPrice="{ item }">
                                        <p>{{ formatNumber(item.totalPrice) }}</p>
                                    </template>
                                    <template v-slot:item.goldWeight="{ item }">
                                        <p>{{ (+item.goldWeight).toFixed(3) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'completed' ? 'موفق' : 'نامشخص'"
                                                :color="item.status == 'completed' ? '#00853f' : '#66666'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="two">
                            <v-card title="فروش ناموفق">
                                <template v-slot:text>
                                    <v-text-field v-model="FailedGoldBoxSellSearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="FailedGoldBoxSellHeader" :items="FailedGoldBoxSellData"
                                    :search="FailedGoldBoxSellSearch" :loading="CompleteGoldBoxSellLoading">
                                    <template v-slot:item.totalPrice="{ item }">
                                        <p>{{ formatNumber(item.totalPrice) }}</p>
                                    </template>
                                    <template v-slot:item.goldWeight="{ item }">
                                        <p>{{ (+item.goldWeight).toFixed(3) }}</p>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip :text="item.status == 'failed' ? 'ناموفق' : 'نامشخص'"
                                                :color="item.status == 'failed' ? '#ff0000' : '#66666'"
                                                size="small"></v-chip>
                                        </div>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>

        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>


        <v-alert v-if="alertSuccess" color="success" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ successMsg }}
        </v-alert>


    </div>
</template>

<script setup>
import GoldBoxService from '@/services/goldBox/goldbox';
import { onMounted, ref } from 'vue';


const errorMsg = ref('');
const successMsg = ref('');
const alertError = ref(false);
const alertSuccess = ref(false);
const tab = ref(null);
const CompleteGoldBoxSellSearch = ref();
const CompleteGoldBoxSellHeader = ref([
    {
        title: 'نام',
        key: 'seller.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'seller.lastName',
    },
    {
        title: 'مبلغ خرید (تومان)',
        key: 'totalPrice',
    },
    {
        title: 'وزن طلا (گرم)',
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
        title: 'شناسه پرداخت',
        key: 'invoiceId'
    },
    {
        title: 'وضعیت',
        key: 'status'
    },
]);
const FailedGoldBoxSellHeader = ref([
    {
        title: 'نام',
        key: 'seller.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'seller.lastName',
    },
    {
        title: 'مبلغ خرید (تومان)',
        key: 'totalPrice',
    },
    {
        title: 'وزن طلا (گرم)',
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
        title: 'شناسه پرداخت',
        key: 'invoiceId'
    },
    {
        title: 'وضعیت',
        key: 'status'
    },
])
const CompleteGoldBoxSellData = ref();
const CompleteGoldBoxSellLoading = ref();
const FailedGoldBoxSellLoading = ref();
const FailedGoldBoxSellData = ref();
const FailedGoldBoxSellSearch = ref();

const GetCompleteGoldBoxSellList = async () => {
    try {
        CompleteGoldBoxSellLoading.value = true;
        const response = await GoldBoxService.SellGoldBox(1);
        CompleteGoldBoxSellData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        CompleteGoldBoxSellLoading.value = false;
    }
};

const GetFailedGoldBoxSellList = async () => {
    try {
        FailedGoldBoxSellLoading.value = true;
        const response = await GoldBoxService.SellGoldBox(0);
        FailedGoldBoxSellData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        FailedGoldBoxSellLoading.value = false;
    }
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


onMounted(() => {
    GetCompleteGoldBoxSellList();
    GetFailedGoldBoxSellList();
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

.form-box {
    width: 100%;
    padding: 0 2rem;
}
</style>
