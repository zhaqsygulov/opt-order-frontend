import React from "react";
import { Routes, Route } from "react-router-dom";
import ClientSettingsPage from "./pages/ClientSettingsPage";
import CatalogPage from "./pages/CatalogPage";
import InvoicePage from "./pages/InvoicePage";
import Wizard from "./pages/Wizard";

export default function App() {
  return (
    <Routes>
      {/* 👉 Главная: мастер настройки */}
      <Route path="/" element={<Wizard />} />

      {/* 👉 Существующие страницы */}
      <Route path="/client/settings" element={<ClientSettingsPage />} />
      <Route path="/catalog/:contextId" element={<CatalogPage />} />
      <Route path="/invoice/:orderId" element={<InvoicePage />} />
    </Routes>
  );
}
