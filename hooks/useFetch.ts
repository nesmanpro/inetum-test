import { useCallback, useState } from "react";

const BASE_URL = 'https://www.mifurmulario.com/recibo_post'

export function useFetch<T = any>() {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<T | null>(null);


    const response = useCallback(
        async (endpoint: string, options: RequestInit = {}) => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`${BASE_URL}${endpoint}`, {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        ...options.headers,
                    }
                })

                if (!res.ok) throw new Error(`HTTP error, status:${res.status}`)

                const json = await res.json();

                setData(json?.data);
                return json

            } catch (err) {
                setError(err);
                console.log("Error fetching", err)
                return null
            } finally {
                setLoading(false)
            }
        }, [])


    return { loading, error, data, response }
}