import { useState } from "react";
import AdminExport from "../components/AdminExport";
import AdminTable from "../components/AdminTable";
import AdminSearch from "../components/AdminSearch";
import { useOutletContext } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function AdminBookings() {
    const { userSession } = useOutletContext();
    const [isExporting, setIsExporting] = useState(false);
    const { data, execute: reloadBookings } = useFetch('/api/v1/admin/bookings/show', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userSession.access_token}`,
        }
    });
    const { execute: toggleStatusBooking } = useFetch('/api/v1/admin/bookings/statusToggle', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${userSession.access_token}`,
            'Content-Type': 'application/json',
        }
    }, { immediate: false });
    const { execute: csvExportBookings } = useFetch('/api/v1/admin/bookings/export', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${userSession.access_token}`,
        }
    }, { immediate: false });
    
    const toggleSts = async (id,sts) => {
        await toggleStatusBooking({
            requestUrl: `/api/v1/admin/bookings/statusToggle/${id}`,
            body: JSON.stringify({ status: sts })
        });
        reloadBookings();
    }

    const exportBookings = async () => {
        setIsExporting(true);
        try {
            const blobData = await csvExportBookings({ responseType: 'blob' });
            const url = window.URL.createObjectURL(blobData);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'bookings_data.csv');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading bookings data');
        } finally {
            setIsExporting(false);
        }
    };

    return (  
        <div className="bg-black min-h-screen w-full px-6 py-28 sm:px-12 lg:px-28 xl:py-32 relative flex flex-col gap-8 lg:gap-4 transition-all duration-500 ease-in-out overflow-hidden">
            <h1 className="text-4xl lg:text-5xl mb-16 font-syne font-bold text-white">Bookings</h1>
            <div className="flex w-full h-14 items-center justify-between">
                <AdminSearch />
                <span className="flex gap-3 items-center">
                    <AdminExport exportFunc={exportBookings} disablFunc={isExporting} />
                </span>
            </div>
            <AdminTable 
                data={data}
                cols={8}
                headerArr={['BookingId','UserId','PlanetId','Status','SpaceId','TicketId','Departure Station','Created at']}
                idName={'booking_id'}
                highlightedVal={{
                    pendingBg: 'bg-amber-900/60', pendingTxt: 'text-amber-300',
                    confirmedBg: 'bg-green-900', confirmedTxt: 'text-green-300',
                    startedBg: 'bg-blue-900/60', startedTxt: 'text-blue-300',
                    completedBg: 'bg-cyan-900/60', completedTxt: 'text-cyan-300',
                    cancelledBg: 'bg-rose-900', cancelledTxt: 'text-rose-300'
                }}
                editPanel={(id) => (
                    <div className="absolute h-auto w-auto bg-zinc-800 rounded-md right-10 p-1.5 flex flex-col gap-2 items-center text-sm">
                        <button onClick={(e) => toggleSts(id,'confirmed')} className="py-2 px-4 w-full text-center rounded-sm bg-zinc-700 text-white/60">confirmed</button>
                        <button onClick={(e) => toggleSts(id,'cancelled')} className="py-2 px-4 w-full text-center rounded-sm bg-zinc-700 text-white/60">cancelled</button>
                        <button onClick={(e) => toggleSts(id,'started')} className="py-2 px-4 w-full text-center rounded-sm bg-zinc-700 text-white/60">started</button>
                        <button onClick={(e) => toggleSts(id,'completed')} className="py-2 px-4 w-full text-center rounded-sm bg-zinc-700 text-white/60">completed</button>
                    </div>
                )}
            />
        </div>
    );
}

export default AdminBookings;