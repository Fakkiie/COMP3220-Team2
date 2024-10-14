import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-3 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-medium">Service Requests Dashboard</h1>
        <nav>
          <a href="#about" className="text-sm hover:text-gray-400">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
