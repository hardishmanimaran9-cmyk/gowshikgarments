import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import {
  IconLayoutDashboard, IconUpload, IconLayoutGrid,
  IconClipboardList, IconSettings, IconLogout
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const navItems = [
  { path: '/owner/dashboard', icon: IconLayoutDashboard, key: 'dashboard' },
  { path: '/owner/upload', icon: IconUpload, key: 'upload_product' },
  { path: '/owner/orders', icon: IconClipboardList, key: 'orders' },
  { path: '/owner/settings', icon: IconSettings, key: 'settings' },
];

export default function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <aside className="sidebar desktop-only">
      <div className="sidebar-header">
        <img src="/logo.png" alt="Logo" className="sidebar-logo-img" />
        <div className="sidebar-logo">Gowshik Garments</div>
        <div className="sidebar-sub">Owner Portal</div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
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
    </aside>
  );
}
