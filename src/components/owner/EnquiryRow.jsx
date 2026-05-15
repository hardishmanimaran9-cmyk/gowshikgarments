import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconChevronDown, IconChevronUp, IconTrash } from '@tabler/icons-react';
import StatusBadge from './StatusBadge';

export default function EnquiryRow({ enquiry, onStatusChange, onDelete }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const formatDate = (ts) => {
    if (!ts) return '—';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <tr onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
        <td style={{ fontWeight: 600, fontFamily: 'monospace' }}>#{enquiry.enquiryId}</td>
        <td>{enquiry.buyerName}</td>
        <td>{enquiry.phone}</td>
        <td>{enquiry.totalStyles}</td>
        <td>{enquiry.totalPcs}</td>
        <td>{formatDate(enquiry.createdAt)}</td>
        <td onClick={e => e.stopPropagation()}>
          <StatusBadge status={enquiry.status} onChange={(s) => onStatusChange(enquiry.id, s)} />
        </td>
        <td>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button 
              type="button"
              onClick={(e) => { 
                e.preventDefault();
                e.stopPropagation(); 
                onDelete(enquiry.id); 
              }}
              style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', display: 'flex', padding: 4 }}
              title={t('delete') || 'Delete'}
            >
              <IconTrash size={18} />
            </button>
            {expanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
          </div>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={8} style={{ padding: 0 }}>
            <div className="expand-content">
              <div className="detail-grid">
                <div>
                  <div className="detail-label">{t('address')}</div>
                  <div className="detail-value">{enquiry.address}</div>
                </div>
                <div>
                  <div className="detail-label">{t('special_requirements')}</div>
                  <div className="detail-value">{enquiry.specialReq || t('none')}</div>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <div className="detail-label" style={{ marginBottom: 8 }}>{t('order_details')}</div>
                {enquiry.items?.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <img src={item.imageUrl} alt="" style={{ width: 36, height: 36, borderRadius: 4, objectFit: 'cover' }} />
                    <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{item.productCode}</span>
                    <span>— {item.qty} {t('pcs')}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{item.notePreview}</span>
                  </div>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
