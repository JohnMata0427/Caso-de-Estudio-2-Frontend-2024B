import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/auth/login" replace />;
}

export function PublicRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem('token');

  return token ? <Navigate to="/admin/clientes" replace /> : children;
}
