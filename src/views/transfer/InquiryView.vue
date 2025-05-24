<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card title="استعلام صندوق طلا" class="transfer-card">
                    <v-row>
                        <v-col class="d-none d-md-flex" md="2"></v-col>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="transferDetail.sender" label="کد ملی انتقال دهنده"
                                variant="outlined" :rules="nationalCodeRules" @input="validateNationalCodeSender"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-btn block color="#d4af37" size="large"  @click="inquiryWallet" :loading="inquiryLoading" >استعلام موجودی</v-btn>
                        </v-col>
                        <v-col class="d-none d-md-flex" md="2"></v-col>
                    </v-row>

                    <v-row v-if="transferInfoShow">
                        <v-col cols="6" md="3">
                            <div class="d-flex align-center">
                                <p>نام : </p>
                                <p>{{ transferInfo.firstName }}</p>
                            </div>
                        </v-col>
                        <v-col cols="6" md="3">
                            <div class="d-flex align-center">
                                <p>نام خانوادگی : </p>
                                <p>{{ transferInfo.lastName }}</p>
                            </div>
                        </v-col>
                        <v-col cols="6" md="3">
                            <div class="d-flex align-center">
                                <p>شماره همراه : </p>
                                <p>{{ transferInfo.phoneNumber }}</p>
                            </div>
                        </v-col>
                        <v-col cols="6" md="3">
                            <div class="d-flex align-center">
                                <p>کد ملی : </p>
                                <p>{{ transferInfo.nationalCode }}</p>
                            </div>
                        </v-col>
                        <v-col cols="6" md="3">
                            <div class="d-flex align-center">
                                <p>موجودی صندوق طلا : </p>
                                <p>{{ transferInfo.goldWeight }}</p>
                            </div>
                        </v-col>
                        <v-col cols="6" md="3">
                            <div class="d-flex align-center">
                                <p>در صف انتقال : </p>
                                <p>{{ transferInfo.goldBlock }}</p>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </div>

    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
        {{ errorMsg }}
    </v-alert>
</template>

<script setup>
import router from '@/plugins/router';
import WalletService from '@/services/wallet/wallet';
import { ref } from 'vue';

const errorMsg = ref('');
const alertError = ref(false);
const transferDetail = ref({
    reciever: '',
    sender: '',
    goldWeight: '',
});
const transferInfo = ref({
    firstName: '',
    lastName: '',
    nationalCode: '',
    phoneNumber: '',
    goldWeight: '',
    goldBlock: '',
});

const transferInfoShow = ref(false);
const inquiryLoading = ref(false);

const inquiryWallet = async () => {
    try {
        inquiryLoading.value = true;
        const response = await WalletService.QuiryWallet(transferDetail.value.sender);
        transferInfo.value.firstName = response.data.firstName;
        transferInfo.value.lastName = response.data.lastName;
        transferInfo.value.nationalCode = response.data.nationalCode;
        transferInfo.value.goldBlock = response.data.goldBlock;
        transferInfo.value.phoneNumber = response.data.phoneNumber;
        transferInfo.value.goldWeight = response.data.goldWeight;
        transferInfoShow.value = true;
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

const validateNationalCodeSender = () => {
    transferDetail.value.sender = transferDetail.value.sender.replace(/\D/g, '').slice(0, 10);
    nationalCodeRules.every(rule => rule(transferDetail.value.sender) === true);
};

</script>

<style scoped>
.transfer-card {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
}

.k-alert {
    position: absolute;
    top: 10px;
    left: 40%;
    font-size: 12px;
    padding: 10px !important;
    z-index: 100000;
}

.otp-input {
    direction: ltr;
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
