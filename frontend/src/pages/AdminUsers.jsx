import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import AdminExport from "../components/AdminExport";
import AdminSearch from "../components/AdminSearch";
import AdminTable from "../components/AdminTable";
import useFetch from "../hooks/useFetch";

function AdminUsers() {
    const { userSession } = useOutletContext();
    const { data, error, loading } = useFetch('/api/v1/admin/users/show', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${userSession.access_token}`,
            'Content-Type': 'application/json'
        }
    });

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