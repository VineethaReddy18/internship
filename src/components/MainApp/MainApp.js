import React, { useState } from "react";
import Scanner from "../Scanner/Scanner";
import "./MainApp.css";
import {
  CreateProduct,
  formatProductData,
  formatStationData,
} from "../Utils/Util";
import axios from "axios";
const MainApp = () => {
  const [prevStation, setPrevStation] = useState(null);
  const [submitError, setSubmitError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(true);
  const [delay, setDelay] = useState(true);
  const [stationErrorMessage, setStationErrorMessage] = useState("");

  const [stationId, setStationId] = useState("");
  const [stationName, setStationName] = useState("");
  const setStationDetails = (data) => {
    setStationId(data.stationId);
    setStationName(data.stationName);
  };

  const [prod, setProd] = useState("");
  const [sap, setSap] = useState("");
  const [prodD, setProdD] = useState("");
  const [client, setClient] = useState("");
  const [qty, setQty] = useState("");
  const [serialNo, setSerialNo] = useState("");

  const setProductDetails = (data) => {
    setProd(data.prod);
    setSap(data.sap);
    setProdD(data.prodD);
    setClient(data.client);
    setQty(data.qty);
    setSerialNo(data.serialNo);
  };

  // const [errorMessage, setErrorMessage] = useState(false);
  const GetScannedData = (data) => {
    if (data.slice(0, 2) === "Pr") {
      const formattedData = formatProductData(data);
      // console.log(formattedData);
      setProductDetails(formattedData);
    } else if (data.slice(0, 2) === "St") {
      const formattedData = formatStationData(data);
      // console.log(formattedData);
      setStationDetails(formattedData);
    }
  };

  const submitData = async () => {
    if (
      prod === "" ||
      sap === "" ||
      prodD === "" ||
      client === "" ||
      qty === "" ||
      serialNo === "" ||
      stationId === "" ||
      stationName === ""
    ) {
      setErrorMessage(true);
      return;
    } else {
      setErrorMessage(false);
      setSubmitting(true);
    }
    let productData = {
      prod,
      sap,
      prodD,
      client,
      qty,
      serialNo,
    };
    let prevStation2 = 0;
    if (prod !== "") {
      try {
        const res = await axios.get(`http://localhost:8000/product/${prod}`);
        const exists = res.data.found;
        // console.log(res.data.prevStation, res);
        if (!exists) {
          await CreateProduct(productData);
          console.log("created Product");
        } else {
          prevStation2 = res.data.prevStation;
        }
      } catch (error) {
        console.log("axios error", error);
      }
    }
    if (stationId == prevStation2 + 1) {
      //product is in right path submit the details and reset the fields
      const date = new Date();
      const stationProd = {
        stationId: stationId,
        arrivalTime: date,
      };

      console.log(stationProd);
      try {
        const res = await axios.post(
          `http://localhost:8000/product/${prod}`,
          stationProd
        );
        setDelay(false);
        setSubmitError(false);
      } catch (error) {
        console.log("axios error", error);
      }
    } else if (stationId < prevStation2 + 1) {
      //show warning that product is not reached the station with its number
      setStationErrorMessage(
        `The product is already scanned at the station ${stationId}`
      );
      setPrevStation(prevStation2 + 1);
      setDelay(false);
      setSubmitError(true);
    } else {
      setStationErrorMessage(
        `The product is not reached the station ${prevStation2 + 1}`
      );
      setPrevStation(prevStation2 + 1);
      setDelay(false);
      setSubmitError(true);
    }
  };

  const retrySubmitting = () => {
    setSubmitError(false);
    setDelay(true);
    setSubmitting(false);
    setErrorMessage(false);
  };
  const completeSubmission = () => {
    setSubmitError(false);
    setDelay(true);
    setSubmitting(false);
    setErrorMessage(false);
    setStationId("");
    setStationName("");
    setProd("");
    setSap("");
    setProdD("");
    setClient("");
    setQty("");
    setSerialNo("");
  };
  return (
    <div>
      {submitting && (
        <div className="submit-dialog">
          {!delay && (
            <div className="card">
              {submitError && (
                <>
                  <p className="submit-error-text">
                    {stationErrorMessage} <br></br>Please verify the details
                  </p>
                  <button onClick={retrySubmitting} className="retry-button">
                    Retry
                  </button>
                </>
              )}
              {!submitError && (
                <>
                  <p className="submit-success-text">
                    The data stored successfully
                  </p>
                  <button onClick={completeSubmission} className="done-button">
                    Done
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {errorMessage && (
        <p className="error-message">All fields are mandatory</p>
      )}
      <div className="mainapp-container">
        <div className="station-section-container">
          <h1 className="station-heading">Station</h1>
          <label htmlFor="stationId" className="form-label">
            Station Id
          </label>
          <input
            id="stationId"
            className="form-input"
            value={stationId}
            onChange={(e) => setStationId(e.target.value)}
          />
          <br />
          <label htmlFor="stationName" className="form-label">
            Station Name
          </label>
          <input
            id="stationName"
            className="form-input"
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
          />
        </div>
        <div className="product-section-container">
          <h1 className="product-heading">Product Section</h1>
          <label className="product-form-label">Prod</label>
          <input
            type="text"
            value={prod}
            onChange={(e) => setProd(e.target.value)}
            className="product-form-input"
          />
          <br />
          <label className="product-form-label">Sap</label>
          <input
            type="text"
            value={sap}
            onChange={(e) => setSap(e.target.value)}
            className="product-form-input"
          />
          <br />
          <label className="product-form-label">Prod D</label>
          <input
            type="text"
            value={prodD}
            onChange={(e) => setProdD(e.target.value)}
            className="product-form-input"
          />
          <br />
          <label className="product-form-label">Client</label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="product-form-input"
          />
          <br />
          <label className="product-form-label">Qty</label>
          <input
            type="text"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="product-form-input"
          />
          <br />
          <label className="product-form-label">Serial No</label>
          <input
            type="text"
            value={serialNo}
            onChange={(e) => setSerialNo(e.target.value)}
            className="product-form-input"
          />
          <br />
        </div>
        <Scanner setScannedData={GetScannedData} />
      </div>
      <button className="submit-button" onClick={submitData}>
        Submit
      </button>
    </div>
  );
};

export default MainApp;
