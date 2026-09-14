import { useState, useEffect, useRef, useCallback } from "react";

function useFetch(url, options = {}, { immediate = true } = {}) {
    const [ data, setData ] = useState([{}]);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(null);
    const optionsRef = useRef(options);

    useEffect(() => {
        optionsRef.current = options;
    }, [options]);

    const execute = useCallback(async (requestOptions = {}) => {
        setLoading(true);
        setError(null);
        const API_BASE_URL = import.meta.env.PROD
            ? import.meta.env.VITE_PROD_API_URL
            : import.meta.env.VITE_LOCAL_API_URL;
        const { requestUrl, ...fetchOptions } = requestOptions;
        try {
            const response = await fetch(API_BASE_URL + (requestUrl || url), {
                ...optionsRef.current,
                ...fetchOptions,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            setData(responseData.data);
            return responseData;
        } catch (err) {
            setError(err);
            console.error("Error fetching data from server");
            throw err;
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return ({ data, error, loading, execute });
}

export default useFetch;