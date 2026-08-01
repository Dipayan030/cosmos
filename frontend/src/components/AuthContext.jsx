import React , { createContext , useContext , useEffect , useState} from "react";
import { supabase } from "./SupabaseClient";

const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [session , setSession] = useState(null);
    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);
    
    async function syncUserWithBackend(currentSession) {
        // const { data: { session } } = await supabase.auth.getSession();
        if (!currentSession) return;
        console.log(currentSession)
        const API_BASE_URL = import.meta.env.PROD
            ? 'https://cosmos-backend-r2sj.onrender.com'
            : 'http://localhost:8000';
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentSession.access_token}`, // Pass Supabase JWT
                },
            });

            if (!response.ok) {
                throw new Error('Failed to sync user with backend');
            }

            const data = await response.json();
            console.log('✅ Synced with Aiven Backend:', data);
        } catch (error) {
            console.error('❌ Error syncing user with backend:', error);
        }
    };

    useEffect (() => {
        supabase.auth.getSession().then(({data : {session}}) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session) {
                syncUserWithBackend(session);
            };
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if(_event === 'SIGNED_IN' && session) {
                syncUserWithBackend(session);
            };
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