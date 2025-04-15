import React, { useEffect, useState } from "react";

export default function WelcomeStep({ onNext }) {
  return (
    <div className="text-center mt-16">
      <h1 className="text-3xl font-bold mb-4">🔧 Добро пожаловать в мастер настройки</h1>
      <p className="mb-6 text-gray-600">Вы скоро запустите свой B2B магазин.</p>

      <button
        onClick={onNext}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Начать →
      </button>
    </div>
  );
}
