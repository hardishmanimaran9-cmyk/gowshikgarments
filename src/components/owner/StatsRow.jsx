import { useTranslation } from 'react-i18next';
import { IconPackage, IconClipboardList, IconAlertCircle, IconCalendarPlus } from '@tabler/icons-react';

export default function StatsRow({ products, enquiries }) {
  const { t } = useTranslation();

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const addedThisMonth = products.filter(p => {
    if (!p.createdAt) return false;
    const d = p.createdAt.toDate ? p.createdAt.toDate() : new Date(p.createdAt);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  }).length;

  const newEnquiries = enquiries.filter(e => e.status === 'new').length;

  const stats = [
    { label: t('total_products'), value: products.length, icon: IconPackage, bg: '#dbeafe', color: '#1d4ed8' },
    { label: t('total_enquiries'), value: enquiries.length, icon: IconClipboardList, bg: '#fef3c7', color: '#b45309' },
    { label: t('new_enquiries'), value: newEnquiries, icon: IconAlertCircle, bg: '#dcfce7', color: '#15803d' },
    { label: t('added_this_month'), value: addedThisMonth, icon: IconCalendarPlus, bg: '#f3e8ff', color: '#7c3aed' },
  ];

  return (
    <div className="stats-row">
      {stats.map((s, i) => (
        <div className="stat-card" key={i}>
          <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
            <s.icon size={22} stroke={1.8} />
          </div>
          <div className="stat-value">{s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
