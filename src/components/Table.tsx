import { memo, useMemo, useState } from 'react';
import { Cliente } from '../interfaces/Cliente';
import { Reserva } from '../interfaces/Reserva';
import { Vehiculo } from '../interfaces/Vehiculo';

type TableTitle = 'clientes' | 'vehiculos' | 'reservas';
type TableData = Cliente | Vehiculo | Reserva;

interface Props {
  title: TableTitle;
  data: TableData[];
}

const columns: Record<TableTitle, string[]> = {
  clientes: [
    'ID',
    'Cedula',
    'Nombre',
    'Apellido',
    'Ciudad',
    'Email',
    'Dirección',
    'Teléfono',
    'Fecha de Nacimiento',
  ],
  vehiculos: [
    'ID',
    'Marca',
    'Modelo',
    'Año',
    'Placa',
    'Color',
    'Tipo de Vehículo',
    'Kilometraje',
    'Descripción',
  ],
  reservas: [
    'ID',
    'Código',
    'Descripción',
    'ID del Cliente',
    'ID del Vehículo',
  ],
};

export const Table = memo(({ title, data }: Props) => {
  const [search, setSearch] = useState('');
  const keys = useMemo(
    () => Object.keys(data[0] ?? {}) as (keyof TableData)[],
    [data],
  );

  const filteredData = useMemo(() => {
    return search
      ? data.filter((item) =>
          Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(search.toLowerCase()),
          ),
        )
      : data;
  }, [data, search]);

  return (
    <>
      <div className="relative">
        <input
          className="border-vulcan-200 rounded-lg border py-1.5 pr-1.5 pl-8 text-sm"
          onChange={({ target }) => setSearch(target.value)}
          placeholder={`Buscar ${title}...`}
          type="search"
          name="search"
          id="search"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-y-0 left-2 my-auto size-5"
          viewBox="0 -960 960 960"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580t75.5-184.5T380-840t184.5 75.5T640-580q0 44-14 83t-38 69l252 252zM380-400q75 0 127.5-52.5T560-580t-52.5-127.5T380-760t-127.5 52.5T200-580t52.5 127.5T380-400" />
        </svg>
      </div>
      {filteredData.length > 0 ? (
        <div className="w-[82.5dvw] overflow-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead className="bg-vulcan-100">
              <tr className="border-vulcan-100 border-y">
                {columns[title].map((column) => (
                  <th className="p-1.5 text-start text-nowrap" key={column}>
                    {column}
                  </th>
                ))}
                <th className="p-1.5 text-start">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className="border-vulcan-100 border-y" key={index}>
                  {keys.map((key) => {
                    if ((key as keyof Cliente) === 'fecha_nacimiento') {
                      return (
                        <td className="p-1.5 text-nowrap" key={key}>
                          {new Date(item[key] as string).toLocaleDateString()}
                        </td>
                      );
                    }

                    return (
                      <td className="p-1.5 text-nowrap" key={key}>
                        {item[key]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-vulcan-400 flex items-center justify-center gap-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-vulcan-400 size-5"
            viewBox="0 -960 960 960"
          >
            <path d="M819-28 652-195h114v35q0 17-11.5 28.5T726-120h-46q-17 0-28.5-11.5T640-160v-40H320v40q0 17-11.5 28.5T280-120h-40q-17 0-28.5-11.5T200-160v-82q-18-20-29-44.5T160-340v-347L27-820l57-57L876-85zm-30-258L515-560h205v-120H395L235-840q39-20 99.5-30T480-880q172 0 246 37t74 123v380q0 14-3 27.5t-8 26.5m-449-34q25 0 42.5-17.5T400-380t-17.5-42.5T340-440t-42.5 17.5T280-380t17.5 42.5T340-320M240-560h47l-47-47z" />
          </svg>
          <span>No hay datos para mostrar.</span>
        </div>
      )}
    </>
  );
});
