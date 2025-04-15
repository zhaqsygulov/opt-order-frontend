import React, { useEffect, useState } from "react";
import { saveClientSettings } from "@/api/backend";

const ClientSettingsStep = ({ onNext, contextData }) => {
  const [form, setForm] = useState({
    companyName: "",
    description: "",
    address: "",
    minOrderSum: "",
    whatsapp: "",
    telegram: "",
    gis2: "",
  });

  useEffect(() => {
    if (contextData?.settings) {
      setForm({
        companyName: contextData.settings.companyName || "",
        description: contextData.settings.description || "",
        address: contextData.settings.address || "",
        minOrderSum: contextData.settings.minOrderSum || "",
        whatsapp: contextData.settings.whatsapp || "",
        telegram: contextData.settings.telegram || "",
        gis2: contextData.settings.gis2 || "",
      });
    }
  }, [contextData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await saveClientSettings(contextData.accountId, form);
      onNext();
    } catch (error) {
      console.error("Ошибка при сохранении настроек клиента:", error);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <input className="input" name="companyName" placeholder="Название компании" value={form.companyName} onChange={handleChange} />
      <input className="input" name="description" placeholder="Описание" value={form.description} onChange={handleChange} />
      <input className="input" name="address" placeholder="Адрес" value={form.address} onChange={handleChange} />
      <input className="input" name="minOrderSum" type="number" placeholder="Мин. сумма заказа" value={form.minOrderSum} onChange={handleChange} />
      <input className="input" name="whatsapp" placeholder="WhatsApp URL" value={form.whatsapp} onChange={handleChange} />
      <input className="input" name="telegram" placeholder="Telegram URL" value={form.telegram} onChange={handleChange} />
      <input className="input" name="gis2" placeholder="GIS2 URL" value={form.gis2} onChange={handleChange} />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Сохранить и продолжить
      </button>
    </div>
  );
};

export default ClientSettingsStep;
