import { Loading } from '@/components/Loading';
import { Table } from '@/components/Table';
import { ClientesContext } from '@/contexts/ClientesContext';
import { use } from 'react';

export function ClientesPage() {
  document.title =
    'Clientes Dashboard • Sistema de Gestión de Renta de Vehículos';

  const { clientes, loadingData, ...handleActions } = use(ClientesContext);

  return (
    <>
      <div className="flex flex-col gap-y-1">
        <h2 className="text-xl font-bold">Dashboard de Clientes</h2>
        <p className="text-sm">
          Bienvenido a la sección de clientes, aquí podrá visualizar y gestionar
          los clientes de la empresa.
        </p>
      </div>
      {loadingData ? (
        <Loading />
      ) : (
        <Table title="clientes" data={clientes} {...handleActions} />
      )}
    </>
  );
}
