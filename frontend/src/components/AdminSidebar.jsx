import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Orbit, Earth, BookOpen, Rocket, Megaphone } from "lucide-react";

function AdminSidebar() {
    const sidebarLinks = [
        { name: 'Dashboard', to: '/admin/dashboard', icon: <LayoutDashboard size={20} strokeWidth={1.25} /> },
        { name: 'Planets', to: '/admin/planets', icon: <Earth size={20} strokeWidth={1.25} /> },
        { name: 'Bookings', to: '/admin/bookings', icon: <BookOpen size={20} strokeWidth={1.25} /> },
        { name: 'Flights', to: '/admin/flights', icon: <Rocket size={20} strokeWidth={1.25} /> },
        { name: 'Marketing', to: '/admin/marketing', icon: <Megaphone  size={20} strokeWidth={1.25} /> },
    ];
    const getLinkClass = ({ isActive }) =>
    `w-full p-4 text-white/35 transition-all ease-in-out flex items-center gap-2 ${
      isActive? 'bg-white/8' : 'hover:bg-white/4'
    }`;
    return (  
        <div className="bg-black min-h-screen w-1/7 gap-2 px-6 py-8 flex flex-col border border-r-white/8">
            <h1 className="text-3xl font-syne text-white font-semibold mb-6">COSMOS</h1>
            {sidebarLinks.map((link) =>(
                <NavLink key={link.name} to={link.to} className={getLinkClass}>
                    {({ isActive }) => (
                        <>
                            {link.icon}
                            {link.name}
                        </> 
                    )}
                </NavLink>
            ))}
        </div>
    );
}

export default AdminSidebar;