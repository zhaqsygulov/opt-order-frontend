import { useState } from "react";
import { saveClientSettings } from "../lib/api"; // не забудь проверить путь

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await saveClientSettings(contextData.accountId, form);
      onNext();
    } catch (e) {
      console.error("Ошибка при сохранении настроек клиента:", e);
    }
  };

  return (
    <div className="space-y-4">
      <input className="input" name="companyName" placeholder="Название компании" onChange={handleChange} />
      <input className="input" name="description" placeholder="Описание" onChange={handleChange} />
      <input className="input" name="address" placeholder="Адрес" onChange={handleChange} />
      <input className="input" name="minOrderSum" type="number" placeholder="Мин. сумма заказа" onChange={handleChange} />
      <input className="input" name="whatsapp" placeholder="WhatsApp URL" onChange={handleChange} />
      <input className="input" name="telegram" placeholder="Telegram URL" onChange={handleChange} />
      <input className="input" name="gis2" placeholder="GIS2 URL" onChange={handleChange} />

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Сохранить и продолжить
      </button>
    </div>
  );
};

export default ClientSettingsStep;
