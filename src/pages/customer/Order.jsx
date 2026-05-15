import { useTranslation } from 'react-i18next';
import { useCart } from '../../store/cartStore';
import OrderItem from '../../components/customer/OrderItem';
import OrderForm from '../../components/customer/OrderForm';
import EmptyState from '../../components/shared/EmptyState';
import { IconShoppingCartOff } from '@tabler/icons-react';

export default function Order() {
  const { t } = useTranslation();
  const { items, cartCount, totalPcs, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="page-content-customer">
        <div className="container" style={{ paddingTop: 24 }}>
          <EmptyState
            title={t('empty_order')}
            subtitle={t('empty_order_sub')}
            icon={IconShoppingCartOff}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="page-content-customer">
      <div className="container" style={{ paddingTop: 20, maxWidth: 640 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>{t('your_order')}</h1>
          <button 
            onClick={clearCart}
            style={{ 
              background: 'none', border: 'none', color: 'var(--error)', 
              cursor: 'pointer', fontWeight: 500, padding: '8px 0'
            }}
          >
            {t('clear_all') || 'Clear All'}
          </button>
        </div>
        <div style={{ marginBottom: 20 }}>
          {items.map(item => <OrderItem key={item.productId} item={item} />)}
        </div>

        <div className="order-summary">
          <div className="summary-row">
            <span className="label">{t('total_styles')}</span>
            <span className="value">{cartCount}</span>
          </div>
          <div className="summary-row">
            <span className="label">{t('total_pieces')}</span>
            <span className="value">{totalPcs} {t('pcs')}</span>
          </div>
        </div>

        <OrderForm />
      </div>
    </div>
  );
}
