import React, { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../services/productService";
import { getCategories } from "../services/categoryService";

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        price: "",
        categoryId: "",
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.id) {
            await updateProduct(formData.id, formData);
        } else {
            await createProduct(formData);
        }
        setFormData({ id: null, name: "", price: "", categoryId: "" });
        fetchProducts();
    };

    const handleEdit = (prod) => {
        setFormData(prod);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        fetchProducts();
    };

    return (
        <div>
            <h2>📦 Products</h2>
            <div className="form-container">
                <h3>{formData.id ? "Update Product" : "Create Product"}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Chọn danh mục --</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="submit">
                        {formData.id ? "Update" : "Create"}
                    </button>
                </form>
            </div>

            <ProductTable
                products={products}
                categories={categories}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default ProductsPage;
