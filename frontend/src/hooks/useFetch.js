import { useState, useEffect, useRef } from "react";

function useFetch(url,options={}) {
    const [ data, setData ] = useState([{}]);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(null);
    const optionsRef = useRef(options);

    useEffect(() => {
        optionsRef.current = options;
    }, [options]);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            setError(null);
            const API_BASE_URL = import.meta.env.PROD
                ? import.meta.env.VITE_PROD_API_URL
                : import.meta.env.VITE_LOCAL_API_URL;
            console.log(API_BASE_URL+url);
            try{
                const response = await fetch(API_BASE_URL+url, {
                    ...optionsRef.current
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                };
                const data = await response.json();
                setData(data.data);
            } catch (err) {
                setError(err);
                console.error("Error fetching data from server");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    },[url])

    return ({ data, error, loading });
}

export default useFetch;