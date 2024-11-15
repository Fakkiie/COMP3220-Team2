// import React, { useState, useEffect } from 'react';
// import Header from './Header';
// import Footer from './Footer';

// const FilterPage = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [filterType, setFilterType] = useState('All');
//   const [filterWard, setFilterWard] = useState('All');
//   const [loading, setLoading] = useState(true);
//   const [batchSize] = useState(100);
//   const [batchIndex, setBatchIndex] = useState(0);

//   useEffect(() => {
//     fetchData(batchIndex);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll); 
//   }, []);

//   //
//   const fetchData = (batch) => {
//     setLoading(true);
//     fetch(`https://comp3220-team2.onrender.com/api/service?start=${batch * batchSize}&limit=${batchSize}`)
//       .then(response => response.json())
//       .then(fetchedData => {
//         console.log("Fetched data for FilterPage:", fetchedData);
//         setData(prevData => [...prevData, ...fetchedData]); 
//         setFilteredData(prevData => [...prevData, ...fetchedData]); 
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching service requests:', error);
//         setLoading(false);
//       });
//   };

//   //hanles infinite scrolling for us
//   const handleScroll = () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
//       setBatchIndex(prevIndex => {
//         const newIndex = prevIndex + 1;
//         fetchData(newIndex); // Fetch the next batch
//         return newIndex;
//       });
//     }
//   };

//   //filters based on whats selected
//   useEffect(() => {
//     console.log("Filtering data with filters:", { filterType, filterWard });
//     let filtered = data;

//     if (filterType !== 'All') {
//       filtered = filtered.filter(item => item.type === filterType);
//     }

//     if (filterWard !== 'All') {
//       filtered = filtered.filter(item => item.ward === filterWard);
//     }

//     console.log("Filtered data result:", filtered);
//     setFilteredData(filtered);
//   }, [filterType, filterWard, data]);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />

//       <div className="p-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           Service Request Statistics
//         </h1>

//         <div className="bg-white shadow-lg rounded-lg p-6 space-y-8">
//           <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-4">Filter Requests</h2>
            
//             <div className="mb-4">
//               <label htmlFor="filterType" className="block text-gray-700 mb-1">Filter By Service Request:</label>
//               <select
//                 id="filterType"
//                 value={filterType}
//                 onChange={(e) => setFilterType(e.target.value)}
//                 className="w-full p-3 rounded bg-gray-200 border border-gray-300"
//               >
//                 <option value="All">All Departments</option>
//               </select>
//             </div>

//             <div className="mb-4">
//               <label htmlFor="filterWard" className="block text-gray-700 mb-1">Filter By Ward:</label>
//               <select
//                 id="filterWard"
//                 value={filterWard}
//                 onChange={(e) => setFilterWard(e.target.value)}
//                 className="w-full p-3 rounded bg-gray-200 border border-gray-300"
//               >
//                 <option value="All">All Wards</option>
//               </select>
//             </div>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg shadow-inner overflow-auto">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-4">Service Request Statistics</h2>
//             {loading && filteredData.length === 0 ? (
//               <div className="text-center py-4">Loading data...</div>
//             ) : (
//               <table className="min-w-full text-left text-sm">
//                 <thead>
//                   <tr>
//                     <th className="px-4 py-2 border">Ward</th>
//                     <th className="px-4 py-2 border">Service Request</th>
//                     <th className="px-4 py-2 border">Department</th>
//                     <th className="px-4 py-2 border">Method Received</th>
//                     <th className="px-4 py-2 border">Created Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.length === 0 ? (
//                     <tr>
//                       <td colSpan="5" className="text-center py-4">No data available</td>
//                     </tr>
//                   ) : (
//                     filteredData.map((item, index) => (
//                       <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
//                         <td className="px-4 py-2 border">{item.ward}</td>
//                         <td className="px-4 py-2 border">{item.type || 'N/A'}</td>
//                         <td className="px-4 py-2 border">{item.department}</td>
//                         <td className="px-4 py-2 border">{item.methodreceived}</td>
//                         <td className="px-4 py-2 border">{item.createddate}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             )}
//             {loading && <div className="text-center py-4">Loading more data...</div>}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default FilterPage;
