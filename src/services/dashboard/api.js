import axios from "axios";


const DashboardTemplate = axios.create({
    baseURL: "https://khaneetala.ir/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})


// before request
DashboardTemplate.interceptors.request.use(
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


// before response
DashboardTemplate.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // مدیریت خطاهای API
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default DashboardTemplate;
