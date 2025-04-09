<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card title="سطح دسترسی ها">
                    <div class="px-5 py-3 d-flex justify-end">
                        <v-btn @click="AddAdminDialog = true" class="mx-2">افزودن کاربر</v-btn>
                        <v-btn color="error" class="error-btn" :loading="managmentAccessLoading"
                            @click="managmentDialogRequest">
                            دسترسی های مدیریتی
                        </v-btn>
                    </div>
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

    <v-dialog v-model="AccessPointDialog" max-width="450" class="dialog">
        <v-card class="dialog-card">
            <div class="k-dialog-title">
                <p>سطح دسترسی</p>
            </div>
            <div class="d-flex flex-column w-100 h-100 my-2">
                <div class="dialog-loading" v-if="AccessPointLoading == true">
                    <p>لطفا منتظر بمانید ... </p>
                </div>
                <div class="d-flex justify-space-between align-items-center mx-4 my-2"
                    v-for="(item, i) in AccessPointData" :key="i" v-else>
                    <span>{{ item.persianName }}</span>
                    <v-switch v-model="item.isAccess" color="#b08c4d"></v-switch>
                </div>
            </div>

            <div class="d-flex justify-space-between">
                <v-btn text="انصراف" @click="AccessPointDialog = false" size="large" class="m-3"
                    variant="outlined"></v-btn>
                <v-btn text="ثبت دسترسی" @click="SubmitAccessPoint" size="large" class="m-3"
                    :loading="submitAccessPointLoading"></v-btn>
            </div>

        </v-card>
    </v-dialog>


    <v-dialog v-model="AddAdminDialog" max-width="600" class="dialog">
        <v-card class="dialog-card">
            <div class="k-dialog-title">
                <p>افزودن ادمین جدید</p>
            </div>

            <v-form ref="form" @submit.prevent="AddAdmin">
                <v-row>
                    <v-col cols="12" md="6" class="my-4">
                        <v-text-field v-model="adminData.firstName" label="نام" variant="outlined"
                            :rules="nameRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-4">
                        <v-text-field v-model="adminData.lastName" label="نام خانوادگی" variant="outlined"
                            :rules="lastNameRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-4">
                        <v-text-field v-model="adminData.phoneNumber" label="شماره همراه" variant="outlined"
                            :rules="phoneRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-4">
                        <v-text-field v-model="adminData.password" label="رمز عبور" variant="outlined"
                            :rules="passwordRules"></v-text-field>
                    </v-col>
                </v-row>
                <div class="d-flex justify-space-between">
                    <v-btn text="انصراف" @click="AddAdminDialog = false" size="large" class="m-3"
                        variant="outlined"></v-btn>
                    <v-btn type="submit" text="افزودن" size="large" class="m-3" :loading="AddAdminLoading"></v-btn>
                </div>
            </v-form>
        </v-card>
    </v-dialog>

    <v-dialog v-model="managmentDialog" max-width="450" class="dialog">
        <v-card class="dialog-card">
            <div class="k-dialog-title">
                <p>دسترسی های مدیرتی</p>
            </div>
            <div class="d-flex flex-column w-100 h-100 my-2">
                <div class="dialog-access-loading" v-if="managmentAccessLoading == true">
                    <p>لطفا منتظر بمانید ... </p>
                </div>
                <div class="d-flex justify-space-between align-items-center mx-4 my-2" v-else>
                    <span>درگاه معاملات</span>
                    <v-switch v-model="closeTradePermission" color="#b08c4d" @click="SubmitManagmentAccess"
                        :loading="managmentAccessLoading"></v-switch>
                </div>
            </div>

            <div class="d-flex justify-space-between">
                <v-btn text="انصراف" @click="managmentDialog = false" size="large" class="m-3"
                    variant="outlined"></v-btn>
                <!-- <v-btn text="ثبت دسترسی" @click="SubmitManagmentAccess" size="large" class="m-3"
                    :loading="managmentAccessLoading"></v-btn> -->
            </div>

        </v-card>
    </v-dialog>

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
const AddAdminLoading = ref(false);
const AccessPointLoading = ref(false);
const managmentAccessLoading = ref(false);
const submitAccessPointLoading = ref(false);
const AccessPointData = ref();
const closeTradePermission = ref(false);
const AccessPointDialog = ref(false);
const managmentDialog = ref(false);
const errorMsg = ref('');
const alertError = ref(false);
const AddAdminDialog = ref(false);
const adminData = ref({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    role: 0
});

const AdminId = ref('');



const GetAdminList = async () => {
    try {
        AdminListLoading.value = true;
        const response = await ManagmentService.AdminList();
        AdminListData.value = response.data;
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
        AdminListLoading.value = false;
    }
};

const GetAccessPoints = async (id) => {
    try {
        AccessPointLoading.value = true;
        const response = await ManagmentService.AccessPoint(id);
        AccessPointData.value = response.data;
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
        AccessPointLoading.value = false;
    }
}

const managmentDialogRequest = async () => {
    try {
        managmentAccessLoading.value = true;
        const response = await ManagmentService.GetPermission();
        if (response.data == 0) {
            closeTradePermission.value = false;
        } else {
            closeTradePermission.value = true;
        }
        managmentDialog.value = true;
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
        managmentAccessLoading.value = false;
    }
}

const SubmitManagmentAccess = async () => {
    try {
        managmentAccessLoading.value = true;
        const response = await ManagmentService.TradePermission();
        AccessPointData.value = response.data;
        managmentDialog.value = false;
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
        managmentAccessLoading.value = false;
    }
};

const userInfo = async (item) => {
    AccessPointDialog.value = true;
    GetAccessPoints(item.id);
    AdminId.value = item.id;
}

const SubmitAccessPoint = async () => {
    try {
        submitAccessPointLoading.value = true;
        const response = await ManagmentService.SubmitAccessPoint(AccessPointData.value, AdminId.value);
        AccessPointDialog.value = false;
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
        submitAccessPointLoading.value = false;
    }
}

const AddAdmin = async () => {
    try {
        AddAdminLoading.value = true;
        const response = await ManagmentService.AddAdmin(adminData.value);
        AddAdminDialog.value = false;
        GetAdminList();
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
        AddAdminLoading.value = false;
    }
}

const phoneRules = [
    v => !!v || 'شماره همراه الزامی است',
    v => /^09\d{9}$/.test(v) || 'شماره معتبر نیست'
];


const passwordRules = [
    v => !!v || 'رمز عبور الزامی است',
    v => (v && v.length >= 8) || 'رمز عبور باید حداقل ۸ کاراکتر باشد',
    v => /[A-Z]/.test(v) || 'رمز عبور باید حداقل یک حرف بزرگ داشته باشد',
    v => /[a-z]/.test(v) || 'رمز عبور باید حداقل یک حرف کوچک داشته باشد',
    v => /[0-9]/.test(v) || 'رمز عبور باید حداقل یک عدد داشته باشد',
    v => /[^A-Za-z0-9]/.test(v) || 'رمز عبور باید حداقل یک کاراکتر خاص (!@#$%^&*) داشته باشد'
];

const nameRules = [
    v => !!v || 'نام الزامی است'
];


const lastNameRules = [
    v => !!v || 'نام خانوادگی الزامی است'
];

// const SwitchAccessPoint = (item) => {
//     console.log(item.isAccess)
//     console.log(AccessPointData.value)
// }

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

.dialog-loading {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog-access-loading {
    min-height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
