import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <h1 className="logo">🚀 Demo Source Base Group 5</h1>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/users">Users</Link></li>
                    <li><Link to="/categories">Categories</Link></li>
                    <li><Link to="/products">Products</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
