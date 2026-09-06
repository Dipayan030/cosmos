import { EllipsisVertical } from "lucide-react";

function AdminTable({ data, cols, headerArr, idName }) {
    const colsClass = {
        '5': 'grid-cols-5',
        '7': 'grid-cols-7',
        '8': 'grid-cols-8'
    };
    return (  
        <div className="w-full">
            <div className={`w-full bg-zinc-950 grid ${colsClass[cols]} pl-14`}>
                {headerArr.map((colName)=>(
                    <h1 className="h-14 w-auto text-white/70 text-sm flex justify-center items-center">{colName}</h1>
                ))}
            </div>
            {data.map((record) => {
                const id = record[idName]
                return(
                    <div className="flex" key={id}>
                        <span key={id} className="h-14 w-14 bg-white/8 border-b border-white/35 text-white/35 flex justify-center items-center">
                            <EllipsisVertical size={26} strokeWidth={1.25} />
                        </span>
                        <div className={`w-full bg-white/8 grid grid-cols-${cols}`}>
                        {Object.values(record).map((value)=>(
                            <h1 className="h-14 w-auto text-white/70 text-sm flex justify-center items-center border-b border-white/30">{value}</h1>
                        ))}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default AdminTable;