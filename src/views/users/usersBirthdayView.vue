<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card title="تولد کاربران">
                        <div class="px-5 py-3 d-flex justify-end">
                            <v-btn @click="AddBirthdayDialog = true" class="mx-2">افزودن تاریخ تولد</v-btn>
                        </div>
                        <template v-slot:text>
                            <v-text-field v-model="BirthdayListSearch" label="جستجو"
                                prepend-inner-icon="ri-search-line"></v-text-field>
                        </template>
                        <v-data-table :headers="BirthdayListHeader" :items="BirthdayListData"
                            :search="BirthdayListSearch" :loading="BirthdayListLoading">
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>

    <v-dialog v-model="AddBirthdayDialog" max-width="600" class="dialog">
        <v-card class="dialog-card">
            <div class="k-dialog-title">
                <p>افزودن تاریخ جدید</p>
            </div>

            <v-form ref="form" v-model="isFormValid" @submit.prevent="AddBirthday">
                <v-row>
                    <v-col cols="12" md="6" class="my-4">
                        <v-text-field v-model="AddBirthdayData.firstName" label="نام" variant="outlined"
                            :rules="BirthdayRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-4">
                        <v-text-field v-model="AddBirthdayData.lastName" label="نام خانوادگی" variant="outlined"
                            :rules="BirthdayRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-4">
                        <v-text-field v-model="AddBirthdayData.phoneNumber" label="شماره همراه" variant="outlined"
                            :rules="phoneRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-4">
                        <persian-date-picker v-model="AddBirthdayData.dateOfBirth"
                            placeholder="تاریخ تولد"></persian-date-picker>
                    </v-col>
                </v-row>
                <div class="d-flex justify-space-between">
                    <v-btn text="انصراف" @click="AddBirthdayDialog = false" size="large" class="m-3"
                        variant="outlined"></v-btn>
                    <v-btn type="submit" text="افزودن" size="large" class="m-3" :loading="AddBirthdayLoading"
                        :disabled="!isFormValid"></v-btn>
                </div>
            </v-form>
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
import UserService from '@/services/user/user';
import { onMounted, ref } from 'vue';


const AddBirthdayDialog = ref(false);
const BirthdayListSearch = ref('');
const errorMsg = ref('');
const alertError = ref(false);
const successMsg = ref("");
const alertSuccess = ref(false);
const isFormValid = ref(false);
const AddBirthdayLoading = ref(false);
const BirthdayListHeader = ref([
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
        title: 'تاریخ تولد',
        key: 'dateOfBirth',
    },
]);

const BirthdayListData = ref([]);
const BirthdayListLoading = ref(false);
const AddBirthdayData = ref({
    firstName: null,
    lastName: null,
    phoneNumber: null,
    dateOfBirth: null,

})

const GetBirthdayList = async () => {
    try {
        BirthdayListLoading.value = true;
        const response = await UserService.BirthdayList();
        BirthdayListData.value = response.data;
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
        BirthdayListLoading.value = false;
    }
}

const AddBirthday = async () => {
    try {
        AddBirthdayLoading.value = true;
        const response = await UserService.AddBirthdayUser(AddBirthdayData.value);
        AddBirthdayDialog.value = false;
        emptyState();
        successMsg.value = `تاریخ تولد ${response.firstName} ${response.lastName} با موفقیت ثبت شد`;
        alertSuccess.value = true;
        GetBirthdayList();
        setTimeout(() => {
            alertSuccess.value = false;
        }, 10000)
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
        AddBirthdayLoading.value = false;
    }
}

const emptyState = () => {
    AddBirthdayData.value.dateOfBirth = null;
    AddBirthdayData.value.firstName = null;
    AddBirthdayData.value.lastName = null;
    AddBirthdayData.value.phoneNumber = null;
}

const BirthdayRules = [
    v => !!v || 'این فیلد الزامی است'
];

const phoneRules = [
    v => !!v || 'شماره همراه الزامی است',
    v => /^09\d{9}$/.test(v) || 'شماره معتبر نیست'
];


onMounted(() => {
    GetBirthdayList()
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

.wallet-info-box div.content {
    display: flex;
    padding: 0.5rem 0;
    border-bottom: 1px solid #d4af37;
}

.wallet-info-box .title {
    font-weight: bold;
    margin: 0 0.4rem;
}

.wallet-info-box .title.red {
    color: red;
}

.wallet-info-box .desc {
    margin: 0 0.4rem;
}

.k-alert {
    position: fixed;
    top: 10px;
    left: 40%;
    font-size: 12px;
    padding: 10px !important;
    z-index: 100000;
}
</style>
