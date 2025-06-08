<template>
    <v-card title="افزودن کاربر">
        <v-form v-model="validform" @submit.prevent="" class="w-100 pr-5 pl-5 pb-5">
            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field v-model="form.firstName" label="نام" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="form.lastName" label="نام خانوادگی" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="form.fatherName" label=" نام پدر" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="form.nationalCode" label=" کدملی" variant="outlined"
                        :rules="nationalCodeRules"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="form.age" label="سن" variant="outlined" :rules="ageRules"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select v-model="selectedDate" label="روز تولد" :items="persianDates" variant="outlined"
                        item-title="name" item-value="value" @update:model-value="onDateSelected"
                        :rules="[v => !!v || 'روز الزامی است']"></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select v-model="selectedMonth" label="ماه تولد" :items="persianMonths" variant="outlined"
                        item-title="name" item-value="value" @update:model-value="onMonthSelected"
                        :rules="[v => !!v || 'ماه الزامی است']"></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select v-model="selectedYear" label="سال تولد" :items="persianYears" variant="outlined"
                        item-title="name" item-value="value" @update:model-value="onYearSelected"
                        :rules="[v => !!v || 'سال الزامی است']"></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="form.phoneNumber" label="شماره موبایل" variant="outlined"
                        :rules="phoneRules"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select v-model="form.gender" label="جنسیت" :items="genderList" variant="outlined"
                        item-title="key" item-value="value"></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="form.shebaNumber" label="شماره شبا" variant="outlined"
                        :rules="shebaRules"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="form.cardNumber" label="شماره کارت" variant="outlined"
                        :rules="cardRule"></v-text-field>
                </v-col>
                <v-col md="9" class="d-none d-md-flex"></v-col>
                <v-col cols="12" md="3">
                    <v-btn @click="modal" type="submit" :disabled="!validform" block>
                        افزودن
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>

        <!-- dialog -->
        <v-dialog v-model="showmodal" persistent max-width="500">
            <v-card id="dialog-card">
                <v-card-title class="text-h5" id="titlemodal">تایید اطلاعات</v-card-title>
                <v-card-text class="text-modal">
                    آیا از صحت اطلاعات وارد شده اطمینان دارید؟
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="showmodal = false">
                        لغو
                    </v-btn>
                    <v-btn color="#00A550" @click="submitAddUser" :loading="formLoading">
                        تایید
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>

    <v-dialog v-model="successModal" max-width="500">
        <v-card title="کاربر جدید" class="modal-card">
            <v-icon class="mt-3 mb-6" icon="ri-checkbox-circle-fill" color="#0b8707"></v-icon>
            <h4>
                {{ responseForm.firstName }} {{ responseForm.lastName }} به لیست کاربران اضافه شد.
            </h4>
        </v-card>
    </v-dialog>

    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
        {{ errorMsg }}
    </v-alert>

</template>

<script setup>
import router from "@/plugins/router";
import UserService from "@/services/user/user";

import { ref } from "vue";

const showmodal = ref(false)
const selectedDate = ref();
const selectedMonth = ref();
const selectedYear = ref();
const validform = ref();
const formLoading = ref(false);
const errorMsg = ref('');
const alertError = ref(false);
const successModal = ref(false);
const form = ref({
    birthDate: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    age: '',
    fatherName: '',
    gender: '',
    nationalCode: '',
    cardNumber: '',
    shebaNumber: '',
});
const responseForm = ref();

const genderList = ref([
    {
        key: 'مرد',
        value: 1,
    },
    {
        key: 'زن',
        value: 0,
    },
]);

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

const phoneRules = [
    (v) => !!v || 'شماره همراه نمی‌تواند خالی باشد',
    (v) => /^\d{11}$/.test(v) || 'شماره همراه باید 11 رقم باشد',
    (v) => v.startsWith('09') || 'شماره همراه باید با 09 شروع شود',
];

const cardRule = [
    (v) => !!v || 'شماره کارت الزامی است',
    (v) => v?.length === 16 || 'شماره کارت باید ۱۶ رقم باشد'
];

const shebaRules = [
    (v) => !!v || 'شماره حساب الزامی است',
    (v) => [24, 26].includes(v?.replace(/\s/g, '').length) || 'شماره حساب باید ۲۴ رقم باشد'
];

const ageRules = [
    (v) => !!v || 'سن نمی‌تواند خالی باشد',
];

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
        form.value.birthDate = `${selectedYear.value}${month}${day}`;
    }
};

const modal = () => {
    if (validform.value) {
        showmodal.value = true;
    }
};

const submitAddUser = async () => {
    try {
        formLoading.value = true;
        const response = await UserService.SubmitAddUser(form.value);
        responseForm.value = response.data.user;
        showmodal.value = false;
        successModal.value = true;
        form.value.age = null;
        form.value.birthDate = null;
        form.value.cardNumber = null;
        form.value.fatherName = null;
        form.value.firstName = null;
        form.value.gender = null;
        form.value.lastName = null;
        form.value.nationalCode = null;
        form.value.phoneNumber = null;
        form.value.shebaNumber = null;
        selectedDate.value = null;
        selectedMonth.value = null;
        selectedYear.value = null;
        setInterval(() => {
            successModal.value = false;
        }, 10000)
        return response;
    } catch (error) {
        if (error.response.status == 401) {
            localStorage.clear();
            router.replace("/Login");
        }
        errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 5000);
    } finally {
        formLoading.value = false;
    }
}


</script>

<style scoped>
#titlemodal {
    color: #fefefe;
    border-radius: 0.3rem 0.3rem 0 0 !important;
    background-color: #d4af37;

}

#dialog-card {
    min-height: 14rem;
    width: 600px;
    padding: 0.8rem;
}

.text-modal {
    margin-top: 24px;
    font-weight: 600;
}

.modal-card {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
}

.modal-card i {
    width: 80px;
    height: 80px;
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
