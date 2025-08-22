import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import UsersPage from "./pages/UsersPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import TablesPage from "./pages/TablesPage";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<UsersPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/tables" element={<TablesPage />} />
            </Routes>
        </Layout>
    );
}

export default App;
