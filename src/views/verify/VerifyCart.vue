<template>
    <div>
        <p v-if="loading">در حال بارگذاری</p>
        <p v-else-if="error">`{{ error }}</p>
        <div class="d-flex flex-wrap" v-else>
            <div v-for="(item, i) in goldData" :key="i" class="px-4">
                <p>id: {{ item.id }}</p>
                <p>userId: {{ item.userId }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { GetGoldPrice } from '@/services/priceApi/price';

const goldData = ref(null);
const loading = ref(false);
const error = ref(null);


const fetchGoldPrice = async () => {
    loading.value = true;
    error.value = null;

    try {
        const data = await GetGoldPrice();
        console.log(data)
        goldData.value = data;
    } catch (err) {
        error.value = err.message || "خطا در دریافت اطلاعات طلا";
    } finally {
        loading.value = false;
    }
}


onMounted(() => {
    fetchGoldPrice();
})

</script>

<style></style>
