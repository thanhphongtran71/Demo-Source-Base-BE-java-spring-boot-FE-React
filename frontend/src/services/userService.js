import api, { API_BASE_URL } from "./api";

// Lấy danh sách users
export const getUsers = async () => {
    try {
        const response = await api.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Tạo user mới
export const createUser = async (userData) => {
    try {
        const response = await api.post(`${API_BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

// Cập nhật user
export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`${API_BASE_URL}/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

// Xóa user
export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`${API_BASE_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
