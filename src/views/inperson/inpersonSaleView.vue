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
                            <v-form :ref="(el) => setFormRef(el, 1)"></v-form>
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
                            <v-form :ref="(el) => setFormRef(el, 2)"></v-form>
                            <v-card-actions class="btn-box">
                                <v-btn @click="prevStep" size="large">قبلی</v-btn>
                                <!-- <v-btn @click="identity" color="primary" size="large" variant="elevated"
                                    :disabled="!isFormValid" v-if="userVerificationDetail.userVerified == false"
                                    :loading="stepTwoLoading">
                                    استعلام هویت
                                </v-btn> -->
                                <v-btn @click="nextStep" color="primary" size="large" variant="elevated"
                                    :loading="stepTwoLoading">
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
</template>

<script setup>
import { ref } from 'vue';

const steps = ref([1, 2, 3, 4]);
const step = ref(1);
const formRefs = ref({});

const isCompleted = s => s < step.value;

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
        return true;
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

</script>

<style scoped></style>
