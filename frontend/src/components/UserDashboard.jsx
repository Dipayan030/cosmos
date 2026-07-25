import React from "react";
import { useOutletContext } from "react-router-dom";


function UserDashboard() {
    const context = useOutletContext();
    const session = context?.session;
    return ( 
        <div className="bg-black min-h-screen max-w-screen px-6 py-28 sm:px-12 lg:px-28 xl:py-48 flex flex-col gap-8 lg:gap-18 transition-all duration-500 ease-in-out overflow-hidden">
            <h1 className="text-4xl lg:text-5xl mb-16 font-syne font-bold text-white">Your Bookings</h1>
            <div className="max-w-screen p-6 sm:p-12 lg:p-28">
                {/* <div className="size-full border-r border-b border-white/35 grid grid-cols-1 xl:grid-cols-2"></div> */}
                <h1 className="text-white text-4xl font-space-grotesk">Hello {session?.user?.user_metadata.full_name.slice(0 , session?.user?.user_metadata.full_name.indexOf(' '))} This is Dashboard </h1>
            </div>
        </div>
    );
}

export default UserDashboard;