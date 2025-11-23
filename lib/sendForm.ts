'use server'

import { redirect } from "next/navigation";

export async function sendFormData(formData: object) {
    const URL = process.env.BACKEND_URL || 'https://www.mifurmulario.com/recibo_post';

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json();

        return data
    } catch (error) {
        console.error('Error enviando formulario:', error)
        redirect('/serverError')
    }

}