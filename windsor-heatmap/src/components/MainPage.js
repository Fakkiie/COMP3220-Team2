import React from 'react';
import { Routes, Route } from 'react-router-dom';  
import Header from './Header';
import Filter from './Filter';
import WardMap from './WardMap';
import Upload from './Upload';

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with navigation */}
      <Header />

      {/* Set up Routes for routing */}
      <Routes>
        {/* Dashboard Route (Default) */}
        <Route 
          path="/" 
          element={
            <div className="flex-grow overflow-hidden">
              {/* Filter Section takes up 20% */}
              <div className="w-1/5 bg-gray-100 p-4 overflow-auto">
                <Filter />
              </div>

              {/* Map Section takes up 80% */}
              <div className="w-4/5">
                <div className="h-full">
                  <WardMap />
                </div>
              </div>
            </div>
          } 
        />

        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
};

export default MainPage;
