import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import AgentBalanceAdjust from "../AgentBalanceAdjustment/AgentBalanceAdjust";
import UserListInSubAgent from "./UserListInSubAgent"

const cookies = new Cookies();

const ASubAgentsList = ({ onSubAgentClick }) => {
  const navigate = useNavigate();

  // State
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(""); 
  const [selectedUser, setSelectedUser] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [filters, setFilters] = useState({ username: "", status: "" });
    const [originalData, setOriginalData] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Store id and type using useRef
  const idRef = useRef(null);
  const typeRef = useRef(null);
  const tokenRef = useRef(null);

  useEffect(() => {
    // Get id and type from cookies
    idRef.current = cookies.get("LoginUserId");
    typeRef.current = cookies.get("name");
    tokenRef.current = cookies.get("token");
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const id = idRef.current;
        const type = typeRef.current;
        const token = tokenRef.current;

        if (!id || !type) {
          throw new Error("Missing id or type from cookies");
        }
        
        const response = await fetch(
          `http://65.0.54.193:9999/admin/shop/ShopList?agentId=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token, // Send token from cookies
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setOriginalData(result.shopList || []);
        setData(result.shopList || []);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleFilterChange = () => {
    const filteredData = originalData.filter((user) => {
      const matchesUsername =
        !filters.username || user.name.toLowerCase().includes(filters.username.toLowerCase());
      const matchesStatus =
        !filters.status ||
        (filters.status === "Active" && user.status) ||
        (filters.status === "Inactive" && !user.status);
  
      return matchesUsername && matchesStatus;
    });
  
    setCurrentPage(1);
    setData(filteredData);
  };
  
  const handleClear = () => {
    setFilters({ username: "", status: "" });
    setCurrentPage(1);
    setData(originalData); // Reset to original data
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleTransferPointsClick = (type, subAgent) => {
    console.log("Transfer Points Clicked", { type, subAgent });
    setSelectedType(type);
    setSelectedUser(subAgent);
    setIsModalOpen(true); // Open the modal
  };
  
  

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleUserClick = (subAgent) => {
    console.log("User clicked:", subAgent);
    onSubAgentClick(subAgent);
    
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = data.slice(startIndex, startIndex + itemsPerPage);
  console.log(data, "cccccccc");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
  };

  const modalContentStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "90%",
    height: "80%",
    maxWidth: "500px",
    position: "relative",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    overflowY: "auto",
  };

  const modalCloseStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    backgroundColor: "blue",
    border: "none",
    fontSize: "30px",
    color: "white",
    fontWeight: "bold",
    padding: "5px 10px 5px 10px", // Added padding to create space around the button
  };

  const toggleRow = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  return (
    <div className="user-list-container font-sans p-4 sm:p-6 bg-gray-100">
      <h1 className="view-users-heading text-xl sm:text-2xl text-blue-500 text-left border-b-4 border-blue-500 pb-2 mb-6">
        View Sub Agents
      </h1>
      {/* Filter Form */}
      <div className="bg-[#e6ebff] p-5 rounded-lg shadow-lg m-1 sm:m-3">
        <form className="flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 mb-0 sm:mb-5 w-full">
            <div className="flex-1 mb-4 sm:mb-0">
              <label className="block mb-2">Username:</label>
              <input
                type="text"
                value={filters.username}
                onChange={(e) => setFilters({ ...filters, username: e.target.value })}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
                placeholder="Enter username"
              />
            </div>
            <div className="flex-1 mb-4 sm:mb-0">
              <label className="block mb-2">Status:</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
              >
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleFilterChange}
                className="bg-blue-500 text-white p-2 sm:p-3 rounded-lg font-bold hover:bg-blue-600"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="bg-blue-500 text-white p-2 sm:p-3 rounded-lg font-bold hover:bg-blue-600"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="user-details bg-white p-4 sm:p-6 rounded-md shadow-md">
        <div className="user-summary text-sm sm:text-lg font-bold mb-4">
          <span>
            TOTAL SUB-AGENTS: ({data.length}) TOTAL POINTS: (
            {data.reduce((sum, item) => sum + item.chips, 0)})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="user-table w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr>
                <th
                  onClick={() => handleSort("name")}
                  className="px-2 sm:px-4 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
                >
                  Sub-Agent Name
                </th>
                <th
                  onClick={() => handleSort("chips")}
                  className="px-2 sm:px-4 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
                >
                  Points
                </th>
                <th 
                  onClick={() => handleSort("chips")}
                  className="px-2 sm:px-4 py-2 bg-blue-500 text-white"
                >
                  Status
                </th>
                <th 
                  onClick={() => handleSort("location")}
                  className="px-2 sm:px-4 py-2 bg-blue-500 text-white"
                >
                  Location
                </th>
                <th 
                  className="px-2 sm:px-4 py-2 bg-blue-500 text-white"
                >
                  Action
                </th>
                <th 
                  className="px-2 sm:px-4 py-2 bg-blue-500 text-white"
                >
                  view users
                </th>
              </tr>
            </thead>
            <tbody>
            {displayedData.map((row, index) => (
              <React.Fragment key={row._id}>
                <tr key={index} className="hover:bg-gray-100">
                  <td
                    onClick={() => handleUserClick(row)}
                    className="clickable cursor-pointer px-2 sm:px-4 py-2 text-blue-500 hover:underline"
                  >
                    {row.name || "N/A"}
                  </td>
                  <td className="px-2 sm:px-4 py-2">{row.chips || 0}</td>
                  <td
                    className="px-2 sm:px-4 py-2 text-blue-500 hover:underline"
                  >
                    {row.status}
                  </td>
                  <td className="px-2 sm:px-4 py-2">{row.location || "N/A"}</td>
                  <td className="clickable cursor-pointer px-2 sm:px-4 py-2 text-blue-500 hover:underline"
                     onClick={() =>
                      handleTransferPointsClick("Sub Agent", row._id)
                    }
                    >
                      TRANSFER POINTS
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => toggleRow(row._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      {expandedRow === row._id ? 'Close' : 'Show'}
                    </button>
                  </td>
                </tr>
                {expandedRow === row._id && (
                  <tr className="bg-gray-100">
                    <td colSpan="10" className="border border-gray-300 px-4 py-2">
                    <UserListInSubAgent subAgentId={row._id} />
                    </td>
                  </tr>
                )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination flex justify-between items-center mt-6">
        <button
          className="prev px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <span className="page-info text-blue-700 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="next px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <button
              style={modalCloseStyle}
              onClick={handleModalClose}
            >
              &times;
            </button>
            <AgentBalanceAdjust
              prefilledType={selectedType}
              prefilledUser={selectedUser}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ASubAgentsList;