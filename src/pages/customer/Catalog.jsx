import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { subscribeProducts } from '../../firebase/products';
import ProductCard from '../../components/customer/ProductCard';
import WholesaleBanner from '../../components/customer/WholesaleBanner';
import SkeletonCard from '../../components/shared/SkeletonCard';
import EmptyState from '../../components/shared/EmptyState';
import { IconShirtOff } from '@tabler/icons-react';

export default function Catalog() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <div className="page-content-customer">
      <div className="container">
        {loading ? (
          <div className="product-grid" style={{ paddingTop: 16 }}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title={t('empty_catalog')}
            subtitle={t('empty_catalog_sub')}
            icon={IconShirtOff}
          />
        ) : (
          <div className="product-grid">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
