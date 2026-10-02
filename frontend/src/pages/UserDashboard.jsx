import React from "react";
import { useOutletContext } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Dot, CircleSmall } from "lucide-react";

function UserDashboard() {
    const context = useOutletContext();
    const session = context?.session;
    const { data, execute: reloadBookings } = useFetch('/api/v1/bookings/show', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${session.access_token}`,
        }
    })
    const stsColorPalette = {
        pending:{
            txt: 'text-orange-400',
            bg: 'bg-orange-900/60'
        },
        confirmed:{
            txt: 'text-green-400',
            bg: 'bg-green-900/60'
        },
        started:{
            txt: 'text-blue-400',
            bg: 'bg-blue-900/60'
        },
        completed:{
            txt: 'text-cyan-400',
            bg: 'bg-cyan-900/60'
        },
    };
    console.log(data)
    return ( 
        <div className="bg-black min-h-screen max-w-screen px-6 py-28 sm:px-12 lg:px-28 xl:py-48 flex flex-col gap-8 lg:gap-18 transition-all duration-500 ease-in-out overflow-hidden">
            <h1 className="text-4xl lg:text-5xl mb-16 font-syne font-bold text-white">Your Bookings</h1>
            <div className="max-w-screen grid grid-cols-1 2xl:grid-cols-2 gap-2 text-white">
                {data.map((dataRow)=>{
                    return(
                        <div className=" border-zinc-800 border px-12 py-12 text-sm text-white/50 font-space-grotesk">
                            <span className="flex items-center mb-8 gap-4">
                            <h1 className="text-3xl text-white">{dataRow.planet_name}</h1>
                            {dataRow.status != 'cancelled' && (
                                <p className={`${stsColorPalette[dataRow?.status]?.txt} ${stsColorPalette[dataRow?.status]?.bg} flex items-center px-2 py-1 text-xs rounded-md`}>{dataRow.status}</p>
                            )}
                            </span>
                            <span className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:w-5/6 gap-2">
                                <p>Email : {dataRow.email}</p>
                                <p>Name : {dataRow.user_name}</p>
                                <p>Date : {dataRow.created_at}</p>
                                <p>Space ID : {dataRow.space_id}</p>
                                <p>Ticket ID : {dataRow.ticket_id}</p>
                                <p className="md:col-span-2">Departure Station: {dataRow.departure_station}</p>
                            </span>
                            {dataRow.status == 'cancelled'?
                                <button disabled="true" className="px-6 py-2 bg-rose-900/60 text-rose-400 mt-8">Cancelled</button>
                            :
                                <button className="px-6 py-2 bg-rose-900/60 text-rose-400 mt-8">Cancel</button>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default UserDashboard;