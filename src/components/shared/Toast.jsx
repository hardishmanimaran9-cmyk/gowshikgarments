import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        className: 'toast-custom',
        style: {
          background: '#fff',
          color: '#1a1a2e',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '0.88rem',
          fontWeight: 500,
        },
        success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
        error: { iconTheme: { primary: '#dc2626', secondary: '#fff' } },
      }}
    />
  );
}
