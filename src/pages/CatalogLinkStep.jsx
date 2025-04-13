import { Button } from '@/components/ui';

const CatalogLinkStep = ({ onNext, contextData }) => {
  const handleClick = () => {
    // допустим, загружаем данные по каталогу
    onNext();
  };

  return (
    <div>
      <p>Привязка каталога (пока заглушка)</p>
      <Button onClick={handleClick}>Продолжить</Button>
    </div>
  );
};

export default CatalogLinkStep;
