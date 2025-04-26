<template>
    <div>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" align-tabs="center">
                    <v-tab value="one">فعالیت های کارشناسان</v-tab>
                    <v-tab value="two">فعالیت های کاربران</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12">
                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="one">
                            <v-card title="کارشناسان">
                                <template v-slot:text>
                                    <v-text-field v-model="userActivitySearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>

                                <v-data-table :headers="ActivityHeader" :items="userActivityData"
                                    :search="userActivitySearch" :loading="userActivityLoading">
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>

                        <v-tabs-window-item value="two">
                            <v-card title="کاربران">
                                <template v-slot:text>
                                    <v-text-field v-model="expertActivitySearch" label="جستجو"
                                        prepend-inner-icon="ri-search-line"></v-text-field>
                                </template>
                                <v-data-table :headers="ExpertActivityHeader" :items="expertActivityData"
                                    :search="expertActivitySearch" :loading="expertActivityLoading">
                                </v-data-table>
                            </v-card>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-text>
            </v-col>
        </v-row>

        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>
    </div>
</template>

<script setup>
import { router } from '@/plugins/router';
import ManagmentService from '@/services/managment/managment';
import { onMounted, ref } from 'vue';

const userActivityLoading = ref(false);
const expertActivityLoading = ref(false);
const userActivitySearch = ref('');
const expertActivitySearch = ref('');
const tab = ref(null);
const errorMsg = ref('');
const alertError = ref(false);
const userActivityData = ref();
const expertActivityData = ref();
const ActivityHeader = ref([
    {
        title: 'عنوان',
        key: 'title',
    },
    {
        title: 'توضیحات',
        key: 'description',
    },
    {
        title: 'تاریخ',
        key: 'date',
    },
    {
        title: 'زمان',
        key: 'time',
    },
]);


const ExpertActivityHeader = ref([
    {
        title: 'عنوان',
        key: 'title',
    },
    {
        title: 'توضیحات',
        key: 'description',
    },
    {
        title: 'تاریخ',
        key: 'date',
    },
    {
        title: 'زمان',
        key: 'time',
    },
]);



const userActivity = async () => {
    try {
        userActivityLoading.value = true;
        const response = await ManagmentService.GetUserActivity();
        userActivityData.value = response.data;
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
        userActivityLoading.value = false;
    }
};

const expertActivity = async () => {
    try {
        expertActivityLoading.value = true;
        const response = await ManagmentService.GetExpertActivity();
        expertActivityData.value = response.data;
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
        expertActivityLoading.value = false;
    }
};

onMounted(() => {
    userActivity();
    expertActivity();
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

.user-price {
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

.user-dialog-info {
    font-size: 14px;
}
</style>
