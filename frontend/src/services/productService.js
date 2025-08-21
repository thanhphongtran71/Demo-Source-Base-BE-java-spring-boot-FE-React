import api, { API_BASE_URL } from "./api";

// Lấy tất cả products
export const getProducts = async () => {
    const res = await api.get("/products");
    return res.data;
};

// Tạo mới product
export const createProduct = async (product) => {
    const res = await api.post("/products", product);
    return res.data;
};

// Cập nhật product
export const updateProduct = async (id, product) => {
    const res = await api.put(`/products/${id}`, product);
    return res.data;
};

// Xóa product
export const deleteProduct = async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
};
