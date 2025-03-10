import { VITE_BACKEND_URL } from '@/App';
import { Reserva } from '@/interfaces/Reserva';
import { createContext, useCallback, useEffect, useState } from 'react';

interface ReservasResponse {
  response: string;
  reserva: Reserva;
}

interface ReservasContextData {
  reservas: Reserva[];
  loadingData: boolean;
  handleCreate: (reserva: Reserva) => Promise<ReservasResponse>;
  handleUpdate: (id: string, reserva: Reserva) => Promise<ReservasResponse>;
  handleDelete: (id: string) => Promise<ReservasResponse>;
}

export const ReservasContext = createContext<ReservasContextData>({
  reservas: [],
  loadingData: true,
  handleCreate: async () => ({}) as ReservasResponse,
  handleUpdate: async () => ({}) as ReservasResponse,
  handleDelete: async () => ({}) as ReservasResponse,
});

export function ReservasProvider({ children }: { children: React.ReactNode }) {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const handleGetReservas = useCallback(async () => {
    const response = await fetch(`${VITE_BACKEND_URL}/reservas`, { headers });
    const data = await response.json();

    if (response.ok) setReservas(data);
    setLoadingData(false);
  }, []);

  const handleCreate = useCallback(async (reserva: Reserva) => {
    const response = await fetch(`${VITE_BACKEND_URL}/reservas`, {
      method: 'POST',
      headers,
      body: JSON.stringify(reserva),
    });
    const data = await response.json();

    if (response.ok) setReservas(state => [...state, data.reserva]);

    return data;
  }, []);

  const handleUpdate = useCallback(async (id: string, reserva: Reserva) => {
    const response = await fetch(`${VITE_BACKEND_URL}/reserva/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(reserva),
    });
    const data = await response.json();

    if (response.ok)
      setReservas(state => state.map(r => (r._id === id ? data.reserva : r)));

    return data;
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const response = await fetch(`${VITE_BACKEND_URL}/reserva/${id}`, {
      method: 'DELETE',
      headers,
    });
    const data = await response.json();

    if (response.ok) setReservas(state => state.filter(r => r._id !== id));

    return data;
  }, []);

  useEffect(() => {
    reservas.length === 0 && handleGetReservas();
  }, []);

  return (
    <ReservasContext
      value={{
        reservas,
        loadingData,
        handleCreate,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </ReservasContext>
  );
}
