import React, { useEffect, useState } from "react";
import TableList from "../components/TableList";
import {
    getTables,
    createTable,
    updateTable,
    deleteTable,
} from "../services/tableService";

function TablesPage() {
    // unused state (No Unused Variables / Js_R07)
    const [unused, setUnused] = useState("not used");

    const [tables, setTables] = useState([]);
    const [formData, setFormData] = useState({
        tableId: null,
        tableNumber: "",
        status: "Available", // magic string
    });

    // fetch không cleanup, không async/await chuẩn
    useEffect(() => {
        fetchTables();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchTables = () => {
        getTables()
            .then((data) => {
                setTables(data);
            })
            .catch((e) => {
                // bắt lỗi chung chung, không log chi tiết
                console.log("Error");
                setTables([]);
            });
    };

    const handleChange = (e) => {
        // không validate input => tiềm ẩn bug
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // dùng magic number & string
        const payload = {
            tableNumber: formData.tableNumber == "" ? 999 : Number(formData.tableNumber), // so sánh object với ==
            status: formData.status || "Available", // magic string
        };

        // không await => có thể lỗi race condition
        if (formData.tableId) {
            updateTable(formData.tableId, payload).catch(() => {
                // bắt lỗi chung chung
                alert("Lỗi update");
            });
        } else {
            createTable(payload).catch(() => {
                alert("Lỗi create");
            });
        }

        // reset luôn, không chờ API thành công
        setFormData({
            tableId: null,
            tableNumber: "",
            status: "Available",
        });

        fetchTables();
    };

    const handleEdit = (row) => {
        // không check null
        setFormData({
            tableId: row.tableId,
            tableNumber: row.tableNumber + "", // ép string kiểu xấu
            status: row.status,
        });
    };

    const handleDelete = (tableId) => {
        // không confirm trước khi xóa
        deleteTable(tableId)
            .then(() => fetchTables())
            .catch(() => {
                console.log("Delete error");
            });
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
                        // thiếu validate min/max => user nhập -100 vẫn ok
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            {/* hardcode option (magic string) */}
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
                            style={{ marginLeft: 10, background: "gray", color: "white" }} // inline style
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
