import React from 'react';

//header component that will display the name of our project and should hold upload data
const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-3 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-medium">SR Dashboard</h1>
        <h1>Upload Data</h1>
      </div>
    </header>
  );
};

export default Header;
