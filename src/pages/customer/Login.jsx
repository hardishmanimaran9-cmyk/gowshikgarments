import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { IconMail, IconLock, IconEye, IconEyeOff, IconArrowRight, IconShoppingBag } from '@tabler/icons-react';
import toast from 'react-hot-toast';

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let user;
      if (isRegister) {
        const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
        user = cred.user;
        toast.success('Account created! Welcome.');
      } else {
        const cred = await signInWithEmailAndPassword(auth, form.email, form.password);
        user = cred.user;
        toast.success('Welcome back!');
      }

      // SMART REDIRECT
      if (user.email.toLowerCase().startsWith('gowshik')) {
        navigate('/owner/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/weak-password') {
        toast.error('Password should be at least 6 characters.');
      } else if (err.code === 'auth/email-already-in-use') {
        toast.error('An account already exists with this email.');
      } else if (err.code === 'auth/invalid-credential') {
        toast.error('Incorrect email or password. Please try again.');
      } else {
        toast.error('Authentication failed. Please check your details.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <div className="login-card" style={{ maxWidth: 450 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/logo.png" alt="Logo" style={{ width: 80, height: 'auto', marginBottom: 16 }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: 4 }}>
            {isRegister ? 'Create Wholesale Account' : 'Customer Login'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {isRegister ? 'Join our wholesale network today' : 'Access our exclusive wholesale catalog'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <IconMail size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                type="email"
                className="input-field"
                style={{ paddingLeft: 40 }}
                placeholder="customer@example.com"
                required
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <IconLock size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                style={{ paddingLeft: 40 }}
                placeholder="••••••••"
                required
                minLength={6}
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}
              >
                {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-navy btn-block btn-lg" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? 'Processing...' : (isRegister ? 'Register Now' : 'Login to Catalog')}
            {!loading && <IconArrowRight size={18} style={{ marginLeft: 8 }} />}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {isRegister ? 'Already have an account?' : "New to Gowshik Garments?"}{' '}
          <button 
            onClick={() => setIsRegister(!isRegister)}
            style={{ color: 'var(--navy)', fontWeight: 700, textDecoration: 'underline' }}
          >
            {isRegister ? 'Login here' : 'Register for Wholesale'}
          </button>
        </div>


      </div>
    </div>
  );
}
