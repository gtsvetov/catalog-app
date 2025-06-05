import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CatalogPage from "./features/catalog/CatalogPage";
import LoginForm from "./features/auth/LoginForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/catalog" />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default App;
