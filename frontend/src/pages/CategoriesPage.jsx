import React, { useEffect, useState } from "react";
import CategoryTable from "../components/CategoryTable";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../services/categoryService";

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ id: null, name: "" });

    useEffect(() => {
        fetchCategories();
    }, []);

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
            await updateCategory(formData.id, formData);
        } else {
            await createCategory(formData);
        }
        setFormData({ id: null, name: "" });
        fetchCategories();
    };

    const handleEdit = (cat) => {
        setFormData(cat);
    };

    const handleDelete = async (id) => {
        await deleteCategory(id);
        fetchCategories();
    };

    return (
        <div>
            <h2>📂 Categories</h2>
            <div className="form-container">
                <h3>{formData.id ? "Update Category" : "Create Category"}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Category Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit">
                        {formData.id ? "Update" : "Create"}
                    </button>
                </form>
            </div>

            <CategoryTable
                categories={categories}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default CategoriesPage;
