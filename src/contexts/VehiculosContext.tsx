import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Vehiculo } from '../interfaces/Vehiculo';
import { VITE_BACKEND_URL } from '../App';

interface VehiculosResponse {
  response: string;
  vehiculo: Vehiculo;
}

interface VehiculosContextData {
  vehiculos: Vehiculo[];
  loadingData: boolean;
  handleCreateVehiculo: (vehiculo: Vehiculo) => Promise<VehiculosResponse>;
  handleUpdateVehiculo: (
    id: string,
    vehiculo: Vehiculo,
  ) => Promise<VehiculosResponse>;
  handleDeleteVehiculo: (id: string) => Promise<void>;
}

export const VehiculosContext = createContext<VehiculosContextData>({
  vehiculos: [],
  loadingData: true,
  handleCreateVehiculo: async () => ({}) as VehiculosResponse,
  handleUpdateVehiculo: async () => ({}) as VehiculosResponse,
  handleDeleteVehiculo: async () => {},
});

export function VehiculosProvider({ children }: { children: ReactNode }) {
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

  const handleCreateVehiculo = useCallback(async (vehiculo: Vehiculo) => {
    const response = await fetch(`${VITE_BACKEND_URL}/vehiculos`, {
      method: 'POST',
      headers,
      body: JSON.stringify(vehiculo),
    });
    const data = await response.json();

    if (response.ok) setVehiculos((state) => [...state, data.vehiculo]);

    return data;
  }, []);

  const handleUpdateVehiculo = useCallback(
    async (id: string, vehiculo: Vehiculo) => {
      const response = await fetch(`${VITE_BACKEND_URL}/vehiculos/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(vehiculo),
      });
      const data = await response.json();

      if (response.ok)
        setVehiculos((state) =>
          state.map((c) => (c._id === id ? data.vehiculo : c)),
        );

      return data;
    },
    [],
  );

  const handleDeleteVehiculo = useCallback(async (id: string) => {
    await fetch(`${VITE_BACKEND_URL}/vehiculos/${id}`, {
      method: 'DELETE',
      headers,
    });

    setVehiculos((state) => state.filter((c) => c._id !== id));
  }, []);

  useEffect(() => {
    vehiculos.length === 0 && handleGetVehiculos();
  }, []);

  return (
    <VehiculosContext
      value={{
        vehiculos,
        loadingData,
        handleCreateVehiculo,
        handleUpdateVehiculo,
        handleDeleteVehiculo,
      }}
    >
      {children}
    </VehiculosContext>
  );
}
