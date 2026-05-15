import { useTranslation } from 'react-i18next';

const statusColors = {
  new: 'badge-blue',
  seen: 'badge-amber',
  confirmed: 'badge-green',
  dispatched: 'badge-grey'
};

export default function StatusBadge({ status, onChange }) {
  const { t } = useTranslation();

  if (onChange) {
    return (
      <select
        className="status-select"
        value={status}
        onChange={e => onChange(e.target.value)}
        style={{
          color: status === 'new' ? '#1d4ed8' : status === 'seen' ? '#b45309' : status === 'confirmed' ? '#15803d' : '#6b7280'
        }}
      >
        <option value="new">{t('new')}</option>
        <option value="seen">{t('seen')}</option>
        <option value="confirmed">{t('confirmed')}</option>
        <option value="dispatched">{t('dispatched')}</option>
      </select>
    );
  }

  return <span className={`badge ${statusColors[status] || 'badge-grey'}`}>{t(status)}</span>;
}
