import axios from "axios";
import { BASE_API_URL } from "@/const";

const SSRRequest = axios.create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true,
  baseURL: BASE_API_URL,
  timeout: 60000,
});
// Add a request interceptor
// authRequest.interceptors.request.use(async request => {
//     const token = LocalStorage.get(GO_DEP_TOKEN)
//
//     if (token) {
//         request.headers.Authorization = `Bearer ${token}`
//     }
//
//     return request
// })
//
// authRequest.interceptors.response.use(
//     response => {
//         return response.data
//     },
//     async error => {
//         const originalRequest = error.config
//         if (error?.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true
//             // LocalStorage.remove(ECO_WALL_TOKEN);
//             // const auth = getAuth();
//             // if (auth.currentUser) {
//             //   const token = await getIdToken(auth.currentUser, true);
//             //   originalRequest.headers.Authorization = `Bearer ${token}`;
//             //   return authRequest(originalRequest);
//             // }
//             LocalStorage.remove(GO_DEP_TOKEN)
//             // if (typeof window !== 'undefined') {
//             //   window.open('/', '_self')
//             // }
//         } else {
//             // Retried faile => Log user out
//             // await signOut(getAuth());
//             // await removeServerCookieRequuest();
//         }
//
//         // eslint-disable-next-line no-undef
//         return Promise.reject(error.response.data)
//     }
// )
// SSRRequest.interceptors.request.use(async request => {
//     store.commit('handleToggle','loading');
//     return request
// })
SSRRequest.interceptors.response.use(
  (res) => {
    if (
      (res.data?.is_logined == true ||
        (res.data?.is_success == true && res.data?.error_code == 0)) &&
      res.config?.$useStore
    ) {
      res.config.$useStore(res.data, res);
    }

    if (res.data?.message) {
      if (
        !res.data?.message &&
        res.data.message.toLowerCase().indexOf("success") != -1
      ) {
        /*alert( res.data?.message);*/
        /*notify({
                    title: t('warning'),
                    text: res.data?.message,
                    type: 'error', // success warn error  default
                });*/
      }
    }
    //if(res.data.message && res.data.message.toLowerCase().indexOf('success') == -1 && (res.data?.error_code || res.data.ErrorCode != '-200001')){
    //    let msg = errCodeMsg?.[res.data?.error_code || res.data.ErrorCode] ? t(errCodeMsg[res.data?.error_code || res.data.ErrorCode]) :  res.data.message;
    //    alert(msg);
    //    throw Promise.reject(msg);
    //}
    return res.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // LocalStorage.remove(ECO_WALL_TOKEN);
      // const auth = getAuth();
      // if (auth.currentUser) {
      //   const token = await getIdToken(auth.currentUser, true);
      //   originalRequest.headers.Authorization = `Bearer ${token}`;
      //   return authRequest(originalRequest);
      // }
      //LocalStorage.remove(GO_DEP_TOKEN)
      // if (typeof window !== 'undefined') {
      //   window.open('/', '_self')
      // }
    } else {
      // Retried faile => Log user out
      // await signOut(getAuth());
      // await removeServerCookieRequuest();
    }

    // eslint-disable-next-line no-undef
    return Promise.reject(error.response.data);
  }
);

export { SSRRequest };
