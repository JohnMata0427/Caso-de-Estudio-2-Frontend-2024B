import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) =>
  isAuthenticated() ? children : <Navigate to="/auth/login" replace />;

export const PublicRoute = ({ children }: { children: React.ReactNode }) =>
  isAuthenticated() ? <Navigate to="/admin/clientes" replace /> : children;

function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const { exp = 0 } = jwtDecode(token) as { exp: number };
  const isAuth = Date.now() < exp * 1000;

  if (!isAuth) localStorage.removeItem('token');

  return isAuth;
}
