import { useState } from 'react';
import { Button, Input } from '@/components/ui';
import { saveClientSettings } from '@/lib/api';

const ClientSettingsStep = ({ onNext, contextData }) => {
  const [form, setForm] = useState({
    companyName: '',
    description: '',
    address: '',
    minOrderSum: '',
    whatsapp: '',
    telegram: '',
    gis2: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await saveClientSettings(contextData.accountId, form);
    onNext();
  };

  return (
    <div className="space-y-4">
      <Input name="companyName" placeholder="Название компании" onChange={handleChange} />
      <Input name="description" placeholder="Описание" onChange={handleChange} />
      <Input name="address" placeholder="Адрес" onChange={handleChange} />
      <Input name="minOrderSum" type="number" placeholder="Мин. сумма заказа" onChange={handleChange} />
      <Input name="whatsapp" placeholder="WhatsApp URL" onChange={handleChange} />
      <Input name="telegram" placeholder="Telegram URL" onChange={handleChange} />
      <Input name="gis2" placeholder="GIS2 URL" onChange={handleChange} />
      <Button onClick={handleSubmit}>Сохранить и продолжить</Button>
    </div>
  );
};

export default ClientSettingsStep;
