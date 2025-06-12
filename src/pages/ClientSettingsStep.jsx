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
    logo: null, // 🆕
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (contextData?.settings) {
      setForm((prev) => ({
        ...prev,
        companyName: contextData.settings.companyName || "",
        description: contextData.settings.description || "",
        address: contextData.settings.address || "",
        minOrderSum: contextData.settings.minOrderSum || "",
        whatsapp: contextData.settings.whatsapp || "",
        telegram: contextData.settings.telegram || "",
        gis2: contextData.settings.gis2 || "",
      }));
    }
  }, [contextData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, logo: file });
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async () => {
    if (!contextData?.accountId) {
      console.error("❌ accountId отсутствует в contextData:", contextData);
      alert("Ошибка: не удалось сохранить настройки. Отсутствует accountId.");
      return;
    }

    try {
      console.log("📤 Отправка настроек клиента для accountId:", contextData.accountId);
      await saveClientSettings(
        contextData.accountId,
        form.companyName,
        form.description,
        form.address,
        form.minOrderSum,
        form.whatsapp,
        form.telegram,
        form.gis2,
        form.logo
      );
      onNext();
    } catch (error) {
      console.error("Ошибка при сохранении настроек клиента:", error);
      alert("Не удалось сохранить настройки клиента.");
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

      <div>
        <label className="block mb-1 font-medium">Логотип компании (необязательно)</label>
        <input className="input" type="file" accept="image/*" onChange={handleFileChange} />
        {previewUrl && (
          <img src={previewUrl} alt="Предпросмотр логотипа" className="mt-2 max-h-32 rounded shadow" />
        )}
      </div>

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
