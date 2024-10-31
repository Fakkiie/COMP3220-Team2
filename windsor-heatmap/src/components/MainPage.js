import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';  
import Header from './Header';
import WardMap from './WardMap';
import Upload from './Upload';
import FilterPage from './FilterPage';

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* map section */}
      <div className="flex-grow h-[70vh]">
        <WardMap />
      </div>

      {/*link to filter page */}
      <div className="w-full bg-gray-100 p-4 flex justify-center">
        <Link to="/filter" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View Service Request Statistics
        </Link>
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
