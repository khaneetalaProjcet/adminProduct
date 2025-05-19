<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card title="انتقال طلا" class="transfer-card">
                    <v-row>
                        <v-col class="d-none d-md-flex" md="2"></v-col>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="transferDetail.sender" label="کد ملی انتقال دهنده"
                                variant="outlined" :rules="nationalCodeRules" @input="validateNationalCodeSender"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-btn block color="#d4af37" size="large" @click="inquiryWallet" :loading="inquiryLoading">استعلام موجودی</v-btn>
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
                                <p>موجودی طلا : </p>
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
                    <v-row v-if="transferInfoShow">
                        <v-col class="d-none d-md-flex" md="2"></v-col>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="transferDetail.reciever" label="کد ملی گیرنده"
                                variant="outlined" :rules="nationalCodeRules" @input="validateNationalCodeReciever"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="transferDetail.goldWeight" label="وزن طلا"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col class="d-none d-md-flex" md="2"></v-col>
                    </v-row>
                    <v-row>
                        <v-col md="4" class="d-none d-md-flex"></v-col>
                        <v-col cols="12" md="4" v-if="showOtp">
                            <div class="d-flex justify-center">
                                <v-otp-input :length="4" v-model="otp" type="number" variant="outlined"
                                    class="otp-input"></v-otp-input>
                            </div>
                        </v-col>
                        <v-col md="4" class="d-none d-md-flex"></v-col>
                    </v-row>
                    <v-row v-if="transferInfoShow">
                        <v-col cols="12">
                            <div class="d-flex justify-end">
                                <v-btn color="#d4af37" @click="createTransfer" v-if="!showOtp">ثبت انتقال</v-btn>
                                <v-btn color="#d4af37" @click="VerifyTransferOtp" v-else>تایید نهایی</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </div>

    <v-dialog max-width="500" v-model="transferModal">
        <v-card class="trade-modal">
            <div class="transferModal-content py-5">
                <h3 class="my-4">فاکتور انتقال</h3>
                <v-row>
                    <v-col cols="6" class="my-1 pa-1">
                        <div class="d-flex align-center">
                            <p>گرم انتقال :</p>
                            <p>{{ TransferInvoice.goldWeight }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1 pa-1">
                        <div class="d-flex align-center">
                            <p>شماره فاکتور :</p>
                            <p>{{ TransferInvoice.invoiceId }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1 pa-1">
                        <div class="d-flex align-center">
                            <p>تاریخ انتقال :</p>
                            <p>{{ TransferInvoice.date }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1 pa-1">
                        <div class="d-flex align-center">
                            <p>زمان انتقال :</p>
                            <p>{{ TransferInvoice.time }}</p>
                        </div>
                    </v-col>
                    <v-divider></v-divider>
                    <v-col cols="12">
                        <div class="d-flex justify-start">
                            <p class="font-weight-bold">اطلاعات انتقال دهنده</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1 pa-1">
                        <div class="d-flex align-center">
                            <p>نام :</p>
                            <p>{{ TransferInvoice.sender.firstName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1 pa-1">
                        <div class="d-flex align-center">
                            <p>نام خانوادگی :</p>
                            <p>{{ TransferInvoice.sender.lastName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1 pa-1">
                        <div class="d-flex align-center">
                            <p>کد ملی :</p>
                            <p>{{ TransferInvoice.sender.nationalCode }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1 pa-1">
                        <div class="d-flex align-center">
                            <p>موجودی :</p>
                            <p>{{ TransferInvoice.sender.goldWeight }} گرم</p>
                        </div>
                    </v-col>
                    <v-divider></v-divider>
                    <v-col cols="12">
                        <div class="d-flex justify-start">
                            <p class="font-weight-bold">اطلاعات گیرنده</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1 pa-1">
                        <div class="d-flex align-center">
                            <p>نام :</p>
                            <p>{{ TransferInvoice.reciever.firstName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1 pa-1">
                        <div class="d-flex align-center">
                            <p>نام خانوادگی :</p>
                            <p>{{ TransferInvoice.reciever.lastName }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" class="my-1 pa-1">
                        <div class="d-flex align-center">
                            <p>کد ملی :</p>
                            <p>{{ TransferInvoice.reciever.nationalCode }}</p>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <div class="d-flex justify-space-around mt-2 mb-7">
                <v-btn text="تایید انتقال" class="pay-btn" color="#9D7E3B" block :loading="transferOtpLoading"
                    @click="transferOtp"></v-btn>
            </div>
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
import WalletService from '@/services/wallet/wallet';
import { ref } from 'vue';

const errorMsg = ref('');
const alertError = ref(false);
const showOtp = ref(false);
const createTransferLoading = ref(false);
const transferOtpLoading = ref(false);
const verifyTransferOtpLoading = ref(false);
const transferModal = ref(false);
const successMsg = ref("");
const alertSuccess = ref(false);
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

const TransferInvoice = ref({
    id: "",
    time: "",
    date: "",
    goldWeight: "",
    invoiceId: "",
    reciever: {
        firstName: "",
        lastName: "",
        nationalCode: "",
    },
    sender: {
        firstName: "",
        lastName: "",
        nationalCode: "",
        goldWeight: "",
    },
});
const otp = ref();
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

const createTransfer = async () => {
    try {
        createTransferLoading.value = true;
        const response = await WalletService.CreateTransfer(transferDetail.value);
        transferModal.value = true;
        TransferInvoice.value = response.data;
        TransferInvoice.value.id = response.data.id;
        TransferInvoice.value.invoiceId = response.data.invoiceId;
        TransferInvoice.value.date = response.data.date;
        TransferInvoice.value.time = response.data.time;
        TransferInvoice.value.sender.firstName = response.data.sender.firstName;
        TransferInvoice.value.sender.lastName = response.data.sender.lastName;
        TransferInvoice.value.sender.nationalCode =
            response.data.sender.nationalCode;
        TransferInvoice.value.sender.goldWeight =
            response.data.sender.wallet.goldWeight;
        TransferInvoice.value.reciever.firstName = response.data.reciever.firstName;
        TransferInvoice.value.reciever.lastName = response.data.reciever.lastName;
        TransferInvoice.value.reciever.nationalCode =
            response.data.reciever.nationalCode;
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
        createTransferLoading.value = false;
    }
}

const transferOtp = async () => {
    try {
        transferOtpLoading.value = true;
        const response = await WalletService.TransferOtp(TransferInvoice.value.id);
        transferModal.value = false;
        showOtp.value = true;
        // startTransferTimer();
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
        transferOtpLoading.value = false;
    }
};

const VerifyTransferOtp = async () => {
    try {
        verifyTransferOtpLoading.value = true;
        const response = await WalletService.VerifyTransferOtp(
            otp.value,
            TransferInvoice.value.id
        );
        showOtp.value = false;
        transferInfoShow.value = false;
        transferDetail.value.sender = null;
        transferDetail.value.reciever = null;
        transferDetail.value.goldWeight = null;
        successMsg.value = response.msg;
        alertSuccess.value = true;

        setTimeout(() => {
            alertSuccess.value = false;
        }, 5000);
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
        verifyTransferOtpLoading.value = false;
    }
};


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

const validateNationalCodeReciever = () => {
    transferDetail.value.reciever = transferDetail.value.reciever.replace(/\D/g, '').slice(0, 10);
    nationalCodeRules.every(rule => rule(transferDetail.value.reciever) === true);
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
