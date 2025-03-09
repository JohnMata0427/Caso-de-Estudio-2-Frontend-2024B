import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { INPUT_FIELDS, type Title } from '@/consts/Keys';
import { capitalize, separateAndCapitalize } from '@/helpers/Text';
import { ShimmerButton } from './ShimmerButton';

export const Form = memo(({ title = 'clientes' }: { title: Title }) => {
  const inputFields = useMemo(() => INPUT_FIELDS, []);
  const modal = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const Fields = useCallback(
    () =>
      Object.entries(inputFields[title]).map(([key, value]) => (
        <div key={key} className="flex flex-col">
          <label htmlFor={key} className="font-semibold">
            {separateAndCapitalize(key)} <span className="text-red-500">*</span>
          </label>
          <input
            id={key}
            name={key}
            type={value.type}
            placeholder={value.placeholder}
            minLength={value.minLength}
            maxLength={value.maxLength}
            className="rounded-lg border border-gray-300 p-2"
            required
          />
        </div>
      )),
    [title],
  );

  useEffect(() => {
    if (open) modal?.current?.showModal();
    else modal?.current?.close();
  }, [open]);

  return (
    <>
      <ShimmerButton moreStyles="text-sm" onClick={() => setOpen(true)}>
        + Crear
      </ShimmerButton>
      {open && (
        <dialog className="m-auto rounded-lg p-4" ref={modal}>
          <h1 className="text-center text-lg font-bold">
            Formulario de {capitalize(title)}
          </h1>
          <form className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <Fields />
            <div className="col-span-2 flex items-center justify-center gap-x-2">
              <ShimmerButton onClick={() => setOpen(false)} color="vulcan">
                Cancelar
              </ShimmerButton>
              <ShimmerButton>Enviar</ShimmerButton>
            </div>
          </form>
        </dialog>
      )}
    </>
  );
});
