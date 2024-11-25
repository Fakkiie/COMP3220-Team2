import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';  
import Header from './Header';
import WardMap from './WardMap';
import Upload from './Upload';

//main page for rendering our components, we seet the dimensions of our components here
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
      </Routes>
    </div>
  );
};

export default MainPage;
