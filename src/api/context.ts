export async function getEmployeeContext(contextKey: string) {
  const API_URL = import.meta.env.VITE_API_URL;
  const USERNAME = import.meta.env.VITE_MS_USERNAME;
  const PASSWORD = import.meta.env.VITE_MS_PASSWORD;

  const auth = 'Basic ' + btoa(`${USERNAME}:${PASSWORD}`);

  const response = await fetch(`${API_URL}/api/app-ms-adapter/context/${contextKey}/employee`, {
    headers: {
      Authorization: auth
    }
  });

  if (!response.ok) {
    throw new Error(`Ошибка загрузки контекста: ${response.status}`);
  }

  return response.json();
}
