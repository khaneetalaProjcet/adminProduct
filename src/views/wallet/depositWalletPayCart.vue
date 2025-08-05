<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card title="شارژ کیف پول" class="transfer-card">
                    <v-row>
                        <v-col class="d-none d-md-flex" md="2"></v-col>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="userDetail.nationalCode" label="کد ملی" variant="outlined"
                                :rules="nationalCodeRules" @input="validateNationalCodeSender"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-btn block color="#d4af37" size="large" @click="inquiryWallet"
                                :loading="inquiryLoading">استعلام کاربر</v-btn>
                        </v-col>
                        <v-col class="d-none d-md-flex" md="2"></v-col>
                    </v-row>

                    <v-row v-if="userInfoShow">
                        <v-col cols="6" md="3">
                            <div class="d-flex align-center">
                                <p>نام : </p>
                                <p>{{ userInfo.firstName }}</p>
                            </div>
                        </v-col>
                        <v-col cols="6" md="3">
                            <div class="d-flex align-center">
                                <p>نام خانوادگی : </p>
                                <p>{{ userInfo.lastName }}</p>
                            </div>
                        </v-col>
                        <v-col cols="6" md="3">
                            <div class="d-flex align-center">
                                <p>شماره همراه : </p>
                                <p>{{ userInfo.phoneNumber }}</p>
                            </div>
                        </v-col>
                        <v-col cols="6" md="3">
                            <div class="d-flex align-center">
                                <p>کد ملی : </p>
                                <p>{{ userInfo.nationalCode }}</p>
                            </div>
                        </v-col>
                        <v-col cols="6" md="3">
                            <div class="d-flex align-center">
                                <p>موجودی طلا : </p>
                                <p>{{ userInfo.goldWeight }}</p>
                            </div>
                        </v-col>
                        <v-col cols="6" md="3">
                            <div class="d-flex align-center">
                                <p>موجودی کیف پول : </p>
                                <p>{{ formatNumber(userInfo.balance) }} تومان</p>
                            </div>
                        </v-col>
                    </v-row>

                    <v-form class="w-100 mt-10" v-if="userInfoShow" ref="form" v-model="isValid"
                        @submit.prevent="submitCharge">
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="depositDetail.amount" label="مبلغ شارژ(تومان)" variant="outlined"
                                    :rules="[(v) => !!v || 'لطفا مبلغ را وارد کنید']"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <persian-date-picker v-model="depositDetail.date" placeholder="تاریخ"
                                    :rules="[(v) => !!v || 'لطفا تاریخ را وارد کنید']"></persian-date-picker>
                            </v-col>
                            <v-col cols="12" md="4">
                                <persian-date-picker type="time" v-model="depositDetail.time" placeholder="زمان"
                                    :rules="[(v) => !!v || 'لطفا زمان را وارد کنید']"></persian-date-picker>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="depositDetail.invoiceId" label="شماره پیگیری" variant="outlined"
                                    :rules="[(v) => !!v || 'لطفا شماره پیگیری را وارد کنید']"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-select :item-props="destCartProps" :items="carts" item-value="cardNumber"
                                    label="شماره کارت مقصد" v-model="depositDetail.destCartNumber"
                                    :rules="[(v) => !!v || 'لطفا یک کارت انتخاب کنید']"></v-select>
                            </v-col>
                            <v-col md="4" class="d-none d-md-flex"></v-col>
                            <v-col cols="12" md="4">
                                <v-select :item-props="cartProps" :items="cartList" item-value="title"
                                    label="شماره کارت مبدا" v-model="depositDetail.CartNumber"
                                    :rules="[(v) => !!v || 'لطفا یک کارت انتخاب کنید']"></v-select>
                            </v-col>
                            <v-col cols="12" md="4" v-if="depositDetail.CartNumber.id == 0">
                                <v-text-field v-model="otherCartNumber" label="شماره کارت" variant="outlined"
                                    :rules="cartRule"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="userInfoShow">
                            <v-col cols="12">
                                <div class="d-flex justify-end">
                                    <v-btn color="primary" type="submit" :disabled="!isValid"
                                        :loading="chargeLoading">شارژ کیف پول</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </div>
    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
        {{ errorMsg }}
    </v-alert>

    <v-dialog max-width="500" v-model="chargeModal" persistent="">
        <v-card class="trade-modal">
            <div class="transferModal-content py-5">
                <h3 class="my-4">شارژ کیف پول</h3>
            </div>
            <p>عملیات شارژ کیف پول با موفقیت انجام شد</p>
            <div class="d-flex justify-space-around mt-2 mb-7">
                <v-btn text="بستن" class="pay-btn" color="#9D7E3B" block @click="closeChargeModal"></v-btn>
            </div>
        </v-card>
    </v-dialog>

</template>

<script setup>
import router from '@/plugins/router';
import WalletService from '@/services/wallet/wallet';
import { ref } from 'vue';


const inquiryLoading = ref(false);
const userInfoShow = ref(false);
const errorMsg = ref('');
const alertError = ref(false);
const isValid = ref(false);
const chargeModal = ref(false);
const userDetail = ref({
    nationalCode: '',
});
const carts = ref([
    {
        owner: 'محمود معصومی',
        cardNumber: '6037701592564675',
    },
    {
        owner: 'محمود معصومی(نوآور)',
        cardNumber: '6037701592616236',
    },
    {
        owner: 'محمود معصومی(نویان)',
        cardNumber: '6037701592616780',
    },
])
const userInfo = ref({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    nationalCode: '',
    goldWeight: '',
    balance: '',
});

const depositDetail = ref({
    amount: '',
    date: '',
    time: '',
    invoiceId: '',
    CartNumber: '',
    destCartNumber: '',
});
const otherCart = ref({
    cardNumber: "شماره کارت احراز نشده",
    shebaNumber: "",
    id: 0
})
const otherCartNumber = ref('')
const cartList = ref([]);
const chargeLoading = ref(false)


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

const cartRule = [
    (v) => !!v || 'لطفا شماره کارت را وارد نمایید',
    (v) => /^\d{16}$/.test(v) || 'شماره کارت باید 16 رقم باشد',
]

const validateNationalCodeSender = () => {
    userDetail.value.nationalCode = userDetail.value.nationalCode.replace(/\D/g, '').slice(0, 10);
    nationalCodeRules.every(rule => rule(userDetail.value.nationalCode) === true);
};

const inquiryWallet = async () => {
    try {
        inquiryLoading.value = true;
        const response = await WalletService.QuiryWallet(userDetail.value.nationalCode);
        userInfo.value.firstName = response.data.firstName;
        userInfo.value.lastName = response.data.lastName;
        userInfo.value.nationalCode = response.data.nationalCode;
        userInfo.value.phoneNumber = response.data.phoneNumber;
        userInfo.value.goldWeight = response.data.goldWeight;
        userInfo.value.balance = response.data.balance;
        cartList.value = response.data.BankAccounts;
        cartList.value.push(otherCart.value)
        userInfoShow.value = true;
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
        inquiryLoading.value = false;
    }
}


const cartProps = (item) => {
    return {
        title: item.cardNumber,
        subtitle: item.shebaNumber,
    }
}

const destCartProps = (item) => {
    return {
        title: item.cardNumber,
        subtitle: item.owner,
    }
};

const submitCharge = async () => {
    try {

        chargeLoading.value = true;
        if (depositDetail.value.CartNumber.name) {
            depositDetail.value.CartNumber = depositDetail.value.CartNumber.cardNumber;
        } else {
            depositDetail.value.CartNumber = otherCartNumber.value
        }
        const response = await WalletService.submitCharge(userDetail.value.nationalCode, depositDetail.value);
        chargeModal.value = true;
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
        chargeLoading.value = false;
    }
}


const closeChargeModal = () => {
    chargeModal.value = false;
    depositDetail.value.CartNumber = null;
    depositDetail.value.amount = null;
    depositDetail.value.date = null;
    depositDetail.value.invoiceId = null;
    depositDetail.value.time = null;
    otherCartNumber.value = null;
    userDetail.value.nationalCode = null;
    userInfoShow.value = false;
}

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

.transfer-card {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
}

.trade-modal {
    border-radius: 10px !important;
    padding: 2rem;
}

.transferModal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.transferModal-content p {
    font-size: 12px;
}

@media (min-width: 768px) {
    .transferModal-content p {
        font-size: 14px;
    }
}
</style>
