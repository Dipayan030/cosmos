import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";

function AdminTable({ data, cols, headerArr, idName, keysToFilterOut=[], highlightedVal={}, editPanel  }) {
    const [ isCopied, setIsCopied ] = useState(null);
    const [ isEditPanelVisible, setIsEditPanelVisible ] = useState(null);
    const [ acitveStatus, setActiveStatus ] = useState(null);
    const colsClass = {
        '5': 'grid-cols-5',
        '6': 'grid-cols-6',
        '7': 'grid-cols-7',
        '8': 'grid-cols-8'
    };

    const cleanedData = data.map(obj => {
        const newObj = { ...obj }; // Create a shallow copy
        keysToFilterOut.forEach(key => delete newObj[key]); // Delete unwanted keys
        return newObj;
    });
    const copyValue = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(textToCopy);
            setTimeout(() => {
                setIsCopied(null);
            }, 2000); 
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
    const editPanelControl = (id) => {
        if(isEditPanelVisible==null){
            setIsEditPanelVisible(id);
        }
        else if (isEditPanelVisible!=null) {
            if (isEditPanelVisible==id){
                setIsEditPanelVisible(null);
            }
            else{
                setIsEditPanelVisible(id);
            }
        }
    }
    return (  
        <div className="w-full">
            <div className={`w-full bg-zinc-950 grid ${colsClass[cols]} pl-14`}>
                {headerArr.map((colName)=>(
                    <h1 className="h-14 w-auto text-white/70 text-sm flex justify-center items-center">{colName}</h1>
                ))}
            </div>
            {cleanedData.map((record) => {
                const id = record[idName];
                return(
                    <div className="flex" key={id}>
                        <span key={id} className="relative h-14 w-14 bg-white/8 border-b border-white/35 text-white/35 flex justify-center items-center">
                            <EllipsisVertical size={26} strokeWidth={1.25} onClick={(e) => {editPanelControl(id)}} />
                            {isEditPanelVisible === id && (
                                editPanel(id)
                            )}
                        </span>
                        <div className={`h-14 w-full bg-white/8 grid ${colsClass[cols]} relative`}>
                        {Object.values(record).map((value)=>(
                            <>
                                <h1 onClick={(e) => {copyValue(value)}} className="w-auto text-white/70 text-sm flex justify-center items-center border-b border-white/30">
                                {isCopied==value && (
                                    <span key={value} className="bg-zinc-800 absolute -top-2 px-2 py-1 text-white/30 rounded-md font-space-grotesk text-xs">Copied: {value}</span>
                                )}
                                <p className={`${highlightedVal[value+'Bg']} ${highlightedVal[value+'Txt']} px-3 py-1 rounded-md w-auto`}>{value.length>20 ? value.slice(0,18)+'...' : value}</p>
                                </h1>
                            </>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default AdminTable;