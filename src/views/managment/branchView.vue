<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card title="شعبه ها">
                        <div class="px-5 py-3 d-flex justify-end">
                            <v-btn @click="AddBranchDialog = true" class="mx-2">افزودن شعبه</v-btn>
                        </div>
                        <template v-slot:text>
                            <v-text-field v-model="BranchListSearch" label="جستجو"
                                prepend-inner-icon="ri-search-line"></v-text-field>
                        </template>
                        <v-data-table :headers="BranchListHeader" :items="BranchListData" :search="BranchListSearch"
                            :loading="BranchListLoading">
                            <template v-slot:item.action="{ item }">
                                <v-icon class="me-2" size="small" icon="ri-store-line" color="#d4af37"
                                    @click="BranchInfo(item)"></v-icon>
                                <v-icon class="me-2" size="small" icon="ri-delete-bin-line" color="#c9190c"
                                    @click="BranchDelete(item)"></v-icon>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>

    <v-dialog v-model="AddBranchDialog" max-width="600" class="dialog">
        <v-card class="dialog-card">
            <div class="k-dialog-title">
                <p>افزودن شعبه جدید</p>
            </div>

            <v-form ref="form" v-model="isFormValid" @submit.prevent="AddBranch">
                <v-row>
                    <v-col cols="12" md="6" class="my-4">
                        <v-text-field v-model="AddBranchData.name" label="نام شعبه" variant="outlined"
                            :rules="branchRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-4">
                        <v-text-field v-model="AddBranchData.code" label="کد شعبه" variant="outlined"
                            :rules="branchRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-4">
                        <v-text-field v-model="AddBranchData.manager" label="مدیر شعبه" variant="outlined"
                            :rules="branchRules"></v-text-field>
                    </v-col>
                </v-row>
                <div class="d-flex justify-space-between">
                    <v-btn text="انصراف" @click="AddBranchDialog = false" size="large" class="m-3"
                        variant="outlined"></v-btn>
                    <v-btn type="submit" text="افزودن" size="large" class="m-3" :loading="AddBranchLoading"
                        :disabled="!isFormValid"></v-btn>
                </div>
            </v-form>
        </v-card>
    </v-dialog>

    <v-dialog v-model="branchSheet" transition="dialog-bottom-transition" fullscreen>
        <v-card>
            <div class="d-flex justify-end pa-5">
                <v-btn variant="text" icon="ri-close-large-line" @click="branchSheet = false"></v-btn>
            </div>
            <v-container>
                <v-row class="wallet-info-box">
                    <v-col cols="12">
                        <div class="d-flex justify-end">
                            <v-btn @click="sellerDialog = true" class="mx-2">افزودن فروشنده</v-btn>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-3">
                        <div class="content">
                            <p class="title">نام شعبه: </p>
                            <p class="desc">{{ BranchDetail.name }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-3">
                        <div class="content">
                            <p class="title">کد شعبه: </p>
                            <p class="desc">{{ BranchDetail.code }}</p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" class="my-3">
                        <div class="content">
                            <p class="title">مدیریت شعبه: </p>
                            <p class="desc">{{ BranchDetail.manager }}</p>
                        </div>
                    </v-col>
                    <v-col cols="12" class="my-2">
                        <v-data-table :headers="sellerListHeader" :items="sellerList" :loading="BranchSellerLoading">
                            <template v-slot:item.action="{ item }">
                                <v-icon class="me-2" size="small" icon="ri-delete-bin-line" color="#c9190c"
                                    @click="SellerDelete(item)"></v-icon>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>

    <v-dialog v-model="sellerDialog" max-width="600" class="dialog">
        <v-card class="dialog-card">
            <div class="k-dialog-title">
                <p>افزودن کارمند جدید</p>
            </div>

            <v-form ref="form" v-model="isSellerValid" @submit.prevent="AddSeller">
                <v-row>
                    <v-col cols="12" md="6" class="my-4">
                        <v-text-field v-model="addSellerDetail.firstName" label="نام" variant="outlined"
                            :rules="branchRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-4">
                        <v-text-field v-model="addSellerDetail.lastName" label="نام خانوادگی" variant="outlined"
                            :rules="branchRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-4">
                        <v-text-field v-model="addSellerDetail.phoneNumber" label="شماره همراه" variant="outlined"
                            :rules="phoneRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-4">
                        <v-text-field v-model="addSellerDetail.nationalCode" label="کد ملی" variant="outlined"
                            :rules="nationalCodeRules"></v-text-field>
                    </v-col>
                </v-row>
                <div class="d-flex justify-space-between">
                    <v-btn text="انصراف" @click="sellerDialog = false" size="large" class="m-3"
                        variant="outlined"></v-btn>
                    <v-btn type="submit" text="افزودن" size="large" class="m-3" :loading="AddSellerLoading"
                        :disabled="!isSellerValid"></v-btn>
                </div>
            </v-form>
        </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" width="auto">
        <v-card width="400" prepend-icon="mdi-delete" text="آیا از حذف شعبه مطمئن هستید؟" title="حذف شعبه">
            <template v-slot:actions>
                <v-btn class="ms-auto" text="حذف" @click="submitDeleteBranch" :loading="BranchDeleteLoading"></v-btn>
            </template>
        </v-card>
    </v-dialog>

    <v-dialog v-model="deleteSellerDialog" width="auto">
        <v-card width="400" prepend-icon="mdi-delete" text="آیا از حذف کارشناس مطمئن هستید؟" title="حذف کارشناس">
            <template v-slot:actions>
                <v-btn class="ms-auto" text="حذف" @click="submitDeleteBranch" :loading="BranchDeleteLoading"></v-btn>
            </template>
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
import ManagmentService from '@/services/managment/managment';
import { onMounted, ref } from 'vue';


const AddBranchDialog = ref(false);
const deleteDialog = ref(false);
const deleteSellerDialog = ref(false);
const branchSheet = ref(false);
const BranchListSearch = ref('');
const errorMsg = ref('');
const alertError = ref(false);
const successMsg = ref("");
const alertSuccess = ref(false);
const isFormValid = ref(false);
const isSellerValid = ref(false);
const AddBranchLoading = ref(false);
const AddSellerLoading = ref(false);
const BranchDeleteLoading = ref(false);
const SellerDeleteLoading = ref(false);
const BranchSellerLoading = ref(false);
const BranchDetail = ref({});
const SellerDetail = ref({});
const BranchListHeader = ref([
    {
        title: 'id',
        key: 'id',
    },
    {
        title: 'نام شعبه',
        key: 'name',
    },
    {
        title: 'کد شعبه',
        key: 'code',
    },
    {
        title: 'مدیر',
        key: 'manager',
    },
    {
        title: 'اطلاعات',
        key: 'action',
    },
]);
const addSellerDetail = ref({
    firstName: null,
    lastName: null,
    phoneNumber: null,
    nationalCode: null,
})
const sellerDialog = ref(false);
const sellerList = ref([]);
const sellerListHeader = ref([
    {
        title: 'نام',
        key: 'firstName',
    },
    {
        title: 'نام خانوادگی',
        key: 'lastName',
    },
    {
        title: 'شماره موبایل',
        key: 'phoneNumber',
    },
    {
        title: 'کد ملی',
        key: 'nationalCode',
    },
    {
        title: 'فعالیت',
        key: 'action',
    },

]);
const BranchListData = ref([]);
const BranchListLoading = ref(false);
const AddBranchData = ref({
    manager: null,
    code: null,
    name: null,
})



const GetBranchList = async () => {
    try {
        BranchListLoading.value = true;
        const response = await ManagmentService.BranchList();
        BranchListData.value = response.data;
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
        BranchListLoading.value = false;
    }
}

const AddBranch = async () => {
    try {
        AddBranchLoading.value = true;
        const response = await ManagmentService.AddBranch(AddBranchData.value);
        AddBranchDialog.value = false;
        successMsg.value = response.msg;
        alertSuccess.value = true;
        GetBranchList();
        setTimeout(() => {
            alertSuccess.value = false;
        }, 10000)
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
        AddBranchLoading.value = false;
    }
}

const BranchInfo = async (item) => {
    BranchDetail.value = item;
    branchSheet.value = true;
    GetSellers(BranchDetail.value.id)
}

const BranchDelete = (item) => {
    BranchDetail.value = item;
    deleteDialog.value = true;
}

const submitDeleteBranch = async () => {
    try {
        BranchDeleteLoading.value = true;
        const response = await ManagmentService.DeleteBranch(BranchDetail.value.id);
        deleteDialog.value = false;
        GetBranchList();
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
        BranchDeleteLoading.value = false;
    }
}

const SellerDelete = (item) => {
    SellerDetail.value = item;
    deleteSellerDialog.value = true;
}

const submitDeleteSeller = async () => {
    try {
        SellerDeleteLoading.value = true;
        const response = await ManagmentService.DeleteSeller(SellerDetail.value.id);
        sellerDialog.value = false;
        GetSellers();
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
        SellerDeleteLoading.value = false;
    }
}

const GetSellers = async (id) => {
    try {
        BranchSellerLoading.value = true;
        const response = await ManagmentService.SellerList(id);
        sellerList.value = response.data;
        setTimeout(() => {
            alertSuccess.value = false;
        }, 10000)
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
        BranchSellerLoading.value = false;
    }
}

const AddSeller = async () => {
    try {
        AddSellerLoading.value = true;
        const response = await ManagmentService.AddSeller(addSellerDetail.value, BranchDetail.value.id);
        sellerDialog.value = false;
        successMsg.value = response.msg;
        alertSuccess.value = true;
        GetSellers(BranchDetail.value.id);
        setTimeout(() => {
            alertSuccess.value = false;
        }, 10000)
        addSellerDetail.value.firstName = null;
        addSellerDetail.value.lastName = null;
        addSellerDetail.value.phoneNumber = null;
        addSellerDetail.value.nationalcode = null;
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
        AddSellerLoading.value = false;
    }
}

const branchRules = [
    v => !!v || 'این فیلد الزامی است'
];

const phoneRules = [
    v => !!v || 'شماره همراه الزامی است',
    v => /^09\d{9}$/.test(v) || 'شماره معتبر نیست'
];

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


onMounted(() => {
    GetBranchList()
})
</script>

<style scoped>
.k-alert {
    position: absolute;
    top: 10px;
    left: 40%;
    font-size: 12px;
    padding: 10px !important;
    z-index: 1000000;
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

.wallet-info-box div.content {
    display: flex;
    padding: 0.5rem 0;
    border-bottom: 1px solid #d4af37;
}

.wallet-info-box .title {
    font-weight: bold;
    margin: 0 0.4rem;
}

.wallet-info-box .title.red {
    color: red;
}

.wallet-info-box .desc {
    margin: 0 0.4rem;
}
</style>
