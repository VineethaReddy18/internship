// // src/components/PDFGenerator.js
// import React from "react";
// import { jsPDF } from "jspdf";
// import { convertToIST } from "./Util";
// const PDFGenerator = ({ data }) => {
//   const generatePDF = () => {
//     const doc = new jsPDF();

//     // Extracting and formatting data
//     const {
//       prod,
//       sap,
//       prodD,
//       client,
//       qty,
//       serialNo,
//       prevStation,
//       productHistory,
//     } = data;

//     // Adding text to the PDF
//     doc.text("Product Details", 10, 10);

//     doc.text(`Product: ${prod}`, 10, 30);
//     doc.text(`SAP: ${sap}`, 10, 40);
//     doc.text(`Product Description: ${prodD}`, 10, 50);
//     doc.text(`Client: ${client}`, 10, 60);
//     doc.text(`Quantity: ${qty}`, 10, 70);
//     doc.text(`Serial Number: ${serialNo}`, 10, 80);
//     doc.text(`Previous Station: ${prevStation}`, 10, 90);

//     // Adding product history
//     doc.text("Product History:", 10, 100);
//     productHistory.forEach((history, index) => {
//       doc.text(
//         `Station ${history.stationId}: ${convertToIST(history.arrivalTime)}`,
//         10,
//         110 + index * 10
//       );
//     });

//     // Save the PDF
//     doc.save("product-details.pdf");
//   };

//   return (
//     <div>
//       <button className="product-submit-button" onClick={generatePDF}>
//         Download Documentation
//       </button>
//     </div>
//   );
// };

// export default PDFGenerator;
import React, { useState } from "react";
import axios from "axios";

const PDFUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading the file:", error);
      alert("Error uploading the file");
    }
  };

  return (
    <div>
      <form onSubmit={handleFileUpload}>
        <input
          className="input-file"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button className="product-submit-button" type="submit">
          Upload PDF
        </button>
      </form>
    </div>
  );
};

export default PDFUpload;
