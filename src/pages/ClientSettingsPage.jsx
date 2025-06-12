import React, { useState } from "react";
import { saveClientSettings } from "@/api/backend";

const ClientSettingsStep = ({ onNext, contextData }) => {
  const [form, setForm] = useState({
    companyName: '',
    description: '',
    address: '',
    minOrderSum: '',
    whatsapp: '',
    telegram: '',
    gis2: '',
    logo: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

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
    try {
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
      console.error('Ошибка при сохранении настроек клиента:', error);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <input
        className="input"
        name="companyName"
        placeholder="Название компании"
        onChange={handleChange}
      />
      <input
        className="input"
        name="description"
        placeholder="Описание"
        onChange={handleChange}
      />
      <input
        className="input"
        name="address"
        placeholder="Адрес"
        onChange={handleChange}
      />
      <input
        className="input"
        type="number"
        name="minOrderSum"
        placeholder="Мин. сумма заказа"
        onChange={handleChange}
      />
      <input
        className="input"
        name="whatsapp"
        placeholder="WhatsApp URL"
        onChange={handleChange}
      />
      <input
        className="input"
        name="telegram"
        placeholder="Telegram URL"
        onChange={handleChange}
      />
      <input
        className="input"
        name="gis2"
        placeholder="GIS2 URL"
        onChange={handleChange}
      />

      <div>
        <label className="block mb-1 font-medium">Загрузить логотип</label>
        <input
          className="input"
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleFileChange}
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Предпросмотр логотипа"
            className="mt-2 max-h-32 rounded shadow"
          />
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
