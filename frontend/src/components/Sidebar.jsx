import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import destinationData from '../data/mockData'

function Sidebar() {
    const [lastScrollY,setLastScrollY] = useState(0);
    const [isVisible,setIsVisible] = useState(true);
    const [screen,setScreen] = useState(1024);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScreen(window.innerWidth);
            if (screen >= 1024){
                setIsVisible(true);
            } else if(currentScrollY < 10){
                setIsVisible(true);
            } else if(lastScrollY < currentScrollY && currentScrollY > 50){
                setIsVisible(false);
            } else if(lastScrollY > currentScrollY) {
                setIsVisible(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
    return ( 
        <nav className={`${isVisible ? 'translate-y-0' : '-translate-y-full' } fixed top-1/9 self-center lg:absolute lg:left-28 lg:top-2/6 flex flex-row lg:flex lg:flex-col h-52 gap-12 text-white/50 text-sm lg:text-xl font-space-grotesk transition-transform duration-500 ease-in-out`}>
            {destinationData.map((planet) => (
                <NavLink
                key={planet.name}
                to={`/destinations/${planet.id}`}
                className={({isActive}) => `hover:text-white/80 transition-all ease-in-out duration-500 ${isActive ? 'text-md lg:text-2xl text-white ' : ''}`}
                >
                {planet.name}
                </NavLink>
            ))}
        </nav>
     );
}

export default Sidebar;