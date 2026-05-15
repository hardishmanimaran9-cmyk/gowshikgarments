import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconTrash } from '@tabler/icons-react';
import { deleteProduct } from '../../firebase/products';
import ConfirmDialog from '../shared/ConfirmDialog';
import toast from 'react-hot-toast';

export default function ProductTable({ products }) {
  const { t } = useTranslation();
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      await deleteProduct(deleting);
      toast.success(t('product_deleted'));
    } catch (err) {
      toast.error('Delete failed');
    }
    setDeleting(null);
  };

  const formatDate = (ts) => {
    if (!ts) return '—';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatPrice = (p) => new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(p);

  return (
    <>
      <div style={{ overflowX: 'auto' }}>
        <table className="enquiry-table">
          <thead>
            <tr>
              <th></th>
              <th>{t('product_code')}</th>
              <th>{t('product_note')}</th>
              <th>{t('price')}</th>
              <th>{t('added')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>
                  <img src={p.imageUrl} alt="" style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }} loading="lazy" />
                </td>
                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{p.productCode}</td>
                <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.note}</td>
                <td style={{ fontWeight: 600 }}>{formatPrice(p.price)}</td>
                <td>{formatDate(p.createdAt)}</td>
                <td>
                  <button className="btn btn-sm btn-outline" onClick={() => setDeleting(p)} style={{ color: 'var(--error)' }}>
                    <IconTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!deleting}
        title={t('delete')}
        message={t('confirm_delete')}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
        danger
      />
    </>
  );
}
