
import React, { useEffect, useState } from "react";

export default function OptOrderPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://opt-order-backend.onrender.com/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleQuantityChange = (productId, quantity) => {
    setCart({ ...cart, [productId]: quantity });
  };

  const handleSubmit = async () => {
    const items = Object.entries(cart).map(([product_id, quantity]) => ({
      product_id: parseInt(product_id),
      quantity: parseInt(quantity),
    }));

    const res = await fetch("https://opt-order-backend.onrender.com/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city, items }),
    });

    const data = await res.json();
    setMessage(data.message || data.detail);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Оптовый заказ</h1>
      <input
        placeholder="Ваш город"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ width: '100%', margin: '12px 0', padding: 8 }}
      />
      {products.map((product) => (
        <div key={product.id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
          <div><strong>{product.name}</strong> — {product.volume}</div>
          <div>Цена за упаковку: {product.price_per_pack} тг</div>
          <div>Мин. заказ: {product.min_quantity} упаковок</div>
          <input
            type="number"
            min={product.min_quantity}
            placeholder="Количество упаковок"
            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
            style={{ marginTop: 8, padding: 4, width: '100%' }}
          />
        </div>
      ))}
      <button onClick={handleSubmit} style={{ marginTop: 12, padding: 12, width: '100%' }}>
        Отправить заказ
      </button>
      {message && <div style={{ marginTop: 12, textAlign: 'center' }}>{message}</div>}
    </div>
  );
}
