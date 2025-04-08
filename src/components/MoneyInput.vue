<template>
    <v-text-field v-bind="$attrs" :model-value="formatted" @update:model-value="handleInput" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: [Number, String],
        default: 0
    }
})

const emit = defineEmits(['update:modelValue'])

const formatted = computed(() => {
    const num = Number(props.modelValue)
    return isNaN(num) ? '' : num.toLocaleString('en-US')
})

function handleInput(value) {
    const raw = Number(String(value).replace(/,/g, ''))
    if (!isNaN(raw)) {
        emit('update:modelValue', raw)
    } else {
        emit('update:modelValue', 0)
    }
}
</script>
