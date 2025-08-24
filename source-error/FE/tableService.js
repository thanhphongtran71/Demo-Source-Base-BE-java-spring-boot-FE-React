import api from "./api";

// Lấy tất cả tables
export const getTables = async () => {
    const res = await api.get("/tables");
    return res.data;
};

// Lấy chi tiết 1 table theo ID
export const getTableById = async (id) => {
    const res = await api.get(`/tables/${id}`);
    return res.data;
};

// Tạo mới table
export const createTable = async (table) => {
    const res = await api.post("/tables", table);
    return res.data;
};

// Cập nhật table
export const updateTable = async (id, table) => {
    const res = await api.put(`/tables/${id}`, table);
    return res.data;
};

// Xóa table
export const deleteTable = async (id) => {
    const res = await api.delete(`/tables/${id}`);
    return res.data;
};
