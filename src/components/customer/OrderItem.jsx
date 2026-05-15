import { useTranslation } from 'react-i18next';
import { useCart } from '../../store/cartStore';
import QuantitySelector from './QuantitySelector';

export default function OrderItem({ item }) {
  const { t } = useTranslation();
  const { removeItem, updateQty } = useCart();

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(item.price * item.qty);

  return (
    <div className="order-item">
      <img src={item.imageUrl} alt="" className="order-thumb" loading="lazy" />
      <div className="order-info">
        <div className="order-note">{item.note}</div>
        <div className="order-price">{formattedPrice}</div>
        <QuantitySelector qty={item.qty} onChange={(q) => updateQty(item.productId, q)} />
        <button className="remove-btn" onClick={() => removeItem(item.productId)}>
          {t('remove')}
        </button>
      </div>
    </div>
  );
}
