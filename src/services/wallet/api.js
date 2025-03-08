import axios from "axios";


const VerifyTemplate = axios.create({
    baseURL: "https://gateway.khaneetala.ir/v1",
    // timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})


// before request
VerifyTemplate.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        if (error.response.status == 401) {
            console.log('log out', error)
            localStorage.removeItem("token");
            router.push('/login')
        }
        return Promise.reject(error);
    }
);


// before response
VerifyTemplate.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // مدیریت خطاهای API
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default VerifyTemplate;
