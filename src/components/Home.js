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
