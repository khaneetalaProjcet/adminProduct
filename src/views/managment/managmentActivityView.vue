<template>
  <div>
    <v-row>
      <v-col>
        <v-tabs v-model="tab" align-tabs="center">
          <v-tab value="one">کاربران</v-tab>
          <v-tab value="two">کارشناسان</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12">
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one">
            <v-infinite-scroll :items="userActivityData" @load="loadMoreUser" :loading="userActivityLoading">
              <v-timeline align="start" truncate-line="start" class="timeline" :side="$vuetify.display.xs ? 'end' : ''">
                <v-timeline-item v-for="(item, i) in userActivityData" :key="i" dot-color="#d4af37">
                  <v-card class="activity-card">
                    <div class="title-box">
                      <v-card-title :class="['text-h6']">
                        {{ item.title }}
                      </v-card-title>
                    </div>
                    <v-card-text class="bg-white text--primary">
                      <p>{{ item.description }}</p>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                      <v-btn @click="moreInfoUser(item)">اطلاعات بیشتر</v-btn>
                    </v-card-actions>
                  </v-card>
                  <div class="d-flex align-center justify-end mt-3">
                    <span class="date">{{ item.date }}</span>
                    <span>|</span>
                    <span class="date">{{ item.time }}</span>
                  </div>
                </v-timeline-item>
                <template #loading>
                  <div class="d-flex flex-column align-center mt-6 mb-16 pb-10">
                    <v-progress-circular :size="24" color="#23523F" indeterminate />
                    <span class="loading-text">در حال بارگذاری...</span>
                  </div>
                </template>
              </v-timeline>
            </v-infinite-scroll>
          </v-tabs-window-item>
          <v-tabs-window-item value="two">
            <v-infinite-scroll :items="adminActivityData" @load="loadMoreAdmin" :loading="adminActivityLoading">
              <v-timeline align="start" truncate-line="start" class="timeline" :side="$vuetify.display.xs ? 'end' : ''">
                <v-timeline-item v-for="(item, i) in adminActivityData" :key="i" dot-color="#d4af37">
                  <v-card>
                    <div class="title-box">
                      <v-card-title :class="['text-h6']">
                        {{ item.title }}
                      </v-card-title>
                    </div>
                    <v-card-text class="bg-white text--primary">
                      <p>{{ item.description }}</p>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                      <v-btn @click="moreInfo(item)">اطلاعات بیشتر</v-btn>
                    </v-card-actions>
                  </v-card>
                  <div class="d-flex align-center justify-space-start mt-3">
                    <span class="date">{{ item.date }}</span>
                    <span>|</span>
                    <span class="date">{{ item.time }}</span>
                  </div>
                </v-timeline-item>
                <template #loading>
                  <div class="d-flex flex-column align-center mt-6 mb-16 pb-10">
                    <v-progress-circular :size="24" color="#23523F" indeterminate />
                    <span class="loading-text">در حال بارگذاری...</span>
                  </div>
                </template>
              </v-timeline>
            </v-infinite-scroll>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>

    <v-dialog v-model="infoDialog" max-width="500">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h5 text-medium-emphasis ps-2">
            اطلاعات کاربر
          </div>

          <v-btn icon="mdi-close" variant="text" @click="infoDialog = false"></v-btn>
        </v-card-title>

        <v-divider class="mb-4"></v-divider>

        <v-card-text>
          <v-row>
            <v-col cols="6" class="my-3 detail-text">
              <div class="d-flex justify-start">
                نام : {{ infoDetail?.action?.userName }}
              </div>
            </v-col>
            <v-col cols="6" class="my-3 detail-text">
              <div class="d-flex justify-start">
                نام خانوادگی : {{ infoDetail?.action?.lastName }}
              </div>
            </v-col>
            <v-col cols="6" class="my-3 detail-text">
              <div class="d-flex justify-start">
                موجودی کیف پول : {{ formatNumber(infoDetail?.action?.balance) }} تومان
              </div>
            </v-col>
            <v-col cols="6" class="my-3 detail-text">
              <div class="d-flex justify-start">
                موجودی صندوق طلا : {{ infoDetail?.action?.amount }} گرم
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider class="mt-2"></v-divider>

      </v-card>
    </v-dialog>



    <v-dialog v-model="userInfoDialog" max-width="500">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h5 text-medium-emphasis ps-2">
            اطلاعات کاربر
          </div>

          <v-btn icon="mdi-close" variant="text" @click="userInfoDialog = false"></v-btn>
        </v-card-title>

        <v-divider class="mb-4"></v-divider>

        <v-card-text>
          <v-row>
            <v-col cols="6" class="my-3 detail-text">
              <div class="d-flex justify-start">
                نام : {{ userInfoDetail?.user?.firstName }}
              </div>
            </v-col>
            <v-col cols="6" class="my-3 detail-text">
              <div class="d-flex justify-start">
                نام خانوادگی : {{ userInfoDetail?.user?.lastName }}
              </div>
            </v-col>
            <v-col cols="6" class="my-3 detail-text">
              <div class="d-flex justify-start">
                شماره موبایل : {{ userInfoDetail?.user?.phoneNumber }} 
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider class="mt-2"></v-divider>

      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import router from '@/plugins/router';
import ManagmentService from '@/services/managment/managment';
import { ref } from 'vue';

const errorMsg = ref('');
const alertError = ref(false);
const userActivityData = ref('');
const userActivityLoading = ref(false);
const userPage = ref(0);
const adminPage = ref(0);
const tab = ref(null);
const adminActivityData = ref('');
const adminActivityLoading = ref(false);
const infoDialog = ref(false);
const userInfoDialog = ref(false);
const infoDetail = ref('');
const userInfoDetail = ref('');



const userActivity = async (append = false) => {
  try {
    userActivityLoading.value = true;
    const response = await ManagmentService.GetUserActivity(userPage.value);

    if (append) {
      userActivityData.value = [...userActivityData.value, ...response.data];
    } else {
      userActivityData.value = response.data;
    }

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
    userActivityLoading.value = false;
  }
};

const loadMoreUser = async ({ done }) => {
  userPage.value++;
  const data = await userActivity(true);
  if (data.length === 0) {
    done("empty");
  } else {
    done("ok");
  }
};


const adminActivity = async (append = false) => {
  try {
    adminActivityLoading.value = true;
    const response = await ManagmentService.GetAdminActivity(adminPage.value);

    if (append) {
      adminActivityData.value = [...adminActivityData.value, ...response.data];
    } else {
      adminActivityData.value = response.data;
    }
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
    adminActivityLoading.value = false;
  }
};

const loadMoreAdmin = async ({ done }) => {
  adminPage.value++;
  const data = await adminActivity(true);
  if (data.length === 0) {
    done("empty");
  } else {
    done("ok");
  }
};

const moreInfo = (info) => {
  infoDialog.value = true;
  infoDetail.value = info;
}

const moreInfoUser = (info) => {
  userInfoDialog.value = true;
  userInfoDetail.value = info;
}

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

</script>

<style scoped>
.timeline .date {
  font-size: 13px;
  color: #4c4c4c;
  margin: 0 0.5rem;
}

.activity-card {}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e4e4e4;
}

.detail-text {
  font-size: 14px;
}
</style>
