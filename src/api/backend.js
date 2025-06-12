const BASE_URL = import.meta.env.VITE_API_URL || "https://ms-onec-plugin-master-3.onrender.com/api";
const TIMEOUT = 5000; // увеличил до 5 сек для реальных API

function withTimeout(signal) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), TIMEOUT)
  );
}

export async function getUserContext(contextKey) {
  const username = import.meta.env.VITE_MS_USERNAME;
  const password = import.meta.env.VITE_MS_PASSWORD;

  const endpoint = `${BASE_URL}/app-ms-adapter/context/${contextKey}/employee`;

  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const fetchPromise = fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`)
      },
      signal
    });

    const response = await Promise.race([fetchPromise, withTimeout(signal)]);

    if (!response.ok) throw new Error("Ошибка авторизации");

    return await response.json();
  } catch (e) {
    console.error("Ошибка при получении контекста:", e);
    throw e;
  }
}

export async function saveClientSettings(accountId, name, description, address, minSum, whatsapp, telegram, gis2, logoFile) {
  const endpoint = `${BASE_URL}/settings/${accountId}`;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("desc", description);
  formData.append("address", address);
  formData.append("minSum", minSum);
  formData.append("whatsapp", whatsapp);
  formData.append("telegram", telegram);
  formData.append("gis2", gis2);
  if (logoFile) formData.append("logo", logoFile);

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      body: formData
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error("Ошибка сохранения настроек: " + text);
    }
  } catch (e) {
    console.error("Ошибка при сохранении настроек клиента:", e);
    throw e;
  }
}
