import React , { useEffect , useState} from "react";
import { supabase } from "./SupabaseClient";
import { Navigate , Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";


function ProtectedRoute() {
    const {session , loading} = useAuth();
    if (loading) {
        return (
        <div className="flex items-center justify-center min-h-screen text-white text-xl">
            Loading session...
        </div>
        );
    }
    if (!session) {
        return <Navigate to="/signin" replace />;
    }
    return <Outlet context={{ session }} />;
}

export default ProtectedRoute;