'use server'

import { FormSchema, type FormState } from "@/helper/validation";
import { sendFormData } from "@/lib/sendForm";
import z from "zod";

export async function registerClientActions(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {


    const fields = {
        name: formData.get("name") as string,
        secondname: formData.get("secondname") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        message: formData.get("message") as string,
    };

    const validatedFields = FormSchema.safeParse(fields);

    if (!validatedFields.success) {
        const flattenedErrors = z.flattenError(validatedFields.error);

        return {
            success: false,
            message: 'Error de validación',
            errors: flattenedErrors.fieldErrors,
            data: fields,
        }
    }

    try {

        const response = await sendFormData(validatedFields.data);

        if (!response || !response.error) {
            return {
                success: false,
                message: 'Error al enviar el formulario.',
                errors: response.error,
                data: fields,
            }
        }

        return {
            success: true,
            message: 'Formulario enviado correctamente.',
            errors: null,
            data: fields,
        }

    } catch (err) {
        console.error("Error del servidor al hacer el fetch.", err);

        return {
            success: false,
            message: "No se pudo enviar el formulario. Intenta más tarde.",
            errors: null,
            data: fields,
            serverError: err
        };
    }

}