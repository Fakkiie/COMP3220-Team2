import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-3 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* home link */}
        <Link to="/" className="text-xl font-medium hover:underline">
          SR Dashboard
        </Link>

        {/* nav links */}
        <div className="flex space-x-4">
          <Link to="/filter" className="hover:underline">
            Service Request Statistics
          </Link>
          <Link to="/upload" className="hover:underline">
            Upload Data
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
