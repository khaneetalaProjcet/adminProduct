<script setup>
import aviato from '@images/logos/aviato.png'
import bitbank from '@images/logos/bitbank.png'
import zipcar from '@images/logos/zipcar.png'

const earnings = [
  {
    avatar: zipcar,
    title: 'طلای کارکرده',
    subtitle: 'بدون اجرت',
    amount: '$24,895.65',
    progress: 'primary',
  },
  {
    avatar: bitbank,
    title: 'طلای خام',
    subtitle: 'بدون اجرت',
    amount: '$8,6500.20',
    progress: 'info',
  },
  {
    avatar: aviato,
    title: 'طلای نو',
    subtitle: 'با اجرت',
    amount: '$1,2450.80',
    progress: 'secondary',
  },
]

const moreList = [
  {
    title: 'اشتراک گذاری',
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
  <VCard>
    <VCardItem>
      <VCardTitle>مجموع درآمد</VCardTitle>

      <template #append>
        <div class="me-n3">
          <MoreBtn :menu-list="moreList" />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <div class="d-flex align-center">
        <h3 class="text-h3">
          x تومان
        </h3>

        <VIcon
          size="24"
          icon="ri-arrow-up-s-line"
          color="success"
        />
        <div class="text-success">
          10%
        </div>
      </div>
      <div class="text-body-1 mb-12">
        در مقایسه با سال گذشته
      </div>

      <VList class="card-list">
        <VListItem
          v-for="earning in earnings"
          :key="earning.title"
        >
          <template #prepend>
            <VAvatar
              rounded
              :image="earning.avatar"
              variant="tonal"
            />
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ earning.title }}
          </VListItemTitle>
          <VListItemSubtitle class="text-body-1">
            {{ earning.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <div>
              <h6 class="text-h6 mb-2">
                {{ earning.amount }}
              </h6>
              <VProgressLinear
                :color="earning.progress"
                model-value="80"
                rounded-bar
                rounded
              />
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.5rem;
}
</style>
