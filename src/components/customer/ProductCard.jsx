import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../store/cartStore';
import QuantitySelector from './QuantitySelector';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const [qty, setQty] = useState(12);
  const [expanded, setExpanded] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    toast.success(t('add_to_order') + ' ✓');
    setQty(12);
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(product.price);

  return (
    <div className="product-card card">
      <img
        src={product.imageUrl}
        alt={product.note?.substring(0, 40) || 'Shirt'}
        className="product-img"
        loading="lazy"
      />
      <div className="product-body">
        <div
          className={`product-note ${expanded ? 'expanded' : ''}`}
          onClick={() => setExpanded(!expanded)}
          title={product.note}
        >
          {product.note}
        </div>
        <div className="product-price">{formattedPrice}/{t('pc')}</div>
        <div className="product-actions">
          <QuantitySelector qty={qty} onChange={setQty} />
          <button className="btn btn-navy btn-block" onClick={handleAdd}>
            {t('add_to_order')}
          </button>
        </div>
      </div>
    </div>
  );
}
