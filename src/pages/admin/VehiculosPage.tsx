import { Loading } from '@/components/Loading';
import { Table } from '@/components/Table';
import { VehiculosContext } from '@/contexts/VehiculosContext';
import { use } from 'react';

export function VehiculosPage() {
  document.title =
    'Vehículos Dashboard • Sistema de Gestión de Renta de Vehículos';

  const { vehiculos, loadingData, ...handleActions } = use(VehiculosContext);

  return (
    <>
      <div className="flex flex-col gap-y-1">
        <h2 className="text-xl font-bold">Dashboard de Vehículos</h2>
        <p className="text-sm">
          Bienvenido a la sección de vehículos, aquí podrá visualizar y
          gestionar los vehículos de la empresa.
        </p>
      </div>
      {loadingData ? (
        <Loading />
      ) : (
        <Table title="vehiculos" data={vehiculos} {...handleActions} />
      )}
    </>
  );
}
