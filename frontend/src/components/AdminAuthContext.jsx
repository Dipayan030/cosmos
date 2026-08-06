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
            const response = await fetch(`${API_BASE_URL}/api/v1/admin/login`)
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

    useEffect (() => {
        supabase.auth.getSession().then(({data : {session}}) => {
            setUser(session?.user ?? null);
            if(session){
                getAdminProfile(session);
            };
        }).catch(() => {
            setLoading(false);
        }); 

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if(_event === 'SIGNED_IN' && session) {
                getAdminProfile(session);
                navigate('/admin/dashboard',{ replace: true });
            };
            setLoading(false);
        });

        return () => subscription?.unsubscribe();
    }, []);

    return (
        <AdminAuthContext.Provider value={{user,role,loading}}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export const useAdminAuth = () => useContext(AdminAuthContext);