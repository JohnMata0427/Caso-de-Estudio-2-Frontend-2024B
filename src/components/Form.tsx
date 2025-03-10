import {
  INPUT_FIELDS,
  type SystemData,
  type SystemTitle,
} from '@/constants/Keys';
import { capitalize, separateAndCapitalize } from '@/helpers/Text';
import {
  memo,
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ShimmerButton } from './ShimmerButton';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  title: SystemTitle;
  data?: SystemData;
  action?: 'Registrar' | 'Actualizar';
  iconButton?: boolean;
  handleSubmit: (...params: any[]) => Promise<any>;
}

export const Form = memo(
  ({
    title,
    data,
    action = 'Registrar',
    handleSubmit,
    iconButton = false,
  }: Props) => {
    const inputFields = useMemo(() => INPUT_FIELDS, []);
    const modal = useRef<HTMLDialogElement>(null);
    const [open, setOpen] = useState(false);

    const Fields = useCallback(
      () =>
        Object.entries(inputFields[title]).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="font-semibold">
              {separateAndCapitalize(key)}
              <span className="text-red-500"> *</span>
            </label>
            <input
              id={key}
              name={key}
              {...value}
              defaultValue={data?.[key as keyof SystemData] ?? ''}
              className="h-full w-full rounded-lg border border-gray-300 p-2"
              required
            />
          </div>
        )),
      [title, data],
    );

    useEffect(() => {
      if (open) modal?.current?.showModal();
      else modal?.current?.close();
    }, [open]);

    const formAction = async (
      _: string,
      formData: FormData,
    ): Promise<string> => {
      const data = Object.fromEntries(formData.entries());
      let response;

      if (action === 'Actualizar') {
        const { _id, ...dataToSend } = data;
        response = await handleSubmit(_id, dataToSend);
      } else {
        response = await handleSubmit(data);
      }

      const { errors = [] } = response;

      if (errors.length > 0) {
        errors.forEach((error: string) => {
          toast.error(error, {
            position: 'bottom-right',
            className: 'text-sm font-medium',
            style: {
              background: 'var(--color-vulcan-800)',
              color: 'var(--color-vulcan-50)',
            },
          });
        });
      } else {
        toast.success(response, {
          position: 'bottom-right',
          className: 'text-sm font-medium',
          style: {
            background: 'var(--color-vulcan-800)',
            color: 'var(--color-vulcan-50)',
          },
        });

        setOpen(false);
      }

      return response;
    };

    const [_, submitAction, isPending] = useActionState(formAction, '');

    return (
      <>
        {iconButton ? (
          <>
            <button className="cursor-pointer" onClick={() => setOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="fill-falu-red-800 size-5"
              >
                <path d="M200-120q-33 0-56-23t-24-57v-560q0-33 24-56t56-24h357l-80 80H200v560h560v-278l80-80v358q0 33-23 57t-57 23zm160-240v-170l367-367q12-12 27-18t30-6q16 0 31 6t26 18l56 57q11 12 17 27t6 29q0 15-5 30t-18 26L530-360zm481-424-56-56zM440-440h56l232-232-28-28-29-28-231 231zm260-260-29-28zl28 28z" />
              </svg>
            </button>
          </>
        ) : (
          <ShimmerButton
            moreStyles="text-sm flex items-center gap-x-2"
            onClick={() => setOpen(true)}
          >
            <svg
              className="fill-vulcan-50 size-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
            >
              <path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72z" />
            </svg>
            <span>Añadir {title}</span>
          </ShimmerButton>
        )}
        {open && (
          <dialog className="m-auto rounded-lg p-4" ref={modal}>
            <h1 className="text-center text-lg font-bold">
              Formulario de {capitalize(title)}
            </h1>
            <form
              className="mt-4 grid grid-cols-2 gap-4 text-sm"
              action={submitAction}
            >
              <Fields />
              <div className="col-span-2 flex items-center justify-center gap-x-2">
                <ShimmerButton
                  moreStyles="flex items-center gap-x-2 justify-center"
                  onClick={() => setOpen(false)}
                  color="vulcan"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-vulcan-50 size-5"
                    viewBox="0 -960 960 960"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224z" />
                  </svg>
                  <span>Cancelar</span>
                </ShimmerButton>
                <ShimmerButton
                  moreStyles="flex items-center gap-x-2 justify-center"
                  disabled={isPending}
                >
                  <span>{action}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-vulcan-50 size-5"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M120-160v-240l320-80-320-80v-240l760 320z" />
                  </svg>
                </ShimmerButton>
              </div>
            </form>
          </dialog>
        )}
        <Toaster />
      </>
    );
  },
);
