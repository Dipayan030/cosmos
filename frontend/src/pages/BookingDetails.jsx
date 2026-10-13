import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

function BookingDetails() {
    const { barcode } = useParams();
    const { userSession } = useOutletContext();
    const normalizedBarcode = barcode ? decodeURIComponent(barcode) : '';
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();
    
    const stsColorPalette = {
        pending: {
            txt: 'text-amber-300',
            bg: 'bg-amber-900/60'
        },
        confirmed: {
            txt: 'text-green-300',
            bg: 'bg-green-900/60'
        },
        started: {
            txt: 'text-blue-300',
            bg: 'bg-blue-900/60'
        },
        completed: {
            txt: 'text-cyan-300',
            bg: 'bg-cyan-900/60'
        },
        cancelled: {
            txt: 'text-rose-300',
            bg: 'bg-rose-900/60'
        },
    };
    const nextSts = {
        pending : 'confirmed',
        confirmed : 'started',
        started : 'completed',
    };
    
    const { execute: toggleStatusBooking } = useFetch('/api/v1/admin/bookings/statusToggle', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${userSession.access_token}`,
            'Content-Type': 'application/json',
        }
    }, { immediate: false });

    const toggleSts = async (id,sts) => {
        setLoading(true);
        await toggleStatusBooking({
            requestUrl: `/api/v1/admin/bookings/statusToggle/${id}`,
            body: JSON.stringify({ status: sts })
        });
        reloadBooking();
        setLoading(false);
        navigate('/admin/scanner');
    };

    const { data = [], execute: reloadBooking } = useFetch(
        normalizedBarcode ? `/api/v1/admin/bookings/show/${encodeURIComponent(normalizedBarcode)}` : '/api/v1/admin/bookings/show',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userSession?.access_token}`,
            }
        },
        { immediate: !!normalizedBarcode }
    );

    useEffect(() => {
        if (normalizedBarcode) {
            reloadBooking();
        }
    }, [normalizedBarcode, reloadBooking]);

    const booking = Array.isArray(data) ? data[0] ?? {} : data ?? {};
    const currSts = booking?.status;
    const nextStatus = nextSts[currSts];

    if (!normalizedBarcode) {
        return (
            <div className="size-full flex flex-col justify-center items-center text-white">
                <p>No booking ticket scanned.</p>
            </div>
        );
    }

    return (  
        <div className="min-h-screen min-w-screen flex flex-col justify-center items-center py-12 px-6">
            <div className=" border-zinc-800 border px-12 py-12 text-sm text-white/50 font-space-grotesk">
                <span className="flex items-center mb-8 gap-4">
                <h1 className="text-3xl text-white">{booking.planet_name}</h1>
                {booking.status !== 'cancelled' && (
                    <p className={`${stsColorPalette[booking?.status]?.txt} ${stsColorPalette[booking?.status]?.bg} flex items-center px-2 py-1 text-xs rounded-md`}>{booking.status}</p>
                )}
                </span>
                <span className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:w-5/6 gap-2">
                    <p>Email : {booking.email}</p>
                    <p>Name : {booking.user_name}</p>
                    <p>Date : {booking.created_at}</p>
                    <p>Space ID : {booking.space_id}</p>
                    <p>Ticket ID : {booking.ticket_id}</p>
                    <p className="md:col-span-2">Departure Station: {booking.departure_station}</p>
                </span>
            </div>
            {nextStatus && (
                <button disabled={loading} className={`${loading? 'text-black/50' : 'text-black'} px-6 py-2 bg-white  mt-8`} onClick={() => toggleSts(booking?.booking_id, nextStatus)}>
                    {nextStatus=='completed' ? nextStatus.slice(0, -1) :nextStatus.slice(0, -2)}
                </button>
            )}
        </div>
    );
}

export default BookingDetails;