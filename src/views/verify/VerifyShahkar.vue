<template>
    <div>
        <v-row>
            <v-col cols="12">
                <VCard class="position-relative">
                    <v-form @submit.prevent class="pa-4 pa-md-10">
                        <div class="d-flex my-3">
                            <v-text-field v-model="credentials.number" :rules="rules" label="شماره همراه"
                                class="ml-2"></v-text-field>
                            <v-text-field v-model="credentials.date" :rules="rules" label="تاریخ تولد"
                                class="mr-2"></v-text-field>
                        </div>
                        <v-btn class="my-5 py-4" type="submit" block>استعلام</v-btn>
                        <p v-if="errormessage">{{ errormessage }}</p>
                    </v-form>
                </VCard>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import AuthService from '@/services/verify/verify';


const credentials = ref({ number: "", date: "" });
const errormessage = ref(null);


const verifyShahkar = async () => {
    try {
        const user = await AuthService.Shahkar(credentials.value);
        console.log(user);
    } catch (err) {
        errormessage.value = "faild"
    }
}


</script>

<style></style>
