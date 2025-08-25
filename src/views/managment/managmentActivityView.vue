<template>
  <div>
    <v-timeline align="start" truncate-line="start" class="timeline">
      <v-timeline-item v-for="(item, i) in userActivityData" :key="i" fill-dot>
        <v-card>
          <v-card-title :class="['text-h6', `bg-${item.color}`]">

          </v-card-title>
          <v-card-text class="bg-white text--primary">
            <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
              convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an
              salutandi sententiae.</p>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script setup>
import ManagmentService from '@/services/managment/managment';
import { onMounted, ref } from 'vue';



const items = ref([
  {
    color: 'red-lighten-2',
    icon: 'mdi-star',
  },
  {
    color: 'purple-lighten-2',
    icon: 'mdi-book-variant',
  },
  {
    color: 'green-lighten-1',
    icon: 'mdi-airballoon',
  },
  {
    color: 'indigo-lighten-2',
    icon: 'mdi-layers-triple',
  },
])
const userActivityData = ref('');
const errorMsg = ref('');
const alertError = ref(false);
const userActivityLoading = ref(false);



const userActivity = async () => {
  try {
    userActivityLoading.value = true;
    const response = await ManagmentService.GetUserActivity();
    userActivityData.value = response.data;
    return response
  } catch (error) {
    console.log(error)
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


onMounted(() => {
  userActivity();
})

</script>

<style scoped></style>


























<!-- <template>
  <div>
    <v-row>
      <v-col>
        <v-tabs v-model="tab" align-tabs="center">
          <v-tab value="one">فعالیت های کارشناسان</v-tab>
          <v-tab value="two">فعالیت های کاربران</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12">
        <v-card-text>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one">
              <v-card title="کارشناسان">
                <template v-slot:text>
                  <ul class="listGuide">
                    <li>

                      فعالیت کارشناس مورد نظر و تمامی کارشناسان قابل مشاهده می باشد.
                    </li>
                  </ul>
                  <v-text-field v-model="userActivitySearch" label="جستجو"
                    prepend-inner-icon="ri-search-line"></v-text-field>
                </template>

                <v-data-table :headers="ActivityHeader" :items="userActivityData" :search="userActivitySearch"
                  :loading="userActivityLoading">
                </v-data-table>
              </v-card>
            </v-tabs-window-item>

            <v-tabs-window-item value="two">
              <v-card title="کاربران">
                <template v-slot:text>
                  <ul class="listGuide">
                    <li>
                      فعالیت کاربر مورد نظر و تمامی کاربران قابل مشاهده می باشد.
                    </li>
                  </ul>
                  <v-text-field v-model="expertActivitySearch" label="جستجو"
                    prepend-inner-icon="ri-search-line"></v-text-field>
                </template>
                <v-data-table :headers="ExpertActivityHeader" :items="expertActivityData" :search="expertActivitySearch"
                  :loading="expertActivityLoading">
                </v-data-table>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-col>
    </v-row>

    <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton" closable>
      {{ errorMsg }}
    </v-alert>
  </div>
</template>

<script setup>
import { router } from '@/plugins/router';
import ManagmentService from '@/services/managment/managment';
import { onMounted, ref } from 'vue';

const userActivityLoading = ref(false);
const expertActivityLoading = ref(false);
const userActivitySearch = ref('');
const expertActivitySearch = ref('');
const tab = ref(null);
const errorMsg = ref('');
const alertError = ref(false);
const userActivityData = ref();
const expertActivityData = ref();
const ActivityHeader = ref([
  {
    title: 'عنوان',
    key: 'title',
  },
  {
    title: 'توضیحات',
    key: 'description',
  },
  {
    title: 'تاریخ',
    key: 'date',
  },
  {
    title: 'زمان',
    key: 'time',
  },
]);


const ExpertActivityHeader = ref([
  {
    title: 'عنوان',
    key: 'title',
  },
  {
    title: 'توضیحات',
    key: 'description',
  },
  {
    title: 'تاریخ',
    key: 'date',
  },
  {
    title: 'زمان',
    key: 'time',
  },
]);



const userActivity = async () => {
  try {
    userActivityLoading.value = true;
    const response = await ManagmentService.GetUserActivity();
    userActivityData.value = response.data;
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

const expertActivity = async () => {
  try {
    expertActivityLoading.value = true;
    const response = await ManagmentService.GetExpertActivity();
    expertActivityData.value = response.data;
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
    expertActivityLoading.value = false;
  }
};

onMounted(() => {
  userActivity();
  expertActivity();
})


</script>

<style scoped>
.k-alert {
  position: fixed;
  top: 10px;
  left: 40%;
  font-size: 12px;
  padding: 10px !important;
  z-index: 10000;
}

.user-price {
  font-weight: bold;
}

.dialog-card {
  padding: 0.5rem !important;
}

.k-dialog-title {
  border-radius: 0.5rem 0.5rem 0 0 !important;
  background-color: #d4af37;
  padding: 0.5rem;
}

.k-dialog-title p {
  margin: 0.5rem;
  font-size: 18px;
  color: #fff;
}

.user-dialog-info {
  font-size: 14px;
}

.box {
  border-radius: 8px;
  padding: 0.5rem 1rem;
  background-color: #fff;
  box-shadow: 0px 5px 5px 0px rgba(106, 106, 106, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.listGuide {
  font-size: 12px;
  color: #2c3e50;
  font-weight: 500px;
  margin: 0.2rem;
  margin-bottom: 2rem;
  margin-right: 1rem;
  margin-left: 0.5rem
}
</style> -->
