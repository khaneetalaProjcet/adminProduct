<template>
    <v-row>
        <v-col cols="12" md="6">
            <div class="box">
                <div class="d-flex justify-space-between my-4">
                    <h4>اعمال قیمت دستی</h4>
                    <v-switch v-model="priceStatus.setManual" color="#b08c4d" @input="switchManualInput"
                        :loading="switchPriceLoading"></v-switch>
                </div>
                <v-divider></v-divider>
                <div class="my-4">
                    <v-form ref="form" class="d-flex align-center" @submit.prevent="submitManualPrice">
                        <v-text-field v-model="priceStatus.goldPriceManual" label="قیمت دستی طلا (تومان)"
                            variant="outlined" class="ma-1" :rules="validatePrice" @input="limitInput"></v-text-field>
                        <v-btn type="submit" color="primary" size="large" class="mx-1" :loading="setPriceLoading"
                            :disabled="!priceStatus.setManual">اعمال
                            قیمت
                            دستی</v-btn>
                    </v-form>
                </div>
            </div>
        </v-col>
        <v-col cols="12" md="6">
            <div class="box">
                <div class="d-flex justify-space-between align-center manual-price-box my-4">
                    <span>قیمت دستی طلا: </span>
                    <span v-if="manualPrice != 'غیر فعال است'">{{ formatNumber(manualPrice) }} تومان</span>
                    <span v-else>{{ manualPrice }}</span>
                </div>
                <div class="d-flex justify-space-between align-center my-4">
                    <span>قیمت لحظه ای فروش: </span>
                    <span>{{ formatNumber(GoldPrice.sellPrice) }} تومان</span>
                </div>
                <div class="d-flex justify-space-between align-center my-4">
                    <span>قیمت لحظه ای خرید: </span>
                    <span>{{ formatNumber(GoldPrice.buyPrice) }} تومان</span>
                </div>
            </div>
        </v-col>
        <v-col cols="12">
            <div class="box">
                <div class="d-flex justify-space-between my-3 py-3">
                    <p class="ma-0">قیمت ملی گلد : </p>
                    <p class="ma-0">{{ goldPrice.melligold }}</p>
                </div>
                <v-divider></v-divider>
                <div class="d-flex justify-space-between my-3 py-3">
                    <p class="ma-0">قیمت tala.ir : </p>
                    <p class="ma-0">{{ goldPrice.talair }}</p>
                </div>
                <v-divider></v-divider>
                <div class="d-flex justify-space-between my-3 py-3">
                    <p class="ma-0">قیمت میلی گلد : </p>
                    <p class="ma-0">{{ goldPrice.miligold }}</p>
                </div>
                <v-divider></v-divider>
                <div class="d-flex justify-space-between my-3 py-3">
                    <p class="ma-0">قیمت سایت تجارت جهانی : </p>
                    <p class="ma-0">{{ goldPrice.tgju }}</p>
                </div>
                <v-divider></v-divider>
                <div class="d-flex justify-space-between my-3 py-3">
                    <p class="ma-0">قیمت طلاسی : </p>
                    <p class="ma-0">{{ goldPrice.talasea }}</p>
                </div>
            </div>
        </v-col>
    </v-row>
    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
        {{ errorMsg }}
    </v-alert>
</template>

<script setup>
import router from '@/plugins/router';
import GoldPriceService from '@/services/priceApi/price';
import { onMounted, ref } from 'vue';

const priceLoading = ref(false);
const setPriceLoading = ref(false);
const switchPriceLoading = ref(false);
const goldPriceLoading = ref(false);
const alertError = ref(false);
const errorMsg = ref('');
const goldPrice = ref({
    melligold: '-',
    talair: '-',
    tgju: '-',
    talasea: '-',
    miligold: '-',
})
const priceStatus = ref({
    setManual: false,
    goldPriceManual: null,
});

const GoldPrice = ref({
    buyPrice: '',
    sellPrice: '',
});

const manualPrice = ref('')


const limitInput = () => {
    priceStatus.value.goldPriceManual = priceStatus.value.goldPriceManual.replace(/\D/g, "");
    if (priceStatus.value.goldPriceManual.length > 10) {
        priceStatus.value.goldPriceManual = priceStatus.value.goldPriceManual.slice(0, 11);
    }
    priceStatus.value.goldPriceManual = formatNumberWithCommas(priceStatus.value.goldPriceManual);
};

const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const validatePrice = [
    (v) => !!v || "مقدار ورودی نمی‌تواند خالی باشد",
];

const GetPriceStatus = async () => {
    try {
        priceLoading.value = true;
        const response = await GoldPriceService.PriceStatus();
        priceStatus.value.setManual = response.data.active;
        if (response.data.active == false) {
            manualPrice.value = 'غیر فعال است';
        } else {
            manualPrice.value = response.data.price
        }
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
        priceLoading.value = false;
    }
};

const submitManualPrice = async () => {
    try {
        setPriceLoading.value = true;
        const response = await GoldPriceService.SetPriceStatus(priceStatus.value.goldPriceManual);
        GetPriceStatus();
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
        setPriceLoading.value = false;
    }
}

const switchManualInput = async () => {
    try {
        switchPriceLoading.value = true;
        const response = await GoldPriceService.switchPriceStatus();
        GetPriceStatus()
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
        switchPriceLoading.value = false;
    }
}


const GetGoldPrice = async () => {
    try {
        goldPriceLoading.value = true;
        const response = await GoldPriceService.GetGoldPrice();
        GoldPrice.value.buyPrice = response.buyPrice;
        GoldPrice.value.sellPrice = response.sellPrice;
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
        goldPriceLoading.value = false;
    }
}

onMounted(() => {
    GetPriceStatus();
    GetGoldPrice();
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
    height: 100%;
}

.k-alert {
    position: absolute;
    top: 10px;
    left: 40%;
    font-size: 12px;
    padding: 10px !important;
    z-index: 100000;
}

.manual-price-box {
    color: red;
}
</style>
