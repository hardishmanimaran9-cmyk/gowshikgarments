import { useTranslation } from 'react-i18next';

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, danger = false }) {
  const { t } = useTranslation();
  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog-box" onClick={e => e.stopPropagation()}>
        <div className="dialog-title">{title}</div>
        <div className="dialog-msg">{message}</div>
        <div className="dialog-actions">
          <button className="btn btn-outline" onClick={onCancel}>{t('cancel')}</button>
          <button className={`btn ${danger ? 'btn-danger' : 'btn-navy'}`} onClick={onConfirm}>
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
