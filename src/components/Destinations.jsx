import { Link } from "react-router-dom"
import destinationData from '../data/mockData'
import destinationBg from '../assets/destinations-hero.png'

function Destinations (){
    return(
        <div className="bg-space-dark text-white min-h-screen font-light">
            <div style={{ backgroundImage: `url(${destinationBg})` }} className="max-w-screen h-screen flex flex-col justify-end px-6 py-28 sm:px-12 lg:px-28 bg-cover bg-center">
                <h1 className="text-4xl lg:text-5xl mb-16 font-syne font-bold">PICK YOUR DESTINATION</h1>
            </div>
            <div className="max-w-screen p-6 sm:p-12 lg:p-28">
                <div className="size-full border-r border-b border-white/35 grid grid-cols-1 xl:grid-cols-2">
                    {destinationData.map((destination) => (
                        <div className="h-120 sm:h-130 md:h-160 lg:h-190 xl:h-150 2xl:h-200 border-t border-l border-white/35 p-6 flex flex-col items-center">
                            <Link to={`/destinations/${destination.id}`} className="h-1/2"><img src={destination.img} alt={destination.name} className="object-cover"/></Link>
                            <div className="h-1/2 flex flex-col gap-6 md:gap-12 lg:gap-18 2xl:gap-0 justify-end lg:py-6 ">
                                <Link to={`/destinations/${destination.id}`} className="h-1/2"><h1 className="text-7xl xl:text-7xl 2xl:text-8xl font-space-grotesk font-medium">{destination.name}</h1></Link>
                                <p className="text-md md:text-xl lg:text-3xl xl:text-2xl 2xl:text-2xl font-space-grotesk text-white/70">{destination.about}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Destinations