<script setup>
const statistics = [
  {
    title: 'فروش',
    stats: '24٪',
    icon: 'ri-pie-chart-2-line',
    color: 'primary',
  },
  {
    title: 'مشتریان',
    stats: '12000',
    icon: 'ri-group-line',
    color: 'success',
  },
  {
    title: 'محصولات',
    stats: '1.54k',
    icon: 'ri-macbook-line',
    color: 'warning',
  },
  {
    title: 'درآمد',
    stats: '$88k',
    icon: 'ri-money-dollar-circle-line',
    color: 'info',
  },
]

const moreList = [
  {
    title: 'اشتراگ کذاری',
    value: 'Share',
  },
  {
    title: 'بارگذاری مجدد',
    value: 'Refresh',
  },
  {
    title: 'آپدیت',
    value: 'Update',
  },
]
</script>

<template>
  <VCard title="معاملات">
    <template #subtitle>
      <p class="text-body-1 mb-0">
        <span class="d-inline-block font-weight-medium text-high-emphasis">مجموعا 48٪ رشد</span> <span class="text-high-emphasis">😎</span> ماهانه
      </p>
    </template>

    <template #append>
      <MoreBtn :menu-list="moreList" />
    </template>

    <VCardText class="pt-10">
      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="12"
          sm="6"
          md="3"
        >
          <div class="d-flex align-center gap-x-3">
            <VAvatar
              :color="item.color"
              rounded
              size="40"
              class="elevation-2"
            >
              <VIcon
                size="24"
                :icon="item.icon"
              />
            </VAvatar>

            <div class="d-flex flex-column">
              <div class="text-body-1">
                {{ item.title }}
              </div>
              <h5 class="text-h5">
                {{ item.stats }}
              </h5>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
