'use server'

import { redirect } from "next/navigation";

export async function sendFormData(formData: object) {
    const URL1 = process.env.BACKEND_URL || 'https://www.mifurmulario.com/recibo_post';
    const URL2 = 'http://localhost:8882/wp-json/contact-form/v1/submit';

    try {
        const response = await fetch(URL1, {
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