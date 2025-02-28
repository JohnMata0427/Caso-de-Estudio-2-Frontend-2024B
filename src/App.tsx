import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { AuthLayout } from './layouts/AuthLayout';
import { AuthProvider } from './contexts/AuthContext';
import { AdminLayout } from './layouts/AdminLayout';
import { ClientesPage } from './pages/ClientesPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<AuthLayout />}>
            <Route index path="login" element={<LoginPage />} />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route index path="clientes" element={<ClientesPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
