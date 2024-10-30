import React from 'react';
import { Routes, Route } from 'react-router-dom';  
import Header from './Header';
import Filter from './Filter';
import WardMap from './WardMap';
import Upload from './Upload';

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">

        {/*
        <div className="w-1/5 bg-gray-100 p-4 overflow-auto">
          <Filter />
        </div>
        */}
        {/* map section 80% width */}
        <div className="w-5/5 flex-grow">
          <WardMap />
        </div>
      </div>

      {/* upload route */}
      <Routes>
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
};


export default MainPage;
