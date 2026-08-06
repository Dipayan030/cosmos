import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { AdminAuthProvider } from "../components/AdminAuthContext";

function AdminLayout() {
    return (  
        <AdminAuthProvider>
            <div className="min-h-screen min-w-screen bg-black flex">
                <AdminSidebar />
                <Outlet />
            </div>
            <ScrollRestoration/>
        </AdminAuthProvider>
    );
}

export default AdminLayout;