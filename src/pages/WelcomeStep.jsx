export default function WelcomeStep({ onNext }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Добро пожаловать 👋</h1>
      <p className="mb-6">Это мастер настройки магазина для ваших B2B клиентов.</p>
      <button
        onClick={onNext}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Начать настройку
      </button>
    </div>
  );
}
