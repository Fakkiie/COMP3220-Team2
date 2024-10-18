import React from 'react';
import Header from './Header';
import Filter from './Filter';
//import Footer from './Footer';
import WardMap from './WardMap';

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

     
      <div className="flex flex-grow overflow-hidden">
        
         {/* Filter Section takes up 20% */}
        <div className="w-1/5 bg-gray-100 p-4 overflow-auto">
          <Filter />
        </div>

        {/* Map takes up 80% */}
        <div className="w-4/5">
          <div className="h-full">
            <WardMap />
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default MainPage;
