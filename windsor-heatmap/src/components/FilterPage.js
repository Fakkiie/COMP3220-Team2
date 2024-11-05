import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const FilterPage = () => {
  //states for storing data, filtered data, filter options, and loading status
  const [data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [filterType, setFilterType] = useState('All');
  const [filterWard, setFilterWard] = useState('All'); 
  const [loading, setLoading] = useState(true); 

  //fetches data from our api
  useEffect(() => {
    setLoading(true);
    fetch('/api/service-requests')
      .then(response => response.json())
      .then(fetchedData => {
        setData(fetchedData);
        setFilteredData(fetchedData); //init all our data as shown
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching service requests:', error);
        setLoading(false);
      });
  }, []);

  //user selection for filtering data
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

      {/* main container */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Service Request Statistics
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6 space-y-8">
          
          {/* filter section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Filter Requests</h2>
            
            {/* filter by service request */}
            <div className="mb-4">
              <label htmlFor="filterType" className="block text-gray-700 mb-1">Filter By Service Request:</label>
              <select
                id="filterType"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-3 rounded bg-gray-200 border border-gray-300"
              >
                <option value="All">All Departments</option>
                <option value="3 Day Parking Infraction">3 Day Parking Infraction</option>
                <option value="Abandoned Vehicle">Abandoned Vehicle</option>
                <option value="Accessibility Concerns - Buildings">Accessibility Concerns - Buildings</option>
                <option value="Alley Repair / Flooding">Alley Repair / Flooding</option>
                <option value="Building / Land - Improper Use">Building / Land - Improper Use</option>
                <option value="Building Condition Complaint">Building Condition Complaint</option>
                <option value="Construction Site Conditions">Construction Site Conditions</option>
                <option value="Curb Complaint">Curb Complaint</option>
                <option value="Dead Animal Removal">Dead Animal Removal</option>
                <option value="Dead Cat or Dog">Dead Cat or Dog</option>
                <option value="Dirty Yard / Alley">Dirty Yard / Alley</option>
                <option value="Dog Complaint">Dog Complaint</option>
                <option value="Dog Complaint - Humane Society">Dog Complaint - Humane Society</option>
                <option value="Downspout Disconnect Service">Downspout Disconnect Service</option>
                <option value="Drainage">Drainage</option>
                <option value="Fence / Hedge Concerns">Fence / Hedge Concerns</option>
                <option value="Garbage Not Collected">Garbage Not Collected</option>
                <option value="Garbage Preparation Issues">Garbage Preparation Issues</option>
                <option value="Graffiti Complaint">Graffiti Complaint</option>
                <option value="Illegal Dumping Public Property">Illegal Dumping Public Property</option>
                <option value="Keeping of Animals">Keeping of Animals</option>
                <option value="Lighting Issues - City Facilities">Lighting Issues - City Facilities</option>
                <option value="Litter Bin - Request for New Bin">Litter Bin - Request for New Bin</option>
                <option value="Litter Bin Request for Service">Litter Bin Request for Service</option>
                <option value="Noise Complaint">Noise Complaint</option>
                <option value="Parking Meter Issues">Parking Meter Issues</option>
                <option value="Parks - Playground Issues">Parks - Playground Issues</option>
                <option value="Parks Maintenance">Parks Maintenance</option>
                <option value="Pothole on Road">Pothole on Road</option>
                <option value="Property Flooding/Grading Complaint">Property Flooding/Grading Complaint</option>
                <option value="Protection of Parks">Protection of Parks</option>
                <option value="Recycling Not Collected">Recycling Not Collected</option>
                <option value="Road Cave-In">Road Cave-In</option>
                <option value="Road Maintenance">Road Maintenance</option>
                <option value="Rodent Extermination Program">Rodent Extermination Program</option>
                <option value="Sewer Issues / Road Flooding">Sewer Issues / Road Flooding</option>
                <option value="Sewer Project Restoration Issues">Sewer Project Restoration Issues</option>
                <option value="Shoulder Repairs & Service">Shoulder Repairs & Service</option>
                <option value="Sidewalk Repair">Sidewalk Repair</option>
                <option value="Sign Complaint - Portable">Sign Complaint - Portable</option>
                <option value="Skunk Inspection">Skunk Inspection</option>
                <option value="Snow & Ice - Dumping on Road/Alley">Snow & Ice - Dumping on Road/Alley</option>
                <option value="Snow Plowing & Salting Request">Snow Plowing & Salting Request</option>
                <option value="Snow Removal - Emergency">Snow Removal - Emergency</option>
                <option value="Tree Maintenance">Tree Maintenance</option>
                <option value="Yard Waste Not Collected">Yard Waste Not Collected</option>
              </select>
            </div>

            {/* filter by ward */}
            <div className="mb-4">
              <label htmlFor="filterWard" className="block text-gray-700 mb-1">Filter By Ward:</label>
              <select
                id="filterWard"
                value={filterWard}
                onChange={(e) => setFilterWard(e.target.value)}
                className="w-full p-3 rounded bg-gray-200 border border-gray-300"
              >
                <option value="All">All Wards</option>
                <option value="WARD 1">Ward 1</option>
                <option value="WARD 2">Ward 2</option>
                <option value="WARD 3">Ward 3</option>
                <option value="WARD 4">Ward 4</option>
                <option value="WARD 5">Ward 5</option>
                <option value="WARD 6">Ward 6</option>
                <option value="WARD 7">Ward 7</option>
                <option value="WARD 8">Ward 8</option>
                <option value="WARD 9">Ward 9</option>
                <option value="WARD 10">Ward 10</option>
              </select>
            </div>
          </div>

          {/* table displaying filtered data */}
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
                {/* display filtered data */}
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
