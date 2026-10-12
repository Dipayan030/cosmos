import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BarcodeScanner from "../components/Scanner";

export default function BookingScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const handleScanSuccess = (code) => {
    if(code){
        navigate(`/admin/booking/${encodeURIComponent(code)}`);
        setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-gray-100 flex flex-col items-center justify-center p-6 font-space-grotesk">
      <div className="max-w-md w-full text-center space-y-6">
        <header>
          <h1 className="text-3xl font-semibold font-syne">
            Track Bookings
          </h1>
          <p className="text-gray-400 text-sm mt-1">Scan physical barcodes instantly</p>
        </header>

        {/* Scan Trigger Button */}
        {!isScanning && (
          <button
            onClick={() => setIsScanning(true)}
            className="w-full py-3.5 px-6 font-semibold bg-indigo-600 hover:bg-indigo-500 transition-all rounded-xl shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            Open Scanner
          </button>
        )}

        {/* Live Scanner Component */}
        {isScanning && (
          <div className="space-y-4 flex flex-col gap-10 items-center">
            <BarcodeScanner onScanSuccess={handleScanSuccess} />
            <button
              onClick={() => setIsScanning(false)}
              className="px-4 py-2 text-sm bg-white text-black hover:text-black/60 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
