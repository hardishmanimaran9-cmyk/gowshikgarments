import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconShirt, IconShoppingCart, IconLogout } from '@tabler/icons-react';
import { useCart } from '../../store/cartStore';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function CustomerNav() {
  const { t, i18n } = useTranslation();
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ta' : 'en');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err) {
      toast.error('Failed to log out');
    }
  };

  return (
    <header className="customer-header">
      <div className="container">
        <Link to="/" className="header-logo">
          <img src="/logo.png" alt="Gowshik Garments" className="logo-img" />
          <span className="brand-name">Gowshik Garments</span>
        </Link>
        <div className="header-actions">
          <nav className="desktop-nav" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginRight: '8px' }}>
            <Link to="/" style={{ fontSize: '0.88rem', fontWeight: location.pathname === '/' ? 700 : 500, color: location.pathname === '/' ? 'var(--navy)' : 'var(--text-secondary)' }}>
              {t('catalog')}
            </Link>
            <Link to="/order" style={{ fontSize: '0.88rem', fontWeight: location.pathname === '/order' ? 700 : 500, color: location.pathname === '/order' ? 'var(--navy)' : 'var(--text-secondary)' }}>
              {t('my_order')}
            </Link>
          </nav>
          <button className="lang-toggle" onClick={toggleLang}>
            {i18n.language === 'en' ? 'தமிழ்' : 'EN'}
          </button>
          <Link to="/order" className="cart-btn">
            <IconShoppingCart size={22} stroke={1.8} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--navy)', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '4px' }} title="Logout">
            <IconLogout size={22} stroke={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
}
