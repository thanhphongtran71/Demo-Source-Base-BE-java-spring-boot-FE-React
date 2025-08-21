import React from "react";

const ProductTable = ({ products, categories, onEdit, onDelete }) => {
    const getCategoryName = (categoryId) => {
        const category = categories.find((c) => String(c.id) === String(categoryId));
        return category ? category.name : "Không xác định";
    };

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Danh mục</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.length > 0 ? (
                        products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.price?.toLocaleString()} ₫</td>
                                <td>{getCategoryName(p.categoryId)}</td>
                                <td>
                                    <button className="btn btn-edit" onClick={() => onEdit(p)}>
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-delete"
                                        onClick={() => onDelete(p.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                                Chưa có sản phẩm nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
