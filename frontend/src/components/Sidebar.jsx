import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import useFetch from '../hooks/useFetch';

function Sidebar() {
    const { id } = useParams();
    const { data, error, loading } = useFetch('/api/v1/destinations/show', {
        method: 'GET',
    });
    const planets = Array.isArray(data) ? data.filter((planet) => planet.name) : [];
    const activeIndex = planets.findIndex(
        (planet) => planet['BIN_TO_UUID(p.planet_id)'] === id
    );
    const maxWindowStart = Math.max(planets.length - 4, 0);
    const [windowStart, setWindowStart] = useState(0);
    useEffect(() => {
        if (activeIndex < 0) return;
        setWindowStart((currentStart) => {
            if (activeIndex < currentStart) return activeIndex;
            if (activeIndex >= currentStart + 4) {
                return Math.min(activeIndex - 3, maxWindowStart);
            }
            if (activeIndex === currentStart + 3) {
                return Math.min(currentStart + 1, maxWindowStart);
            }
            if (activeIndex === currentStart + 1) {
                return Math.max(currentStart - 1, 0);
            }
            return Math.min(currentStart, maxWindowStart);
        });
    }, [activeIndex, maxWindowStart]);
    const visiblePlanets = planets.slice(windowStart, windowStart + 4);
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
        <nav aria-label="Planet navigation" className={`${isVisible ? 'translate-y-0' : '-translate-y-full' } fixed top-1/9 self-center lg:absolute lg:left-28 lg:top-2/6 flex flex-row lg:flex-col h-52 gap-12 text-white/50 text-sm lg:text-xl font-space-grotesk transition-transform duration-500 ease-in-out`}>
            <AnimatePresence initial={false}>
                {visiblePlanets.map((planet) => {
                    const planetId = planet['BIN_TO_UUID(p.planet_id)'];
                    return (
                        <motion.div
                            key={planetId}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                            <NavLink
                                to={`/destinations/${planetId}`}
                                className={({isActive}) => `hover:text-white/80 transition-all ease-in-out duration-500 ${isActive ? 'text-md lg:text-2xl text-white ' : ''}`}
                            >
                                {planet.name}
                            </NavLink>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
            {loading && <span>Loading...</span>}
            {error && <span>Unable to load planets.</span>}
        </nav>
     );
}

export default Sidebar;