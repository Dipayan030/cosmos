import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import AdminExport from "../components/AdminExport";
import AdminSearch from "../components/AdminSearch";
import AdminTable from "../components/AdminTable";

function AdminUsers() {
    const { userSession } = useOutletContext();
    const [ data, setData ] = useState([]);

    const fetchData = async () => {
        const API_BASE_URL = import.meta.env.PROD
            ? 'https://cosmos-backend-r2sj.onrender.com'
            : 'http://localhost:8000';
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/admin/users/show`,{
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
            <h1 className="text-4xl lg:text-5xl mb-16 font-syne font-bold text-white">Users</h1>
            <div className="flex w-full h-14 items-center justify-between">
                <AdminSearch />
                <span className="flex gap-3 items-center">
                    <AdminExport />
                </span>
            </div>
            <AdminTable 
                data={data}
                cols={5}
                headerArr={['SpaceId','Email','Name','Created at','Last Sign in at']}
                idName={'space_id'}
            />
        </div>
    );
}

export default AdminUsers;