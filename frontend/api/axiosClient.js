import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api/v1", // BE endpoint
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;
