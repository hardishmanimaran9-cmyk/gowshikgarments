import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import LoadingSpinner from '../shared/LoadingSpinner';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  if (user === undefined) return <LoadingSpinner />;
  
  // Only allow 'gowshik' emails to access the owner portal
  if (!user || !user.email.toLowerCase().startsWith('gowshik')) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
