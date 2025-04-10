
import React from "react";
import { Routes, Route } from "react-router-dom";
import ClientSettingsPage from "./pages/ClientSettingsPage";
import CatalogPage from "./pages/CatalogPage";
import InvoicePage from "./pages/InvoicePage";

export default function App() {
  return (
    <Routes>
      <Route path="/client/settings" element={<ClientSettingsPage />} />
      <Route path="/catalog/:contextId" element={<CatalogPage />} />
      <Route path="/invoice/:orderId" element={<InvoicePage />} />
    </Routes>
  );
}
