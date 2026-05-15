import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { IconLayoutGrid, IconShoppingCart } from '@tabler/icons-react';
import { useCart } from '../../store/cartStore';

export default function BottomTabBar() {
  const { t } = useTranslation();
  const { cartCount } = useCart();
  const location = useLocation();

  return (
    <div className="bottom-tab-bar mobile-only">
      <Link to="/" className={`bottom-tab ${location.pathname === '/' ? 'active' : ''}`}>
        <IconLayoutGrid size={22} stroke={1.8} />
        <span>{t('catalog')}</span>
      </Link>
      <Link to="/order" className={`bottom-tab ${location.pathname.startsWith('/order') ? 'active' : ''}`}>
        <IconShoppingCart size={22} stroke={1.8} />
        {cartCount > 0 && <span className="tab-badge">{cartCount}</span>}
        <span>{t('my_order')}</span>
      </Link>
    </div>
  );
}
