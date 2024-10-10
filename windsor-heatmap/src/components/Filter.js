import React, { useState } from 'react';
import { FaTimes, FaArrowRight } from 'react-icons/fa';

const Filter = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleFilters = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      {!isVisible && (
        <button
          onClick={toggleFilters}
          className="fixed left-0 top-1/2 transform -translate-y-1/2 p-3 bg-blue-500 text-white rounded-r focus:outline-none z-10"
        >
          <FaArrowRight size={20} /> 
        </button>
      )}

      {/* Filter Bar */}
      <div
        className={`filter-bar fixed left-0 top-1/2 transform -translate-y-1/2 p-6 bg-gray-100 bg-opacity-75 shadow-lg rounded-r transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '300px', height: '70vh' }} 
      >
        {/* Close Button with X */}
        {isVisible && (
          <button
            onClick={toggleFilters}
            className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded-full focus:outline-none"
          >
            <FaTimes size={20} /> 
          </button>
        )}

        {/* Filter Heading */}
        <h2 className="text-2xl mb-4 font-bold text-gray-800">Filter Service Requests</h2>

        <form>
          {/* Department Filter */}
          <div className="filter-options mb-4">
            <label htmlFor="department" className="block text-gray-700 mb-1">Department:</label>
            <select id="department" name="department" className="w-full p-2 rounded bg-white border">
              <option value="all">All Departments</option>
              {/* Add other departments */}
            </select>
          </div>

          {/* Additional Filter Options */}
        </form>
      </div>
    </div>
  );
};

export default Filter;
