import React, { useState } from 'react';
import QRScannerComponent from './QRScanner';
import './App.css';

function App() {
    const [scannedData, setScannedData] = useState('');

    const handleScan = (data) => {
        setScannedData(data);
    };

    return (
        <div className="App">
            <h1>QR Code Scanner</h1>
            <QRScannerComponent onScan={handleScan} />
            <p>Scanned Data: {scannedData}</p>
        </div>
    );
}

export default App;
