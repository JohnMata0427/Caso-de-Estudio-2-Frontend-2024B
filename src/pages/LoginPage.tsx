import { use, useActionState, useState } from 'react';
import { ShimmerButton } from '../components/ShimmerButton';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin } = use(AuthContext);
  const navigate = useNavigate();

  const loginAction = async (
    _: string,
    formData: FormData,
  ): Promise<string> => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { response, type } = await handleLogin({ email, password });

    toast[type](response, {
      position: 'bottom-right',
      icon: '🔐',
    });

    if (type === 'success') navigate('/admin/clientes');

    return response;
  };

  const [_, submitAction, isPending] = useActionState(loginAction, '');

  return (
    <form className="flex w-3/4 flex-col gap-y-4 p-4" action={submitAction}>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-center text-2xl font-extrabold">
          Sistema de Gestión de Renta de Vehículos
        </h1>
        <small className="text-vulcan-500 text-center text-sm">
          Este sistema permite gestionar la renta de vehículos de una empresa
          mediante el registro de clientes, vehículos y rentas.
        </small>
      </div>
      <div className="relative">
        {/* Contact Email Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-monarch-900 absolute inset-y-0 left-2 my-auto size-5"
          viewBox="0 -960 960 960"
        >
          <path d="M528-480h288v-192H528zm144-41-108-72v-43l108 72 108-72v43zM72-144q-30 0-51-21T0-216v-528q0-30 21-51t51-21h816q30 0 51 21t21 51v528q0 30-21 51t-51 21zm264-240q50 0 85-35t35-85-35-85-85-35-85 35-35 85 35 85 85 35M72-216h521q-51-54-116-87t-141-33-144 33-120 87" />
        </svg>
        <input
          className="border-vulcan-400 outline-monarch-800 w-full rounded-lg border py-1.5 pr-1.5 pl-9"
          id="email"
          type="email"
          name="email"
          placeholder="Ingrese su correo electrónico"
          required
        />
      </div>
      <div className="relative">
        {/* Password Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-monarch-900 absolute inset-y-0 left-2 my-auto size-5"
          viewBox="0 -960 960 960"
        >
          <path d="M288-360q50 0 85-35t35-85-35-85-85-35-85 35-35 85 35 85 85 35m0 120q-100 0-170-70T48-480t70-170 170-70q78 0 141 47t87 121h324l72 72-132 159-84-87-72 72-72-72h-36q-24 75-87 122-63 46-141 46" />
        </svg>
        <input
          className="border-vulcan-400 outline-monarch-800 w-full rounded-lg border px-9 py-1.5"
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Ingrese su contraseña"
          minLength={8}
          required
        />
        {/* Show Password Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-monarch-900 absolute inset-y-0 right-2 my-auto size-5 cursor-pointer"
          viewBox="0 -960 960 960"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <path d="M480-312q70 0 119-49t49-119-49-119-119-49-119 49-49 119 49 119 119 49m0-72q-40 0-68-28t-28-68 28-68 68-28 68 28 28 68-28 68-68 28m0 192q-143 0-260-78-117-79-172-210 55-131 172-209 117-79 260-79t260 79q117 78 172 209-55 131-172 210-117 78-260 78" />
          ) : (
            <path d="M768-90 638-220q-38 12-77 20t-81 8q-143 0-261-77T48-480q17-52 57-101t85-88L90-769l51-51 678 679zM480-312q14 0 28-3t28-7L322-536l-6 28-4 28q0 70 49 119t119 49m290 20L637-425q5-13 8-27t3-28q0-70-49-119t-119-49q-14 0-27 3t-28 7L322-741q38-15 78-21t80-6q143 0 262 78t170 210q-22 57-58 104t-84 84M575-487l-88-89q20-2 36 5t30 20q12 12 18 30t4 34" />
          )}
        </svg>
      </div>
      <ShimmerButton
        moreStyles="flex gap-x-2 items-center justify-center"
        disabled={isPending}
      >
        Iniciar Sesión
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-vulcan-50 size-6"
          viewBox="0 -960 960 960"
        >
          <path d="m24-424 18-72h198l-18 72zm252 256q-50 0-85-35t-35-85H72l30-88h157l34-136h74l42-168H210l14-40q8-22 27-35t41-13h452l-36 144h84l120 168-48 168h-48q0 50-35 85t-85 35-85-35-35-85H396q0 50-35 85t-85 35M96-560l18-72h234l-18 72zm180 320q20 0 34-14t14-34-14-34-34-14-34 14-14 34 14 34 34 14m420 0q20 0 34-14t14-34-14-34-34-14-34 14-14 34 14 34 34 14m-36-192h170l3-11-78-109h-65z" />
        </svg>
      </ShimmerButton>
      <Toaster />
    </form>
  );
}
