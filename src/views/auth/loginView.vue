<template>
    <div>
        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>
        <div class="d-flex flex-column justify-center align-items-center">
            <img src="/logo.png" class="mx-auto my-6" max-width="228" alt="خانه طلا">
            <p class="title">پنل مدیریت خانه طلا</p>
        </div>

        <v-card class="mx-2 mx-md-auto pa-8" elevation="4" max-width="448" rounded="lg">
            <v-form ref="form" @submit.prevent="submitLogin">
                <v-text-field v-model="login.phoneNumber" label="شماره همراه" class="my-6 login-input" :rules="phoneRules"
                    @input="limitInput"></v-text-field>
                <v-text-field v-model="login.password" label="رمز عبور" class="my-6 login-input"
                    :append-inner-icon="visible ? 'ri-eye-line' : 'ri-eye-off-line'"
                    :type="visible ? 'text' : 'password'" @click:append-inner="visible = !visible"></v-text-field>

                <v-btn type="submit" class="mb-8 k-btn" color="#d4af37" size="large" :loading="loading" block>
                    ورود به پنل
                </v-btn>
            </v-form>

        </v-card>
    </div>
</template>

<script setup>
import { router } from '@/plugins/router';
import AuthService from '@/services/verify/verify';
import { ref } from 'vue';

const visible = ref(false);
const login = ref({
    phoneNumber: '',
    password: '',
});
const loading = ref(false);
const errorMsg = ref('test');
const alertError = ref(false);

const phoneRules = [
    (v) => !!v || 'شماره همراه نمی‌تواند خالی باشد',
    (v) => /^\d{11}$/.test(v) || 'شماره همراه باید 11 رقم باشد',
    (v) => v.startsWith('09') || 'شماره همراه باید با 09 شروع شود',
];


const limitInput = () => {
    login.value.phoneNumber = login.value.phoneNumber.replace(/\D/g, '').slice(0, 11);
}


const submitLogin = async () => {
    try {
        loading.value = true;
        const response = await AuthService.Login(login.value);
        router.push('/Dashboard')
        return response
    } catch (error) {
        console.log(error)
        errorMsg.value =  error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 5000)
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped>
.title {
    text-align: center;
    margin: 1rem 0;
    font-size: 24px;
}

.k-btn span {
    color: #fff;
}

.k-alert {
    position: absolute;
    top: 3%;
    left: 40%;
    width: 20%;
    font-size: 12px;
    padding: 4px !important;
}
</style>
