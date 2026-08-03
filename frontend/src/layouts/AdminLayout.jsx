import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";

function AdminLayout() {
    return (  
        <>
        <div className="min-h-screen min-w-screen bg-black flex">
            <AdminSidebar />
            <Outlet />
        </div>
        <ScrollRestoration/>
        </>
    );
}

export default AdminLayout;