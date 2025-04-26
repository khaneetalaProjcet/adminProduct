<template>
    <div class="invoice-container" v-show="visible" ref="invoiceContent">
        <div class="invoice-header">
            <h2>فاکتور فروش</h2>
            <p>شماره: {{ invoiceData.id }}</p>
            <p>تاریخ: {{ currentDate }}</p>
        </div>

        <table class="invoice-table">
            <thead>
                <tr>
                    <th>ردیف</th>
                    <th>نام کالا</th>
                    <th>تعداد</th>
                    <th>قیمت واحد</th>
                    <th>مبلغ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in invoiceData.items" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ formatPrice(item.price) }}</td>
                    <td>{{ formatPrice(item.price * item.quantity) }}</td>
                </tr>
            </tbody>
        </table>

        <div class="invoice-footer">
            <p>جمع کل: {{ formatPrice(invoiceData.total) }} تومان</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    invoiceData: Object,
    visible: Boolean
})

const invoiceContent = ref(null)

const currentDate = computed(() => {
    return new Date().toLocaleDateString('fa-IR')
})

const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
}

const printInvoice = () => {
    window.print()
}

defineExpose({
    printInvoice
})
</script>

<style scoped>
.invoice-container {
    height: 100%;
    direction: rtl;
    width: 100%;
    padding: 20px;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.invoice-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

.invoice-table th,
.invoice-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.invoice-table th {
    background-color: #f5f5f5;
}

.invoice-footer {
    text-align: left;
    font-weight: bold;
    font-size: 1.2em;
    margin-top: 20px;
}

/* @media print {
  body, html {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .invoice-container {
    position: fixed;
    top: 10mm;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 190mm;
    padding: 10mm;
    box-shadow: none;
    background: white;
    z-index: 9999;
  }

  @page {
    size: A4;
    margin: 0;
  }
} */
</style>
