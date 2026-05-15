import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import {
  IconLayoutDashboard, IconUpload, IconLayoutGrid,
  IconClipboardList, IconSettings, IconLogout, IconX
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const navItems = [
  { path: '/owner/dashboard', icon: IconLayoutDashboard, key: 'dashboard' },
  { path: '/owner/upload', icon: IconUpload, key: 'upload_product' },
  { path: '/owner/orders', icon: IconClipboardList, key: 'orders' },
  { path: '/owner/settings', icon: IconSettings, key: 'settings' },
];

export default function Drawer({ open, onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
    navigate('/owner/login');
  };

  return (
    <>
      <div className={`drawer-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`drawer ${open ? 'open' : ''}`}>
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '36px', height: '36px', borderRadius: '4px' }} />
            <div>
              <div className="sidebar-logo">Gowshik Garments</div>
              <div className="sidebar-sub">Owner Portal</div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#fff', background: 'none', border: 'none', padding: '4px' }}><IconX size={20} /></button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <item.icon size={20} stroke={1.6} />
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="sidebar-link" onClick={handleLogout} style={{ width: '100%' }}>
            <IconLogout size={20} stroke={1.6} />
            {t('logout')}
          </button>
        </div>
      </div>
    </>
  );
}
