import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const FilterPage = () => {
  const [data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [filterType, setFilterType] = useState('All');
  const [filterWard, setFilterWard] = useState('All'); 
  const [loading] = useState(true); 

  //fetch json path
  /*useEffect(() => {
    fetch('/data/groupedRequests.json')
      .then(response => response.json())
      })
      .catch(error => {
        console.error('Error loading JSON:', error);
        setLoading(false);
      });
  }, []);

  //filters based on selection
  useEffect(() => {
    let filtered = data;

    if (filterType !== 'All') {
      filtered = filtered.filter(item => item.type === filterType);
    }

    if (filterWard !== 'All') {
      filtered = filtered.filter(item => item.Ward === filterWard);
    }

    setFilteredData(filtered);
  }, [filterType, filterWard, data]);
  
    */
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Main Container */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Service Request Statistics
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6 space-y-8">
          
          {/* filter section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Filter Requests</h2>
            <div className="mb-4">
              <label htmlFor="filterType" className="block text-gray-700 mb-1">Filter By Service Request:</label>
              <select
                id="filterType"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-3 rounded bg-gray-200 border border-gray-300"
              >
                <option value="All">All Departments</option>
                <option value="3-day-parking-infraction">3 Day Parking Infraction</option>
                <option value="abandoned-vehicle">Abandoned Vehicle</option>
                <option value="accessibility-concerns-buildings">Accessibility Concerns - Buildings</option>
                <option value="alley-repair-flooding">Alley Repair / Flooding</option>
                <option value="building-condition-complaint">Building Condition Complaint</option>
                <option value="building-land-improper-use">Building / Land - Improper Use</option>
                <option value="construction-site-conditions">Construction Site Conditions</option>
                <option value="curb-complaint">Curb Complaint</option>
                <option value="dead-animal-removal">Dead Animal Removal</option>
                <option value="dead-cat-or-dog">Dead Cat or Dog</option>
                <option value="dirty-yard-alley">Dirty Yard / Alley</option>
                <option value="dog-complaint">Dog Complaint</option>
                <option value="downspout-disconnect-service">Downspout Disconnect Service</option>
                <option value="drainage">Drainage</option>
                <option value="fence-hedge-concerns">Fence / Hedge Concerns</option>
                <option value="garbage-not-collected">Garbage Not Collected</option>
                <option value="garbage-preparation-issues">Garbage Preparation Issues</option>
                <option value="graffiti-complaint">Graffiti Complaint</option>
                <option value="illegal-dumping-public-property">Illegal Dumping Public Property</option>
                <option value="keeping-of-animals">Keeping of Animals</option>
                <option value="litter-bin-request-for-new-bin">Litter Bin - Request for New Bin</option>
                <option value="litter-bin-request-for-service">Litter Bin Request for Service</option>
                <option value="noise-complaint">Noise Complaint</option>
                <option value="parking-meter-issues">Parking Meter Issues</option>
                <option value="lighting-issues-city-facilities">Lighting Issues - City Facilities</option>
                <option value="parks-maintenance">Parks Maintenance</option>
                <option value="parks-playground-issues">Parks - Playground Issues</option>
                <option value="sign-complaint-portable">Sign Complaint - Portable</option>
                <option value="pothole-on-road">Pothole on Road</option>
                <option value="property-flooding-grading-complaint">Property Flooding/Grading Complaint</option>
                <option value="protection-of-parks">Protection of Parks</option>
                <option value="recycling-not-collected">Recycling Not Collected</option>
                <option value="road-cave-in">Road Cave-In</option>
                <option value="road-maintenance">Road Maintenance</option>
                <option value="rodent-extermination-program">Rodent Extermination Program</option>
                <option value="sewer-issues-road-flooding">Sewer Issues / Road Flooding</option>
                <option value="sewer-project-restoration-issues">Sewer Project Restoration Issues</option>
                <option value="shoulder-repairs-service">Shoulder Repairs & Service</option>
                <option value="sidewalk-repair">Sidewalk Repair</option>
                <option value="skunk-inspection">Skunk Inspection</option>
                <option value="snow-ice-dumping-on-road-alley">Snow & Ice - Dumping on Road/Alley</option>
                <option value="snow-plowing-salting-request">Snow Plowing & Salting Request</option>
                <option value="snow-removal-emergency">Snow Removal - Emergency</option>
                <option value="tree-maintenance">Tree Maintenance</option>
                <option value="yard-waste-not-collected">Yard Waste Not Collected</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="filterWard" className="block text-gray-700 mb-1">Filter By Ward:</label>
              <select
                id="filterWard"
                value={filterWard}
                onChange={(e) => setFilterWard(e.target.value)}
                className="w-full p-3 rounded bg-gray-200 border border-gray-300"
              >
                <option value="All">All Wards</option>
                <option value="ward-1">Ward 1</option>
                <option value="ward-2">Ward 2</option>
                <option value="ward-3">Ward 3</option>
                <option value="ward-4">Ward 4</option>
                <option value="ward-5">Ward 5</option>
                <option value="ward-6">Ward 6</option>
                <option value="ward-7">Ward 7</option>
                <option value="ward-8">Ward 8</option>
                <option value="ward-9">Ward 9</option>
                <option value="ward-10">Ward 10</option>
              </select>
            </div>
          </div>

          {/* table section, set boundary for y value so it doesnt make infinite page, make table scrollable */}
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
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">No data available</td>
                    </tr>
                  ) : (
                    filteredData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                        <td className="px-4 py-2 border">{item.Ward}</td>
                        <td className="px-4 py-2 border">{item.type}</td>
                        <td className="px-4 py-2 border">{item.Department}</td>
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
