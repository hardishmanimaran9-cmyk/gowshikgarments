import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getSettings, updateSettings } from '../../firebase/settings';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/config';
import toast from 'react-hot-toast';

export default function Settings() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({ whatsappNumber: '', tagline_en: '', tagline_ta: '' });
  const [pw, setPw] = useState({ current: '', newPw: '', confirm: '' });
  const [saving, setSaving] = useState(false);
  const [changingPw, setChangingPw] = useState(false);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSettings({
        whatsappNumber: settings.whatsappNumber,
        tagline_en: settings.tagline_en,
        tagline_ta: settings.tagline_ta
      });
      toast.success(t('settings_saved'));
    } catch (err) {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pw.newPw !== pw.confirm) {
      toast.error(t('password_mismatch'));
      return;
    }
    if (pw.newPw.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setChangingPw(true);
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, pw.current);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, pw.newPw);
      toast.success(t('password_changed'));
      setPw({ current: '', newPw: '', confirm: '' });
    } catch (err) {
      toast.error(err.message || 'Password change failed');
    } finally {
      setChangingPw(false);
    }
  };

  return (
    <div style={{ maxWidth: 560 }}>
      <h1 className="page-title">{t('settings')}</h1>

      <form onSubmit={handleSaveSettings} style={{ marginBottom: 40 }}>
        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
          <h2 className="section-title" style={{ fontSize: '1.05rem' }}>Business Settings</h2>

          <div className="input-group">
            <label>{t('whatsapp_number')}</label>
            <input
              className="input-field"
              value={settings.whatsappNumber}
              onChange={e => setSettings(p => ({ ...p, whatsappNumber: e.target.value }))}
              placeholder="919876543210"
            />
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Include country code without + (e.g. 919876543210)
            </div>
          </div>

          <div className="input-group">
            <label>{t('business_tagline_en')}</label>
            <input
              className="input-field"
              value={settings.tagline_en}
              onChange={e => setSettings(p => ({ ...p, tagline_en: e.target.value }))}
            />
          </div>

          <div className="input-group">
            <label>{t('business_tagline_ta')}</label>
            <input
              className="input-field"
              value={settings.tagline_ta}
              onChange={e => setSettings(p => ({ ...p, tagline_ta: e.target.value }))}
            />
          </div>

          <button type="submit" className="btn btn-navy btn-block" disabled={saving}>
            {saving ? t('loading') : t('save')}
          </button>
        </div>
      </form>

      <form onSubmit={handleChangePassword}>
        <div className="card" style={{ padding: 24 }}>
          <h2 className="section-title" style={{ fontSize: '1.05rem' }}>{t('change_password')}</h2>

          <div className="input-group">
            <label>{t('current_password')}</label>
            <input className="input-field" type="password" value={pw.current} onChange={e => setPw(p => ({ ...p, current: e.target.value }))} required />
          </div>
          <div className="input-group">
            <label>{t('new_password')}</label>
            <input className="input-field" type="password" value={pw.newPw} onChange={e => setPw(p => ({ ...p, newPw: e.target.value }))} required />
          </div>
          <div className="input-group">
            <label>{t('confirm_password')}</label>
            <input className="input-field" type="password" value={pw.confirm} onChange={e => setPw(p => ({ ...p, confirm: e.target.value }))} required />
          </div>

          <button type="submit" className="btn btn-navy btn-block" disabled={changingPw}>
            {changingPw ? t('loading') : t('change_password')}
          </button>
        </div>
      </form>
    </div>
  );
}
