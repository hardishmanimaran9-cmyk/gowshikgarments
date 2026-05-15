import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { subscribeEnquiries, updateEnquiryStatus } from '../../firebase/enquiries';
import EnquiryRow from '../../components/owner/EnquiryRow';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

export default function Orders() {
  const { t } = useTranslation();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsub = subscribeEnquiries((data) => {
      setEnquiries(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleStatusChange = async (docId, status) => {
    try {
      await updateEnquiryStatus(docId, status);
      toast.success(t('status_updated'));
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const filtered = enquiries.filter(e => {
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        e.buyerName?.toLowerCase().includes(q) ||
        e.phone?.includes(q) ||
        e.enquiryId?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="page-title">{t('orders')}</h1>
      <div className="section-sub">{enquiries.length} {t('total_enquiries').toLowerCase()}</div>

      <div className="filter-bar">
        <input
          className="search-input"
          placeholder={t('search_placeholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">{t('all')}</option>
          <option value="new">{t('new')}</option>
          <option value="seen">{t('seen')}</option>
          <option value="confirmed">{t('confirmed')}</option>
          <option value="dispatched">{t('dispatched')}</option>
        </select>
      </div>

      {filtered.length > 0 ? (
        <div className="card" style={{ overflow: 'auto' }}>
          <table className="enquiry-table">
            <thead>
              <tr>
                <th>{t('enquiry_id')}</th>
                <th>{t('buyer')}</th>
                <th>{t('phone')}</th>
                <th>{t('styles')}</th>
                <th>{t('pcs')}</th>
                <th>{t('date')}</th>
                <th>{t('status')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => (
                <EnquiryRow key={e.id} enquiry={e} onStatusChange={handleStatusChange} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>
          {t('no_enquiries')}
        </div>
      )}
    </div>
  );
}
