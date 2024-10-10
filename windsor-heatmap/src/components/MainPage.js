import React from 'react';
import Header from './Header';
import Filter from './Filter';
import Footer from './Footer';

const MainPage = () => {
  return (
    <div>
      <Header />
      <Filter />
      <Footer />
      {/*components here*/}
      <div className="content">
        {/*display the service requests*/}
      </div>
      
    </div>
  );
};

export default MainPage;
