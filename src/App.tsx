import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import { AuthLayout } from './layouts/AuthLayout';
import { AuthProvider } from './contexts/AuthContext';
import { AdminLayout } from './layouts/AdminLayout';
import { ClientesPage } from './pages/admin/ClientesPage';
import { VehiculosPage } from './pages/admin/VehiculosPage';
import { ReservasPage } from './pages/admin/ReservasPage';
import { ClientesProvider } from './contexts/ClientesContext';
import { VehiculosProvider } from './contexts/VehiculosContext';
import { ReservasProvider } from './contexts/ReservasContext';
import { PrivateRoute, PublicRoute } from './routes/Redirect';

export const { VITE_BACKEND_URL } = import.meta.env;

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="auth"
            element={
              <PublicRoute>
                <AuthLayout />
              </PublicRoute>
            }
          >
            <Route index path="login" element={<LoginPage />} />
          </Route>
          <Route
            path="admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route
              index
              path="clientes"
              element={
                <ClientesProvider>
                  <ClientesPage />
                </ClientesProvider>
              }
            />
            <Route
              path="vehiculos"
              element={
                <VehiculosProvider>
                  <VehiculosPage />
                </VehiculosProvider>
              }
            />
            <Route
              path="reservas"
              element={
                <ReservasProvider>
                  <ReservasPage />
                </ReservasProvider>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
