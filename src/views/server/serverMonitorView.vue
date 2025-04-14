<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card title="سرویس ها">
                    <template v-slot:text>
                        <v-text-field v-model="ServerSearch" label="جستجو"
                            prepend-inner-icon="ri-search-line"></v-text-field>
                    </template>
                    <v-data-table :headers="serverHeader" :items="serverData" :search="ServerSearch"
                        :loading="ServerLoading">
                        <template v-slot:item.status="{ item }">
                            <v-chip :text="item.status == 0 ? 'DOWN' : 'UP'"
                                :color="item.status == 0 ? '#ff0000' : '#43A047'" size="small"></v-chip>
                        </template>
                        <template v-slot:item.error="{ item }">
                            <v-icon class="me-2" size="small" icon="ri-signal-wifi-error-line" color="#d4af37"
                                @click="errorView(item)"></v-icon>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-dialog v-model="errorDialog" max-width="500" class="error-dialog">
        <v-card class="dialog-card">
            <div class="pa-5">
                <div v-for="(item, i) in errorData" :key="i">
                    <p>{{ item }}</p>
                    <v-divider></v-divider>
                </div>
            </div>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="close" @click="errorDialog = false" size="large" class="m-3"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { router } from '@/plugins/router';
import ServerService from '@/services/server/server';
import { onMounted, ref } from 'vue';

const ServerLoading = ref(false)
const serverData = ref();
const serverHeader = ref([
    {
        title: 'service name',
        key: 'service',
    },
    {
        title: 'status',
        key: 'status',
    },
    {
        title: 'request count',
        key: 'total.all',
    },
    {
        title: 'request count',
        key: 'total.all',
    },
    {
        title: 'success',
        key: 'total.statusCount.success',
    },
    {
        title: 'failed',
        key: 'total.statusCount.failed',
    },
    {
        title: 'internalIssues',
        key: 'total.statusCount.internalIssues',
    },
    {
        title: 'error',
        key: 'error',
    },
]);
const ServerSearch = ref(null);
const errorData = ref();
const errorDialog = ref(false);



const GetStatus = async () => {
    try {
        ServerLoading.value = true;
        const response = await ServerService.AllStatus();
        serverData.value = response.data;
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
        ServerLoading.value = false;
    }
};


const errorView = (item) => {
    errorDialog.value = true;
    errorData.value = item.total.error;
    console.log(errorData.value)
    console.log(errorData.value)
}

onMounted(() => {
    GetStatus();
})

</script>

<style scoped>
.error-dialog {
    direction: ltr;
    padding: 1rem;
}
</style>
