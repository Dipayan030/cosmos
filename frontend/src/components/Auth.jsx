import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import authBanner from '../assets/authBanner.png'
import googleLogo from '../assets/Google.png'
import { useAuth } from "./AuthContext";
import { supabase } from "./SupabaseClient";


function Auth({option}) {  
    const { session , loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    
    
    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (isSignUp) {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) alert(error.message);
            else alert('Check your email inbox for the registration confirmation link!');
        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) alert(error.message);
        }
    }

    const handleGoogleAuth = async (e) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider : 'google',
            options : {
                redirectTo: window.location.origin, 
            },
        });
        if (error) alert(error.message);
    };

    return ( 
        <div className="max-w-screen h-auto lg:h-screen lg:px-48 py-20 lg:py-24 bg-black">
            <div className="size-full lg:bg-[#D9D9D9]/10 lg:p-3 lg:rounded-2xl gap-28 lg:gap-4 flex flex-col lg:flex lg:flex-row">
                <div className="w-full lg:w-1/2 h-full mt-20 lg:mt-0 flex flex-col justify-center items-center px-6 font-space-grotesk text-white gap-5">
                    <h1 className="text-center text-3xl lg:text-4xl font-semibold mb-14">{option}</h1>
                    <p className="mb-10">{option==="Sign-In" ? "Welcome !" : "Welcome Back !" }</p>
                    <button 
                    onClick={handleGoogleAuth}
                    className="w-5/7 h-14 lg:h-16 bg-white/8 flex items-center px-3 gap-6">
                        <Link><img src={googleLogo} alt="" className="h-10"/></Link>
                        <p className="text-white/35 text-sm lg:text-base">Continue with Google</p>
                    </button>
                    <span className="text-white/35"> or </span>
                    <input type="text" className="w-5/7 h-14 lg:h-16 bg-white/8 text-sm lg:text-base p-6 outline-0" placeholder="Email"/>
                    <input type="text" className="w-5/7 h-14 lg:h-16 bg-white/8 text-sm lg:text-base p-6 outline-0" placeholder="Password"/>
                    <button className="w-5/7 h-14 lg:h-16 bg-white text-black">{option}</button>
                </div>
                <div style={{ backgroundImage: `url(${authBanner})` }} className="h-120 lg:h-full w-full lg:w-1/2 p-6 lg:rounded-xl bg-no-repeat bg-cover bg-center flex justify-center">
                    <h1 className="text-white text-6xl lg:text-8xl font-syne font-semibold self-end">SPACE</h1>
                </div>
            </div>
        </div>
     );
}

export default Auth;