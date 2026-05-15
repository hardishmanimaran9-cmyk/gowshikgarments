import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { subscribeProducts } from '../../firebase/products';
import { subscribeEnquiries, updateEnquiryStatus } from '../../firebase/enquiries';
import StatsRow from '../../components/owner/StatsRow';
import ProductTable from '../../components/owner/ProductTable';
import EnquiryRow from '../../components/owner/EnquiryRow';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let loaded = { p: false, e: false };
    const checkDone = () => { if (loaded.p && loaded.e) setLoading(false); };

    const unsub1 = subscribeProducts((data) => {
      setProducts(data);
      loaded.p = true;
      checkDone();
    });
    const unsub2 = subscribeEnquiries((data) => {
      setEnquiries(data);
      loaded.e = true;
      checkDone();
    });

    return () => { unsub1(); unsub2(); };
  }, []);

  const handleStatusChange = async (docId, status) => {
    try {
      await updateEnquiryStatus(docId, status);
      toast.success(t('status_updated'));
    } catch (err) {
      toast.error('Update failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <div>
      <h1 className="page-title">{t('dashboard')}</h1>
      <div className="section-sub" style={{ marginBottom: 24 }}>Welcome back to your business dashboard</div>

      <StatsRow products={products} enquiries={enquiries} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 className="section-title" style={{ margin: 0 }}>{t('recent_enquiries')}</h2>
        <Link to="/owner/orders" style={{ color: 'var(--navy)', fontSize: '0.85rem', fontWeight: 600 }}>
          {t('view_all_orders')} →
        </Link>
      </div>
      {recentEnquiries.length > 0 ? (
        <div className="card" style={{ overflow: 'auto', marginBottom: 32 }}>
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
              {recentEnquiries.map(e => (
                <EnquiryRow key={e.id} enquiry={e} onStatusChange={handleStatusChange} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 32 }}>
          {t('no_enquiries')}
        </div>
      )}

      <h2 className="section-title">{t('products')}</h2>
      {products.length > 0 ? (
        <div className="card" style={{ overflow: 'auto' }}>
          <ProductTable products={products} />
        </div>
      ) : (
        <div className="card" style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)' }}>
          {t('empty_catalog')}
        </div>
      )}
    </div>
  );
}
