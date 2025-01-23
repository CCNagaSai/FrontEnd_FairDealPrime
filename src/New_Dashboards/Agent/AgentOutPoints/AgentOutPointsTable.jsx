import React, { useState } from "react";
import "./AgentOutPointsTable.css";

const AgentOutPointTable = ({ backendData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter the data first
  const filteredData =
    backendData?.filter((entry) => entry.trnxAmount < 0) || [];

  if (filteredData.length === 0) {
    return;
  }

  // Pagination calculations based on the filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Receiver</th>
              <th>Old Points</th>
              <th>In</th>
              <th>Out</th>
              <th>New Points</th>
              <th>Sender</th>
              <th>Transaction Type</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((entry, index) => {
              const dateOnly = entry.createdAt.split("T")[0]; // Extract date
              const inAmount =
                entry.trnxAmount > 0 ? `₹${entry.trnxAmount}` : ""; // In amount
              const outAmount =
                entry.trnxAmount < 0 ? `₹${Math.abs(entry.trnxAmount)}` : ""; // Out amount

              // Determine sender and receiver based on trnxTypeTxt
              let sender = "";
              let receiver = "";

              switch (entry.trnxTypeTxt) {
                case "Sub Agent Deduct Chips Added":
                  receiver = entry.name || "N/A"; // Subagent is receiver
                  sender = entry.shopname || "N/A"; // Agent is sender
                  break;
                case "Add Chips to Sub Agent":
                  receiver = entry.shopname || "N/A"; // Subagent is receiver
                  sender = entry.name || "N/A"; // Agent is sender
                  break;
                case "Deduct amount Addeed Chips to agent":
                  receiver = entry.name || "N/A"; // Agent is receiver
                  sender = entry.shopid || "N/A"; // User is sender
                  break;
                case "Add Chips to User":
                  receiver = entry.shopname || "N/A"; // User is receiver
                  sender = entry.name || "N/A"; // Agent is sender
                  break;
                case "Admin Addeed Chips":
                  receiver = entry.name || "N/A"; // Admin is receiver
                  sender = entry.adminname || "N/A"; // Super Admin is sender
                  break;
                case "Admin duduct Chips":
                  receiver = entry.adminname || "N/A"; // Super Admin is receiver
                  sender = entry.name || "N/A"; // Admin is sender
                  break;
                default:
                  receiver = "N/A";
                  sender = "N/A";
              }

              return (
                <tr key={entry._id}>
                  <td>{index + 1}</td>
                  <td>{dateOnly}</td>
                  <td>{receiver}</td>
                  <td>₹{entry.oppChips || "0"}</td>
                  <td>{inAmount || "0"}</td>
                  <td>{outAmount || "0"}</td>
                  <td>₹{entry.chips || "0"}</td>
                  <td>{sender}</td>
                  <td>{entry.trnxTypeTxt || "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AgentOutPointTable;
