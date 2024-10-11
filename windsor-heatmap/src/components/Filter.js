import React, { useState } from 'react';
import { FaTimes, FaArrowRight } from 'react-icons/fa';

const Filter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filterType, setFilterType] = useState('service');

  const toggleFilters = () => {
    setIsVisible(!isVisible);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div className="relative">
      {/* toggle button */}
      {!isVisible && (
        <button
          onClick={toggleFilters}
          className="fixed top-1/2 left-0 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-r focus:outline-none z-10 flex items-center justify-center"
          style={{ height: '50px', width: '50px' }}
        >
          <FaArrowRight size={16} />
        </button>
      )}

      {/* filter bar */}
      <div
        className={`filter-bar fixed left-0 top-1/2 transform -translate-y-1/2 p-4 bg-gray-100 bg-opacity-75 shadow-lg rounded-r transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '250px', height: '60vh' }}
      >
        {/* close button (X) */}
        {isVisible && (
          <button
            onClick={toggleFilters}
            className="absolute top-4 right-[-20px] p-2 bg-blue-500 text-white rounded-full focus:outline-none flex items-center justify-center"
            style={{ height: '50px', width: '50px' }}
          >
            <FaTimes size={16} />
          </button>
        )}

        {/* filter heading */}
        <h2 className="text-xl mb-4 font-bold text-gray-800">Filter Requests</h2>

        {/* filter type */}
        <div className="mb-4">
          <label htmlFor="filterType" className="block text-gray-700 mb-1">Filter By:</label>
          <select
            id="filterType"
            name="filterType"
            value={filterType}
            onChange={handleFilterTypeChange}
            className="w-full p-2 rounded bg-white border"
          >
            <option value="service">Service Request</option>
            <option value="ward">Ward</option>
          </select>
        </div>

        {/* service request filter */}
        {filterType === 'service' && (
          <div className="filter-options mb-4">
            <label htmlFor="department" className="block text-gray-700 mb-1">Service Request:</label>
            <select id="department" name="department" className="w-full p-2 rounded bg-white border">
              <option value="all">All Departments</option>
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
        )}

        {/* ward filter */}
        {filterType === 'ward' && (
          <div className="filter-options mb-4">
            <label htmlFor="ward" className="block text-gray-700 mb-1">Ward:</label>
            <select id="ward" name="ward" className="w-full p-2 rounded bg-white border">
              <option value="all">All Wards</option>
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
        )}

      
      </div>
    </div>
  );
};

export default Filter;
