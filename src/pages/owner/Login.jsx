import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useTranslation } from 'react-i18next';
import { IconEye, IconEyeOff, IconShirt } from '@tabler/icons-react';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!email.toLowerCase().startsWith('gowshik')) {
      setError("Unauthorized email prefix. Must start with 'gowshik'");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/owner/dashboard');
    } catch (err) {
      setError(t('login_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <img src="/logo.png" alt="Logo" style={{ width: '80px', height: '80px', borderRadius: '12px' }} />
        </div>
        <div className="login-logo">{t('brand')}</div>
        <div className="login-subtitle">{t('owner_portal')}</div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>{t('email')}</label>
            <input
              className="input-field"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="gowshik@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label>{t('password')}</label>
            <div className="password-wrapper">
              <input
                className="input-field"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button type="button" className="toggle-pw" onClick={() => setShowPw(!showPw)}>
                {showPw ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-navy btn-block btn-lg" disabled={loading}>
            {loading ? t('loading') : t('login')}
          </button>
        </form>
      </div>
    </div>
  );
}
