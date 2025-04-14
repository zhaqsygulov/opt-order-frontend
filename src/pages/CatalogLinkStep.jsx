const CatalogLinkStep = ({ onNext, contextData }) => {
  const handleClick = () => {
    // допустим, загружаем данные по каталогу
    onNext();
  };

  return (
    <div className="space-y-4 p-4">
      <p className="text-lg font-semibold">Привязка каталога (пока заглушка)</p>
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Продолжить
      </button>
    </div>
  );
};

export default CatalogLinkStep;
