import React from "react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserContext } from "../api/backend";

export default function CatalogPage() {
  const { contextId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // временные креденшелы (замени потом на форму или secure auth)
  const username = "admin";
  const password = "123";

  useEffect(() => {
    async function fetchContext() {
      try {
        const data = await getUserContext(contextId, username, password);
        setEmployee(data.employee);
        setToken(data.token);
      } catch (e) {
        setError("Ошибка загрузки данных: " + e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContext();
  }, [contextId]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Каталог</h1>
      <p>Сотрудник: <strong>{employee?.name}</strong></p>
      <p>Токен доступа: <code className="text-sm break-all">{token}</code></p>
    </div>
  );
}
