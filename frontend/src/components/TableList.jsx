import React from "react";

const TableList = ({ tables, onEdit, onDelete }) => {
    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Số bàn</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {tables && tables.length > 0 ? (
                        tables.map((t) => (
                            <tr key={t.tableId}>
                                <td>{t.tableId}</td>
                                <td>{t.tableNumber}</td>
                                <td>{t.status}</td>
                                <td>
                                    <button
                                        className="btn btn-edit"
                                        onClick={() => onEdit(t)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-delete"
                                        onClick={() => onDelete(t.tableId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
                                Chưa có bàn nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableList;