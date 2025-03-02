import { use } from 'react';
import { Table } from '../components/Table';
import { ReservasContext } from '../contexts/ReservasContext';
import { Loading } from '../components/Loading';

export function ReservasPage() {
  document.title =
    'Reservas Dashboard • Sistema de Gestión de Renta de Vehículos';

  const { reservas, loadingData } = use(ReservasContext);

  return (
    <>
      <div className="flex flex-col gap-y-1">
        <h2 className="text-xl font-bold">Dashboard de Reservas</h2>
        <p className="text-sm">
          Bienvenido a la sección de reservas, aquí podrá visualizar y gestionar
          las reservas realizadas por los clientes.
        </p>
      </div>
      {loadingData ? <Loading /> : <Table title="reservas" data={reservas} />}
    </>
  );
}
