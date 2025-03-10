import { VITE_BACKEND_URL } from '@/App';
import { Cliente } from '@/interfaces/Cliente';
import { createContext, useCallback, useEffect, useState } from 'react';

interface ClientesResponse {
  response: string;
  cliente: Cliente;
}

interface ClientesContextData {
  clientes: Cliente[];
  loadingData: boolean;
  handleCreate: (cliente: Cliente) => Promise<ClientesResponse>;
  handleUpdate: (id: string, cliente: Cliente) => Promise<ClientesResponse>;
  handleDelete: (id: string) => Promise<ClientesResponse>;
}

export const ClientesContext = createContext<ClientesContextData>({
  clientes: [],
  loadingData: true,
  handleCreate: async () => ({} as ClientesResponse),
  handleUpdate: async () => ({} as ClientesResponse),
  handleDelete: async () => ({} as ClientesResponse),
});

export function ClientesProvider({ children }: { children: React.ReactNode }) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const handleGetClientes = useCallback(async () => {
    const response = await fetch(`${VITE_BACKEND_URL}/clientes`, { headers });
    const data = await response.json();

    if (response.ok) setClientes(data);
    setLoadingData(false);
  }, []);

  const handleCreate = useCallback(async (cliente: Cliente) => {
    const response = await fetch(`${VITE_BACKEND_URL}/clientes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(cliente),
    });
    const data = await response.json();

    if (response.ok) setClientes(state => [...state, data.cliente]);

    return data;
  }, []);

  const handleUpdate = useCallback(async (id: string, cliente: Cliente) => {
    const response = await fetch(`${VITE_BACKEND_URL}/cliente/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(cliente),
    });
    const data = await response.json();

    if (response.ok)
      setClientes(state => state.map(c => (c._id === id ? data.cliente : c)));

    return data;
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const response = await fetch(`${VITE_BACKEND_URL}/cliente/${id}`, {
      method: 'DELETE',
      headers,
    });
    const data = await response.json();

    if (response.ok) setClientes(state => state.filter(c => c._id !== id));

    return data;
  }, []);

  useEffect(() => {
    clientes.length === 0 && handleGetClientes();
  }, []);

  return (
    <ClientesContext
      value={{
        clientes,
        loadingData,
        handleCreate,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </ClientesContext>
  );
}
