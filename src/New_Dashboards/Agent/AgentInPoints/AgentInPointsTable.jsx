import React, { useState } from 'react';
import UserInPointsOnSubAgent from './UserInPointsOnSubAgent';

const AgentInPointTable = ({ backendData }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter the data first
  const filteredData = backendData?.filter(entry => entry.trnxAmount > 0) || [];

  if (filteredData.length === 0) {
    return ;
  }

  // Pagination calculations based on the filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const toggleRow = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  return (
    <div>
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-blue-200">
            <th className="border border-gray-300 px-4 py-2">S.No</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Receiver</th>
            <th className="border border-gray-300 px-4 py-2">Old Points</th>
            <th className="border border-gray-300 px-4 py-2">In</th>
            <th className="border border-gray-300 px-4 py-2">New Points</th>
            <th className="border border-gray-300 px-4 py-2">Sender</th>
            <th className="border border-gray-300 px-4 py-2">Transaction Type</th>
            <th className="border border-gray-300 px-4 py-2">view users</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((entry, index) => {
            const dateOnly = entry.createdAt.split('T')[0];
            const isPositive = entry.trnxAmount > 0;
            const inAmount = isPositive ? `₹${entry.trnxAmount}` : '';

            let sender = '';
            let receiver = '';

            switch (entry.trnxTypeTxt) {
              case 'Sub Agent Deduct Chips Added':
                receiver = entry.name || 'N/A';
                sender = entry.shopname || 'N/A';
                break;
              case 'Add Chips to Sub Agent':
                receiver = entry.shopname || 'N/A';
                sender = entry.name || 'N/A';
                break;
              case 'Deduct amount Addeed Chips to agent':
                receiver = entry.name || 'N/A';
                sender = entry.shopid || 'N/A';
                break;
              case 'Add Chips to User':
                receiver = entry.shopname || 'N/A';
                sender = entry.name || 'N/A';
                break;
              case 'Admin Addeed Chips':
                receiver = entry.name || 'N/A';
                sender = entry.adminname || 'N/A';
                break;
              case 'Admin duduct Chips':
                receiver = entry.adminname || 'N/A';
                sender = entry.name || 'N/A';
                break;
              default:
                receiver = 'N/A';
                sender = 'N/A';
            }

            return (
              <React.Fragment key={entry._id}>
              <tr key={entry._id}>
                <td className="border border-gray-300 px-4 py-2">{startIndex + index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{dateOnly}</td>
                <td className="border border-gray-300 px-4 py-2">{receiver}</td>
                <td className="border border-gray-300 px-4 py-2">₹{entry.oppChips || '0'}</td>
                <td className="border border-gray-300 px-4 py-2">{inAmount}</td>
                <td className="border border-gray-300 px-4 py-2">₹{entry.chips || '0'}</td>
                <td className="border border-gray-300 px-4 py-2">{sender}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.trnxTypeTxt || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {['Sub Agent Deduct Chips Added', 'Add Chips to Sub Agent'].includes(entry.trnxTypeTxt) && (
                    <button
                      onClick={() => toggleRow(entry.shopid)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      {expandedRow === entry.shopid ? 'Close' : 'Show'}
                    </button>
                  )}
                </td>
              </tr>
              {expandedRow === entry.shopid && (
                <tr className="bg-gray-100">
                  <td colSpan="10" className="border border-gray-300 px-4 py-2">
                  <UserInPointsOnSubAgent subAgentId={entry.shopid} />
                  </td>
                </tr>
              )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
    {/* Pagination Controls */}
    <div className="pagination flex justify-between items-center mt-6">
    <button
      onClick={handlePrevious}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
    >
      Previous
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={handleNext}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
    >
      Next
    </button>
  </div>
  </div>
  );
};

export default AgentInPointTable;
