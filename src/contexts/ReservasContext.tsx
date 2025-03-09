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
  handleCreateReserva: (reserva: Reserva) => Promise<ReservasResponse>;
  handleUpdateReserva: (
    id: string,
    reserva: Reserva,
  ) => Promise<ReservasResponse>;
  handleDeleteReserva: (id: string) => Promise<void>;
}

export const ReservasContext = createContext<ReservasContextData>({
  reservas: [],
  loadingData: true,
  handleCreateReserva: async () => ({}) as ReservasResponse,
  handleUpdateReserva: async () => ({}) as ReservasResponse,
  handleDeleteReserva: async () => {},
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

  const handleCreateReserva = useCallback(async (reserva: Reserva) => {
    const response = await fetch(`${VITE_BACKEND_URL}/reservas`, {
      method: 'POST',
      headers,
      body: JSON.stringify(reserva),
    });
    const data = await response.json();

    if (response.ok) setReservas(state => [...state, data.reserva]);

    return data;
  }, []);

  const handleUpdateReserva = useCallback(
    async (id: string, reserva: Reserva) => {
      const response = await fetch(`${VITE_BACKEND_URL}/reservas/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(reserva),
      });
      const data = await response.json();

      if (response.ok)
        setReservas(state => state.map(c => (c._id === id ? data.reserva : c)));

      return data;
    },
    [],
  );

  const handleDeleteReserva = useCallback(async (id: string) => {
    await fetch(`${VITE_BACKEND_URL}/reservas/${id}`, {
      method: 'DELETE',
      headers,
    });

    setReservas(state => state.filter(c => c._id !== id));
  }, []);

  useEffect(() => {
    reservas.length === 0 && handleGetReservas();
  }, []);

  return (
    <ReservasContext
      value={{
        reservas,
        loadingData,
        handleCreateReserva,
        handleUpdateReserva,
        handleDeleteReserva,
      }}
    >
      {children}
    </ReservasContext>
  );
}
