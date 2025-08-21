import axios from "axios";

// Base URL của API (có thể thay bằng http://localhost:8080/api/v1 nếu BE của bạn chạy ở đó)
export const API_BASE_URL = "http://localhost:8080/api/v1";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
