import { createPinia } from 'pinia'

export const store = createPinia()
export default function (app) {
  app.use(store)
}


// import { defineStore } from "pinia";
// import { ref } from "vue";

// export const useUserStore = defineStore("user", () => {
//   const user = ref({
//     firstName: "",
//     isHaveBank: false,
//     wallet: {
//       goldWeight: "",
//       balance: "",
//     },
//   });
//   const errorMsg = ref("");
//   const alertError = ref(false);

//   const GetUser = async () => {
//     try {
//       const response = await AuthService.Profile();
//       user.value = response;
//       return response;
//     } catch (error) {
//       if (error.response.status == 401) {
//         localStorage.clear();
//         router.replace("/Login");
//       }
//       errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
//       alertError.value = true;
//       setTimeout(() => {
//         alertError.value = false;
//       }, 10000);
//     }
//   };

//   return { user, GetUser, errorMsg, alertError };
// });
