<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card-text>
                    <v-card title="اطلاعات افراد متقاضی خرید قسطی">
                        <template v-slot:text>
                            <v-text-field v-model="search" label="جستجو"
                                prepend-inner-icon="ri-search-line"></v-text-field>
                        </template>

                        <v-data-table :headers="installmentHeader" :items="installmentData" :search="search"
                            :loading="installmentLoading">
                            <template v-slot:item.action="{ item }">
                                <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                                    @click="userInfo(item)"></v-icon>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-card-text>
            </v-col>
        </v-row>

        <!-- user info modal -->
        <v-dialog v-model="UserInfoDialog" max-width="600" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات کاربر</p>
                </div>
                <div class="d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 user-dialog-info">
                    <!-- <div class="d-flex flex-column w-100 px-4">
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
                            <p class="mx-2">{{ formatNumber(UserInfo.wallet.balance) }} تومان</p>
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
                    </div> -->
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="بستن" @click="UserInfoDialog = false" size="large" class="m-3"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>
    </div>
</template>

<script setup>
import LandingService from '@/services/landing/landing';
import { onMounted, ref } from 'vue';

const installmentLoading = ref(false);
const search = ref('');
const errorMsg = ref('');
const alertError = ref(false);
const installmentData = ref();
const UserInfoDialog = ref(false);
const installmentHeader = ref([
    {
        title: 'نام',
        key: 'firstName',
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
        title: 'کد ملی',
        key: 'nationalCode',
    },
    {
        title: 'استان',
        key: 'province'
    },
    {
        title: 'شهر',
        key: 'city'
    },
    {
        title: 'دسته بندی',
        key: 'category'
    },
    // {
    //     title: 'فعالیت',
    //     key: 'action'
    // }
]);

const UserInfo = ref();

const GetInstallmentList = async () => {
    try {
        installmentLoading.value = true;
        const response = await LandingService.AllInstallment();
        installmentData.value = response.data;
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
        installmentLoading.value = false;
    }
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const userInfo = (item) => {
    UserInfoDialog.value = true;
    UserInfo.value = item;
}



onMounted(() => {
    GetInstallmentList();
})


</script>

<style scoped>
.k-alert {
    position: absolute;
    top: 10px;
    left: 40%;
    font-size: 12px;
    padding: 10px !important;
    z-index: 10000;
}

.user-price {
    font-weight: bold;
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
