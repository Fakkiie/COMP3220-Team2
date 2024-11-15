import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';  
import Header from './Header';
import WardMap from './WardMap';
import Upload from './Upload';
import FilterPage from './FilterPage';

//main page for rendering our components 
const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* map section */}
      <div className="flex-grow h-[70vh]">
        <WardMap />
      </div>

     

      {/* routes */}
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/filter" element={<FilterPage />} />
      </Routes>
    </div>
  );
};

export default MainPage;
