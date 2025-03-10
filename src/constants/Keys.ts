import type { Cliente } from "@/interfaces/Cliente";
import type { Reserva } from "@/interfaces/Reserva";
import type { Vehiculo } from "@/interfaces/Vehiculo";

export type SystemTitle = 'clientes' | 'vehiculos' | 'reservas';
export type SystemData = Cliente | Vehiculo | Reserva;

interface Fields {
  [key: string]: {
    type: string;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
  };
}

export const INPUT_FIELDS: Record<SystemTitle, Fields> = {
  clientes: {
    nombre: {
      type: 'text',
      placeholder: 'Juan',
      minLength: 3,
      maxLength: 20,
    },
    apellido: {
      type: 'text',
      placeholder: 'Pérez',
      minLength: 3,
      maxLength: 20,
    },
    cedula: {
      type: 'number',
      placeholder: '1234567890',
    },
    ciudad: {
      type: 'text',
      placeholder: 'Quito',
    },
    email: {
      type: 'email',
      placeholder: 'correo@example.com',
    },
    direccion: {
      type: 'text',
      placeholder: 'Sur de Quito, Calle 123',
    },
    telefono: {
      type: 'tel',
      placeholder: '0987654321',
    },
    fecha_nacimiento: {
      type: 'date',
    },
  },
  vehiculos: {
    marca: {
      type: 'text',
      placeholder: 'Toyota',
    },
    modelo: {
      type: 'text',
      placeholder: 'Corolla',
    },
    anio_fabricacion: {
      type: 'number',
      placeholder: '2023',
    },
    placa: {
      type: 'text',
      placeholder: 'ABC-1234',
    },
    color: {
      type: 'color',
    },
    tipo_vehiculo: {
      type: 'text',
      placeholder: 'Sedán',
    },
    kilometraje: {
      type: 'text',
      placeholder: '81km - 102km',
    },
    descripcion: {
      type: 'text',
      placeholder: 'Auto en perfecto estado',
    },
  },
  reservas: {
    codigo: {
      type: 'text',
      placeholder: 'RESER1234',
    },
    descripcion: {
      type: 'text',
      placeholder: 'Reserva de 3 días para revisión',
    },
    id_cliente: {
      type: 'text',
      placeholder: '67c1c3f08e08b47b866ee843',
    },
    id_vehiculo: {
      type: 'text',
      placeholder: '67c1c3f08e09b47b867ee842',
    },
  },
};

export const COLUMN_NAMES: Record<SystemTitle, string[]> = {
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
