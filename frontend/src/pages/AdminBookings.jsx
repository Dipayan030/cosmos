import { useState } from "react";
import AdminExport from "../components/AdminExport";
import AdminTable from "../components/AdminTable";
import AdminSearch from "../components/AdminSearch";

function AdminBookings() {
    const [ data, setData ] = useState([]);
    return (  
        <div className="bg-black min-h-screen w-full px-6 py-28 sm:px-12 lg:px-28 xl:py-32 flex flex-col gap-8 lg:gap-4 transition-all duration-500 ease-in-out overflow-hidden">
            <h1 className="text-4xl lg:text-5xl mb-16 font-syne font-bold text-white">Bookings</h1>
            <div className="flex w-full h-14 items-center justify-between">
                <AdminSearch />
                <span className="flex gap-3 items-center">
                    <AdminExport />
                </span>
            </div>
            <AdminTable 
                data={data}
                cols={8}
                headerArr={['BoookingId','UserId','PlanetId','Status','SpaceId','TicketId','Departure Station','Created at']}
                idName={'planet_id'}
            />
        </div>
    );
}

export default AdminBookings;