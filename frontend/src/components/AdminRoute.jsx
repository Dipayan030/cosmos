import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

function AdminRoute() {
    const { user, role, loading } = useAdminAuth();
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Verifying authorization...</div>;
    }
    if (!user || role !== 'admin') {
        return <Navigate to="/admin-login" replace />;
    }
    return <Outlet context={{ user, role }}/>
}

export default AdminRoute;