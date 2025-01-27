import React, { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const UserInPointsOnSubAgent = ({ subAgentId, onUserClick }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Moved this up
  const itemsPerPage = 5;

  const tokenRef = useRef(null);

  useEffect(() => {
    tokenRef.current = cookies.get("token");
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = tokenRef.current;

        const response = await fetch(
          `http://93.127.194.87:9999/admin/usertransction/SubAgentTranscationData?Id=${subAgentId}&type=Shop`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setUserData(result.DepositeList || []);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (subAgentId) {
      fetchUserData();
    }
  }, [subAgentId]);

  const filteredData =
    userData?.filter((entry) => entry.trnxAmount > 0) || [];

  if (filteredData.length === 0) {
    return;
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleUserClick = (user) => {
    onUserClick(user);
    console.log("User clicked:", user);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-green-500">Users ({filteredData.length})</h2>
      {filteredData.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-300 mb-10">
            <thead>
              <tr className="bg-green-200">
                <th className="border border-gray-300 px-4 py-2">S.No</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Receiver</th>
                <th className="border border-gray-300 px-4 py-2">Old Points</th>
                <th className="border border-gray-300 px-4 py-2">In</th>
                <th className="border border-gray-300 px-4 py-2">New Points</th>
                <th className="border border-gray-300 px-4 py-2">Sender</th>
                <th className="border border-gray-300 px-4 py-2">Transaction Type</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((entry, index) => {
              const dateOnly = entry.createdAt.split("T")[0]; // Extract date
              const isPositive = entry.trnxAmount > 0;
              const inAmount = isPositive ? `₹${entry.trnxAmount}` : ""; // Show in "In" if positive
            // Determine sender and receiver based on trnxTypeTxt
            let sender = "";
            let receiver = "";

                switch (entry.trnxTypeTxt) {
                  case "Agent Addeed Chips":
                    receiver = entry.name || "N/A";
                    sender = entry.adminname || "N/A";
                    break;
                  case "Agent duduct Chips":
                    receiver = entry.adminname || "N/A";
                    sender = entry.name || "N/A";
                    break;
                  case "Add Chips to User":
                    receiver = entry.username || "N/A";
                    sender = entry.adminname || "N/A";
                    break;
                  case "User Deduct Chips Added":
                    receiver = entry.adminname || "N/A";
                    sender = entry.username || "N/A";
                    break;
                  default:
                    receiver = "N/A";
                    sender = "N/A";
                }

                return (
                  <tr key={entry._id}>
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{dateOnly}</td>
                    <td className="border border-gray-300 px-4 py-2">{receiver}</td>
                    <td className="border border-gray-300 px-4 py-2">₹{entry.oppChips || "0"}</td>
                    <td className="border border-gray-300 px-4 py-2">{inAmount || 0}</td>
                    <td className="border border-gray-300 px-4 py-2">₹{entry.chips || "0"}</td>
                    <td className="border border-gray-300 px-4 py-2">{sender}</td>
                    <td className="border border-gray-300 px-4 py-2">{entry.trnxTypeTxt || "N/A"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination mt-4 flex justify-center items-center gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInPointsOnSubAgent;
