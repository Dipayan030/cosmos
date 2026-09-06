import React from "react";
import { Search } from "lucide-react";

function AdminSearch() {
    return (  
        <span className="flex gap-3 items-center">
            <Search size={20} strokeWidth={1.5} className="text-zinc-700"/>
            <input type="text" placeholder="search" className="text-white/35 outline-none border-none" />
        </span>
    );
}

export default AdminSearch;