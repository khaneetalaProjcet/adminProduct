<script setup>
import trophy from '@images/misc/trophy.png'
</script>

<template>
  <VCard class="position-relative">
    <VCardText>
      <div class="mb-2">
        <h5 class="text-h5">
          تبریک <span class="text-high-emphasis">🎉</span>
        </h5>
        <div class="text-body-1">
          میزان فروش این ماه
        </div>
      </div>
      <h4 class="text-h4 text-primary">
        1,000,000 تومان
      </h4>
      <div class="text-body-1 mb-2">
        20٪ از تارگت ماهانه <span class="text-high-emphasis">🚀</span>
      </div>
      <VBtn size="small">
        مشاهده
      </VBtn>
    </VCardText>

    <!-- Trophy -->
    <VImg
      :src="trophy"
      class="trophy"
    />
  </VCard>
</template>

<style lang="scss">
.v-card .trophy {
  position: absolute;
  inline-size: 5.188rem;
  inset-block-end: 1.25rem;
  inset-inline-end: 1.25rem;
}
</style>
