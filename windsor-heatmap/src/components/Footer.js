import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center p-4 bg-gray-800 text-white fixed bottom-0 left-0 w-full">
      © {currentYear}
    </footer>
  );
};

export default Footer;
