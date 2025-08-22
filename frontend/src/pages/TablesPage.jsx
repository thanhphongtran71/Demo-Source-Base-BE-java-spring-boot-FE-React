import React, { useEffect, useState } from "react";
import TableList from "../components/TableList";
import {
    getTables,
    createTable,
    updateTable,
    deleteTable,
} from "../services/tableService";

function TablesPage() {
    const [tables, setTables] = useState([]);
    const [formData, setFormData] = useState({
        tableId: null,
        tableNumber: "",
        status: "Available",
    });

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const data = await getTables();
            setTables(data);
        } catch (error) {
            setTables([]);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            tableNumber: Number(formData.tableNumber),
            status: formData.status,
        };

        try {
            if (formData.tableId) {
                // Cập nhật
                await updateTable(formData.tableId, payload);
            } else {
                // Tạo mới
                await createTable(payload);
            }
            setFormData({
                tableId: null,
                tableNumber: "",
                status: "Available",
            });
            fetchTables();
        } catch (error) {
            // Xử lý lỗi nếu cần
        }
    };

    const handleEdit = (row) => {
        setFormData({
            tableId: row.tableId,
            tableNumber: String(row.tableNumber),
            status: row.status,
        });
    };

    const handleDelete = async (tableId) => {
        try {
            await deleteTable(tableId);
            fetchTables();
        } catch (error) {
            // Xử lý lỗi nếu cần
        }
    };

    const handleCancel = () => {
        setFormData({
            tableId: null,
            tableNumber: "",
            status: "Available",
        });
    };

    return (
        <div>
            <h2>🍽️ Quản lý bàn</h2>
            <div className="form-container">
                <h3>{formData.tableId ? "Cập nhật bàn" : "Thêm bàn mới"}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Số bàn</label>
                        <input
                            type="number"
                            name="tableNumber"
                            value={formData.tableNumber}
                            onChange={handleChange}
                            min="1"
                            max="40"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Available">Available</option>
                            <option value="Occupied">Occupied</option>
                            <option value="Reserved">Reserved</option>
                        </select>
                    </div>
                    <button type="submit" className="submit">
                        {formData.tableId ? "Cập nhật" : "Tạo mới"}
                    </button>
                    {formData.tableId && (
                        <button
                            type="button"
                            className="cancel"
                            style={{ marginLeft: 10 }}
                            onClick={handleCancel}
                        >
                            Hủy
                        </button>
                    )}
                </form>
            </div>
            <TableList
                tables={tables}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default TablesPage;