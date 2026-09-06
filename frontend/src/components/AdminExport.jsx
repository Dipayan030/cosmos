import React from "react";
import { Download } from "lucide-react";

function AdminExport() {
    return (  
        <button className="h-12 px-6 border border-white/35 text-sm text-white/70 flex gap-2 items-center">
            <Download size={16} strokeWidth={1.75} />Export
        </button>
    );
}

export default AdminExport;