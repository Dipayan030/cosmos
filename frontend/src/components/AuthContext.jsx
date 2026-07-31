import React , { createContext , useContext , useEffect , useState} from "react";
import { supabase } from "./SupabaseClient";

const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [session , setSession] = useState(null);
    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    useEffect (() => {
        supabase.auth.getSession().then(({data : {session}}) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription?.unsubscribe();
    }, []);

    const value = {
        session,
        user,
        loading,
        signOut: () => supabase.auth.signOut(),
    };

    return ( 
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;