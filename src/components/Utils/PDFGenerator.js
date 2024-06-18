// src/components/PDFGenerator.js
import React from "react";
import { jsPDF } from "jspdf";
import { convertToIST } from "./Util";
const PDFGenerator = ({ data }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Extracting and formatting data
    const {
      prod,
      sap,
      prodD,
      client,
      qty,
      serialNo,
      prevStation,
      productHistory,
    } = data;

    // Adding text to the PDF
    doc.text("Product Details", 10, 10);

    doc.text(`Product: ${prod}`, 10, 30);
    doc.text(`SAP: ${sap}`, 10, 40);
    doc.text(`Product Description: ${prodD}`, 10, 50);
    doc.text(`Client: ${client}`, 10, 60);
    doc.text(`Quantity: ${qty}`, 10, 70);
    doc.text(`Serial Number: ${serialNo}`, 10, 80);
    doc.text(`Previous Station: ${prevStation}`, 10, 90);

    // Adding product history
    doc.text("Product History:", 10, 100);
    productHistory.forEach((history, index) => {
      doc.text(
        `Station ${history.stationId}: ${convertToIST(history.arrivalTime)}`,
        10,
        110 + index * 10
      );
    });

    // Save the PDF
    doc.save("product-details.pdf");
  };

  return (
    <div>
      <button className="product-submit-button" onClick={generatePDF}>
        Download Documentation
      </button>
    </div>
  );
};

export default PDFGenerator;
