import React from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import destinationData from "../data/mockData"
import Sidebar from "./Sidebar"
import solarSystem from "../hooks/solarSystem"

export default function Planet(){
    const {id} = useParams();
    const planetData = solarSystem(destinationData[id].name.toLowerCase());
    console.log(planetData);
    return(
        <div style={{ backgroundImage: `url(${destinationData[id].img})` }} className="bg-black h-screen max-w-screen p-6 sm:p-12 lg:p-28 bg-cover bg-center bg-no-repeat flex flex-col justify-end items-end gap-18 transition-all duration-500 ease-in-out overflow-hidden">
            <Sidebar/>
            <span className="font-space-grotesk flex flex-col gap-5 transition-all duration-700 ease-in-out">
                <h1 className="text-5xl lg:text-7xl text-white text-right font-medium">{destinationData[id].name}</h1>
                <h2 className="text-right text-[#6E6E6E] text-md lg:text-xl">ORBITAL PARAMETERS RETRIEVED // LIVE SECURE LINK</h2>
                <p className="text-sm lg:text-lg text-right lg:w-3/6 self-end text-white/70">{destinationData[id].desc}</p>
            </span>
            <span className="flex flex-col gap-12 lg:gap-0 lg:flex lg:flex-row lg:justify-between w-full lg:items-center">
                <Link className="self-end lg:self-center"><button className="text-sm lg:text-md h-12 w-32 lg:h-16 lg:w-42 border border-white/70 text-white/90 font-space-grotesk hover:bg-white hover:text-black transition-colors transition-discrete ease-in-out duration-200">Book a Trip</button></Link>
                <div className="grid grid-cols-2 lg:grid-cols-4 text-white justify-around gap-8 lg:gap-16">
                    <span className="text-center flex flex-col gap-2 lg:gap-3">
                        <h1 className="text-xl lg:text-4xl font-space-mono">{planetData.equaRadius}<span className="text-sm lg:text-lg font-space-grotesk"> KM</span></h1>
                        <p className="text-[#6E6E6E] text-sm lg:text-lg">EQUATORIAL RADIUS</p>
                    </span>
                    <span className="text-center flex flex-col gap-2 lg:gap-3">
                        <h1 className="text-xl lg:text-4xl font-space-mono">{planetData.sideralOrbit}<span className="text-sm lg:text-lg font-space-grotesk"> EARTH DAYS</span></h1>
                        <p className="text-[#6E6E6E] text-sm lg:text-lg">ORBITAL PERIOD</p>
                    </span>
                    <span className="text-center flex flex-col gap-2 lg:gap-3">
                        <h1 className="text-xl lg:text-4xl font-space-mono">{planetData.density ? Number(planetData.density).toFixed(2) : "0.00"}<span className="text-sm lg:text-lg font-space-grotesk"> G/CM³</span></h1>
                        <p className="text-[#6E6E6E] text-sm lg:text-lg">MASS DENSITY</p>
                    </span>
                    <span className="text-center flex flex-col gap-2 lg:gap-3">
                        <h1 className="text-xl lg:text-4xl font-space-mono">{planetData.aphelion/1000000}<span className="text-sm lg:text-lg font-space-grotesk"> MIL KM</span></h1>
                        <p className="text-[#6E6E6E] text-sm lg:text-lg">SOLAR APHELION</p>
                    </span>

                </div>
            </span>
        </div>
    )
}