import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import destinationData from '../data/mockData'

function Sidebar() {
    return ( 
        <nav className='fixed top-1/9 self-center lg:absolute lg:left-28 lg:top-2/6 flex flex-row lg:flex lg:flex-col h-52 gap-12 text-white/50 text-sm lg:text-xl font-space-grotesk '>
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