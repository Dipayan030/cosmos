import { Link } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import destinationBg from '../assets/destinations-hero.png'
import FadeContent from '../components/react-bits/FadeContent'
import AnimatedContent from '../components/react-bits/AnimatedContent'

function Destinations (){
    const { data, error, loading } = useFetch('/api/v1/destinations/show', {
        method: 'GET',
    });
    const destinationData = Array.isArray(data)
        ? data.filter((destination) => destination.name)
        : [];

    return(
        <div className="bg-space-dark text-white min-h-screen font-light">
            <div style={{ backgroundImage: `url(${destinationBg})` }} className="max-w-screen h-screen flex flex-col justify-end px-6 py-28 sm:px-12 lg:px-28 bg-cover bg-center">
                {/* <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                    <h1 className="text-4xl lg:text-5xl mb-16 font-syne font-bold">PICK YOUR DESTINATION</h1>
                </FadeContent> */}
                <AnimatedContent
                distance={100}
                direction="vertical"
                reverse={false}
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.1}
                delay={0}
                >
                    <h1 className="text-4xl lg:text-5xl mb-16 font-syne font-bold">PICK YOUR DESTINATION</h1>
                </AnimatedContent>
            </div>
            <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>        
            <div className="max-w-screen p-6 sm:p-12 lg:p-28">
                <div className="size-full border-r border-b border-white/35 grid grid-cols-1 xl:grid-cols-2">
                    {loading && <p className="col-span-full p-6">Loading destinations...</p>}
                    {error && <p className="col-span-full p-6">Unable to load destinations.</p>}
                    {!loading && !error && destinationData.length === 0 && (
                        <p className="col-span-full p-6">No destinations available.</p>
                    )}
                    {destinationData.map((destination) => {
                        const destinationId = destination['BIN_TO_UUID(p.planet_id)'];

                        return (
                        <div key={destinationId} className="h-120 sm:h-130 md:h-160 lg:h-190 xl:h-150 2xl:h-200 border-t border-l border-white/35 p-6 flex flex-col items-center"> 
                            <Link to={`/destinations/${destinationId}`} className="h-1/2"><img src={destination.img} alt={destination.name} className="object-cover"/></Link>
                            <div className="h-1/2 flex flex-col gap-6 md:gap-12 lg:gap-18 2xl:gap-0 justify-end lg:py-6 ">
                                <Link to={`/destinations/${destinationId}`} className="h-1/2"><h1 className="text-7xl xl:text-7xl 2xl:text-8xl font-space-grotesk font-medium">{destination.name}</h1></Link>
                                { destination.status==='Unavailable' && (
                                    <span className="bg-rose-900/60 text-rose-400 w-22 flex justify-around py-1 rounded-md text-sm lg:mb-6">{destination.status}</span>
                                )}
                                { destination.status==='New' && (
                                    <span className="bg-blue-900/60 text-blue-400 w-22 flex justify-around py-1 rounded-md text-sm lg:mb-6">{destination.status}</span>
                                )}
                                <p className="text-md md:text-xl lg:text-3xl xl:text-2xl 2xl:text-2xl font-space-grotesk text-white/70">{destination.about}</p>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
            </FadeContent>
        </div>
    )
}

export default Destinations