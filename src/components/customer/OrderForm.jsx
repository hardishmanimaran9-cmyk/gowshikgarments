import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { useCart } from '../../store/cartStore';
import { createEnquiry } from '../../firebase/enquiries';
import { subscribeSettings } from '../../firebase/settings';
import toast from 'react-hot-toast';

export default function OrderForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, cartCount, totalPcs, clearCart } = useCart();
  const [settings, setSettings] = useState(null);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ buyerName: '', phone: '', address: '', specialReq: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const unsub = subscribeSettings(setSettings);
    return unsub;
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.buyerName.trim()) errs.buyerName = t('required_field');
    if (!form.phone.trim()) errs.phone = t('required_field');
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10))) errs.phone = t('invalid_phone');
    if (!form.address.trim()) errs.address = t('required_field');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const buildWhatsAppMessage = (enquiryId) => {
    let msg = `👔 *Wholesale Enquiry — Gowshik Garments*\n\n`;
    msg += `*Enquiry ID:* #${enquiryId}\n`;
    msg += `*Buyer:* ${form.buyerName}\n`;
    msg += `*Phone:* ${form.phone}\n`;
    msg += `*Address:* ${form.address}\n\n`;
    msg += `*Order list (${cartCount} styles, ${totalPcs} pieces):*\n\n`;

    items.forEach(item => {
      const notePreview = item.note?.substring(0, 70) || '';
      msg += `• ${item.productCode} — ${item.qty} pcs\n  ${notePreview}\n\n`;
    });

    msg += `*Special requirements:*\n${form.specialReq.trim() || 'None'}\n\n`;
    msg += `Please confirm availability and pricing. Thank you! 🙏`;
    return msg;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      const enquiryItems = items.map(i => ({
        productCode: i.productCode,
        imageUrl: i.imageUrl,
        notePreview: i.note?.substring(0, 70) || '',
        qty: i.qty
      }));

      const { enquiryId } = await createEnquiry({
        buyerName: form.buyerName,
        phone: form.phone,
        address: form.address,
        specialReq: form.specialReq,
        items: enquiryItems,
        totalPcs,
        totalStyles: cartCount
      });

      const message = buildWhatsAppMessage(enquiryId);
      const whatsappNum = settings?.whatsappNumber || '919876543210';
      const waUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`;

      clearCart();
      window.open(waUrl, '_blank');
      navigate('/order/success');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send order. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="input-group">
        <label>{t('buyer_name')} *</label>
        <input
          className={`input-field ${errors.buyerName ? 'error' : ''}`}
          value={form.buyerName}
          onChange={e => handleChange('buyerName', e.target.value)}
          placeholder={t('buyer_name')}
        />
        {errors.buyerName && <div className="input-error">{errors.buyerName}</div>}
      </div>

      <div className="input-group">
        <label>{t('phone')} *</label>
        <input
          className={`input-field ${errors.phone ? 'error' : ''}`}
          type="tel"
          value={form.phone}
          onChange={e => handleChange('phone', e.target.value)}
          placeholder="9876543210"
        />
        {errors.phone && <div className="input-error">{errors.phone}</div>}
      </div>

      <div className="input-group">
        <label>{t('address')} *</label>
        <textarea
          className={`input-field ${errors.address ? 'error' : ''}`}
          value={form.address}
          onChange={e => handleChange('address', e.target.value)}
          placeholder={t('address')}
          rows={3}
        />
        {errors.address && <div className="input-error">{errors.address}</div>}
      </div>

      <div className="input-group">
        <label>{t('special_req')}</label>
        <textarea
          className="input-field"
          value={form.specialReq}
          onChange={e => handleChange('specialReq', e.target.value)}
          placeholder={t('special_req')}
          rows={2}
        />
      </div>

      <button
        type="submit"
        className="btn btn-whatsapp btn-block btn-lg"
        disabled={sending || items.length === 0}
      >
        <IconBrandWhatsapp size={20} />
        {sending ? t('loading') : t('send_whatsapp')}
      </button>
    </form>
  );
}
