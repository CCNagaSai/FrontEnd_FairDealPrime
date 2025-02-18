import React, { useState, useEffect } from 'react';
import UserOutPointsOnSubAgent from './UserOutPointsOnSubAgent';

const AgentOutPointTable = ({ backendData }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const itemsPerPage = 10;

  // Filter the data first
  const filteredData = backendData?.filter(entry => entry.trnxAmount < 0) || [];

  if (filteredData.length === 0) {
    return ;
  }

  // Pagination calculations based on the filtered data
  useEffect(() => {
          setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
        }, [filteredData]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };
  const handlePageInputChange = (e) => {
    setInputPage(e.target.value);
  };
  const handleGoToPage = () => {
    const page = parseInt(inputPage, 10);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      alert(`Please enter a page number between 1 and ${totalPages}`);
    }
  };

  // Clear input and reset to page 1
  const handleClearInput = () => {
    setInputPage("");
    setCurrentPage(1);
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
            <th className="border border-gray-300 px-14 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Receiver</th>
            <th className="border border-gray-300 px-4 py-2">Old Points</th>
            <th className="border border-gray-300 px-4 py-2">Out</th>
            <th className="border border-gray-300 px-4 py-2">New Points</th>
            <th className="border border-gray-300 px-4 py-2">Sender</th>
            <th className="border border-gray-300 px-10 py-2">Transaction Type</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((entry, index) => {
              const isPositive = entry.trnxAmount > 0;
              const outAmount = `₹${Math.abs(entry.trnxAmount)}`; // Show the absolute value in "Out"

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
                <React.Fragment key={entry._id}>
                <tr key={entry._id}>
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">
                  {(() => {
                    const date = new Date(entry.createdAt);
                    const options = {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    };
                    return `${date.toLocaleString("en-GB", options)}, IST`;
                  })()}
                </td>
                  <td className="border border-gray-300 px-4 py-2">{receiver}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{entry.oppChips || '0'}</td>
                  <td className="border border-gray-300 px-4 py-2">{outAmount}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{entry.chips || '0'}</td>
                  <td className="border border-gray-300 px-4 py-2">{sender}</td>
                  <td className="border border-gray-300 px-4 py-2">{entry.trnxTypeTxt || 'N/A'}</td>
                </tr>
              </React.Fragment>
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
      {/* Go to Page + Clear */}
  <div className="go-to-page ml-10 mr-10 mt-5 flex items-center">
        <input
          type="number"
          className="border border-gray-300 rounded-md px-2 py-1"
          value={inputPage}
          onChange={handlePageInputChange}
          placeholder="Enter Page Number"
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleGoToPage}
        >
          Go
        </button>
        <button
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={handleClearInput}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default AgentOutPointTable;
