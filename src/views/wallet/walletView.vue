<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card-text>
                    <v-card title="کیف پول ها">
                        <v-data-table :headers="walletHeader" :items="walletData" :search="search"
                            :loading="walletLoading">
                            <!-- <template v-slot:item.wallet.balance="{ item }">
                                    <p>{{ formatNumber(item.wallet.balance) }}</p>
                                </template> -->
                            <template v-slot:item.action="{ item }">
                                <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                                    @click="walletInfo(item)"></v-icon>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-card-text>
            </v-col>
        </v-row>

        <!-- user info modal -->
        <!-- <v-dialog v-model="UserInfoDialog" max-width="500" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات کاربران</p>
                </div>
                <div class="d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 user-dialog-info">
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام: </p>
                            <p class="mx-2">{{ UserInfo.firstName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ UserInfo.lastName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>نام پدر: </p>
                            <p class="mx-2">{{ UserInfo.fatherName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2 user-price">
                            <p>موجودی کیف پول: </p>
                            <p class="mx-2">{{ formatNumber(UserInfo.wallet.balance) }} ریال</p>
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>تاریخ تولد: </p>
                            <p class="mx-2">{{ UserInfo.birthDate }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>کد ملی: </p>
                            <p class="mx-2">{{ UserInfo.nationalCode }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>شماره همراه: </p>
                            <p class="mx-2">{{ UserInfo.phoneNumber }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2 user-price">
                            <p>موجودی طلا: </p>
                            <p class="mx-2">{{ UserInfo.wallet.goldWeight }} گرم</p>
                        </div>
                    </div>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="بستن" @click="UserInfoDialog = false" size="large" class="m-3"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>
    </div>
</template>

<script setup>
import WalletService from '@/services/wallet/wallet';
import { onMounted, ref } from 'vue';

const search = ref('');
const errorMsg = ref('');
const alertError = ref(false);
const walletLoading = ref(false);
const walletHeader = ref([
    {
        title: 'نام',
        key: 'user.firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'lastName',
    },
    {
        title: 'شماره همراه',
        key: 'phoneNumber',
    },
    {
        title: 'دارایی طلا (گرم)',
        key: 'wallet.goldWeight',
    },
    {
        title: 'دارایی ریالی',
        key: 'wallet.balance',
    },
    {
        title: 'شهر',
        key: 'officeName',
    },
    {
        title: 'فعالیت',
        key: 'action'
    }
]);
const walletData = ref();

const GetWallet = async () => {
    try {
        walletLoading.value = true;
        const response = await WalletService.AllWallet();
        walletData.value = response.data;
        console.log(walletData.value)
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        walletLoading.value = false;
    }
};

const walletInfo = () => { }

onMounted(() => {
    GetWallet();
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
</style>
