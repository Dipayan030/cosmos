import { useEffect , useState } from "react";

function solarSystem(planetName) {
    const [data , setData] = useState("hello");
    useEffect(() => {
        const fetchSolarSystem = async (planetName) => {
            try {
                const API_KEY = import.meta.env.VITE_SOLAR_API_KEY;
                const response = await fetch(`/api/rest/bodies/${planetName}`, {
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