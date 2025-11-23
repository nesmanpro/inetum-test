'use server'

import { FormSchema, type FormState } from "@/helper/validation";
import { sendFormData } from "@/lib/sendForm";
import { redirect } from "next/navigation";
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

    const response = await sendFormData(validatedFields.data);

    if (!response || response.error) {
        return {
            success: false,
            message: 'Error al enviar el formulario.',
            errors: response.error,
            data: fields,
        }
    }

    redirect('/success')
}