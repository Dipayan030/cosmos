import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../contexts/AdminAuthContext";

function AdminRoute() {
    const { user, role, loading, userSession } = useAdminAuth();
    if (loading || (user && role === null)) {
        return <div className="flex justify-center items-center h-screen">Verifying authorization...</div>;
    };
    if (!user || role !== 'admin') {
        return <Navigate to="/admin-login" replace />;
    };
    return <Outlet context={{ user, role, userSession }}/>
}

export default AdminRoute;