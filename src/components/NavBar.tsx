import { NAV_ITEMS } from '@/constants/NavItems';
import { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const NavBar = memo(() => {
  const { pathname } = useLocation();
  const navItems = useMemo(() => NAV_ITEMS, []);

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
