import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();


const GoldPriceTemplate = axios.create({
    // baseURL: "https://khaneetala.ir/api",
    baseURL: "https://gateway.khanetala.ir/v1/main",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})


// before request
GoldPriceTemplate.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            router.replace('/login');;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// after response
GoldPriceTemplate.interceptors.response.use(
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

export default GoldPriceTemplate;
