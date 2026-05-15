import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function QuantitySelector({ qty, onChange }) {
  const [inputValue, setInputValue] = useState(qty.toString());

  useEffect(() => {
    setInputValue(qty.toString());
  }, [qty]);

  const handleDecrease = () => {
    if (qty > 12) onChange(qty - 12);
  };
  
  const handleIncrease = () => {
    onChange(qty + 12);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    let val = parseInt(inputValue, 10);
    if (isNaN(val) || val < 12) {
      val = 12;
    }
    onChange(val);
    setInputValue(val.toString());
  };

  return (
    <div className="qty-selector">
      <button type="button" onClick={handleDecrease} disabled={qty <= 12}>−</button>
      <input 
        type="number" 
        className="qty-value" 
        value={inputValue} 
        onChange={handleInputChange}
        onBlur={handleBlur}
        style={{
          width: '50px',
          textAlign: 'center',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          color: 'inherit',
          padding: 0,
          margin: 0,
          appearance: 'textfield',
          MozAppearance: 'textfield'
        }}
      />
      <button type="button" onClick={handleIncrease}>+</button>
    </div>
  );
}
