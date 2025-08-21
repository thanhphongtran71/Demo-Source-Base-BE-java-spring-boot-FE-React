import api, { API_BASE_URL } from "./api";

// Lấy tất cả categories
export const getCategories = async () => {
    const res = await api.get("/categories");
    return res.data;
};

// Tạo mới category
export const createCategory = async (category) => {
    const res = await api.post("/categories", category);
    return res.data;
};

// Cập nhật category
export const updateCategory = async (id, category) => {
    const res = await api.put(`/categories/${id}`, category);
    return res.data;
};

// Xóa category
export const deleteCategory = async (id) => {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
};
