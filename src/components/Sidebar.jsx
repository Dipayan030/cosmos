import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import destinationData from '../data/mockData'

function Sidebar() {
    return ( 
        <nav className='absolute left-6 sm:left-12 lg:left-28 top-1/7 lg:top-2/5 flex flex-col h-52 justify-between text-white/50 text-md lg:text-xl font-space-grotesk '>
            {destinationData.map((planet) => (
                <NavLink
                key={planet.name}
                to={`/destinations/${planet.id}`}
                className={({isActive}) => `hover:text-white/80 transition-all ease-in-out duration-500 ${isActive ? 'text-xl text-white ' : ''}`}
                >
                {planet.name}
                </NavLink>
            ))}
        </nav>
     );
}

export default Sidebar;