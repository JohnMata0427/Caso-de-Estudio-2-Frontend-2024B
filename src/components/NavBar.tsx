import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const NavBar = memo(() => {
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-col gap-y-2">
      <h3 className="text-vulcan-500 text-xs font-bold uppercase">Dashboard</h3>
      <ul className="flex flex-col gap-y-2">
        {navItems.map(({ to, label, iconPath, iconFilledPath }) => {
          const isActive = pathname === to;

          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex items-center gap-x-2 rounded-lg px-4 py-1.5 text-sm font-medium ${
                  isActive
                    ? 'bg-shimmer-vulcan text-vulcan-50 animate-shimmer first:fill-vulcan-50'
                    : 'hover:bg-vulcan-50 text-vulcan-700 first:fill-vulcan-700'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                  viewBox="0 -960 960 960"
                >
                  <path d={isActive ? iconFilledPath : iconPath} />
                </svg>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

const navItems: {
  to: string;
  label: string;
  iconPath: string;
  iconFilledPath: string;
}[] = [
  {
    to: '/admin/clientes',
    label: 'Clientes',
    iconPath:
      'M528-432h216v-72H528zm0-120h216v-72H528zM192-336h288v-45q0-29-44-52t-100.5-23-100 22.5T192-381zm144.2-144q29.8 0 50.8-21.2t21-51-21.2-50.8-51-21-50.8 21.2-21 51 21.2 50.8 51 21M168-192q-29.7 0-50.9-21.2Q96-234.3 96-264v-432.3q0-29.7 21.2-50.7t50.8-21h624q29.7 0 50.9 21.2Q864-725.7 864-696v432.3q0 29.7-21.1 50.7T792-192zm0-72h624v-432H168zm0 0v-432z',
    iconFilledPath:
      'M528-432h216v-72H528zm0-120h216v-72H528zM192-336h288v-45q0-29-44-52t-100.5-23-100 22.5T192-381zm144.2-144q29.8 0 50.8-21.2t21-51-21.2-50.8-51-21-50.8 21.2-21 51 21.2 50.8 51 21M168-192q-29.7 0-50.9-21.2Q96-234.3 96-264v-432.3q0-29.7 21.2-50.7t50.8-21h624q29.7 0 50.9 21.2Q864-725.7 864-696v432.3q0 29.7-21.1 50.7T792-192z',
  },
  {
    to: '/admin/vehiculos',
    label: 'Vehículos',
    iconPath:
      'M240-216v48q0 10.2-6.9 17.1T216-144h-48q-10.2 0-17.1-6.9T144-168v-312l78-195q7-21 25.6-33t41.4-12h382q22.8 0 41.4 12t25.6 33l78 195v312q0 10.2-6.9 17.1T792-144h-48q-10.2 0-17.1-6.9T720-168v-48zm1-312h478l-48-120H289zm-25 72v168zm96 132q20 0 34-14t14-34-14-34-34-14-34 14-14 34 14 34 34 14m336 0q20 0 34-14t14-34-14-34-34-14-34 14-14 34 14 34 34 14m-432 36h528v-168H216z',
    iconFilledPath:
      'M240-216v48q0 10.2-6.9 17.1T216-144h-48q-10.2 0-17.1-6.9T144-168v-312l78-195q7-21 25.6-33t41.4-12h382q22.8 0 41.4 12t25.6 33l78 195v312q0 10.2-6.9 17.1T792-144h-48q-10.2 0-17.1-6.9T720-168v-48zm1-312h478l-48-120H289zm71 204q20 0 34-14t14-34-14-34-34-14-34 14-14 34 14 34 34 14m336 0q20 0 34-14t14-34-14-34-34-14-34 14-14 34 14 34 34 14',
  },
  {
    to: '/admin/reservas',
    label: 'Reservas',
    iconPath:
      'M288-384q-40 0-68-28t-28-68 28-68 68-28 68 28 28 68-28 68-68 28m0 144q-100 0-170-70T48-480t70-170 170-70q65 0 120 32.5t88 87.5h344l120 120-180 168-84-60-72 60-96-72h-20q-24 68-85.5 106T288-240m0-72q63 0 111-40.5T454-456h98l70 52 71-59 81 58 82-76-46-47H449q-19-53-62.5-86.5T288-648q-70 0-119 49t-49 119 49 119 119 49',
    iconFilledPath:
      'M288-360q50 0 85-35t35-85-35-85-85-35-85 35-35 85 35 85 85 35m0 120q-100 0-170-70T48-480t70-170 170-70q78 0 140.5 46.5T516-552h324l72 72-132 159-84-87-72 72-72-72h-36q-24 75-87 121.5Q366.2-240 288-240',
  },
];
