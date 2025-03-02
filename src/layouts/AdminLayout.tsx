import { use, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { NavBar } from '../components/NavBar';

export function AdminLayout() {
  const [showMenu, setShowMenu] = useState(true);
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <main className="flex min-h-dvh w-dvw">
      <header
        className={`flex flex-col justify-between rounded-r-lg bg-white p-5 ${showMenu ? 'animate-slide-in-right' : 'animate-slide-out-left fixed h-full'}`}
      >
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between">
            <button
              className="hover:bg-vulcan-50 cursor-pointer rounded-lg p-1 transition-colors duration-300"
              onClick={() => setShowMenu(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 -960 960 960"
              >
                <path d="M120-240v-80h720v80zm0-200v-80h720v80zm0-200v-80h720v80z" />
              </svg>
            </button>
            <button
              className="text-lust-500 hover:bg-lust-50 flex cursor-pointer items-center gap-x-1 rounded-lg p-1 text-sm transition-colors duration-300"
              onClick={logout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-lust-500 size-4"
                viewBox="0 -960 960 960"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200z" />
              </svg>
              <span>Salir</span>
            </button>
          </div>
          <article className="flex flex-col gap-y-2">
            <h3 className="text-vulcan-500 text-xs font-bold uppercase">
              Sistema de Gestión
            </h3>
            <div className="bg-vulcan-50 flex items-center gap-x-2 rounded-lg px-4 py-2">
              <img
                className="size-6"
                src="/icono.webp"
                alt="Icono del sistema"
              />
              <h1 className="text-vulcan-700 text-sm font-medium">
                Renta de Vehículos
              </h1>
            </div>
          </article>

          <NavBar />
        </div>
        <div className="flex flex-col">
          <h3 className="text-vulcan-500 text-xs font-bold uppercase">
            Perfil
          </h3>
          <article className="flex h-13 flex-col p-2">
            <h4 className="text-vulcan-700 text-sm font-medium">
              {user?.nombre ?? 'John'} {user?.apellido ?? 'Mata'}
            </h4>
            <p className="text-vulcan-500 text-xs">
              {user?.email ?? 'jhonmata0427@gmail.com'}
            </p>
          </article>
        </div>
      </header>
      <section className="flex w-full flex-1 items-start gap-x-2 p-5">
        <button
          className={`cursor-pointer rounded-lg p-1 transition-colors duration-300 hover:bg-white ${showMenu ? 'hidden' : 'block'}`}
          onClick={() => setShowMenu(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 -960 960 960"
          >
            <path d="M120-240v-80h720v80zm0-200v-80h720v80zm0-200v-80h720v80z" />
          </svg>
        </button>
        <div className="flex h-full w-full flex-col gap-y-4">
          <img
            className="h-32 w-full rounded-lg object-cover"
            src="https://t4.ftcdn.net/jpg/02/82/00/75/360_F_282007508_wdCUP7hUMNK1Cuzj7XmOcFmzyzJ0Nnp9.jpg"
            alt="Banner del sistema"
          />
          <div className="flex h-full flex-col gap-y-4">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
}
