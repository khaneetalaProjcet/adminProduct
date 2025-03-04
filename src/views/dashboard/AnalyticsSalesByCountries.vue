<script setup>
const salesByCountries = [
  {
    abbr: '1',
    amount: '$8,656k',
    country: 'کاربر شماره 1',
    change: '+25.8%',
    sales: '894k',
    color: 'success',
  },
  {
    abbr: '2',
    amount: '$2,415k',
    country: 'کاربر شماره 2',
    change: '-6.2%',
    sales: '645k',
    color: 'error',
  },
  {
    abbr: '3',
    amount: '$865k',
    country: 'کاربر شماره 3',
    change: '+12.4%',
    sales: '148k',
    color: 'warning',
  },
  {
    abbr: '4',
    amount: '$745k',
    country: 'کاربر شماره 4',
    change: '-11.9%',
    sales: '86k',
    color: 'secondary',
  },
  {
    abbr: '5',
    amount: '$45k',
    country: 'کاربر شماره 5',
    change: '+16.2%',
    sales: '42k',
    color: 'error',
  },
]

const moreList = [
  {
    title: 'دیروز',
    value: 'Yesterday',
  },
  {
    title: 'هفته گذشته',
    value: 'Last Week',
  },
  {
    title: 'ماه گذشته',
    value: 'Last Month',
  },
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>فروش کاربران</VCardTitle>

      <template #append>
        <div class="me-n3">
          <MoreBtn :menu-list="moreList" />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="data in salesByCountries"
          :key="data.country"
        >
          <template #prepend>
            <VAvatar
              :color="data.color"
              variant="tonal"
              size="40"
            >
              {{ data.abbr }}
            </VAvatar>
          </template>

          <VListItemTitle class="mb-1 d-flex align-center">
            <h6 class="text-h6">
              {{ data.amount }}
            </h6>
            <VIcon
              size="24"
              :color="data.change.charAt(0) === '+' ? 'success' : 'error'"
              class="mx-1"
            >
              {{ data.change.charAt(0) === '+' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line' }}
            </VIcon>
            <div
              :class="`${data.change.charAt(0) === '+' ? 'text-success' : 'text-error'}`"
              class="text-body-1"
            >
              {{ data.change.slice(1) }}
            </div>
          </VListItemTitle>

          <VListItemSubtitle class="text-body-1 me-2">
            {{ data.country }}
          </VListItemSubtitle>

          <template #append>
            <div>
              <h6 class="text-h6 mb-1">
                {{ data.sales }}
              </h6>
              <div class="text-body-2 text-disabled text-end">
                فروش
              </div>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

  <style lang="scss" scoped>
  .card-list {
    --v-card-list-gap: 0.875rem;
  }
  </style>
