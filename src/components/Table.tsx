import {
  COLUMN_NAMES,
  type SystemData,
  type SystemTitle,
} from '@/constants/Keys';
import { formatDateToEC } from '@/helpers/Text';
import { memo, useMemo, useState } from 'react';
import { Form } from './Form';

interface Props {
  title: SystemTitle;
  data: SystemData[];
  handleCreate: (data: any) => Promise<any>;
  handleUpdate: (id: string, data: any) => Promise<any>;
  handleDelete: (id: string) => Promise<any>;
}

export const Table = memo(
  ({ title, data, handleCreate, handleUpdate, handleDelete }: Props) => {
    const [search, setSearch] = useState('');
    const columns = useMemo(() => COLUMN_NAMES, []);
    const keys = useMemo(
      () => Object.keys(data[0] ?? {}) as (keyof SystemData)[],
      [data],
    );

    const filteredData = useMemo(() => {
      return search
        ? data.filter(item =>
            Object.values(item).some(value =>
              value.toString().toLowerCase().includes(search.toLowerCase()),
            ),
          )
        : data;
    }, [data, search]);

    return (
      <>
        <div className="relative flex justify-between">
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
          <Form action="Registrar" title={title} handleSubmit={handleCreate} />
        </div>
        {filteredData.length > 0 ? (
          <div className="overflow-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-vulcan-100">
                <tr className="border-vulcan-100 border-y">
                  {columns[title].map(column => (
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
                    {keys.map(key => {
                      if ((key as string) === 'fecha_nacimiento') {
                        return (
                          <td className="p-1.5 text-nowrap" key={key}>
                            {formatDateToEC(item[key])}
                          </td>
                        );
                      }

                      if ((key as string) === 'color') {
                        return (
                          <td className="p-1.5 text-nowrap" key={key}>
                            <div
                              className="h-6 w-6 rounded-full"
                              style={{ backgroundColor: item[key] }}
                            />
                          </td>
                        );
                      }

                      return (
                        <td className="p-1.5 text-nowrap" key={key}>
                          {item[key]}
                        </td>
                      );
                    })}
                    <td className="flex items-center justify-center gap-x-1 p-1.5">
                      <Form
                        action="Actualizar"
                        title={title}
                        data={item}
                        handleSubmit={handleUpdate}
                        iconButton
                      />
                      <button
                        className="cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="fill-vulcan-400 size-5"
                          viewBox="0 -960 960 960"
                        >
                          <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104zm-96 180q-33 0-56-23t-24-57v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23 57t-57 23zm400-600H280v520h400zm-400 0v520z" />
                        </svg>
                      </button>
                    </td>
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
  },
);
