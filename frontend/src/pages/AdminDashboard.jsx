import React, { useState } from "react";
import { EllipsisVertical} from "lucide-react";
import { useOutletContext } from "react-router-dom";
import AdminSearch from "../components/AdminSearch";
import AdminAdd from "../components/AdminAdd";
import AdminExport from "../components/AdminExport";

function AdminDashboard({ table }) {
    const {user,role,userSession} = useOutletContext();
    const [data, setData] = useState([]);
    
    const fetchData = async () => {
        const API_BASE_URL = import.meta.env.PROD
            ? 'https://cosmos-backend-r2sj.onrender.com'
            : 'http://localhost:8000';
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/admin/${table}`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userSession.access_token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok){
                const userData = await response.json();
                setData(userData.data);
            };
        } catch(err) {
            console.error("Error fetching data from backend:");
        }
    };

    fetchData();
    
    return (  
        <div className="bg-black min-h-screen w-full px-6 py-28 sm:px-12 lg:px-28 xl:py-32 flex flex-col gap-8 lg:gap-4 transition-all duration-500 ease-in-out overflow-hidden">
            <h1 className="text-4xl lg:text-5xl mb-16 font-syne font-bold text-white">Admin Panel</h1>
            <div className="flex w-full h-14 items-center justify-between">
                <AdminSearch />
                <span className="flex gap-3 items-center">
                    <AdminExport />
                    <AdminAdd />
                </span>
            </div>
            <div className="w-full">
                <div className="w-full bg-zinc-950 grid grid-cols-5 pl-14">
                    <h1 className="h-14 w-auto text-white/70 text-sm flex justify-center items-center">SpaceId</h1>
                    <h1 className="h-14 w-auto text-white/70 text-sm flex justify-center items-center">Email</h1>
                    <h1 className="h-14 w-auto text-white/70 text-sm flex justify-center items-center">Name</h1>
                    <h1 className="h-14 w-auto text-white/70 text-sm flex justify-center items-center">Created at</h1>
                    <h1 className="h-14 w-auto text-white/70 text-sm flex justify-center items-center">Last Sign in at</h1>
                </div>
                {data.map((e) => (
                    <div className="flex">
                        <span className="h-14 w-14 bg-white/8 border-b border-white/35 text-white/35 flex justify-center items-center">
                            <EllipsisVertical size={26} strokeWidth={1.25} />
                        </span>
                        <div className="w-full bg-white/8 grid grid-cols-5">
                        {Object.values(e).map((x)=>(
                            <h1 className="h-14 w-auto text-white/70 text-sm flex justify-center items-center border-b border-white/30">{x}</h1>
                        ))}
                        </div>
                    </div>
                ))}
                {/* <div className="flex">
                    <div className="h-full w-12 bg-black/37">hello</div>
                    <div className="w-full bg-white/8 grid grid-cols-4">
                        <h1 className="h-14 w-auto bg-black/37 text-white/70 text-sm flex justify-center items-center">Email</h1>
                        <h1 className="h-14 w-auto bg-black/37 text-white/70 text-sm flex justify-center items-center">Name</h1>
                        <h1 className="h-14 w-auto bg-black/37 text-white/70 text-sm flex justify-center items-center">Created at</h1>
                        <h1 className="h-14 w-auto bg-black/37 text-white/70 text-sm flex justify-center items-center">Last Sign in at</h1>
                    </div>
                    
                </div> */}
            </div>
            
        </div>
    );
}

export default AdminDashboard;