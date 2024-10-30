import React from 'react';

const DataTable = ({ filteredData }) => (
  <div className="bg-white p-4 shadow-md rounded mt-4 overflow-auto">
    <h2 className="text-xl font-bold mb-4">Service Request Statistics</h2>
    <table className="min-w-full text-left text-sm">
      <thead>
        <tr>
          <th className="px-4 py-2 border">Ward</th>
          <th className="px-4 py-2 border">Service Request</th>
          <th className="px-4 py-2 border">Count</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map(({ ward, type, count }, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border">{ward}</td>
            <td className="px-4 py-2 border">{type}</td>
            <td className="px-4 py-2 border">{count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
