import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IconCircleCheck } from '@tabler/icons-react';

export default function OrderSuccess() {
  const { t } = useTranslation();

  return (
    <div className="page-content-customer">
      <div className="success-page">
        <div className="success-icon">
          <IconCircleCheck size={72} stroke={1.5} />
        </div>
        <div className="success-title">{t('order_success_title')}</div>
        <div className="success-sub">{t('order_success_sub')}</div>
        <Link to="/" className="btn btn-navy btn-lg">
          {t('start_new_order')}
        </Link>
      </div>
    </div>
  );
}
