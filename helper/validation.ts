import { z } from 'zod';

export const FormSchema = z.object({
    name: z
        .string()
        .min(3, 'El nombre debe contener al menos 3 caracteres')
        .max(10, 'El nombre no debe ser mayor a 20 caracteres'),
    secondname: z
        .string()
        .min(3, 'Los apellidos deben contener al menos 3 caracteres'),
    email: z.email('Por favor, introduce un email válido'),
    phone: z
        .string()
        .regex(/^(?!\+34)/, 'No hace falta que incluyas el prefijo +34.')
        .regex(/^(6|7)\d{8}$/, 'Introduce un número móvil español válido y sin espacios.'),

    message: z
        .string()
        .min(10, 'El mensaje debe tener al menos 10 caracteres.')
        .max(160, 'El mensaje debe tener maximo 160 caracteres.')

})

export type FormSchemaType = z.infer<typeof FormSchema>;

export type FormState = {
    success?: boolean;
    message?: string;
    data?: {
        name?: string;
        secondname?: string;
        email?: string;
        phone?: string;
        message?: string;
    };
    errors?: {
        name?: string[];
        secondname?: string[];
        email?: string[];
        phone?: string[];
        message?: string[];
    } | null;
    serverError?: any;
}
