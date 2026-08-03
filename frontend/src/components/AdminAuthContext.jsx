import React, { createContext, useContext, useEffect, useState, } from "react";
import { supabase } from "./SupabaseClient";

const AdminAuthContext = createContext({});

export function AdminAuthProvider ({ children }) {
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
            const response = await fetch('')
            if (response.ok){
                const data = await response.json();
                setUser(data);
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
        supabase.auth.getSession.then(({ data: {session} }) => {
            if(session){
                getAdminProfile(session);
            };
        }).catch(() => {
            // setLoading(false);
        });
        const { auth: { subscription } } = supabase.auth.onAuthStateChange((_event,session) => {
            if (session) {
                getAdminProfile(session);
            };
        });
        return () => subscription.unsubscribe();
    }, []);

    return (
        <AdminAuthContext.Provider value={{user,role,loading}}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export const useAdminAuth = () => useContext(AdminAuthContext);