import { VITE_BACKEND_URL } from '@/App';
import { Usuario } from '@/interfaces/Usuario';
import { createContext, useCallback, useEffect, useState } from 'react';

type TypeResponse = 'success' | 'error';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  response: string;
  type: TypeResponse;
}

interface AuthContextData {
  user: Usuario | null;
  handleLogin: (login: {
    email: string;
    password: string;
  }) => Promise<LoginResponse>;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  handleLogin: async (_: LoginRequest) => ({ response: '', type: 'error' }),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const token = localStorage.getItem('token');

  const handleLogin = useCallback(
    async (login: LoginRequest): Promise<LoginResponse> => {
      const response = await fetch(`${VITE_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
      });

      const data = await response.json();

      if (response.ok) localStorage.setItem('token', data.token);

      return {
        response: data?.response ?? 'Ha ocurrido un error al iniciar sesión',
        type: response.ok ? 'success' : 'error',
      };
    },
    [],
  );

  const handleProfile = useCallback(async () => {
    if (!token) return;

    const response = await fetch(`${VITE_BACKEND_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) setUser(data.usuario);
  }, [token]);

  useEffect(() => {
    !user?._id && handleProfile();
  }, [token]);

  return <AuthContext value={{ user, handleLogin }}>{children}</AuthContext>;
}
