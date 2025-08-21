import React from "react";

const UserTable = ({ users, onEdit, onDelete }) => {
    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>••••••••</td>
                            <td>{user.phone}</td>
                            <td>
                                <button className="btn btn-edit" onClick={() => onEdit(user)}>
                                    Edit
                                </button>
                                <button
                                    className="btn btn-delete"
                                    onClick={() => onDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
