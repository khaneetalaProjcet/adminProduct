<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card title="سطح دسترسی ها">
                    <template v-slot:text>
                        <v-text-field v-model="AdminListSearch" label="جستجو"
                            prepend-inner-icon="ri-search-line"></v-text-field>
                    </template>
                    <v-data-table :headers="AdminListHeader" :items="AdminListData" :search="AdminListSearch"
                        :loading="AdminListLoading">
                        <template v-slot:item.isBlocked="{ item }">
                            <v-icon size="small" icon="ri-close-line" color="#c9190c"
                                v-if="item.isBlocked == true"></v-icon>
                            <v-icon size="small" icon="ri-check-line" color="#0b8707"
                                v-else-if="item.isBlocked == false"></v-icon>
                        </template>
                        <template v-slot:item.role="{ item }">
                            <span v-if="item.role == true" class="table-green">مدیر</span>
                            <span v-else-if="item.role == false" class="table-red">کارشناس</span>
                        </template>
                        <template v-slot:item.action="{ item }">
                            <v-icon class="me-2" size="small" icon="ri-user-settings-line" color="#d4af37"
                                @click="userInfo(item)"></v-icon>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
        {{ errorMsg }}
    </v-alert>
</template>

<script setup>
import ManagmentService from '@/services/managment/managment';
import { onMounted, ref } from 'vue';

const AdminListHeader = ref([
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
        title: 'نقش',
        key: 'role',
    },
    {
        title: 'اکتیو',
        key: 'isBlocked',
    },
    {
        title: 'فعالیت',
        key: 'action',
    },
]);
const AdminListData = ref([]);
const AdminListSearch = ref('');
const AdminListLoading = ref(false);
const errorMsg = ref('');
const alertError = ref(false);



const GetAdminList = async () => {
    try {
        AdminListLoading.value = true;
        const response = await ManagmentService.AdminList();
        AdminListData.value = response.data;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.error || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        AdminListLoading.value = false;
    }
};


const userInfo = async (item) => {
    console.log(item)
}


onMounted(() => {
    GetAdminList();
})

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

.table-green {
    color: #0b8707;
}

.table-red {
    color: #c9190c;
}
</style>
