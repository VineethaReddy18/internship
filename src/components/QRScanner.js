import React, { useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin.js";
import axios from "axios";
import "./QRScanner.css";

const formatDecodedResult = (text) => {
  // console.log(text);
  const textArray = text.split(";");
  const qrData = {
    prod: textArray[0].split(":")[1],
    sap: textArray[1].split(":")[1],
    prodD: textArray[2].split(":")[1],
    client: textArray[3].split(":")[1],
    qty: textArray[4].split(":")[1],
    serialNo: textArray[5].split(":")[1],
  };
  return qrData;
};

const QRScanner = () => {
  const [error, setError] = useState(false);
  const [prod, setProd] = useState("");
  const [sap, setSap] = useState("");
  const [prodD, setProdD] = useState("");
  const [client, setClient] = useState("");
  const [qty, setQty] = useState("");
  const [serialNo, setSerialNo] = useState("");

  const setData = (obj) => {
    setProd(obj.prod);
    setSap(obj.sap);
    setProdD(obj.prodD);
    setClient(obj.client);
    setQty(obj.qty);
    setSerialNo(obj.serialNo);
  };

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText);
    setData(formatDecodedResult(decodedResult.result.text));
  };

  const submitData = async () => {
    const productData = {
      prod,
      sap,
      prodD,
      client,
      qty,
      serialNo,
    };
    console.log(productData);
    if (
      prod === "" ||
      sap === "" ||
      prodD === "" ||
      client === "" ||
      qty === "" ||
      serialNo === ""
    ) {
      // setErrorMessage(true);
      return;
    }

    // setErrorMessage(false);
    try {
      const res = await axios.post(
        `http://localhost:8000/add-product`,
        productData
      );
      console.log(res);
      // Reset form fields after successful submission
      setProd("");
      setSap("");
      setProdD("");
      setClient("");
      setQty("");
      setSerialNo("");
    } catch (e) {
      console.error("Error adding event:", e);
    }
  };
  return (
    <div className="text-center m-7">
      <h1 className="font-bold text-4xl font-serif">QR Scanner</h1>
      {!error && (
        <div className="qrcode-container">
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
        </div>
      )}
      <div className="mt-4">
        <p>Scanned Data</p>
        <div className="flex justify-center m-5">
          <label className="font-Normal m-4 text-xl w-40">Prod</label>
          <input
            type="text"
            value={prod}
            onChange={(e) => setProd(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2 w-2/4"
          ></input>
        </div>
        <div className="flex justify-center m-5">
          <label className="font-Normal m-4 text-xl w-40">Sap</label>
          <input
            type="text"
            value={sap}
            onChange={(e) => setSap(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2 w-2/4"
          ></input>
        </div>
        <div className="flex justify-center m-5">
          <label className="font-Normal m-4 text-xl w-40">Prod D</label>
          <input
            type="text"
            value={prodD}
            onChange={(e) => setProdD(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2 w-2/4"
          ></input>
        </div>
        <div className="flex justify-center m-5">
          <label className="font-Normal m-4 text-xl w-40">Client</label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2 w-2/4"
          ></input>
        </div>
        <div className="flex justify-center m-5">
          <label className="font-Normal m-4 text-xl w-40">Qty</label>
          <input
            type="text"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2 w-2/4"
          ></input>
        </div>
        <div className="flex justify-center m-5">
          <label className="font-Normal m-4 text-xl w-40">serial no</label>
          <input
            type="text"
            value={serialNo}
            onChange={(e) => setSerialNo(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2 w-2/4"
          ></input>
        </div>

        <button
          onClick={submitData}
          className="bg-blue-500 border-slate-300 w-28 p-3 text-slate-200 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QRScanner;
