import React, { useEffect, useState } from "react";
import "./ProdSection.css";
const ProdSection = (props) => {
  const { productDetails, setProductDetails } = props;
  // console.log(productDetails);
  const [prod, setProd] = useState("");
  const [sap, setSap] = useState("");
  const [prodD, setProdD] = useState("");
  const [client, setClient] = useState("");
  const [qty, setQty] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const updateProductDetails = () => {
    setProductDetails({
      prod,
      sap,
      prodD,
      client,
      qty,
      serialNo,
    });
    setSubmitted(true);
  };

  useEffect(() => {
    setProd(productDetails.prod);
    setSap(productDetails.sap);
    setProdD(productDetails.prodD);
    setClient(productDetails.client);
    setQty(productDetails.qty);
    setSerialNo(productDetails.serialNo);
  }, [productDetails]);
  return (
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
      <label className="product-form-label">serial no</label>
      <input
        type="text"
        value={serialNo}
        onChange={(e) => setSerialNo(e.target.value)}
        className="product-form-input"
      />
      <br />
      <button
        onClick={updateProductDetails}
        className={submitted ? " submit-button submitted" : "submit-button"}
        disabled={submitted}
      >
        {submitted ? "Submitted" : "Submit"}
      </button>
    </div>
  );
};

export default ProdSection;
