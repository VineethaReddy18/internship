import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';

const QRScannerComponent = () => {
     const [scannedData, setScannedData] = useState('');
    const [error, setError] = useState('');

    const handleScan = (data) => {
        if (data) {
            setScannedData(data.text);
        }
    };

    const handleError = (err) => {
        console.error(err);
        setError('Error accessing camera: ' + err.message);
    };

    const previewStyle = {
        height: 240,
        width: 320,
    };

    useEffect(() => {
        // Check for camera availability
        navigator.mediaDevices.enumerateDevices().then(devices => {
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            if (videoDevices.length === 0) {
                setError('No camera device found.');
            }
        }).catch(err => {
            setError('Error enumerating devices: ' + err.message);
        });
    }, []);

    return (
        <div className="text-center m-7">
            <h1 className="font-bold text-4xl font-serif">QR Scanner</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!error && (
                <QrScanner
                    delay={300}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                />
            )}
            <div className="mt-4">
                {/* <label htmlFor="scannedData" className="block text-xl font-bold mb-2">Scanned Data:</label>
                <input
                    type="text"
                    id="scannedData"
                    name="scannedData"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    value={scannedData}
                    readOnly
                /> */}
                <p>Scanned Data</p>
                <div className="flex justify-center m-5">
               <label className="font-Normal m-4 text-xl w-40">Product Id</label> 
               <input type="text" value={scannedData} className="border border-gray-400 rounded-md px-3 py-2 w-2/4"></input>
               </div>
               <div className="flex justify-center m-5">
               <label className="font-Normal m-4 text-xl w-40">Product Name</label> 
               <input type="text" className="border border-gray-400 rounded-md px-3 py-2 w-2/4"></input>
               </div>
               <div className="flex justify-center m-5">
               <label className="font-Normal m-4 text-xl w-40">Client Name</label> 
               <input type="text" className="border border-gray-400 rounded-md px-3 py-2 w-2/4"></input>
            </div>
            <button className="bg-blue-500 border-slate-300 w-28 p-3 text-slate-200 rounded-lg">Submit</button>
            </div>
        </div>
    );
};

export default QRScannerComponent;
