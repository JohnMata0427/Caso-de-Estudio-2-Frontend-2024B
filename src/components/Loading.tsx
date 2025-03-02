import { memo } from 'react';

export const Loading = memo(() => (
  <div className="text-vulcan-400 flex w-full justify-center gap-x-2 text-sm">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="fill-vulcan-400 size-5 animate-spin"
      viewBox="0 -960 960 960"
    >
      <path d="M480-62q-87 0-163-33t-133-89q-56-57-89-133T62-480t33-163 89-133q57-57 133-89 76-33 163-33 25 0 42 17t17 42q0 24-17 42t-42 17q-125 0-212 87-88 87-88 212t88 214q87 87 212 87 126 0 213-88 87-87 87-212 0-25 17-42t42-17 42 17 17 42q0 87-33 163t-89 133q-57 57-133 89-76 33-163 33" />
    </svg>
    <span>Cargando datos, por favor espere...</span>
  </div>
));
