import React, { useState } from "react";
import { EllipsisVertical} from "lucide-react";
import { useOutletContext } from "react-router-dom";
import AdminSearch from "../components/AdminSearch";
import AdminAdd from "../components/AdminAdd";
import AdminExport from "../components/AdminExport";
import AdminTable from "../components/AdminTable";

function AdminDashboard() {
    return (  
        <div className="bg-black min-h-screen w-full px-6 py-28 sm:px-12 lg:px-28 xl:py-32 flex flex-col gap-8 lg:gap-4 transition-all duration-500 ease-in-out overflow-hidden">
            <h1 className="text-4xl lg:text-5xl mb-16 font-syne font-bold text-white">Admin Panel</h1>
        </div>
    );
}

export default AdminDashboard;