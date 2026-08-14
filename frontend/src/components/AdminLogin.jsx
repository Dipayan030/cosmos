import React from "react";
import { supabase } from "./SupabaseClient";
import { Link } from "react-router-dom";
import googleLogo from '../assets/Google.png'

function AdminLogin() {
    const handleGoogleAuth = async (e) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider : 'google',
            options : {
                redirectTo: `${window.location.origin}/admin/auth/context`, 
            },
        });
        if (error) alert(error.message);
    };
    return (  
        <div className="bg-black min-h-screen min-w-screen flex flex-col gap-12 justify-center items-center">
            <h1 className="text-center text-4xl font-syne font-semibold text-white mb-35 ">COSMOS</h1>
            <h1 className="text-center text-2xl font-space-grotesk text-white">Admin Login</h1>
            <div className="w-2/7 p-4 bg-[#D9D9D9]/10 flex flex-col gap-3 items-center">
                <button 
                onClick={handleGoogleAuth}
                className="w-full full h-14 lg:h-16 bg-white/8 flex items-center px-3 gap-6">
                    <Link><img src={googleLogo} alt="" className="h-10"/></Link>
                    <p className="text-white/35 text-sm lg:text-base">Continue with Google</p>
                </button>
                <span className="text-white/35"> or </span>
                <input type="text" className="w-full text-white/70 h-14 lg:h-16 bg-white/8 text-sm lg:text-base p-6 outline-0" placeholder="Email"/>
                <input type="text" className="w-full text-white/70 h-14 lg:h-16 bg-white/8 text-sm lg:text-base p-6 outline-0" placeholder="Password"/>
                <button className="w-full h-14 lg:h-16 bg-white text-black">Login</button>
            </div>
        </div>
    );
};

export default AdminLogin;