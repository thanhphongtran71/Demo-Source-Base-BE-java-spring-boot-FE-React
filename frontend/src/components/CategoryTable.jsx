import React from "react";

const CategoryTable = ({ categories, onEdit, onDelete }) => {
    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên danh mục</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.length > 0 ? (
                        categories.map((cat) => (
                            <tr key={cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.name}</td>
                                <td>
                                    <button className="btn btn-edit" onClick={() => onEdit(cat)}>
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-delete"
                                        onClick={() => onDelete(cat.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center", padding: "10px" }}>
                                Chưa có danh mục nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTable;
