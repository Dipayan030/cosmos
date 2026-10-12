import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function Scanner({ onScanSuccess }) {
    const [error, setError] = useState("");
    
    return (
        <div className="h-64 w-full bg-zinc-800 rounded-sm p-2">
            <div className="relative w-full h-full aspect-video rounded-xs overflow-hidden border-none outline-none bg-white/10">
                <BarcodeScannerComponent
                width="100%"
                height="100%"
                onUpdate={(err, result) => {
                    if (result) {
                    // Pass the raw barcode value back to the parent
                        onScanSuccess(result.text); 
                    } else if (err) {
                    // Note: 'err' fires continuously if no barcode is found in the frame.
                    // We only catch severe camera access errors here.
                        if (err.name === "NotAllowedError") {
                            setError("Camera permission denied.");
                        }
                    }
                }}
                />
            </div>
            {error && (
                <p className="mt-3 text-sm text-red-400 font-medium bg-red-500/10 px-3 py-1 rounded-lg">
                {error}
                </p>
            )}
            <p className="text-xs text-gray-400 mt-4 text-center">
                Ensure your environment is well-lit and hold the barcode steady.
            </p>
        </div>
    );
}

export default Scanner;