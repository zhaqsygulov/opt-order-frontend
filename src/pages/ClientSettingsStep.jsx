import React, { useState } from "react";

export default function ClientSettingsStep({ contextData, onNext }) {
  const [form, setForm] = useState({
    companyName: "",
    description: "",
    address: "",
    minOrderSum: "",
    logoFile: null,
    whatsapp: "",
    telegram: "",
    gis2: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [fieldsStatus, setFieldsStatus] = useState({
    product: null,
    order: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) =>
        formData.append(key, val ?? "")
      );

      const res = await fetch(`/api/account/${contextData.employee.accountId}/settings`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Ошибка при сохранении");
      setMessage("✅ Настройки успешно сохранены");
      onNext();
    } catch (err) {
      setMessage("❌ Ошибка: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const createCustomFields = async (type) => {
    const path = type === "product" ? "product-fields" : "order-fields";
    setFieldsStatus((prev) => ({ ...prev, [type]: "loading" }));

    try {
      const res = await fetch(`/api/ms/custom-fields/${path}`, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + contextData.token
        },
      });
      if (!res.ok) throw new Error("Ошибка при создании полей");
      setFieldsStatus((prev) => ({ ...prev, [type]: "success" }));
    } catch {
      setFieldsStatus((prev) => ({ ...prev, [type]: "error" }));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Настройки клиента</h2>

      <input name="companyName" value={form.companyName} onChange={handleChange}
             placeholder="Название компании *" className="input" required />
      <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Краткое описание" className="input" />
      <input name="address" value={form.address} onChange={handleChange}
             placeholder="Адрес" className="input" />
      <input name="minOrderSum" value={form.minOrderSum} onChange={handleChange}
             placeholder="Минимальная сумма заказа *" className="input" type="number" />
      <input name="logo" type="file" onChange={handleChange} className="input" />
      <input name="whatsapp" value={form.whatsapp} onChange={handleChange}
             placeholder="WhatsApp (обязательно)" className="input" />
      <input name="telegram" value={form.telegram} onChange={handleChange}
             placeholder="Telegram (опционально)" className="input" />
      <input name="gis2" value={form.gis2} onChange={handleChange}
             placeholder="2GIS (опционально)" className="input" />

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {saving ? "Сохраняем..." : "Сохранить"}
      </button>

      {message && <p className="mt-2">{message}</p>}

      <hr className="my-6" />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Доп. поля в МоёмСкладе</h3>

        <button
          onClick={() => createCustomFields("product")}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          ➕ Создать поля в товарах
        </button>
        {fieldsStatus.product === "loading" && <p>⏳ Создание...</p>}
        {fieldsStatus.product === "success" && <p className="text-green-600">✅ Поля добавлены</p>}
        {fieldsStatus.product === "error" && <p className="text-red-600">❌ Ошибка при создании</p>}

        <button
          onClick={() => createCustomFields("order")}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          ➕ Создать поля в заказах
        </button>
        {fieldsStatus.order === "loading" && <p>⏳ Создание...</p>}
        {fieldsStatus.order === "success" && <p className="text-green-600">✅ Поля добавлены</p>}
        {fieldsStatus.order === "error" && <p className="text-red-600">❌ Ошибка при создании</p>}
      </div>
    </div>
  );
}
