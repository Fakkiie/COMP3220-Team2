import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const FilterPage = () => {
  const [data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [filterType, setFilterType] = useState('All');
  const [filterWard, setFilterWard] = useState('All'); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true);
  
    fetch('/api/service', {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(fetchedData => {
        setData(fetchedData);
        setFilteredData(fetchedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching service requests:', error);
        setLoading(false);
      });
  }, []);
  
  // Update the filtered data when filters change
  useEffect(() => {
    let filtered = data;

    if (filterType !== 'All') {
      filtered = filtered.filter(item => item.type === filterType);
    }

    if (filterWard !== 'All') {
      filtered = filtered.filter(item => item.ward === filterWard);
    }

    setFilteredData(filtered);
  }, [filterType, filterWard, data]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Main container */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Service Request Statistics
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6 space-y-8">
          
          {/* Filter Section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Filter Requests</h2>
            
            {/* Filter by Service Request */}
            <div className="mb-4">
              <label htmlFor="filterType" className="block text-gray-700 mb-1">Filter By Service Request:</label>
              <select
                id="filterType"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-3 rounded bg-gray-200 border border-gray-300"
              >
                <option value="All">All Departments</option>
                {/* Add options here as needed */}
              </select>
            </div>

            {/* Filter by Ward */}
            <div className="mb-4">
              <label htmlFor="filterWard" className="block text-gray-700 mb-1">Filter By Ward:</label>
              <select
                id="filterWard"
                value={filterWard}
                onChange={(e) => setFilterWard(e.target.value)}
                className="w-full p-3 rounded bg-gray-200 border border-gray-300"
              >
                <option value="All">All Wards</option>
                {/* Add options for each ward */}
              </select>
            </div>
          </div>

          {/* Table displaying filtered data */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner overflow-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Service Request Statistics</h2>
            {loading ? (
              <div className="text-center py-4">Loading data...</div>
            ) : (
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Ward</th>
                    <th className="px-4 py-2 border">Service Request</th>
                    <th className="px-4 py-2 border">Department</th>
                    <th className="px-4 py-2 border">Method Received</th>
                    <th className="px-4 py-2 border">Created Date</th>
                  </tr>
                </thead>
                {/* Display filtered data */}
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">No data available</td>
                    </tr>
                  ) : (
                    filteredData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                        <td className="px-4 py-2 border">{item.ward}</td>
                        <td className="px-4 py-2 border">{item.type}</td>
                        <td className="px-4 py-2 border">{item.department}</td>
                        <td className="px-4 py-2 border">{item["Method Received"]}</td>
                        <td className="px-4 py-2 border">{item["Created Date"]}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FilterPage;
