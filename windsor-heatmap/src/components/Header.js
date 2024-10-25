import React from 'react';
import { Link } from 'react-router-dom'; 

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-3 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-medium hover:underline">
          SR Dashboard
        </Link>

        <Link to="/upload" className="hover:underline">
          Upload Data
        </Link>
      </div>
    </header>
  );
};

export default Header;
