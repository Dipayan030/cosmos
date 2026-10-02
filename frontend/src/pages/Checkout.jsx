import React, { useEffect, useState } from "react";
import checkoutBanner from '../assets/checkoutBanner.png'
import { useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";

function Checkout() {
    const {id} = useParams();
    const { user, session, spaceId } = useAuth();
    const { data: destinationData } = useFetch(`/api/v1/destinations/show/${id}`, {
        method: 'GET',
    });
    const { execute: createBooking } = useFetch(`/api/v1/bookings/book/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
        }
    }, { immediate: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [bookingInfo , setBookingInfo] = useState({
        fullName: user?.user_metadata?.name || user?.user_metadata?.full_name || '',
        email: user?.email || '',
        spaceId: spaceId || '',
        departure_station: 'Astraea Orbital Gateway'
    });

    useEffect(() => {
        setBookingInfo(current => ({
            ...current,
            fullName: current.fullName || user?.user_metadata?.name || user?.user_metadata?.full_name || '',
            email: current.email || user?.email || '',
            spaceId: current.spaceId || spaceId || ''
        }));
    }, [user, spaceId]);

    const handleBookingSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmissionMessage('');
        try {
            await createBooking({
                body: JSON.stringify({
                    full_name: bookingInfo.fullName,
                    email: bookingInfo.email,
                    space_id: bookingInfo.spaceId,
                    departure_station: bookingInfo.departure_station
                })
            });
            setSubmissionMessage('Your orbital pass has been reserved.');
        } catch (error) {
            setSubmissionMessage(error.message || 'Booking could not be created.');
        } finally {
            setIsSubmitting(false);
        }
    } 
    return ( 
        <div className="max-w-screen h-auto lg:h-screen lg:px-48 py-20 lg:py-24 bg-black">
            <div className="size-full lg:bg-[#D9D9D9]/10 lg:p-3 lg:rounded-2xl gap-4 flex flex-col lg:flex lg:flex-row">
                <div style={{ backgroundImage: `url(${checkoutBanner})` }} className="h-120 lg:h-full w-full lg:w-1/2 p-6 lg:rounded-xl bg-no-repeat bg-cover bg-center flex justify-center">
                    <h1 className="text-white text-6xl lg:text-8xl font-syne font-semibold self-end">SPACE</h1>
                </div>
                <form onSubmit={handleBookingSubmit} className="w-full lg:w-1/2 h-full mt-20 lg:mt-0 flex flex-col justify-center px-6 font-space-grotesk text-white gap-5">
                    <h1 className="text-xl lg:text-3xl mb-4">SECURE YOUR ORBITAL PASS</h1>
                    <span className="gap-2 flex flex-col">
                        <label htmlFor="fullName" className="text-xs lg:text-sm">Full Legal Name</label>
                        <input type="text" placeholder="Commander Shepard" 
                        id="fullName"
                        required
                        value={bookingInfo.fullName}
                        onChange={(e) => setBookingInfo({...bookingInfo,fullName : e.target.value})}
                        className="text-sm lg:text-base h-14 lg:h-16 w-full rounded-md p-6 outline-none bg-transparent border border-[#D9D9D9]/35"/>
                    </span>
                    <span className="gap-2 flex flex-col">
                        <label htmlFor="spaceId" className="text-xs lg:text-sm">Space Passport ID</label>
                        <input type="text" placeholder="SP-9982X" 
                        id="spaceId"
                        required
                        value={bookingInfo.spaceId}
                        onChange={(e) => setBookingInfo({...bookingInfo,spaceId : e.target.value})}
                        className="text-sm lg:text-base h-14 lg:h-16 w-full rounded-md p-6 outline-none bg-transparent border border-[#D9D9D9]/35"/>
                    </span> 
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <span className="gap-2 flex flex-col">
                            <label htmlFor="destination" className="text-xs lg:text-sm">Select Destination</label>
                            <input type="text" id="destination" value={destinationData?.name || ''} readOnly
                            className="text-sm lg:text-base h-14 lg:h-16 w-full rounded-md px-4 outline-none bg-transparent border border-[#D9D9D9]/35 text-white/70"/>
                        </span>
                        <span className="gap-2 flex flex-col">
                            <label htmlFor="departureStation" className="text-xs lg:text-sm">Departure Station</label>
                            <span className="relative">
                                <select id="departureStation" value={bookingInfo.departure_station}
                                onChange={(e) => setBookingInfo({...bookingInfo, departure_station: e.target.value})}
                                className="text-sm lg:text-base h-14 lg:h-16 w-full appearance-none rounded-md px-4 pr-10 outline-none bg-zinc-900 border border-[#D9D9D9]/35 text-white focus:border-white/70">
                                    <option>Astraea Orbital Gateway</option>
                                    <option>Nova Terra Spacedock</option>
                                    <option>Chronos Hyperport</option>
                                    <option>Helios Prime Launchpad</option>
                                </select>
                                <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60" />
                            </span>
                        </span>
                    </div>
                    <span className="gap-2 flex flex-col">
                        <label htmlFor="email" className="text-xs lg:text-sm">Email</label>
                        <input type="email" id="email" placeholder="Email" required
                        value={bookingInfo.email}
                        onChange={(e) => setBookingInfo({...bookingInfo,email : e.target.value})}
                        className="text-sm lg:text-base h-14 lg:h-16 w-full rounded-md p-6 outline-none bg-transparent border border-[#D9D9D9]/35"/>
                    </span>
                    <span className="gap-2 flex flex-col text-sm lg:text-base">
                        <p>Next launch window: 48 hours</p>
                    </span>
                    {submissionMessage ? 
                        <button type="submit" disabled="true" className="lg:h-16 h-14 w-full bg-white text-black text-base lg:text-lg rounded-md disabled:opacity-60">Submited</button>
                    :
                        <button type="submit" disabled={isSubmitting} className="lg:h-16 h-14 w-full bg-white text-black text-base lg:text-lg rounded-md disabled:opacity-60">{isSubmitting ? 'RESERVING...' : 'CHECKOUT'}</button>
                    }
                    
                </form>
            </div>
        </div>
    );
}

export default Checkout;