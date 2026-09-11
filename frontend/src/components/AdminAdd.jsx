import React from "react";

function AdminAdd({ onClickBtn }) {
    return (  
        <button onClick={onClickBtn} className="h-12 px-6 text-sm text-black bg-white">+ Add</button>
    );
}

export default AdminAdd;