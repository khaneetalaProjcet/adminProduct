import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();


const AccountingTemplate = axios.create({
    baseURL: "https://khaneetala.ir/api/call",
    // timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})


// before request
AccountingTemplate.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            router.replace('/login');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// before response
AccountingTemplate.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status == 401) {
            localStorage.removeItem("token");
            router.replace('/login');;
        }
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default AccountingTemplate;
