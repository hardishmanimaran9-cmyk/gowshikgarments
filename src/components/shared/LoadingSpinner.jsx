import { IconLoader2 } from '@tabler/icons-react';

export default function LoadingSpinner({ size = 32 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
      <IconLoader2 size={size} style={{ animation: 'spin 1s linear infinite', color: 'var(--navy)' }} />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
