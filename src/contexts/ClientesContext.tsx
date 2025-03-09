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
  handleCreateCliente: (cliente: Cliente) => Promise<Partial<ClientesResponse>>;
  handleUpdateCliente: (
    id: string,
    cliente: Cliente,
  ) => Promise<Partial<ClientesResponse>>;
  handleDeleteCliente: (id: string) => Promise<void>;
}

export const ClientesContext = createContext<ClientesContextData>({
  clientes: [],
  loadingData: true,
  handleCreateCliente: async () => ({}),
  handleUpdateCliente: async () => ({}),
  handleDeleteCliente: async () => {},
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

  const handleCreateCliente = useCallback(async (cliente: Cliente) => {
    const response = await fetch(`${VITE_BACKEND_URL}/clientes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(cliente),
    });
    const data = await response.json();

    if (response.ok) setClientes(state => [...state, data.cliente]);

    return data;
  }, []);

  const handleUpdateCliente = useCallback(
    async (id: string, cliente: Cliente) => {
      const response = await fetch(`${VITE_BACKEND_URL}/clientes/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(cliente),
      });
      const data = await response.json();

      if (response.ok)
        setClientes(state => state.map(c => (c._id === id ? data.cliente : c)));

      return data;
    },
    [],
  );

  const handleDeleteCliente = useCallback(async (id: string) => {
    await fetch(`${VITE_BACKEND_URL}/clientes/${id}`, {
      method: 'DELETE',
      headers,
    });

    setClientes(state => state.filter(c => c._id !== id));
  }, []);

  useEffect(() => {
    clientes.length === 0 && handleGetClientes();
  }, []);

  return (
    <ClientesContext
      value={{
        clientes,
        loadingData,
        handleCreateCliente,
        handleUpdateCliente,
        handleDeleteCliente,
      }}
    >
      {children}
    </ClientesContext>
  );
}
