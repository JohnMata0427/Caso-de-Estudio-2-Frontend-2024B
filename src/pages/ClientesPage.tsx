import { use } from 'react';
import { ClientesContext } from '../contexts/ClientesContext';
import { Table } from '../components/Table';
import { Loading } from '../components/Loading';

export function ClientesPage() {
  document.title =
    'Clientes Dashboard • Sistema de Gestión de Renta de Vehículos';

  const { clientes, loadingData } = use(ClientesContext);

  return (
    <>
      <div className="flex flex-col gap-y-1">
        <h2 className="text-xl font-bold">Dashboard de Clientes</h2>
        <p className="text-sm">
          Bienvenido a la sección de clientes, aquí podrá visualizar y gestionar
          los clientes de la empresa.
        </p>
      </div>
      {loadingData ? <Loading /> : <Table title="clientes" data={clientes} />}
    </>
  );
}
