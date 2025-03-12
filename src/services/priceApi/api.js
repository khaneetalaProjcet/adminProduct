import axios from "axios";


const GoldPriceTemplate = axios.create({
    baseURL: "https://khaneetala.ir/api",
    // timeout: 10000,
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
            router.push('/login')
        } else {
            router.push('/login');
        }
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default GoldPriceTemplate;
