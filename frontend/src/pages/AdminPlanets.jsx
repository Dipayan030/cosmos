import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import AdminAdd from "../components/AdminAdd";
import AdminExport from "../components/AdminExport";
import AdminTable from "../components/AdminTable";
import AdminSearch from "../components/AdminSearch";
import { X } from "lucide-react";
import useFetch from "../hooks/useFetch";

function AdminPlanets() {
    const { userSession } = useOutletContext();
    const [ planetImage, setPlanetImage ] = useState(null);
    const [ isExporting, setIsExporting ] = useState(false);
    const [ formData, setFormData ] = useState({
        name: '',
        description: '',
        about: '',
        image: planetImage,
        equatorial_radius : '',
        orbital_period : '',
        mass_density : '',
        solar_aphelion : '' 

    });
    const [ isAddFormVisible, setAddIsFormVisible ] = useState(false)
    const addPlanetForm = () => {
        setAddIsFormVisible(true);
    };
    const { data, execute: reloadPlanets } = useFetch('/api/v1/admin/planets/show', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userSession.access_token}`,
        }
    });
    const { execute: addPlanet } = useFetch('/api/v1/admin/planets/add', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${userSession.access_token}`,
        }
    }, { immediate: false });
    const { execute: toggleStatusPlanet } = useFetch('/api/v1/admin/planets/status', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${userSession.access_token}`,
            'Content-Type': 'application/json',
        }
    }, { immediate: false });
    const { execute: deletePlanet } = useFetch('/api/v1/admin/planets/delete', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${userSession.access_token}`,
        }
    }, { immediate: false });
    const { execute: csvExportPlanet } = useFetch('/api/v1/admin/planets/export', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userSession.access_token}`,
        }
    }, { immediate: false })
    const uploadPlanetForm = async (e) => {
        e.preventDefault();
        const payload = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'image') {
                payload.append(key, value);
            }
        });
        payload.append('image', planetImage);

        await addPlanet({ body: payload });
        setAddIsFormVisible(false);
        setPlanetImage(null);
        await reloadPlanets();
    };
    const toggleSts = async (id,sts) => {
        await toggleStatusPlanet({
            requestUrl: `/api/v1/admin/planets/status/${id}`,
            body: JSON.stringify({ status: sts })
        });
        await reloadPlanets();
    }
    const dltPlanet = async (id) => {
        await deletePlanet({
            requestUrl: `/api/v1/admin/plantes/delete/${id}`,
        });
        await reloadPlanets();
    }
    const exportPlanet = async () => {
        setIsExporting(true);
        try{
            const blobData = await csvExportPlanet({ responseType: 'blob' });
            const url = window.URL.createObjectURL(blobData);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'planets_data.csv');
            
            document.body.appendChild(link);
            link.click();
            
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error downloading csv data in frontend")
        } finally {
            setIsExporting(false);
        }
    }

    return (  
        <div className="bg-black min-h-screen w-full px-6 py-28 sm:px-12 lg:px-28 xl:py-32 relative flex flex-col gap-8 lg:gap-4 transition-all duration-500 ease-in-out overflow-hidden">
            <h1 className="text-4xl lg:text-5xl mb-16 font-syne font-bold text-white">Planets</h1>
            <div className="flex w-full h-14 items-center justify-between">
                <AdminSearch />
                <span className="flex gap-3 items-center">
                    <AdminAdd  onClickBtn={addPlanetForm}/>
                    <AdminExport exportFunc={exportPlanet} disablFunc={isExporting} />
                </span>
            </div>
            <AdminTable 
                data={data}
                cols={8}
                headerArr={['PlanetId','Name','Status','Created at','Equatorial Radius','Orbital Period','Mass Density','Solar Aphelion']}
                idName={'BIN_TO_UUID(p.planet_id)'}
                keysToFilterOut={['description','about','img']}
                highlightedVal={{ AvailableBg: 'bg-green-900', AvailableTxt: 'text-green-300', UnavailableBg: 'bg-rose-900', UnavailableTxt: 'text-rose-300'}}
                editPanel={(id) => (
                    <div className="absolute h-auto w-auto bg-zinc-800 rounded-md right-10 p-1.5 flex flex-col gap-2 items-center text-sm">
                        <button onClick={(e) => toggleSts(id,'Available')} className="py-2 px-4 w-full text-center rounded-sm bg-zinc-700 text-white/60">Available</button>
                        <button onClick={(e) => toggleSts(id,'Unavailable')} className="py-2 px-4 w-full text-center rounded-sm bg-zinc-700 text-white/60">Unavailable</button>
                        <button onClick={(e) => dltPlanet(id)} className="py-2 px-4 w-full text-center rounded-sm bg-zinc-700 text-white/60">Delete</button>
                    </div>
                )}
            />  
            {isAddFormVisible && (
                <div className="absolute h-auto w-180 p-2 rounded-md bg-zinc-900 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    <span className="w-full h-6 flex justify-end mb-2">
                        <button onClick={(e)=>{setAddIsFormVisible(false)}} className="h-6 w-6 bg-zinc-800 rounded-sm flex justify-center items-center text-white/50"><X size={16} strokeWidth={1.5} /></button>
                    </span>
                    <form onSubmit={uploadPlanetForm} className=" w-full px-6 pb-6">
                        <h2 className="text-2xl mb-4 font-space-grotesk font-medium text-white">Add New Planet</h2>
                        <div className="w-full grid grid-cols-2 gap-3">
                            <span className="flex flex-col gap-1">
                                <label className="text-white/20 text-sm font-space-grotesk ">Name</label>
                                <input 
                                type="text" 
                                onChange={(e)=> setFormData({...formData,name : e.target.value})} 
                                required 
                                className="h-12 rounded-sm bg-zinc-800/80 outline-none border-none p-4 text-white/50 font-space-grotesk" />
                            </span>
                            <span className="flex flex-col gap-1">
                                <label className="text-white/20 text-sm font-space-grotesk ">Image</label>
                                <input 
                                type="file" 
                                accept="image/*" 
                                required
                                onChange={(e)=> e.target.files[0] ? setPlanetImage(e.target.files[0]): setPlanetImage(null)}  
                                className="h-12 rounded-sm bg-zinc-800/80 outline-none border-none p-4 text-white/50 font-space-grotesk" />
                            </span>
                            <span className="flex flex-col gap-1">
                                <label className="text-white/20 text-sm font-space-grotesk ">Equatorial Radius</label>
                                <input 
                                type="number" 
                                step="any"
                                required 
                                onChange={(e) => setFormData({ ...formData, equatorial_radius: e.target.value })}
                                className="no-spinner h-12 rounded-sm bg-zinc-800/80 outline-none border-none p-4 text-white/50 font-space-grotesk" />
                            </span>
                            <span className="flex flex-col gap-1">
                                <label className="text-white/20 text-sm font-space-grotesk ">Orbital Period</label>
                                <input 
                                type="number"
                                step="any"
                                required 
                                onChange={(e) => setFormData({ ...formData, orbital_period: e.target.value })}
                                className="no-spinner h-12 rounded-sm bg-zinc-800/80 outline-none border-none p-4 text-white/50 font-space-grotesk" />
                            </span>
                            <span className="flex flex-col gap-1">
                                <label className="text-white/20 text-sm font-space-grotesk ">Mass Density</label>
                                <input 
                                type="number"
                                step="any" 
                                required 
                                onChange={(e) => setFormData({ ...formData, mass_density: e.target.value })}
                                className="no-spinner h-12 rounded-sm bg-zinc-800/80 outline-none border-none p-4 text-white/50 font-space-grotesk" />
                            </span>
                            <span className="flex flex-col gap-1">
                                <label className="text-white/20 text-sm font-space-grotesk ">Solar Aphelion</label>
                                <input 
                                type="number"
                                step="any" 
                                required
                                onChange={(e) => setFormData({ ...formData, solar_aphelion: e.target.value })}
                                className="no-spinner h-12 rounded-sm bg-zinc-800/80 outline-none border-none p-4 text-white/50 font-space-grotesk" />
                            </span>
                            <span className="flex flex-col gap-1 col-span-2">
                                <label className="text-white/20 text-sm font-space-grotesk ">About</label>
                                <input 
                                type="text" 
                                required
                                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                                className="h-12 rounded-sm bg-zinc-800/80 outline-none border-none p-4 text-white/50 font-space-grotesk" />
                            </span>
                            <span className="flex flex-col gap-1 col-span-2">
                                <label className="text-white/20 text-sm font-space-grotesk ">Description</label>
                                <input type="text" 
                                required
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="h-12 rounded-sm bg-zinc-800/80 outline-none border-none p-4 text-white/50 font-space-grotesk" />
                            </span>
                            <button type="submit" className="h-12 w-full col-span-2 rounded-sm bg-white text-md font-space-grotesk mt-2">Add</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AdminPlanets;