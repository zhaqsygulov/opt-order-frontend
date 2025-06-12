import React, { useEffect, useState } from "react";
import { getUserContext } from "../api/backend";

const CatalogLinkStep = ({ onNext, contextData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    async function loadContext() {
      try {
        const data = await getUserContext(contextData.contextKey);
        setEmployee(data);
      } catch (err) {
        setError(err.message || "Ошибка");
      } finally {
        setLoading(false);
      }
    }

    loadContext();
  }, [contextData.contextKey]);

  const handleClick = () => {
    onNext();
  };

  return (
    <div className="space-y-4 p-4">
      <p className="text-lg font-semibold">Привязка каталога</p>

      {loading && <p className="text-blue-500">Загрузка контекста...</p>}
      {error && <p className="text-red-500">Ошибка: {error}</p>}
      {employee && (
        <div className="bg-gray-100 p-3 rounded text-sm">
          <p><strong>Сотрудник:</strong> {employee.fullName || employee.name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>UID:</strong> {employee.uid}</p>
        </div>
      )}

      <button
        onClick={handleClick}
        disabled={!employee || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        Продолжить
      </button>
    </div>
  );
};

export default CatalogLinkStep;
