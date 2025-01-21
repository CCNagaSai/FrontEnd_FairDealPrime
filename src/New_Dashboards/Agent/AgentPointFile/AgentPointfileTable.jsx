import React, { useState } from 'react';

const AgentPointFileTable = ({ backendData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  if (!backendData || backendData.length === 0) {
    return <p></p>;
  }
  const totalPages = Math.ceil(backendData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = backendData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
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
            <th className="border border-gray-300 px-4 py-2">Out</th>
            <th className="border border-gray-300 px-4 py-2">New Points</th>
            <th className="border border-gray-300 px-4 py-2">Sender</th>
            <th className="border border-gray-300 px-4 py-2">Transaction Type</th>
          </tr>
        </thead>
        <tbody>
        {displayedData.map((entry, index) => {
            const dateOnly = entry.createdAt.split('T')[0]; // Extract date
            const inAmount = entry.trnxAmount > 0 ? `₹${entry.trnxAmount}` : ''; // In amount
            const outAmount = entry.trnxAmount < 0 ? `₹${Math.abs(entry.trnxAmount)}` : ''; // Out amount

            // Determine sender and receiver based on trnxTypeTxt
            let sender = '';
            let receiver = '';

            switch (entry.trnxTypeTxt) {
              case 'Sub Agent Deduct Chips Added':
                receiver = entry.name || 'N/A'; // Subagent is receiver
                sender = entry.shopname || 'N/A'; // Agent is sender
                break;
              case 'Add Chips to Sub Agent':
                receiver = entry.shopname || 'N/A'; // Subagent is receiver
                sender = entry.name || 'N/A'; // Agent is sender
                break;
              case 'Deduct amount Addeed Chips to agent':
                receiver = entry.name || 'N/A'; // Agent is receiver
                sender = entry.shopid || 'N/A'; // User is sender
                break;
              case 'Add Chips to User':
                receiver = entry.shopname || 'N/A'; // User is receiver
                sender = entry.name || 'N/A'; // Agent is sender
                break;
              case 'Admin Addeed Chips':
                receiver = entry.name || 'N/A'; // Admin is receiver
                sender = entry.adminname || 'N/A'; // Super Admin is sender
                break;
              case 'Admin duduct Chips':
                receiver = entry.adminname || 'N/A'; // Super Admin is receiver
                sender = entry.name || 'N/A'; // Admin is sender
                break;
              default:
                receiver = 'N/A';
                sender = 'N/A';
            }

            return (
              <tr key={entry._id}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{dateOnly}</td>
                <td className="border border-gray-300 px-4 py-2">{receiver}</td>
                <td className="border border-gray-300 px-4 py-2">₹{entry.oppChips || '0'}</td>
                <td className="border border-gray-300 px-4 py-2">{inAmount || 0}</td>
                <td className="border border-gray-300 px-4 py-2">{outAmount || 0}</td>
                <td className="border border-gray-300 px-4 py-2">₹{entry.chips || '0'}</td>
                <td className="border border-gray-300 px-4 py-2">{sender}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.trnxTypeTxt || 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    {/* Pagination Controls */}
    <div className="pagination mt-4 flex justify-center items-center gap-4">
    <button
      onClick={handlePrevious}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
    >
      Previous
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={handleNext}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
    >
      Next
    </button>
  </div>
  </div>
  );
};

export default AgentPointFileTable;
