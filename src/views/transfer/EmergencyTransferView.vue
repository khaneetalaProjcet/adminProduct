<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="my-2">
                <v-card class="guide-section">
                    <v-card-text>
                        <h4 class="guideSection-title">راهنمای انتقال اضطراری</h4>
                        <ul>
                            <li>شخص انتقال دهنده، حتما باید جزو کاربران احراز نشده باشد.</li>
                            <li>شخص انتقال گیرنده حتما باید جزو کاربران احراز شده باشد.</li>
                            <li>مقدر انتقال باید برابر باشد با تمام موجودی شخص انتقال دهنده.</li>
                        </ul>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" class="my-2">
                <v-card>
                    <v-card-text>
                        <h3 class="mb-2">اطلاعات انتقال دهنده</h3>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="transferData.sender" label="کد ملی" variant="outlined"
                                    :rules="nationalCodeRules" @input="validateSenderNationalCode"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-btn class="py-2" color="primary" size="large" variant="elevated" block
                                    @click="senderInquiry()" :loading="senderLoading">
                                    استعلام انتقال دهنده
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">
                                <div class="d-flex align-center justify-start">
                                    <p>نام : </p>
                                    <p>{{ sender?.firstName }}</p>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class="d-flex align-center justify-start">
                                    <p>نام خانوادگی : </p>
                                    <p>{{ sender?.lastName }}</p>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class="d-flex align-center justify-start">
                                    <p>کد ملی : </p>
                                    <p>{{ sender?.nationalCode }}</p>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class="d-flex align-center justify-start">
                                    <p>موجودی صندوق طلا : </p>
                                    <p>{{ sender?.goldWeight }} گرم</p>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class="d-flex align-center justify-start">
                                    <p class="mb-0">وضعیت : </p>
                                    <v-chip :text="sender.verificationStatus == 1 ? 'منتقل شده' : sender.verificationStatus == 2 ? 'منتقل نشده' : 'نامشخص'"
                                        :color="sender.verificationStatus == 1 ? '#00853f' : sender.verificationStatus == 2 ? '#ff0000' : '#66666'"
                                        size="small"></v-chip>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <div class="d-flex justify-center align-center">
                    <v-icon icon="ri-arrow-up-down-line" color="#000"></v-icon>
                </div>
            </v-col>
            <v-col cols="12" class="my-2">
                <v-card>
                    <v-card-text>
                        <h3 class="mb-2">اطلاعات انتقال گیرنده</h3>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="transferData.reciever" label="کد ملی" variant="outlined"
                                    :rules="nationalCodeRules" @input="validateRecieverNationalCode"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-btn class="py-2" color="primary" size="large" variant="elevated" block
                                    @click="recieverInquiry()">
                                    استعلام انتقال گیرنده
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">
                                <div class="d-flex align-center justify-start">
                                    <p>نام : </p>
                                    <p>{{ reciever?.firstName }}</p>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class="d-flex align-center justify-start">
                                    <p>نام خانوادگی : </p>
                                    <p>{{ reciever?.lastName }}</p>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class="d-flex align-center justify-start">
                                    <p>کد ملی : </p>
                                    <p>{{ reciever?.nationalCode }}</p>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class="d-flex align-center justify-start">
                                    <p>طلای در انتظار : </p>
                                    <p>{{ reciever?.goldBlock }}</p>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class="d-flex align-center justify-start">
                                    <p>موجودی صندوق طلا : </p>
                                    <p>{{ reciever?.goldWeight }} گرم</p>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" class="my-2">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="transferData.goldWeight" label="وزن (گرم)" variant="outlined"
                                    :rules="validateWeight" @input="GoldweightInput"
                                    :disabled="senderStatus != true || recieverStatus != true"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <div class="d-flex justify-end">
                                    <v-btn class="py-2 px-10" color="#c61a09" size="large" variant="elevated"
                                        :disabled="senderStatus != true || recieverStatus != true || transferData.goldWeight != sender.goldWeight"
                                        @click="transferModal = true">
                                        تایید انتقال
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-dialog v-model="transferModal" max-width="500">
        <v-card title="تایید انتقال" class="modal-card">
            <v-icon class="mt-3 mb-6" icon="ri-error-warning-fill" color="#c61a09"></v-icon>
            <h4 class="my-3">
                آیا از این انتقال مطمئن هستید؟
            </h4>
            <p class="my-3">در صورت انجام این انتقال، امکان بازگشت وجود ندارد</p>
            <div class="w-100 d-flex justify-space-between mt-4">
                <v-btn color="#c61a09" size="large" variant="outlined" @click="transferModal = false">
                    لغو
                </v-btn>
                <v-btn color="#c61a09" size="large" variant="elevated" @click="confirmTransfer"
                    :loading="confirmLoading">
                    تایید
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
    <v-dialog v-model="successModal" max-width="500">
        <v-card title="تایید انتقال" class="modal-card">
            <v-icon class="mt-3 mb-6" icon="ri-checkbox-circle-fill" color="#0b8707"></v-icon>
            <h4>
                انتقال طلا با موفقیت انجام شد
            </h4>
        </v-card>
    </v-dialog>
    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
        {{ errorMsg }}
    </v-alert>
</template>

<script setup>
import GoldBoxService from '@/services/goldBox/goldbox';
import { ref } from 'vue';


const transferData = ref({
    sender: '',
    reciever: '',
    goldWeight: '',
})
const recieverLoading = ref(false);
const senderLoading = ref(false);
const senderStatus = ref(false);
const recieverStatus = ref(false);
const transferModal = ref(false);
const alertError = ref(false);
const successModal = ref(false);
const errorMsg = ref('');
const sender = ref({
    firstName: '',
    lastName: '',
    nationalCode: '',
    goldWeight: '',
    verificationStatus: '',
});
const reciever = ref({
    firstName: '',
    lastName: '',
    nationalCode: '',
    phoneNumber: '',
    goldWeight: '',
    goldBlock: 0,
});
const confirmLoading = ref(false);



const senderInquiry = async () => {
    try {
        senderLoading.value = true;
        const response = await GoldBoxService.inquiryGoldBoxSender(transferData.value.sender);
        senderStatus.value = true;
        sender.value.firstName = response?.firstName;
        sender.value.lastName = response?.lastName;
        sender.value.nationalCode = response?.nationalCode;
        sender.value.goldWeight = response?.wallet?.goldWeight;
        sender.value.verificationStatus = response?.verificationStatus;
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
        senderLoading.value = false;
    }
}

const recieverInquiry = async () => {
    try {
        recieverLoading.value = true;
        const response = await GoldBoxService.inquiryGoldBoxReciever(transferData.value.reciever);
        recieverStatus.value = true;
        reciever.value.firstName = response.data?.firstName;
        reciever.value.lastName = response.data?.lastName;
        reciever.value.nationalCode = response.data?.nationalCode;
        reciever.value.goldWeight = response.data?.goldWeight;
        reciever.value.goldBlock = response.data?.goldBlock;
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
        recieverLoading.value = false;
    }
}

const confirmTransfer = async () => {
    try {
        confirmLoading.value = true;
        const response = await GoldBoxService.confirmTransfer(transferData.value);
        transferModal.value = false;
        submitForm();
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
        confirmLoading.value = false;
    }
}

const submitForm = async () => {
    successModal.value = true;
    setInterval(() => {
        successModal.value = false;
        transferData.value.sender = '';
        transferData.value.reciever = '';
        transferData.value.goldWeight = '';
        sender.value.firstName = '';
        sender.value.lastName = '';
        sender.value.goldWeight = '';
        sender.value.nationalCode = '';
        sender.value.verificationStatus = '';
        reciever.value.firstName = '';
        reciever.value.lastName = '';
        reciever.value.goldBlock = '';
        reciever.value.goldWeight = '';
        reciever.value.nationalCode = '';
        reciever.value.phoneNumber = '';
    }, 3000)
};


const validateSenderNationalCode = () => {
    transferData.value.sender = transferData.value.sender.replace(/\D/g, '').slice(0, 10);
    nationalCodeRules.every(rule => rule(transferData.value.sender) === true);
};

const validateRecieverNationalCode = () => {
    transferData.value.reciever = transferData.value.reciever.replace(/\D/g, '').slice(0, 10);
    nationalCodeRules.every(rule => rule(transferData.value.reciever) === true);
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

const GoldweightInput = () => {
    transferData.value.goldWeight = transferData.value.goldWeight.replace(/[^0-9.]/g, "");
}

const validateWeight = [
    (v) => !!v || 'مقدار ورودی نمی‌تواند خالی باشد',
];

</script>

<style scoped>
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

.modal-card p {
    color: #c61a09;
    font-size: 13px;
}

.k-alert {
    position: absolute;
    top: 10px;
    left: 40%;
    font-size: 12px;
    padding: 10px !important;
    z-index: 100000;
}

.guide-section {
    border: 1px solid rgba(201, 191, 6, 0.4);
}

.guide-section li {
    font-size: 12px;
    margin: 0.5rem 0;
}

.guide-section ul {
    padding-right: 1rem;
}
</style>
