import React, { useState } from "react";
import Scanner from "./Scanner/Scanner";
import { formatProductData } from "./Utils/Util";
import axios from "axios";
import "./Track.css";
function convertToIST(dateString) {
  // Create a new Date object from the input date

  let date = new Date(dateString);

  // Get the time offset in minutes and convert it to milliseconds
  let offset = date.getTimezoneOffset() * 60000;

  // Create IST offset in milliseconds (IST is UTC + 5:30)
  let istOffset = 5.5 * 60 * 60 * 1000;

  // Convert the date to IST
  let istDate = new Date(date.getTime() + offset + istOffset);

  // Format the date into yyyy-mm-dd hh-mm-ss
  let year = istDate.getFullYear();
  let month = String(istDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  let day = String(istDate.getDate()).padStart(2, "0");
  let hours = String(istDate.getHours()).padStart(2, "0");
  let minutes = String(istDate.getMinutes()).padStart(2, "0");
  let seconds = String(istDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Example usage
let date = new Date(); // Replace with your date
console.log(convertToIST(date));

const Track = () => {
  const [prod, setProd] = useState("");
  const [productData, setProductData] = useState({});
  const [scanned, setScanned] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const setProductDetails = (data) => {
    setProd(data.prod);
  };
  // const [errorMessage, setErrorMessage] = useState(false);

  const submitData = async () => {
    const res = await axios.get(`http://localhost:8000/product/${prod}`);
    const exists = res.data.found;
    if (exists) {
      setProductData(res.data.productDb);
      setScanned(true);
    } else {
      setErrorMessage("Product id didn't match");
    }
  };
  const GetScannedData = (data) => {
    if (data.slice(0, 2) === "Pr") {
      const formattedData = formatProductData(data);
      // console.log(formattedData);
      setProductDetails(formattedData);
    }
  };
  const renderDetails = () => {
    console.log(productData);
    return (
      <div>
        <p>
          <span className="key">Prod</span>
          <span className="value">{productData.prod}</span>
        </p>
        <p>
          <span className="key">Sap</span>
          <span className="value">{productData.sap}</span>
        </p>
        <p>
          <span className="key">Prod Data</span>
          <span className="value">{productData.prodD}</span>
        </p>
        <p>
          <span className="key">Client</span>
          <span className="value">{productData.client}</span>
        </p>
        <p>
          <span className="key">Qty </span>
          <span className="value">{productData.qty}</span>
        </p>
        <p>
          <span className="key">SerialNo</span>
          <span className="value">{productData.serialNo}</span>
        </p>
        <h3>Track History</h3>
        {productData.productHistory.map((eachItem) => (
          <div className="time-stamp-container">
            <h3 className="station">Station {eachItem.stationId}</h3>
            <p className="arrival-time">
              Arrival Time : {convertToIST(eachItem.arrivalTime)}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="track-container">
      <div className="track-form">
        <h1 className="product-heading">Track Product</h1>
        <label className="product-form-label" htmlFor="prodId">
          Product Id
        </label>
        <input
          className="product-form-input"
          value={prod}
          onChange={(e) => {
            setProd(e.target.value);
          }}
        />
        <p className="error-message">{errorMessage}</p>
        <button className="product-submit-button" onClick={submitData}>
          Submit
        </button>
        {scanned && renderDetails()}
      </div>
      <Scanner setScannedData={GetScannedData} />
    </div>
  );
};

export default Track;
