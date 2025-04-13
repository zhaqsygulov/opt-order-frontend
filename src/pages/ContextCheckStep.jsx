import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserContext } from "../api/backend";

export default function ContextCheckStep({ onNext, setContextData }) {
  const [params] = useSearchParams();
  const contextKey = params.get("contextKey");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const username = "admin";
  const password = "123";

  useEffect(() => {
    async function load() {
      try {
        const data = await getUserContext(contextKey, username, password);
        setContextData({ ...data, contextKey });
        onNext();
      } catch (e) {
        setError("Не удалось получить контекст: " + e.message);
      } finally {
        setLoading(false);
      }
    }

    if (contextKey) {
      load();
    } else {
      setError("Не указан contextKey в URL");
      setLoading(false);
    }
  }, [contextKey]);

  if (loading) return <div>Загрузка контекста...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return <div>Успешно! Перенаправляем...</div>;
}
