import { useEffect , useState } from "react";

function solarSystem(planetName) {
    const [data , setData] = useState("hello");
    useEffect(() => {
        const fetchSolarSystem = async (planetName) => {
            try {
                const API_KEY = import.meta.env.VITE_SOLAR_API_KEY;
                const isLocalDev = import.meta.env.DEV;
                const targetUrl = `https://api.le-systeme-solaire.net/rest/bodies/${planetName}`;
                const fetchUrl = isLocalDev 
                    ? `/api/rest/bodies/${planetName}` 
                    : `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
                const response = await fetch(fetchUrl, {
                headers: { 'Authorization': `Bearer ${API_KEY}` }
                });
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.log("Error fetching solar data: " , error);
            }
        }
        fetchSolarSystem(planetName);
    }, [planetName])
    return data;
}

export default solarSystem;