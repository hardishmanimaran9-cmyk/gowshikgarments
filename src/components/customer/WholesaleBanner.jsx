import { useTranslation } from 'react-i18next';

export default function WholesaleBanner() {
  const { t } = useTranslation();
  return (
    <div className="wholesale-banner">
      {t('wholesale_notice')}
    </div>
  );
}
