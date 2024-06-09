import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';

const QRScanner = ({ onScan }) => {
    const [facingMode, setFacingMode] = useState('environment');

    const handleScan = (data) => {
        if (data) {
            onScan(data);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const previewStyle = {
        height: 240,
        width: 320,
    };

    const toggleCamera = () => {
        setFacingMode((prevFacingMode) =>
            prevFacingMode === 'user' ? 'environment' : 'user'
        );
    };

    return (
        <div>
            <QrReader
                delay={300}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
                facingMode={facingMode}
            />
            <button onClick={toggleCamera}>
                Switch Camera
            </button>
        </div>
    );
};

export default QRScanner;
