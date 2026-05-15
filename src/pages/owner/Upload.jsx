import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { addProduct } from '../../firebase/products';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import toast from 'react-hot-toast';

export default function Upload() {
  const { t } = useTranslation();
  const fileRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({ productCode: '', note: '', price: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.error('Please upload an image (JPG or PNG)');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!imageFile) errs.image = true;
    if (!form.productCode.trim()) errs.productCode = t('required_field');
    if (!form.note.trim()) errs.note = t('required_field');
    if (!form.price || Number(form.price) <= 0) errs.price = t('required_field');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      if (!imageFile) toast.error('Please select an image');
      return;
    }

    setSubmitting(true);
    try {
      await addProduct({
        productCode: form.productCode.trim(),
        note: form.note.trim(),
        price: form.price,
        imageFile
      });
      toast.success('Product added successfully!');
      setForm({ productCode: '', note: '', price: '' });
      setImageFile(null);
      setImagePreview(null);
      setErrors({});
    } catch (err) {
      console.error(err);
      toast.error('Failed to add product. Please check your internet.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 className="page-title">{t('upload_product')}</h1>
      <div className="section-sub">Pick a photo from your gallery and fill in the details.</div>

      <form onSubmit={handleSubmit}>
        {/* Image Picker */}
        <div 
          className={`upload-zone ${errors.image ? 'error' : ''}`}
          onClick={() => fileRef.current?.click()}
          style={{ 
            border: '2px dashed #cbd5e1', 
            borderRadius: '12px', 
            padding: '40px 20px', 
            textAlign: 'center',
            cursor: 'pointer',
            marginBottom: '20px',
            background: '#fff',
            borderColor: errors.image ? 'var(--error)' : '#cbd5e1'
          }}
        >
          {imagePreview ? (
            <div style={{ position: 'relative' }}>
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '8px' }} />
              <div style={{ marginTop: '8px', color: 'var(--blue)', fontSize: '0.85rem', fontWeight: 600 }}>Click to change photo</div>
            </div>
          ) : (
            <>
              <div style={{ color: '#64748b', marginBottom: '8px' }}><IconPhoto size={48} stroke={1.2} /></div>
              <div style={{ fontWeight: 600, color: '#1e293b' }}>Select Product Photo</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Click to open gallery</div>
            </>
          )}
        </div>
        <input 
          ref={fileRef} 
          type="file" 
          accept="image/*" 
          hidden 
          onChange={handleFileChange} 
        />

        <div className="input-group">
          <label>{t('product_code')} *</label>
          <input
            className={`input-field ${errors.productCode ? 'error' : ''}`}
            value={form.productCode}
            onChange={e => setForm(p => ({ ...p, productCode: e.target.value }))}
            placeholder="e.g. US-001"
            style={{ fontFamily: 'monospace' }}
          />
          {errors.productCode && <div className="input-error">{errors.productCode}</div>}
        </div>

        <div className="input-group">
          <label>{t('product_description')} *</label>
          <textarea
            className={`input-field ${errors.note ? 'error' : ''}`}
            value={form.note}
            onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
            placeholder="Fabric, sizes, colors..."
            rows={4}
          />
          {errors.note && <div className="input-error">{errors.note}</div>}
        </div>

        <div className="input-group">
          <label>{t('price_inr')} *</label>
          <input
            className={`input-field ${errors.price ? 'error' : ''}`}
            type="number"
            value={form.price}
            onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
            placeholder="450"
          />
          {errors.price && <div className="input-error">{errors.price}</div>}
        </div>

        <button type="submit" className="btn btn-navy btn-block btn-lg" disabled={submitting}>
          {submitting ? 'Uploading... please wait' : 'Add to Catalog'}
        </button>
      </form>
    </div>
  );
}
