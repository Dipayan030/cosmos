import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { AdminAuthProvider } from "../contexts/AdminAuthContext";

function ScannerLayout() {
    return (  
        <AdminAuthProvider>
            <div className="min-h-screen min-w-screen bg-black flex">
                <Outlet />
            </div>
            <ScrollRestoration/>
        </AdminAuthProvider>
    );
}

export default ScannerLayout;