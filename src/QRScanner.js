import React from 'react';
import QrScanner from 'react-qr-scanner';

const QRScannerComponent = ({ onScan }) => {
    const handleScan = (data) => {
        if (data) {
            onScan(data.text);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const previewStyle = {
        height: 240,
        width: 320,
    };

    return (
        <div>
            <QrScanner
                delay={300}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
            />
        </div>
    );
};

export default QRScannerComponent;
