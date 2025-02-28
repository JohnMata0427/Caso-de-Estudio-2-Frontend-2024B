import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <main className="relative flex h-dvh">
      <div className="max-sm:bg-vulcan-50 inset-y-0 m-4 flex flex-col items-center justify-center rounded-lg max-sm:absolute sm:w-1/2">
        <Outlet />
      </div>
      <img
        className="object-cover sm:w-1/2 sm:rounded-l-full"
        src="/fondo.webp"
        alt="Fondo del Login"
        loading="lazy"
      />
    </main>
  );
}
