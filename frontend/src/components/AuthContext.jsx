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
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

async function syncUserWithBackend() {
    const { data: { session } } = await supabase.auth.getSession();
    const API_BASE_URL = import.meta.env.PROD
        ? 'https://cosmos-backend-r2sj.onrender.com'
        : 'http://localhost:5000';
    if (session) {
        try{
            const response = await fetch(`${API_BASE_URL}/api/v1/users/signup` , {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`,
                },
            });
        } catch(err) {
            console.error("user sync with backend failed:", err);
        }
    };
};