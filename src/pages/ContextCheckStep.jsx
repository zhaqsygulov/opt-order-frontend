import React, { useEffect, useState } from "react";
import { getUserContext } from "@/api/backend";

const ContextCheckStep = ({ onNext, setContextData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        // Используй фиксированный логин/пароль или подтягивай из env
        const username = import.meta.env.VITE_MS_USERNAME;
        const password = import.meta.env.VITE_MS_PASSWORD;

        const data = await getUserContext(contextKey, username, password);
        console.log("✅ Контекст получен:", data);

        setContextData(data);
        onNext();
      } catch (err) {
        console.error("❌ Ошибка при получении контекста:", err);
        setError("Ошибка при загрузке данных контекста");
      } finally {
        setLoading(false);
      }
    };

    fetchContext();
  }, []);

  if (loading) return <p className="text-gray-500">Загружаем контекст...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return null;
};

export default ContextCheckStep;
