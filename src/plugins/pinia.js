import { createPinia } from 'pinia'

export const store = createPinia()
export default function (app) {
  app.use(store)
}


import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {
  const AllNotification = ref({
    AccountingNotification: '',
  });
  const errorMsg = ref("");
  const alertError = ref(false);

  const GetNotification = async () => {
    console.log('notification')
    try {
      // const response = await AuthService.Profile();
      // user.value = response;
      // return response;
    } catch (error) {
      if (error.response.status == 401) {
        localStorage.clear();
        router.replace("/Login");
      }
      errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
      alertError.value = true;
      setTimeout(() => {
        alertError.value = false;
      }, 10000);
    }
  };

  return { AllNotification, GetNotification, errorMsg, alertError };
});
