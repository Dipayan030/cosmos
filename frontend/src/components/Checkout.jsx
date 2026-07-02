import React from "react";
import checkoutBanner from '../assets/checkoutBanner.png'
import { Link, useParams } from "react-router-dom";
import destinationData from "../data/mockData";

function Checkout() {
    const {id} = useParams();
    return ( 
        <div className="max-w-screen h-auto lg:h-screen lg:px-48 py-20 lg:py-24 bg-black">
            <div className="size-full lg:bg-[#D9D9D9]/10 lg:p-3 lg:rounded-2xl gap-4 flex flex-col lg:flex lg:flex-row">
                <div style={{ backgroundImage: `url(${checkoutBanner})` }} className="h-120 lg:h-full w-full lg:w-1/2 p-6 lg:rounded-xl bg-no-repeat bg-cover bg-center flex justify-center">
                    <h1 className="text-white text-6xl lg:text-8xl font-syne font-semibold self-end">SPACE</h1>
                </div>
                <div className="w-full lg:w-1/2 h-full mt-20 lg:mt-0 flex flex-col justify-center px-6 font-space-grotesk text-white gap-5">
                    <h1 className="text-xl lg:text-3xl mb-4">SECURE YOUR ORBITAL PASS</h1>
                    <span className="gap-2 flex flex-col">
                        <label htmlFor="" className="text-xs lg:text-sm">Full Legal Name</label>
                        <input type="text" placeholder="Commander Shepard" className="text-sm lg:text-base h-14 lg:h-16 w-full rounded-md p-6 outline-none bg-transparent border border-[#D9D9D9]/35"/>
                    </span>
                    <span className="gap-2 flex flex-col">
                        <label htmlFor="" className="text-xs lg:text-sm">Space Passport ID</label>
                        <input type="text" placeholder="SP-9982X" className="text-sm lg:text-base h-14 lg:h-16 w-full rounded-md p-6 outline-none bg-transparent border border-[#D9D9D9]/35"/>
                    </span> 
                    <span className="gap-2 flex flex-col">
                        <label htmlFor="" className="text-xs lg:text-sm">Select Destination</label>
                        <input type="text" placeholder="MOON" value={destinationData[id].name} className="text-sm lg:text-base h-14 lg:h-16 w-full rounded-md p-6 outline-none bg-transparent border border-[#D9D9D9]/35"/>
                    </span> 
                    <span className="gap-2 flex flex-col">
                        <label htmlFor="" className="text-xs lg:text-sm">Email</label>
                        <input type="text" placeholder="Email" className="text-sm lg:text-base h-14 lg:h-16 w-full rounded-md p-6 outline-none bg-transparent border border-[#D9D9D9]/35"/>
                    </span>
                    <span className="gap-2 flex flex-col text-sm lg:text-base">
                        <p>Departure Station: Cape Canaveral Orbit-1</p>
                        <p>Next launch window: 48 hours</p>
                    </span>
                    
                    <Link><button className="lg:h-16 h-14 w-full bg-white text-black text-base lg:text-lg rounded-md">Checkout</button></Link>
                </div>
            </div>
        </div>
    );
}

export default Checkout;