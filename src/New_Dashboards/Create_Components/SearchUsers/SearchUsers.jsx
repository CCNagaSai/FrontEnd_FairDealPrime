import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import AgentBalanceAdjust from "../../Agent/AgentBalanceAdjustment/AgentBalanceAdjust";
import {
  fetchAdminAgentList,
  fetchAdminSubAgents,
  fetchAdminUsers,
  fetchAgentSubAgentList,
  fetchAgentUsers,
  fetchSubAgentUserList,
} from "../../Common/OfferState/DashboardOfferState";

const API_URL = import.meta.env.VITE_HOST_URL;
const cookies = new Cookies();

const UserList = ({ onUserClick, userRole }) => {
  const navigate = useNavigate();

  // State
  const [data, setData] = useState([]); // Initially empty data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [filters, setFilters] = useState({
    username: "",
    _id: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [dateRange, setDateRange] = useState("Select");
  const [inputPage, setInputPage] = useState("");
  const [backendData, setBackendData] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const id = idRef.current;
  const type = typeRef.current;
  const token = tokenRef.current;

  useEffect(() => {
    if (userRole === "Admin" && id && token) {
      const loadAdminUsers = async () => {
        setLoading(true);
        try {
          const { users, totalPages } = await fetchAdminUsers(
            id,
            token,
            filters,
            currentPage,
            itemsPerPage
          );
          setBackendData(users);
          setFilteredData(users);
          setTotalPages(totalPages);
        } catch (err) {
          console.error("Admin Fetch Error:", err);
        } finally {
          setLoading(false);
        }
      };

      loadAdminUsers();
    }
  }, [userRole, token, id, filters, currentPage]);

  useEffect(() => {
    if (userRole === "Agent") {
      const loadAgents = async () => {
        setLoading(true);
        setError(null);

        try {
          const token = tokenRef.current; // Access token correctly
          if (!token) {
            throw new Error("Token is missing");
          }

          const agentData = await fetchAdminAgentList(token);
          setBackendData(agentData);
          setFilteredData(agentData);
          setTotalPages(totalPages);
        } catch (err) {
          console.error("Error fetching agents:", err);
          setError("Failed to load agent data. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      if (tokenRef.current) {
        loadAgents();
      }
    }
  }, [tokenRef.current, userRole]); // Ensure the effect runs when token is available

  useEffect(() => {
    if (userRole === "SubAgent" && id && token) {
      const loadUsers = async () => {
        setLoading(true);
        try {
          const { users, totalPages } = await fetchAdminSubAgents(
            id,
            token,
            filters,
            currentPage,
            itemsPerPage
          );
          setBackendData(users);
          setFilteredData(users);
          setTotalPages(totalPages);
        } catch (err) {
          console.error("Error fetching users:", err);
        } finally {
          setLoading(false);
        }
      };

      loadUsers();
    }
  }, [token, id, filters, currentPage, userRole]);

  useEffect(() => {
    if (userRole === "AgentUsers" && id && token) {
      const loadUsers = async () => {
        setLoading(true);
        try {
          const { users, totalPages } = await fetchAgentUsers(
            id,
            token,
            filters,
            currentPage,
            itemsPerPage
          );
          setBackendData(users);
          setFilteredData(users);
          setTotalPages(totalPages);
        } catch (err) {
          console.error("Error fetching users:", err);
        } finally {
          setLoading(false);
        }
      };

      loadUsers();
    }
  }, [token, id, filters, currentPage, userRole]);

  useEffect(() => {
    if (userRole === "AgentSearchSubAgent") {
      const loadShops = async () => {
        setLoading(true);
        setError(null);

        try {
          const token = tokenRef.current;
          const id = idRef.current;

          const shopData = await fetchAgentSubAgentList(token, id);
          setBackendData(shopData);
          setFilteredData(shopData);
          setTotalPages(totalPages);
        } catch (err) {
          console.error("Error fetching shop data:", err);
          setError("Failed to load shop data. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      if (tokenRef.current && idRef.current) {
        loadShops();
      }
    }
  }, [userRole]);

  useEffect(() => {
    if (userRole === "SubAgentUsers") {
      const loadUsers = async () => {
        setLoading(true);
        setError(null);

        try {
          const token = tokenRef.current;
          const id = idRef.current;
          const type = typeRef.current;

          const userList = await fetchSubAgentUserList(token, id, type);
          setBackendData(userList);
          setFilteredData(userList);
          setTotalPages(totalPages);
        } catch (err) {
          console.error("Error fetching user list:", err);
          setError("Failed to load user list. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      if (tokenRef.current && idRef.current && typeRef.current) {
        loadUsers();
      }
    }
  }, [userRole]);

  const handleFilterChange = () => {
    let filtered = backendData;

    // Filter by username
    if (filters._id) {
      filtered = filtered.filter((entry) =>
        entry.name.toLowerCase().includes(filters._id.toLowerCase())
      );
    }

    // Filter by date range
    if (filters.startDate && filters.endDate) {
      const startDate = new Date(filters.startDate);
      startDate.setHours(0, 0, 0, 0); // Start of the day
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999); // End of the day

      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.createdAt);
        return entryDate >= startDate && entryDate <= endDate;
      });
    }
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setCurrentPage(1);
    setFilteredData(filtered);
    setShowTable(filtered.length > 0);
    setNoResults(filtered.length === 0);
    setIsSubmitted(true);
  };
  useEffect(() => {
    if (isSubmitted) {
      setShowTable(filteredData.length > 0);
      setNoResults(filteredData.length === 0);
    }
  }, [filteredData, isSubmitted]);

  const handleClear = () => {
    setFilters({
      username: "",
      _id: "",
      status: "",
      startDate: "",
      endDate: "",
    });
    setCurrentPage(1);
    setDateRange("Select");
    setFilteredData(backendData);
    setShowTable(false);
    setIsSubmitted(false);
  };

  // const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleTransferPointsClick = (type, user) => {
    console.log("Transfer Points Clicked", { type, user });
    setSelectedType(type);
    setSelectedUser(user);
    setIsModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleUserClick = (user) => {
    onUserClick(user);
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = data.slice(startIndex, startIndex + itemsPerPage);
  console.log(data, "cccccccc");

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Handle filter change and date range calculations
  const handleDateRangeChange = (range) => {
    const today = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (range) {
      case "Today":
        startDate = new Date(today);
        endDate = new Date(today);
        break;
      case "Yesterday":
        startDate.setDate(today.getDate() - 1);
        endDate.setDate(today.getDate() - 1);
        break;
      case "This Week": {
        const dayOfWeek = today.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
        startDate = new Date(today);
        startDate.setDate(
          today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
        ); // Move to Monday
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6); // Move to Sunday
        break;
      }
      case "Last Week": {
        const dayOfWeek = today.getDay();
        startDate = new Date(today);
        startDate.setDate(today.getDate() - dayOfWeek - 6); // Move to previous week's Monday
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6); // Move to Sunday of last week
        break;
      }
      case "This Month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "Last Month":
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      default:
        break;
    }

    const formatDate = (date) => {
      return date.toLocaleDateString("en-GB").split("/").reverse().join("-");
    };

    setFilters((prevFilters) => ({
      ...prevFilters,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    }));
    setDateRange(range);
  };

  const handleManualDateChange = (e, field) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [field]: e.target.value };
      if (newFilters.startDate && newFilters.endDate) {
        setDateRange("Select"); // Reset Date Range to Select if custom dates are entered
      }
      return newFilters;
    });
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

  const handleClearInput = () => {
    setInputPage("");
    setCurrentPage(1);
  };

  // Inline CSS
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

  const pageSize = 10; // Define items per page

  // Compute total pages dynamically when not provided
  const computedTotalPages =
    totalPages && totalPages > 0
      ? totalPages
      : filteredData.length > 0
      ? Math.ceil(filteredData.length / pageSize)
      : 1; // Default to at least 1 page

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < computedTotalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  console.log("Filtered Data:", filteredData);
  console.log("Computed Total Pages:", computedTotalPages);
  console.log("Current Page:", currentPage);

  console.log("cccccccc", filteredData);
  console.log("Total Pages", totalPages);
  return (
    <div className="user-list-container font-sans p-4 sm:p-6 bg-gray-100">
      <h1 className="view-users-heading text-xl sm:text-2xl text-blue-500 text-left border-b-4 border-blue-500 pb-1">
        View Users
      </h1>
      {/* Filter Form */}
      <div className="bg-[#e6ebff] p-5 rounded-lg shadow-lg m-1 sm:m-3">
        <form
          className="flex flex-col items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-row justify-between space-x-4 mb-5 w-full">
            {/* Username */}
            <div className="flex-1 min-w-[140px]">
              <label className="block mb-2">Username:</label>
              <input
                type="text"
                value={filters._id}
                onChange={(e) =>
                  setFilters({ ...filters, _id: e.target.value })
                }
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg"
                placeholder="Enter username"
              />
            </div>

            {/* Status Filter */}
            <div className="flex-1 mb-4">
              <label className="block mb-2">Status:</label>
              <select
                value={filters.status}
                onChange={(e) => {
                  setFilters({ ...filters, status: e.target.value });
                  handleFilterChange(); // Trigger filter on change
                }}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
              >
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Second Row (Tablet/Mobile: End Date + Date Range, Desktop: Start Date, End Date, Date Range) */}
          <div className="w-full flex flex-wrap gap-4 mb-5">
            {/* Start Date (Visible only in Desktop) */}
            <div className="flex-1 min-w-[140px] hidden md:block">
              <label className="block mb-2">Start Date:</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleManualDateChange(e, "startDate")}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* End Date */}
            <div className="flex-1 min-w-[140px]">
              <label className="block mb-2">End Date:</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleManualDateChange(e, "endDate")}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Date Range */}
            <div className="flex-1 min-w-[140px]">
              <label className="block mb-2">Date Range:</label>
              <select
                value={dateRange}
                onChange={(e) => handleDateRangeChange(e.target.value)}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg"
              >
                <option value="Select">Select</option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="This Week">This Week</option>
                <option value="Last Week">Last Week</option>
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>

          {/* Submit and Clear buttons */}
          <div className="flex justify-center w-full">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleFilterChange}
                className="bg-blue-500 text-white p-2 md:p-3 md:px-4 py-2 rounded-lg font-bold hover:bg-blue-600 text-sm md:text-base w-20 md:w-auto"
                style={{ width: "150px" }}
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="bg-blue-500 text-white p-2 md:p-3 md:px-4 py-2 rounded-lg font-bold hover:bg-blue-600 text-sm md:text-base w-20 md:w-auto"
                style={{ width: "150px" }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* Show selected filters after submit */}
      {isSubmitted && (
        <div className="bg-[#e6ebff] p-4 flex flex-col sm:flex-row gap-2 sm:gap-6 mt-4 rounded-md m-2 text-sm sm:text-base">
          <span className="block">
            Start Date: {filters.startDate || "Not Selected"}
          </span>
          <span className="block">
            End Date: {filters.endDate || "Not Selected"}
          </span>
        </div>
      )}

      {loading ? (
        <div className="text-center py-4 font-bold text-blue-500">
          Loading data...
        </div>
      ) : (
        showTable && (
          <div>
            <div className="user-details bg-white p-4 sm:p-6 rounded-md shadow-md">
              <div className="user-summary text-sm sm:text-lg font-bold mb-4">
                <span>
                  TOTAL USERS: ({filteredData.length}) TOTAL POINTS: (
                  {filteredData.reduce((sum, item) => sum + item.chips, 0)})
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
                        Player
                      </th>
                      <th
                        onClick={() => handleSort("chips")}
                        className="px-2 sm:px-4 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
                      >
                        Points
                      </th>
                      <th
                        onClick={() => handleSort("lastLoginDate")}
                        className="px-2 sm:px-4 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
                      >
                        Last Login
                      </th>
                      <th className="px-2 sm:px-4 py-2 bg-blue-500 text-white">
                        Status
                      </th>
                      {/* <th className="px-2 sm:px-4 py-2 bg-blue-500 text-white">
                        Action
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td
                          onClick={() => handleUserClick(row)}
                          className="clickable cursor-pointer px-2 sm:px-4 py-2 text-blue-500 hover:underline"
                        >
                          {row.name || "N/A"}
                        </td>
                        <td className="px-2 sm:px-4 py-2">{row.chips || 0}</td>
                        <td className="px-2 sm:px-4 py-2">
                          {row.lastLoginDate || "N/A"}
                        </td>
                        <td className="px-2 sm:px-4 py-2">
                          {row.status ? "Active" : "Inactive"}
                        </td>
                        {/* <td
                          className="clickable cursor-pointer px-2 sm:px-4 py-2 text-blue-500 hover:underline"
                          onClick={() =>
                            handleTransferPointsClick("User", row._id)
                          }
                        >
                          TRANSFER POINTS
                        </td> */}
                      </tr>
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
                Page {currentPage} of {computedTotalPages}
              </span>
              <button
                className="next px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={currentPage >= computedTotalPages} // Ensure it disables correctly
                onClick={handleNext}
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
        )
      )}
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <button style={modalCloseStyle} onClick={handleModalClose}>
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

export default UserList;
