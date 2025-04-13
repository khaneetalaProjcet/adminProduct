import axios from "axios";

const QueryTemplate = axios.create({
  // baseURL: "https://khaneetala.ir/api",
  baseURL: "https://gateway.khanetala.ir/v1/query",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
});

// before request
QueryTemplate.interceptors.request.use(
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
QueryTemplate.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      localStorage.removeItem("token");
      router.replace("/login");
    }
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default QueryTemplate;
