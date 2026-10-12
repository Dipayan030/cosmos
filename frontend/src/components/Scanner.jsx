import React, { useEffect, useRef, useState } from "react";

function Scanner({ onScanSuccess }) {
    const videoRef = useRef(null);
    const [error, setError] = useState("");
    const scannedRef = useRef(false);

    useEffect(() => {
        if (!navigator?.mediaDevices?.getUserMedia) {
            setError("This browser does not support camera access.");
            return;
        }

        if (!("BarcodeDetector" in window)) {
            setError("Your browser does not support live barcode detection. Please use Chrome or Edge.");
            return;
        }

        let stream = null;
        let cancelled = false;

        const startScanner = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: "environment",
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    },
                    audio: false,
                });

                const video = videoRef.current;
                if (!video) return;

                video.srcObject = stream;
                await video.play();

                const barcodeDetector = new window.BarcodeDetector({
                    formats: [
                        "code_128",
                        "code_39",
                        "code_93",
                        "ean_13",
                        "ean_8",
                        "itf",
                        "qr_code",
                        "upc_a",
                        "upc_e",
                    ],
                });

                const detectLoop = async () => {
                    if (cancelled || scannedRef.current) return;

                    try {
                        const videoElement = videoRef.current;
                        if (!videoElement || videoElement.readyState < 2) {
                            requestAnimationFrame(detectLoop);
                            return;
                        }

                        const barcodes = await barcodeDetector.detect(videoElement);
                        const detectedCode = barcodes?.[0]?.rawValue;

                        if (detectedCode) {
                            scannedRef.current = true;
                            onScanSuccess(detectedCode);
                            return;
                        }
                    } catch (scanErr) {
                        console.error("Barcode detection error:", scanErr);
                    }

                    requestAnimationFrame(detectLoop);
                };

                detectLoop();
            } catch (cameraErr) {
                console.error("Camera access error:", cameraErr);
                setError("Camera permission denied. Please allow camera access and try again.");
            }
        };

        startScanner();

        return () => {
            cancelled = true;
            scannedRef.current = false;
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        };
    }, [onScanSuccess]);

    return (
        <div className="h-64 w-full bg-zinc-800 rounded-sm p-2">
            <div className="relative w-full h-full aspect-video rounded-xs overflow-hidden border-none outline-none bg-white/10">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
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