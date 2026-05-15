import { useTranslation } from 'react-i18next';

export default function QuantitySelector({ qty, onChange }) {
  const handleDecrease = () => {
    if (qty > 12) onChange(qty - 12);
  };
  const handleIncrease = () => {
    onChange(qty + 12);
  };

  return (
    <div className="qty-selector">
      <button type="button" onClick={handleDecrease} disabled={qty <= 12}>−</button>
      <span className="qty-value">{qty}</span>
      <button type="button" onClick={handleIncrease}>+</button>
    </div>
  );
}
