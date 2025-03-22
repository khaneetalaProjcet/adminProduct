<template>
    <v-row>
        <v-col cols="12">
            <v-stepper v-model="step">
                <v-stepper-header>
                    <v-stepper-item v-for="s in steps" :key="s" :complete="isCompleted(s)" :title="`مرحله ${s}`"
                        :value="s" :icon="isCompleted(s) ? 'ri-check-line' : 'ri-close-line'"
                        :color="isCompleted(s) ? '#0b8707' : '#c7c3c3'" class="custom-stepper-icon" />
                </v-stepper-header>
                <v-stepper-window>
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
                                            <v-text-field v-model="remittanceForm.phoneNumber" label="شماره همراه"
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
                                                variant="outlined" v-if="userVerificationDetail.userVerified == false"
                                                :rules="nationalCodeRules" @input="validateNationalCode"></v-text-field>
                                            <div class="d-flex" v-else>
                                                <p class="mb-0">کد ملی : </p>
                                                <p class="mb-0">{{ userInfo.nationalCode }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="4" md="3" class="my-3"
                                            v-if="userVerificationDetail.userVerified == false">
                                        </v-col>
                                        <v-col cols="4" md="2" class="my-3"
                                            v-if="userVerificationDetail.userVerified == false">
                                            <v-select v-model="selectedDate" label="روز تولد" :items="persianDates"
                                                variant="outlined" item-title="name" item-value="value"
                                                @update:model-value="onDateSelected" class="first-select"
                                                :rules="[v => !!v || 'روز الزامی است']"></v-select>
                                        </v-col>
                                        <v-col cols="4" md="2" class="my-3"
                                            v-if="userVerificationDetail.userVerified == false">
                                            <v-select v-model="selectedMonth" label="ماه تولد" :items="persianMonths"
                                                variant="outlined" class="second-select" item-title="name"
                                                item-value="value" @update:model-value="onMonthSelected"
                                                :rules="[v => !!v || 'ماه الزامی است']"></v-select>
                                        </v-col>
                                        <v-col cols="4" md="2" class="my-3"
                                            v-if="userVerificationDetail.userVerified == false">
                                            <v-select v-model="selectedYear" label="سال تولد" :items="persianYears"
                                                variant="outlined" class="third-select" item-title="name"
                                                item-value="value" @update:model-value="onYearSelected"
                                                :rules="[v => !!v || 'سال الزامی است']"></v-select>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3"
                                            v-if="userVerificationDetail.userVerified == true">
                                            <div class="d-flex">
                                                <p class="mb-0">تاریخ تولد : </p>
                                                <p class="mb-0">{{ userInfo.birthDate }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="3" class="my-3">
                                            <div class="d-flex">
                                                <p class="mb-0">شماره همراه : </p>
                                                <p class="mb-0">{{ remittanceForm.phoneNumber }}</p>
                                            </div>
                                        </v-col>
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
                                <v-btn @click="identity" color="primary" size="large" variant="elevated"
                                    :disabled="!isFormValid" v-if="userVerificationDetail.userVerified == false"
                                    :loading="stepTwoLoading">
                                    استعلام هویت
                                </v-btn>
                                <v-btn @click="nextStep" color="primary" size="large" variant="elevated"
                                    :loading="stepTwoLoading" v-else>
                                    بعدی
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-window-item>
                    <v-stepper-window-item :value="3">
                        <v-card class="step-card">
                            <v-form :ref="(el) => setFormRef(el, 3)"></v-form>
                        </v-card>
                    </v-stepper-window-item>
                    <v-stepper-window-item :value="4">
                        <v-card class="step-card">
                            <v-form :ref="(el) => setFormRef(el, 4)"></v-form>
                        </v-card>
                    </v-stepper-window-item>
                </v-stepper-window>
            </v-stepper>
        </v-col>
    </v-row>
    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
        {{ errorMsg }}
    </v-alert>
</template>

<script setup>
import RemiitanceService from '@/services/remittance/remiitance';
import { ref } from 'vue';

const steps = ref([1, 2, 3, 4]);
const step = ref(1);
const formRefs = ref({});
const stepOneLoading = ref(false);
const stepTwoLoading = ref(false);
const selectedDate = ref();
const selectedMonth = ref();
const selectedYear = ref();
const alertError = ref(false);
const errorMsg = ref('');
const remittanceForm = ref({
    phoneNumber: '',
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
});

const userVerificationDetail = ref({
    userExist: '',
    userVerified: '',
});

const persianDates = ref([
    { name: "1", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
    { name: "6", value: 6 },
    { name: "7", value: 7 },
    { name: "8", value: 8 },
    { name: "9", value: 9 },
    { name: "10", value: 10 },
    { name: "11", value: 11 },
    { name: "12", value: 12 },
    { name: "13", value: 13 },
    { name: "14", value: 14 },
    { name: "15", value: 15 },
    { name: "16", value: 16 },
    { name: "17", value: 17 },
    { name: "18", value: 18 },
    { name: "19", value: 19 },
    { name: "20", value: 20 },
    { name: "21", value: 21 },
    { name: "22", value: 22 },
    { name: "23", value: 23 },
    { name: "24", value: 24 },
    { name: "25", value: 25 },
    { name: "26", value: 26 },
    { name: "27", value: 27 },
    { name: "28", value: 28 },
    { name: "29", value: 29 },
    { name: "30", value: 30 },
    { name: "31", value: 31 },
]);

const persianMonths = ref([
    { name: "فروردین", value: 1 },
    { name: "اردیبهشت", value: 2 },
    { name: "خرداد", value: 3 },
    { name: "تیر", value: 4 },
    { name: "مرداد", value: 5 },
    { name: "شهریور", value: 6 },
    { name: "مهر", value: 7 },
    { name: "آبان", value: 8 },
    { name: "آذر", value: 9 },
    { name: "دی", value: 10 },
    { name: "بهمن", value: 11 },
    { name: "اسفند", value: 12 },
]);

const persianYears = ref([
    { name: "1300", value: 1300 },
    { name: "1301", value: 1301 },
    { name: "1302", value: 1302 },
    { name: "1303", value: 1303 },
    { name: "1304", value: 1304 },
    { name: "1305", value: 1305 },
    { name: "1306", value: 1306 },
    { name: "1307", value: 1307 },
    { name: "1308", value: 1308 },
    { name: "1309", value: 1309 },
    { name: "1310", value: 1310 },
    { name: "1311", value: 1311 },
    { name: "1312", value: 1312 },
    { name: "1313", value: 1313 },
    { name: "1314", value: 1314 },
    { name: "1315", value: 1315 },
    { name: "1316", value: 1316 },
    { name: "1317", value: 1317 },
    { name: "1318", value: 1318 },
    { name: "1319", value: 1319 },
    { name: "1320", value: 1320 },
    { name: "1321", value: 1321 },
    { name: "1322", value: 1322 },
    { name: "1323", value: 1323 },
    { name: "1324", value: 1324 },
    { name: "1325", value: 1325 },
    { name: "1326", value: 1326 },
    { name: "1327", value: 1327 },
    { name: "1328", value: 1328 },
    { name: "1329", value: 1329 },
    { name: "1330", value: 1330 },
    { name: "1331", value: 1331 },
    { name: "1332", value: 1332 },
    { name: "1333", value: 1333 },
    { name: "1334", value: 1334 },
    { name: "1335", value: 1335 },
    { name: "1336", value: 1336 },
    { name: "1337", value: 1337 },
    { name: "1338", value: 1338 },
    { name: "1339", value: 1339 },
    { name: "1340", value: 1340 },
    { name: "1341", value: 1341 },
    { name: "1342", value: 1342 },
    { name: "1343", value: 1343 },
    { name: "1344", value: 1344 },
    { name: "1345", value: 1345 },
    { name: "1346", value: 1346 },
    { name: "1347", value: 1347 },
    { name: "1348", value: 1348 },
    { name: "1349", value: 1349 },
    { name: "1350", value: 1350 },
    { name: "1351", value: 1351 },
    { name: "1352", value: 1352 },
    { name: "1353", value: 1353 },
    { name: "1354", value: 1354 },
    { name: "1355", value: 1355 },
    { name: "1356", value: 1356 },
    { name: "1357", value: 1357 },
    { name: "1358", value: 1358 },
    { name: "1359", value: 1359 },
    { name: "1360", value: 1360 },
    { name: "1361", value: 1361 },
    { name: "1362", value: 1362 },
    { name: "1363", value: 1363 },
    { name: "1364", value: 1364 },
    { name: "1365", value: 1365 },
    { name: "1366", value: 1366 },
    { name: "1367", value: 1367 },
    { name: "1368", value: 1368 },
    { name: "1369", value: 1369 },
    { name: "1370", value: 1370 },
    { name: "1371", value: 1371 },
    { name: "1372", value: 1372 },
    { name: "1373", value: 1373 },
    { name: "1374", value: 1374 },
    { name: "1375", value: 1375 },
    { name: "1376", value: 1376 },
    { name: "1377", value: 1377 },
    { name: "1378", value: 1378 },
    { name: "1379", value: 1379 },
    { name: "1380", value: 1380 },
    { name: "1381", value: 1381 },
    { name: "1382", value: 1382 },
    { name: "1383", value: 1383 },
    { name: "1384", value: 1384 },
    { name: "1385", value: 1385 },
    { name: "1386", value: 1386 },
    { name: "1387", value: 1387 },
    { name: "1388", value: 1388 },
    { name: "1389", value: 1389 },
    { name: "1390", value: 1390 },
    { name: "1391", value: 1391 },
    { name: "1392", value: 1392 },
    { name: "1393", value: 1393 },
    { name: "1394", value: 1394 },
    { name: "1395", value: 1395 },
    { name: "1396", value: 1396 },
    { name: "1397", value: 1397 },
    { name: "1398", value: 1398 },
    { name: "1399", value: 1399 },
    { name: "1400", value: 1400 },
    { name: "1401", value: 1401 },
    { name: "1402", value: 1402 },
    { name: "1403", value: 1403 }
]);

const isCompleted = s => s < step.value;

const isFormValid = computed(() => {
    if (!formRefs.value[step.value]) return false;
    return formRefs.value[step.value].isValid;
});

const setFormRef = (el, index) => {
    if (el) {
        formRefs.value[index] = el;
    }
};

const nextStep = async (type) => {
    const form = formRefs.value[step.value];
    if (form) {
        const { valid } = await form.validate();
        if (valid) {
            const apiSuccess = await TradeRequest(type);
            if (apiSuccess)
                step.value++;
        }
    }
};


const TradeRequest = async (type) => {
    if (step.value === 1) {
        return await AuthNumber();
    } else if (step.value === 2) {
        return true;
    } else if (step.value === 3) {
        // if (type == 'buy') {
        //     return await TradeBuy();
        // } else {
        //     return await TradeSell();
        // }
        return true;
    } else if (step.value === 4) {
        return true;
    }
}


const AuthNumber = async () => {
    try {
        stepOneLoading.value = true;
        const response = await RemiitanceService.AuthNumberRemiitance(remittanceForm.value.phoneNumber);
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
        console.log(userInfo.value)
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


const identity = async () => {
    try {
        stepTwoLoading.value = true;
        userInfo.value.phoneNumber = remittanceForm.value.phoneNumber;
        console.log(userInfo.value)
        const response = await RemiitanceService.AuthIdentityUser(userInfo.value);
        userInfo.value.fatherName = response.data.fatherName;
        userInfo.value.gender = response.data.gender;
        userInfo.value.isHaveBank = response.data.isHaveBank;
        userInfo.value.officeName = response.data.officeName;
        userInfo.value.firstName = response.data.firstName;
        userInfo.value.lastName = response.data.lastName;
        userVerificationDetail.value.userVerified = true;
        console.log(userInfo.value)
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        stepTwoLoading.value = false;
    }
}


const prevStep = () => {
    if (step.value > 1) step.value--;
    selectedDate.value = '';
    selectedMonth.value = '';
    selectedYear.value = '';
    userInfo.value.nationalCode = '';
};


const phoneRules = [
    v => !!v || 'شماره همراه الزامی است',
    v => /^09\d{9}$/.test(v) || 'شماره معتبر نیست'
];

const nationalCodeRules = [
    (v) => !!v || 'کد ملی الزامی است',
    (v) => /^\d{10}$/.test(v) || 'کد ملی باید ۱۰ رقم باشد',
    (v) => {
        if (!/^\d{10}$/.test(v)) return true;

        const check = +v[9];
        const sum = v.split('').slice(0, 9).reduce((acc, x, i) => acc + (+x * (10 - i)), 0) % 11;
        return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11) || 'کد ملی نامعتبر است';
    }
];

const validateNationalCode = () => {
    userInfo.value.nationalCode = userInfo.value.nationalCode.replace(/\D/g, '').slice(0, 10);
    nationalCodeRules.every(rule => rule(userInfo.value.nationalCode) === true);
};


const limitNumber = () => {
    remittanceForm.value.phoneNumber = remittanceForm.value.phoneNumber.replace(/\D/g, '').slice(0, 11);
}

const onDateSelected = (value) => {
    selectedDate.value = value;
    updateBirthDate();
};

const onMonthSelected = (value) => {
    selectedMonth.value = value;
    updateBirthDate();
};

const onYearSelected = (value) => {
    selectedYear.value = value;
    updateBirthDate();
};

const updateBirthDate = () => {
    if (selectedYear.value && selectedMonth.value && selectedDate.value) {
        const month = String(selectedMonth.value).padStart(2, '0');
        const day = String(selectedDate.value).padStart(2, '0');
        userInfo.value.birthDate = `${selectedYear.value}${month}${day}`;
    }
};

</script>

<style scoped>
.trade-step-title {
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #d4af37;
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

.k-alert {
    position: absolute;
    top: 10px;
    left: 40%;
    font-size: 12px;
    padding: 10px !important;
    z-index: 100000;
}
</style>
