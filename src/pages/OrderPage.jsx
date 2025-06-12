import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserContext } from "@/api/backend";

export default function CatalogPage() {
  const { contextId } = useParams();
  const [products, setProducts] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const username = import.meta.env.VITE_MS_USERNAME;
  const password = import.meta.env.VITE_MS_PASSWORD;

  useEffect(() => {
    async function loadData() {
      try {
        // 1. Получаем контекст сотрудника
        const context = await getUserContext(contextId, username, password);
        setEmployee(context.employee);
        setToken(context.token);

        // 2. Загружаем товары
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`, {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        });

        if (!res.ok) throw new Error("Ошибка при загрузке товаров");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Ошибка каталога:", err);
        setError("Не удалось загрузить каталог");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [contextId]);

  if (loading) return <div className="p-4">Загрузка каталога...</div>;
  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Каталог товаров</h1>
      <p className="text-gray-600 mb-6">Сотрудник: <strong>{employee?.fullName}</strong></p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            {product.description && <p className="text-sm text-gray-500">{product.description}</p>}
            <p className="mt-2">Цена: <strong>{product.price} ₽</strong></p>
            <p>Остаток: {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
