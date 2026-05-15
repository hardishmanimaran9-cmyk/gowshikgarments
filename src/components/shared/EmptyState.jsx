import { IconPackageOff } from '@tabler/icons-react';

export default function EmptyState({ title, subtitle, icon: Icon = IconPackageOff }) {
  return (
    <div className="empty-state">
      <div className="empty-icon"><Icon size={56} stroke={1.2} /></div>
      <div className="empty-title">{title}</div>
      {subtitle && <div className="empty-sub">{subtitle}</div>}
    </div>
  );
}
