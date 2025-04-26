<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card title="درخواست همکاری">
                    <template v-slot:text>
                        <v-text-field v-model="search" label="جستجو" prepend-inner-icon="ri-search-line"></v-text-field>
                    </template>

                    <v-data-table :headers="recruitmentHeader" :items="recruitmentData" :search="search"
                        :loading="recruitmentLoading">
                        <template v-slot:item.wallet.balance="{ item }">
                            <p>{{ formatNumber(item.wallet.balance) }}</p>
                        </template>
                        <template v-slot:item.relevantExperience="{ item }">
                            <v-icon size="small" icon="ri-close-line" color="#c9190c"
                                v-if="item.relevantExperience == false"></v-icon>
                            <v-icon size="small" icon="ri-check-line" color="#0b8707"
                                v-else-if="item.relevantExperience == true"></v-icon>
                        </template>
                        <template v-slot:item.action="{ item }">
                            <v-icon class="me-2" size="small" icon="ri-information-line" color="#d4af37"
                                @click="RecruitmentInfo(item)"></v-icon>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>

        <!-- recruitment info modal -->
        <v-dialog v-model="recruitmentInfoDialog" max-width="600" class="dialog">
            <v-card class="dialog-card">
                <div class="k-dialog-title">
                    <p>اطلاعات کاربر</p>
                </div>
                <div
                    class="d-flex flex-column flex-md-row justify-space-between w-100 px-4 py-8 recruitment-dialog-info">
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>نام: </p>
                            <p class="mx-2">{{ recruitmentInfo.firstName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>نام خانوادگی: </p>
                            <p class="mx-2">{{ recruitmentInfo.lastName }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>شماره همراه: </p>
                            <p class="mx-2">{{ recruitmentInfo.phoneNumber }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>استان: </p>
                            <p class="mx-2">{{ recruitmentInfo.province }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>انگیزه همکاری: </p>
                            <p class="mx-2">{{ recruitmentInfo.motivation }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>علایق: </p>
                            <p class="mx-2">{{ recruitmentInfo.interests }}</p>
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100 px-4">
                        <div class="d-flex align-items-center my-2">
                            <p>تاریخ تولد: </p>
                            <p class="mx-2">{{ recruitmentInfo.birthDate }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>کد ملی: </p>
                            <p class="mx-2">{{ recruitmentInfo.nationalCode }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>سابقه کاری: </p>
                            <v-icon icon="ri-close-line" color="#c9190c"
                                v-if="recruitmentInfo.relevantExperience == false"></v-icon>
                            <v-icon icon="ri-check-line" color="#0b8707"
                                v-else-if="recruitmentInfo.relevantExperience == true"></v-icon>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>طریق آشنایی: </p>
                            <p class="mx-2">{{ recruitmentInfo.howToKnow }}</p>
                        </div>
                        <div class="d-flex align-items-center my-2">
                            <p>شهر: </p>
                            <p class="mx-2">{{ recruitmentInfo.city }}</p>
                        </div>
                    </div>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="بستن" @click="recruitmentInfoDialog = false" size="large" class="m-3"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>
    </div>
</template>

<script setup>
import { router } from '@/plugins/router';
import recruitmentService from '@/services/recruitment/recruitment';
import { onMounted, ref } from 'vue';

const recruitmentLoading = ref(false);
const search = ref('');
const errorMsg = ref('');
const alertError = ref(false);
const recruitmentData = ref();
const recruitmentInfoDialog = ref(false);
const recruitmentHeader = ref([
    {
        title: 'نام',
        key: 'firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'lastName',
    },
    {
        title: 'شماره همراه',
        key: 'phoneNumber',
    },
    {
        title: 'شماره همراه',
        key: 'phoneNumber',
    },
    {
        title: 'استان',
        key: 'province',
    },
    {
        title: 'شهر',
        key: 'city',
    },
    {
        title: 'سابقه کار مرتبط',
        key: 'relevantExperience'
    },
    {
        title: 'فعالیت',
        key: 'action'
    }
]);

const recruitmentInfo = ref();


const Getrecruitment = async () => {
    try {
        recruitmentLoading.value = true;
        const response = await recruitmentService.AllRecruitment()
        recruitmentData.value = response.data;
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
        recruitmentLoading.value = false;
    }
};


const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const RecruitmentInfo = (item) => {
    recruitmentInfoDialog.value = true;
    console.log(item)
    recruitmentInfo.value = item;
}

onMounted(() => {
    Getrecruitment();
})


</script>

<style scoped>
.k-alert {
    position: absolute;
    top: 10px;
    left: 40%;
    font-size: 12px;
    padding: 10px !important;
    z-index: 10000;
}

.recruitment-price {
    font-weight: bold;
}

.dialog-card {
    padding: 0.5rem !important;
}

.k-dialog-title {
    border-radius: 0.5rem 0.5rem 0 0 !important;
    background-color: #d4af37;
    padding: 0.5rem;
}

.k-dialog-title p {
    margin: 0.5rem;
    font-size: 18px;
    color: #fff;
}

.recruitment-dialog-info {
    font-size: 14px;
}
</style>
