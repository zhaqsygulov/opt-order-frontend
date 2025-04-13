import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUserContext } from "../api/backend";

export default function ContextCheckStep({ onNext, setContextData }) {
  const [params] = useSearchParams();
  const contextKey = params.get("contextKey");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const username = "admin"; // временно
  const password = "123";

  useEffect(() => {
    async function load() {
      console.log("📦 Пытаемся загрузить контекст по contextKey =", contextKey);
      try {
        const data = await getUserContext(contextKey, username, password);
        console.log("✅ Контекст получен:", data);
        setContextData({ ...data, contextKey });
        onNext();
      } catch (e) {
        console.error("❌ Ошибка при получении контекста:", e);
        setError("Ошибка при загрузке данных: " + e.message);
      } finally {
        setLoading(false);
      }
    }

    if (contextKey) {
      load();
    } else {
      setError("❗ contextKey отсутствует в URL");
      setLoading(false);
    }
  }, [contextKey]);

  if (loading) return <div className="text-center">⏳ Загружаем данные...</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return <div>Контекст успешно получен. Переход...</div>;
}
