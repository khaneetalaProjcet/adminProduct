<template>
    <v-row class="k-row">
        <v-col cols="12">
            <v-stepper v-model="step">
                <v-stepper-header>
                    <v-stepper-item v-for="s in steps" :key="s" :complete="isCompleted(s)" :title="`مرحله ${s}`"
                        :value="s" :icon="isCompleted(s) ? 'ri-check-line' : 'ri-close-line'"
                        :color="isCompleted(s) ? '#0b8707' : '#c7c3c3'" class="custom-stepper-icon" />
                </v-stepper-header>

                <v-stepper-window>
                    <!-- مرحله ۱ -->
                    <v-stepper-window-item :value="1">
                        <v-card class="step-card">
                            <v-form :ref="(el) => setFormRef(el, 1)">
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <div class="d-flex">
                                                <h3 class="trade-step-title">احراز هویت</h3>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="4" class="d-none d-md-flex"></v-col>
                                        <v-col cols="12" md="4">
                                            <v-text-field v-model="tradeForm.phoneNumber" label="شماره همراه"
                                                variant="outlined" :rules="phoneRules"
                                                @input="limitNumber"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4" class="d-none d-md-flex"></v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                            <v-card-actions class="btn-box first-step">
                                <v-btn @click="nextStep" color="primary" size="large" variant="elevated"
                                    :loading="stepOneLoading" :disabled="!isFormValid">
                                    بعدی
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-window-item>

                    <!-- مرحله ۲ -->
                    <v-stepper-window-item :value="2">
                        <v-card class="step-card">
                            <v-form :ref="(el) => setFormRef(el, 2)">
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <div class="w-100 d-flex justify-space-between align-items-center">
                                                <h3 class="trade-step-title">اطلاعات کاربر</h3>
                                                <div class="d-flex" v-if="userVerificationDetail.userVerified">
                                                    <p class="mb-0">کاربر احراز هویت شده است</p>
                                                    <v-icon class="me-2" size="small" icon="ri-check-line"
                                                        color="#0b8707"></v-icon>
                                                </div>
                                                <div class="d-flex" v-else>
                                                    <p class="mb-0">کاربر احراز هویت نشده است</p>
                                                    <v-icon class="me-2" size="small" icon="ri-close-line"
                                                        color="#c9190c"></v-icon>
                                                </div>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <v-text-field v-model="userInfo.nationalCode" label="کد ملی"
                                                variant="outlined"
                                                v-if="userVerificationDetail.userVerified == false"></v-text-field>
                                            <div class="d-flex" v-else>
                                                <p class="mb-0">کد ملی : </p>
                                                <p class="mb-0">{{ userInfo.nationalCode }}</p>
                                            </div>
                                        </v-col>

                                        <!-- <v-col cols="12" md="3" class="my-3">
                                            <v-text-field v-model="userInfo.birthDate" label="تاریخ تولد"
                                                variant="outlined"
                                                v-if="userVerificationDetail.userVerified == false"></v-text-field>
                                            <div class="d-flex" v-else>
                                                <p class="mb-0">تاریخ تولد : </p>
                                                <p class="mb-0">{{ userInfo.birthDate }}</p>
                                            </div>
                                        </v-col> -->
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">شماره همراه : </p>
                                                <p class="mb-0">{{ tradeForm.phoneNumber }}</p>
                                            </div>
                                        </v-col>
                                        <v-col v-if="userVerificationDetail.userVerified == true" cols="12" md="3" class="my-3 d-none d-md-flex"></v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">جنسیت : </p>
                                                <p class="mb-0" v-if="userInfo.gender == true">مرد</p>
                                                <p class="mb-0" v-else-if="userInfo.gender == false">زن</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">نام : </p>
                                                <p class="mb-0">{{ userInfo.firstName }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">نام خانوادگی : </p>
                                                <p class="mb-0">{{ userInfo.lastName }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">نام پدر : </p>
                                                <p class="mb-0">{{ userInfo.fatherName }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">شهر : </p>
                                                <p class="mb-0">{{ userInfo.officeName }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">کارت بانکی : </p>
                                                <v-icon size="small" icon="ri-close-line" color="#c9190c"
                                                    v-if="userInfo.isHaveBank == true"></v-icon>
                                                <v-icon size="small" icon="ri-check-line" color="#0b8707"
                                                    v-else-if="userInfo.isHaveBank == false"></v-icon>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                            <v-card-actions class="btn-box">
                                <v-btn @click="prevStep" size="large">قبلی</v-btn>
                                <v-btn @click="nextStep" color="primary" size="large" variant="elevated"
                                    :disabled="!isFormValid">
                                    بعدی
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-window-item>

                    <!-- مرحله ۳ -->
                    <v-stepper-window-item :value="3">
                        <v-card class="step-card">
                            <v-form :ref="(el) => setFormRef(el, 3)">
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="tradeForm.fullName" label="نام و نام خانوادگی"
                                                variant="outlined" :rules="[requiredRule]"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                            <v-card-actions class="btn-box">
                                <v-btn @click="prevStep" size="large">قبلی</v-btn>
                                <v-btn @click="nextStep" color="primary" size="large" variant="elevated"
                                    :disabled="!isFormValid">
                                    بعدی
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-window-item>

                    <!-- مرحله ۴ -->
                    <v-stepper-window-item :value="4">
                        <v-card class="step-card">
                            <v-form :ref="(el) => setFormRef(el, 4)">
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="tradeForm.address" label="آدرس خود را وارد کنید"
                                                variant="outlined" :rules="[requiredRule]"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                            <v-card-actions class="btn-box">
                                <v-btn @click="prevStep" size="large">قبلی</v-btn>
                                <v-btn @click="nextStep" color="primary" size="large" variant="elevated"
                                    :disabled="!isFormValid">
                                    بعدی
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-window-item>

                    <!-- مرحله ۵ (مرحله آخر) -->
                    <v-stepper-window-item :value="5">
                        <v-card class="step-card">
                            <v-form :ref="(el) => setFormRef(el, 5)">
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="tradeForm.confirmCode" label="کد تأیید را وارد کنید"
                                                variant="outlined" :rules="[requiredRule]"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                            <v-card-actions class="btn-box">
                                <v-btn @click="prevStep" size="large">قبلی</v-btn>
                                <v-btn @click="submitForm" color="success" size="large" variant="elevated">ثبت</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-window-item>

                </v-stepper-window>
            </v-stepper>
        </v-col>
    </v-row>
    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
        {{ errorMsg }}
    </v-alert>


    <v-alert v-if="alertSuccess" color="success" border="bottom" elevation="2" class="k-alert alert-animatiton"
        closable>
        {{ successMsg }}
    </v-alert>
</template>

<script setup>
import GoldBoxService from '@/services/goldBox/goldbox';
import { ref, computed } from 'vue';

const step = ref(1);
const steps = [1, 2, 3, 4, 5];
const stepOneLoading = ref(false);
const stepTwoLoading = ref(false);
const stepThreeLoading = ref(false);
const stepFourLoading = ref(false);
const stepFiveLoading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');
const alertError = ref(false);
const alertSuccess = ref(false);
const tradeForm = ref({
    phoneNumber: '',
    email: '',
    fullName: '',
    address: '',
    confirmCode: ''
});

const userVerificationDetail = ref({
    userExist: '',
    userVerified: '',
});

const userInfo = ref({
    id: '',
    firstName: '',
    birthDate: '',
    lastName: '',
    fatherName: '',
    gender: '',
    officeName: '',
    phoneNumber: '',
    nationalCode: '',
    isHaveBank: '',
})


const formRefs = ref({});

const AuthNumber = async () => {
    try {
        stepOneLoading.value = true;
        const response = await GoldBoxService.AuthNumberTradeGoldbox(tradeForm.value.phoneNumber);
        userVerificationDetail.value.userExist = response.data.userExist;
        userVerificationDetail.value.userVerified = response.data.userVerified;
        userInfo.value.id = response.data.user.id;
        userInfo.value.firstName = response.data.user.firstName;
        userInfo.value.lastName = response.data.user.lastName;
        userInfo.value.fatherName = response.data.user.fatherName;
        userInfo.value.gender = response.data.user.gender;
        userInfo.value.officeName = response.data.user.officeName;
        userInfo.value.phoneNumber = response.data.user.phoneNumber;
        userInfo.value.nationalCode = response.data.user.nationalCode;
        userInfo.value.isHaveBank = response.data.user.isHaveBank;
        userInfo.value.birthDate = response.data.user.birthDate;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        stepOneLoading.value = false;
    }
};

const TradeRequest = async () => {
    if (step.value === 1) {
        return await AuthNumber();
    } else if (step.value === 2) {

    } else if (step.value === 3) {

    } else if (step.value === 4) {

    } else if (step.value === 5) {

    } else if (step.value === 6) {

    }

}


const phoneRules = [
    v => !!v || 'شماره همراه الزامی است',
    v => /^09\d{9}$/.test(v) || 'شماره معتبر نیست'
];

const requiredRule = v => !!v || 'این فیلد الزامی است';

const setFormRef = (el, index) => {
    if (el) {
        formRefs.value[index] = el;
    }
};

const limitNumber = () => {
    tradeForm.value.phoneNumber = tradeForm.value.phoneNumber.replace(/\D/g, '').slice(0, 11);
}

const isCompleted = s => s < step.value;

const isFormValid = computed(() => {
    if (!formRefs.value[step.value]) return false;
    return formRefs.value[step.value].isValid;
});

const nextStep = async () => {
    const form = formRefs.value[step.value];
    if (form) {
        const { valid } = await form.validate();
        if (valid) {
            const apiSuccess = await TradeRequest();
            console.log(apiSuccess)
            if (apiSuccess)
                step.value++;
        }
    }
};

const prevStep = () => {
    if (step.value > 1) step.value--;
};

const submitForm = async () => {
    const form = formRefs.value[step.value];
    if (form) {
        const { valid } = await form.validate();
        if (valid) {
            alert('فرم با موفقیت ارسال شد!');
            console.log(tradeForm.value);
        }
    }
};
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

.step-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px !important;
}

.step-card {
    min-height: 20rem;
    min-height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: none !important;
    padding: 0.5rem;
}

.btn-box.first-step {
    display: flex;
    justify-content: end;
}

.btn-box {
    display: flex;
    justify-content: space-between;
}

.trade-step-title {
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #d4af37;
}
</style>
