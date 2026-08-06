import React, { createContext, useContext, useEffect, useState, } from "react";
import { supabase } from "./SupabaseClient";
import { useNavigate } from "react-router-dom";

const AdminAuthContext = createContext({});

export function AdminAuthProvider ({ children }) {
    const navigate = useNavigate();
    const [user , setUser] = useState(null);
    const [role , setRole] = useState(null);
    const [loading , setLoading] = useState(true);

    async function getAdminProfile(session) {
        if(!session) {
            setUser(null);
            setRole(null);
            setLoading(false);
            return;
        };
        try {
            const API_BASE_URL = import.meta.env.PROD
                ? 'https://cosmos-backend-r2sj.onrender.com'
                : 'http://localhost:8000';
            const response = await fetch(`${API_BASE_URL}/api/v1/admin/login`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok){
                const data = await response.json();
                setRole(data.role);
            } else {
                setRole('user');
            }
        } catch (err) {
            console.log('Error fetch admin profile',err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;
        const initAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                
                if (session) {
                    setUser(session.user);
                    await getAdminProfile(session);
                } else {
                    setUser(null);
                    setRole(null);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Auth init error:", err);
                if (isMounted) setLoading(false);
            }
        };

        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null);
            if (session) {
                if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                    await getAdminProfile(session);
                    if (event === 'SIGNED_IN' && role==='admin') {
                        navigate('/admin/dashboard', { replace: true });
                    }
                }
            } else {
                setRole(null);
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
            subscription?.unsubscribe();
        };
        }, [navigate]);

    return (
        <AdminAuthContext.Provider value={{user,role,loading}}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export const useAdminAuth = () => useContext(AdminAuthContext);