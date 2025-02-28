import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Usuario } from '../interfaces/Usuario';

type TypeResponse = 'success' | 'error';

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
  handleLogin: async () => ({ response: '', type: 'error' }),
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { VITE_BACKEND_URL } = import.meta.env;
  const token = localStorage.getItem('token');
  const [user, setUser] = useState<Usuario | null>(null);

  const handleLogin = useCallback(
    async (login: {
      email: string;
      password: string;
    }): Promise<LoginResponse> => {
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
    if (user || !token) return;

    const response = await fetch(`${VITE_BACKEND_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) setUser(data.usuario);
  }, [token]);

  useEffect(() => {
    handleProfile();
  }, [token]);

  return <AuthContext value={{ user, handleLogin }}>{children}</AuthContext>;
}
