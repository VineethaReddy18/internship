// src/components/Hero.js
import React from 'react';

function Home() {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800">Welcome to the Tracking System</h1>
        <p className="mt-4 text-gray-600">Track your items effortlessly and efficiently.</p>
        {/* <div className="mt-8">
          <a href="#features" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Learn More</a>
        </div> */}
      </div>
    </div>
  );
}

export default Home;
// src/App.js
// import React from "react";
// import PDFGenerator from "./Utils/PDFGenerator";

// const data = {
//   found: true,
//   prevStation: 3,
//   productDb: {
//     _id: "66716d50fe60b75a9f456960",
//     prod: "8DJH ST",
//     sap: "3008664434/4200",
//     prodD: "8DJH ST -LRRLL+ME",
//     client: "Rushil Enterprises- Lot-8-Jun'24",
//     qty: "6",
//     serialNo: "LQR3008664434-00016900/001",
//     prevStation: 3,
//     productHistory: [
//       {
//         stationId: "1",
//         arrivalTime: "2024-06-18T18:50:16.813Z",
//       },
//       {
//         stationId: "2",
//         arrivalTime: "2024-06-18T18:50:31.162Z",
//       },
//       {
//         stationId: "3",
//         arrivalTime: "2024-06-18T18:50:42.628Z",
//       },
//     ],
//   },
// };
// const Home = () => {
//   return (
//     <div className="App">
//       <h1>PDF Generation Example</h1>
//       <PDFGenerator data={data} />
//     </div>
//   );
// };

// export default Home;
