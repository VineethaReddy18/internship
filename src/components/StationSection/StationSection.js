import React, { useState, useEffect } from "react";
import "./StationSection.css";

const StationSection = (props) => {
  const { stationDetails, setStationDetails } = props;
  const [stationId, setStationId] = useState("");
  const [stationName, setStationName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const updateStationDetails = () => {
    setStationDetails({
      stationId,
      stationName,
    });
    setSubmitted(true);
  };
  useEffect(() => {
    setStationId(stationDetails.stationId);
    setStationName(stationDetails.stationName);
  }, [stationDetails]);
  return (
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
      <button
        onClick={updateStationDetails}
        className={submitted ? "submitted submit-button" : "submit-button"}
        disabled={submitted}
      >
        {submitted ? "Submitted" : "Submit"}
      </button>
    </div>
  );
};

export default StationSection;
