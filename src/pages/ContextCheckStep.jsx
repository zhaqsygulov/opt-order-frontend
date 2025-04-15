import React from "react";
import React, { useEffect, useState } from "react"; // 👈 добавлен React
import axios from "axios";

const ContextCheckStep = ({ onNext, setContextData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получаем contextKey из query-параметров
  const getContextKeyFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("contextKey");
  };

  useEffect(() => {
    const fetchContext = async () => {
      const contextKey = getContextKeyFromUrl();

      if (!contextKey) {
        setError("contextKey отсутствует в URL");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `/api/app-ms-adapter/context/${contextKey}/employee`
        );

        const data = response.data;

        setContextData(data); // сохраняем весь ответ (включая accountId и settings)
        onNext(); // сразу переходим к следующему шагу
      } catch (err) {
        setError("Ошибка при загрузке данных контекста");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContext();
  }, []);

  if (loading) return <p className="text-gray-500">Загружаем контекст...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return null; // мы переходим на следующий шаг, здесь ничего не отображаем
};

export default ContextCheckStep;
