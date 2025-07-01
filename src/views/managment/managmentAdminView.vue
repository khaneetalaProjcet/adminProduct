<template>
    <v-container>
        <v-row>

            <v-col cols="12">

                <v-card title="سطح دسترسی ها">

                    <div class="px-5 py-3 d-flex justify-end">
                        <v-btn @click="AddAdminDialog = true" class="mx-2">افزودن کارشناس</v-btn>
                        <v-btn color="error" class="error-btn" :loading="managmentAccessLoading"
                            @click="managmentDialogRequest">
                            مدیریت بازار
                        </v-btn>
                    </div>
                    <template v-slot:text>
                        <ul class="listGuide">
                            <li>
                                قابلیت اضافه کردن کاربر و تعیین مجوزهای مورد نیاز برای هر کاربر وجود دارد.
                            </li>
                        </ul>
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
                            <v-icon class="me-2" size="small" icon="ri-delete-bin-line" color="#c9190c"
                                @click="deleteAdmin(item)"></v-icon>
                            <v-icon class="me-2" size="small" icon="ri-refresh-line" color="#c9190c"
                                @click="updateAdmin(item)"></v-icon>
                        </template>
                        <template v-slot:item.status="{ item }">
                            <v-switch v-model="item.isBlocked" color="#b08c4d" @input="switchActivateAdmin(item)"
                                :loading="SwitchAdminLoading"></v-switch>
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
                        <v-text-field v-model="adminData.password" label="رمز عبور" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-2">
                        <v-text-field v-model="adminData.userName" label="نام کاربری" variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <div class="d-flex justify-space-between mt-5">
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
                <div class="d-flex flex-column" v-else>
                    <div class="d-flex justify-space-between align-items-center mx-4 my-2">
                        <span>درگاه معاملات</span>
                        <!-- <v-switch v-model="closeTradePermission" color="#b08c4d" @click="SubmitManagmentAccess"
                            :loading="managmentAccessLoading"></v-switch> -->
                        <div>
                            <v-chip :prepend-icon="closeTradePermission == 1 ? 'ri-check-double-line' : 'ri-close-line'"
                                :text="closeTradePermission == 1 ? 'فعال' : 'غیر فعال'"
                                :color="closeTradePermission == 1 ? '#1B5E20' : '#B71C1C'" class="me-2"></v-chip>
                            <v-btn size="small" color="#b18d4d" variant="elevated" :loading="managmentAccessLoading"
                                @click="accessOtp('TradePermission')">تغییر وضعیت</v-btn>
                        </div>
                    </div>
                    <div class="d-flex justify-space-between align-items-center mx-4 my-2">
                        <span>احراز هویت</span>
                        <!-- <v-switch v-model="AuthData" color="#b08c4d" @click="SubmitAuth"
                            :loading="managmentAuthLoading"></v-switch> -->
                        <div>
                            <v-chip :prepend-icon="AuthData == 1 ? 'ri-check-double-line' : 'ri-close-line'"
                                :text="AuthData == 1 ? 'فعال' : 'غیر فعال'"
                                :color="AuthData == 1 ? '#1B5E20' : '#B71C1C'" class="me-2"></v-chip>
                            <v-btn size="small" color="#b18d4d" variant="elevated" :loading="managmentAuthLoading"
                                @click="accessOtp('AuthPermission')">تغییر وضعیت</v-btn>
                        </div>
                    </div>
                    <div class="d-flex justify-space-between align-items-center mx-4 my-2">
                        <span>واریز</span>
                        <!-- <v-switch v-model="DepositData" color="#b08c4d" @click="SubmitDeposit"
                            :loading="managmentDepositLoading"></v-switch> -->
                        <div>
                            <v-chip :prepend-icon="DepositData == 1 ? 'ri-check-double-line' : 'ri-close-line'"
                                :text="DepositData == 1 ? 'فعال' : 'غیر فعال'"
                                :color="DepositData == 1 ? '#1B5E20' : '#B71C1C'" class="me-2"></v-chip>
                            <v-btn size="small" color="#b18d4d" variant="elevated" :loading="managmentDepositLoading"
                                @click="accessOtp('DepositPermission')">تغییر وضعیت</v-btn>
                        </div>
                    </div>
                    <div class="d-flex justify-space-between align-items-center mx-4 my-2">
                        <span>برداشت</span>
                        <!-- <v-switch v-model="WithdrawtData" color="#b08c4d" @click="SubmitWithdraw"
                            :loading="managmentWithdrawLoading"></v-switch> -->
                        <div>
                            <v-chip :prepend-icon="WithdrawtData == 1 ? 'ri-check-double-line' : 'ri-close-line'"
                                :text="WithdrawtData == 1 ? 'فعال' : 'غیر فعال'"
                                :color="WithdrawtData == 1 ? '#1B5E20' : '#B71C1C'" class="me-2"></v-chip>
                            <v-btn size="small" color="#b18d4d" variant="elevated" :loading="managmentWithdrawLoading"
                                @click="accessOtp('WithdrawPermission')">تغییر وضعیت</v-btn>
                        </div>
                    </div>
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

    <v-dialog v-model="deleteDialog" width="auto">
        <v-card width="400" prepend-icon="mdi-delete" text="آیا از حذف ادمین مطمئن هستید؟" title="حذف ادمین">
            <template v-slot:actions>
                <v-btn class="ms-auto" text="حذف" @click="submitDeleteAdmin" :loading="AdminDeleteLoading"></v-btn>
            </template>
        </v-card>
    </v-dialog>

    <v-dialog v-model="updateAdminDialog" max-width="600" class="dialog">
        <v-card class="dialog-card">
            <div class="k-dialog-title">
                <p>به روزرسانی ادمین</p>
            </div>

            <v-form ref="form" @submit.prevent="UpdateAdmin">
                <v-row class="mt-2">
                    <v-col cols="12" md="6" class="my-2">
                        <v-text-field v-model="adminUpdateDetail.firstName" label="نام" variant="outlined"
                            :rules="nameRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-2">
                        <v-text-field v-model="adminUpdateDetail.lastName" label="نام خانوادگی" variant="outlined"
                            :rules="lastNameRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-2">
                        <v-text-field v-model="adminUpdateDetail.phoneNumber" label="شماره همراه" variant="outlined"
                            :rules="phoneRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-2">
                        <v-text-field v-model="adminUpdateDetail.newPassword" label="رمز عبور جدید"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-2">
                        <v-text-field v-model="adminUpdateDetail.userName" label="نام کاربری"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-2">
                        <v-checkbox v-model="adminUpdateDetail.role" false-value="0" :true-value="1"
                            label="مدیر"></v-checkbox>
                    </v-col>
                </v-row>
                <div class="d-flex justify-space-between my-2">
                    <v-btn text="انصراف" @click="updateAdminDialog = false" size="large" class="m-3"
                        variant="outlined"></v-btn>
                    <v-btn type="submit" text="افزودن" size="large" class="m-3" :loading="AdminUpdateLoading"></v-btn>
                </div>
            </v-form>
        </v-card>
    </v-dialog>


    <v-dialog v-model="otpManagmentDialog" max-width="450" class="dialog" persistent>
        <v-card class="dialog-card">
            <div class="k-dialog-title">
                <p>تایید مدیریت</p>
            </div>
            <p class="my-5">لطفا کد ارسال شده را وارد نمایید</p>
            <div class="d-flex justify-center my-5 py-1">
                <v-otp-input :length="4" v-model="otp" type="number" variant="outlined" class="otp-input"></v-otp-input>
            </div>
            <div class="d-flex justify-space-between mt-6">
                <v-btn text="انصراف" @click="otpManagmentDialog = false" size="large" class="m-3"
                    variant="outlined"></v-btn>
                <v-btn text="ثبت دسترسی" @click="SubmitManagmentAccess" size="large" class="m-3"
                    :loading="managmentAccessLoading"></v-btn>
            </div>

        </v-card>
    </v-dialog>



    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
        {{ errorMsg }}
    </v-alert>


</template>

<script setup>
import { router } from '@/plugins/router';
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
        title: 'نام کاربری',
        key: 'userName',
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
    {
        title: 'بلاک شده',
        key: 'status',
    },
]);
const AdminListData = ref([]);
const AdminListSearch = ref('');
const AdminListLoading = ref(false);
const AddAdminLoading = ref(false);
const SwitchAdminLoading = ref(false);
const AccessPointLoading = ref(false);
const managmentAccessLoading = ref(false);
const submitAccessPointLoading = ref(false);
const AdminDeleteLoading = ref(false);
const managmentAuthLoading = ref(false);
const managmentDepositLoading = ref(false);
const managmentWithdrawLoading = ref(false);
const AccessPointData = ref();
const otpManagmentDialog = ref(false);
const otp = ref('');
const permissionLoading = ref(false);
const otpSubmitLoading = ref(false);
const otpType = ref('');
const AuthData = ref();
const DepositData = ref();
const WithdrawtData = ref();
const closeTradePermission = ref();
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
    userName: '',
    role: 0
});
const deleteDialog = ref(false);
const updateAdminDialog = ref(false);
const AdminUpdateLoading = ref(false);
const AdminDeleteDetail = ref();
const adminUpdateDetail = ref({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    newPassword: '',
    userName: '',
    role: '0',
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
        // if (response.data == 0) {
        //     closeTradePermission.value = false;
        // } else {
        //     closeTradePermission.value = true;
        // }
        AuthData.value = !!response.data.registerPermision;
        DepositData.value = !!response.data.depositPermision;
        WithdrawtData.value = !!response.data.withdrawPermision;
        closeTradePermission.value = !!response.data.tradePermision;
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


// const passwordRules = [
//     v => /[A-Z]/.test(v) || 'رمز عبور باید حداقل یک حرف بزرگ داشته باشد',
//     v => /[a-z]/.test(v) || 'رمز عبور باید حداقل یک حرف کوچک داشته باشد',
//     v => /[0-9]/.test(v) || 'رمز عبور باید حداقل یک عدد داشته باشد',
//     v => /[^A-Za-z0-9]/.test(v) || 'رمز عبور باید حداقل یک کاراکتر خاص (!@#$%^&*) داشته باشد'
// ];

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

const switchActivateAdmin = async (item) => {
    try {
        SwitchAdminLoading.value = true;
        const response = await ManagmentService.SwitchAdminActivator(item.id);
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
        SwitchAdminLoading.value = false;
    }
}

const deleteAdmin = (item) => {
    AdminDeleteDetail.value = item;
    deleteDialog.value = true;
}

const updateAdmin = (item) => {
    AdminId.value = item.id;
    adminUpdateDetail.value.firstName = item.firstName;
    adminUpdateDetail.value.lastName = item.lastName;
    adminUpdateDetail.value.phoneNumber = item.phoneNumber;
    adminUpdateDetail.value.role = item.role;
    adminUpdateDetail.value.userName = item.userName;
    updateAdminDialog.value = true;
}

const UpdateAdmin = async () => {
    try {
        AdminUpdateLoading.value = true;
        const response = await ManagmentService.UpdateAdmin(adminUpdateDetail.value, AdminId.value);
        updateAdminDialog.value = false;
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
        AdminUpdateLoading.value = false;
    }
}

const submitDeleteAdmin = async () => {
    try {
        AdminDeleteLoading.value = true;
        const response = await ManagmentService.DeleteAdmin(AdminDeleteDetail.value.id);
        deleteDialog.value = false;
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
        AdminDeleteLoading.value = false;
    }
}

const accessOtp = async (type) => {
    try {
        if (type == 'TradePermission') {
            managmentAccessLoading.value = true;
            otpType.value = 'trade';
        } else if (type == 'DepositPermission') {
            managmentAuthLoading.value = true;
            otpType.value = 'deposit';
        } else if (type == 'AuthPermission') {
            managmentDepositLoading.value = true;
            otpType.value = 'register';
        } else if (type == 'WithdrawPermission') {
            otpType.value = 'withdraw';
            managmentWithdrawLoading.value = true;
        }
        const response = await ManagmentService.otpAccess(otpType.value);
        otpManagmentDialog.value = true;
        return response
    } catch (error) {
        console.log(error)
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
        managmentAuthLoading.value = false;
        managmentDepositLoading.value = false;
        managmentWithdrawLoading.value = false;
    }
}

const SubmitManagmentAccess = async () => {
    console.log(otpType.value)
    if (otpType.value == 'trade') {
        SubmitTrade();
    } else if (otpType.value == 'deposit') {
        SubmitDeposit();
    } else if (otpType.value == 'register') {
        SubmitAuth();
    } else if (otpType.value == 'withdraw') {
        SubmitWithdraw();
    }
};


const SubmitAuth = async () => {
    try {
        managmentAccessLoading.value = true;
        const response = await ManagmentService.AuthPermission(otp.value);
        managmentDialog.value = false;
        otpManagmentDialog.value = false;
        otp.value = '';
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

const SubmitDeposit = async () => {
    try {
        managmentAccessLoading.value = true;
        const response = await ManagmentService.DepositPermission(otp.value);
        managmentDialog.value = false;
        otpManagmentDialog.value = false;
        otp.value = '';
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

const SubmitWithdraw = async () => {
    try {
        managmentAccessLoading.value = true;
        const response = await ManagmentService.WithdrawPermission(otp.value);
        managmentDialog.value = false;
        otpManagmentDialog.value = false;
        otp.value = '';
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

const SubmitTrade = async () => {
    try {
        managmentAccessLoading.value = true;
        const response = await ManagmentService.TradePermission(otp.value);
        managmentDialog.value = false;
        otpManagmentDialog.value = false;
        otp.value = '';
        return response
    } catch (error) {
        console.log(error)
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

.listGuide {
    font-size: 12px;
    color: #2c3e50;
    font-weight: 500px;
    margin: 0.2rem;
    margin-bottom: 2rem;
    margin-right: 0.7rem;
    margin-left: 1rem;
}

.otp-input {
    direction: ltr;
}
</style>
