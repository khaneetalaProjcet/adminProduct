<script setup>
import gumroad from '@images/logos/gumroad.png'
import slack from '@images/logos/slack.png'

const deposits = [
  {
    title: 'طلای آب شده',
    subtitle: 'بدون اجرت',
    amount: '+4,65',
    logo: gumroad,
  },
]

const withdraws = [
  {
    title: 'تست',
    subtitle: 'تست',
    amount: '-450',
    logo: slack,
  },
]
</script>

<template>
  <VCard>
    <VRow no-gutters>
      <VCol
        cols="12"
        md="6"
      >
        <VCardItem>
          <VCardTitle>سرمایه گذاری</VCardTitle>

          <template #append>
            <h6 class="text-h6">
              <a
                href="javascript:void(0)"
                class="text-primary"
              >مشاهده همه</a>
            </h6>
          </template>
        </VCardItem>

        <VCardText>
          <VList class="card-list">
            <VListItem
              v-for="deposit in deposits"
              :key="deposit.logo"
            >
              <template #prepend>
                <div class="me-4">
                  <VImg
                    :height="30"
                    :width="30"
                    :src="deposit.logo"
                  />
                </div>
              </template>

              <VListItemTitle class="font-weight-medium mb-1">
                {{ deposit.title }}
              </VListItemTitle>
              <VListItemSubtitle class="text-body-1">
                {{ deposit.subtitle }}
              </VListItemSubtitle>

              <template #append>
                <VListItemAction class="text-success font-weight-medium">
                  {{ deposit.amount }}
                </VListItemAction>
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VCol>

      <VDivider :vertical="$vuetify.display.mdAndUp" />

      <VCol
        cols="12"
        md="6"
      >
        <VCardItem>
          <VCardTitle>فروش</VCardTitle>

          <template #append>
            <h6 class="text-h6">
              <a
                href="javascript:void(0)"
                class="text-primary"
              >مشاهده همه</a>
            </h6>
          </template>
        </VCardItem>

        <VCardText>
          <VList class="card-list">
            <VListItem
              v-for="withdraw in withdraws"
              :key="withdraw.logo"
            >
              <template #prepend>
                <div class="me-4">
                  <VImg
                    :height="30"
                    :width="30"
                    :src="withdraw.logo"
                  />
                </div>
              </template>

              <VListItemTitle class="font-weight-medium mb-1">
                {{ withdraw.title }}
              </VListItemTitle>
              <VListItemSubtitle class="text-body-1">
                {{ withdraw.subtitle }}
              </VListItemSubtitle>

              <template #append>
                <VListItemAction>
                  <span class="text-error font-weight-medium">
                    {{ withdraw.amount }}
                  </span>
                </VListItemAction>
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.25rem;
}
</style>
