import { useEffect , useState } from "react";

function solarSystem(planetName) {
    const [data , setData] = useState("hello");
    useEffect(() => {
        const fetchSolarSystem = async (planetName) => {
            try {
                const API_KEY = import.meta.env.VITE_SOLAR_API_KEY;
                const isLocalDev = import.meta.env.DEV;
                const baseUrl = isLocalDev 
                    ? '/api' 
                    : 'https://api.le-systeme-solaire.net';
                const response = await fetch(`${baseUrl}/rest/bodies/${planetName}`, {
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