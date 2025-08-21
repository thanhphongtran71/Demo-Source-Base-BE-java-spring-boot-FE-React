import React, { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} from "../services/userService";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        fullName: "",
        email: "",
        password: "",
        phone: "",
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.id) {
            await updateUser(formData.id, formData);
        } else {
            await createUser(formData);
        }
        setFormData({ id: null, fullName: "", email: "", password: "", phone: "" });
        fetchUsers();
    };

    const handleEdit = (user) => {
        setFormData(user);
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        fetchUsers();
    };

    return (
        <div>
            <h2>👤 Users</h2>
            <div className="form-container">
                <h3>{formData.id ? "Update User" : "Create User"}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required={!formData.id} // update thì có thể để trống
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="submit">
                        {formData.id ? "Update" : "Create"}
                    </button>
                </form>
            </div>

            <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
}

export default UsersPage;
