import { VITE_BACKEND_URL } from '@/App';
import { Vehiculo } from '@/interfaces/Vehiculo';
import { createContext, useCallback, useEffect, useState } from 'react';

interface VehiculosResponse {
  response: string;
  vehiculo: Vehiculo;
}

interface VehiculosContextData {
  vehiculos: Vehiculo[];
  loadingData: boolean;
  handleCreate: (vehiculo: Vehiculo) => Promise<VehiculosResponse>;
  handleUpdate: (id: string, vehiculo: Vehiculo) => Promise<VehiculosResponse>;
  handleDelete: (id: string) => Promise<VehiculosResponse>;
}

export const VehiculosContext = createContext<VehiculosContextData>({
  vehiculos: [],
  loadingData: true,
  handleCreate: async () => ({}) as VehiculosResponse,
  handleUpdate: async () => ({}) as VehiculosResponse,
  handleDelete: async () => ({}) as VehiculosResponse,
});

export function VehiculosProvider({ children }: { children: React.ReactNode }) {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const handleGetVehiculos = useCallback(async () => {
    const response = await fetch(`${VITE_BACKEND_URL}/vehiculos`, { headers });
    const data = await response.json();

    if (response.ok) setVehiculos(data);
    setLoadingData(false);
  }, []);

  const handleCreate = useCallback(async (vehiculo: Vehiculo) => {
    const response = await fetch(`${VITE_BACKEND_URL}/vehiculos`, {
      method: 'POST',
      headers,
      body: JSON.stringify(vehiculo),
    });
    const data = await response.json();

    if (response.ok) setVehiculos(state => [...state, data.vehiculo]);

    return data;
  }, []);

  const handleUpdate = useCallback(async (id: string, vehiculo: Vehiculo) => {
    const response = await fetch(`${VITE_BACKEND_URL}/vehiculo/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(vehiculo),
    });
    const data = await response.json();

    if (response.ok)
      setVehiculos(state => state.map(v => (v._id === id ? data.vehiculo : v)));

    return data;
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const response = await fetch(`${VITE_BACKEND_URL}/vehiculo/${id}`, {
      method: 'DELETE',
      headers,
    });
    const data = await response.json();

    if (response.ok) setVehiculos(state => state.filter(v => v._id !== id));

    return data;
  }, []);

  useEffect(() => {
    vehiculos.length === 0 && handleGetVehiculos();
  }, []);

  return (
    <VehiculosContext
      value={{
        vehiculos,
        loadingData,
        handleCreate,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </VehiculosContext>
  );
}
