import axios from "axios";


const ApiTemplate = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})


// before request
ApiTemplate.interceptors.request.use(
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
ApiTemplate.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // مدیریت خطاهای API
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default ApiTemplate;
