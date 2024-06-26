import React, { useState, useRef, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRCodeScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);
  const [scannedText, setScannedText] = useState("");
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        if (videoDevices.length === 0) {
          setError("No video devices found");
        } else {
          setError(null);
        }
      })
      .catch((err) => {
        setError("Error enumerating devices: " + err.message);
      });
  }, []);

  const startScanning = () => {
    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode("qr-reader");
    }

    html5QrCodeRef.current
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText, decodedResult) => {
          console.log(`Code scanned: ${decodedText}`);
          setScannedText(decodedText);
          stopScanning(); // Stop scanning after a successful scan
        },
        (errorMessage) => {
          console.error(`Error scanning: ${errorMessage}`);
        }
      )
      .then(() => {
        setScanning(true);
      })
      .catch((err) => {
        setError(`Error starting scan: ${err.message}`);
      });
  };

  const stopScanning = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current
        .stop()
        .then(() => {
          setScanning(false);
        })
        .catch((err) => {
          setError(`Error stopping scan: ${err.message}`);
        });
    } else {
      setError("Scanner is not running");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode("qr-reader");
      }
      html5QrCodeRef.current
        .scanFile(file, true)
        .then((decodedText) => {
          setScannedText(decodedText);
        })
        .catch((err) => {
          setError(`Error scanning image: ${err.message}`);
        });
    }
  };

  return (
    <div>
      <div id="qr-reader" style={{ width: "300px", height: "300px" }}></div>
      {error && <p>Error: {error}</p>}
      {scannedText && <p>Scanned Text: {scannedText}</p>}
      <button onClick={startScanning} disabled={scanning}>
        Start Scanning
      </button>
      <button onClick={stopScanning} disabled={!scanning}>
        Stop Scanning
      </button>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
};

export default QRCodeScanner;
