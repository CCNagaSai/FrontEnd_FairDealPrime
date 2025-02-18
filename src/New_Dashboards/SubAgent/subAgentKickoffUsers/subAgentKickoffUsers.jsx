import React, { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SubAKickoffUsers = ({ onUserClick }) => {
  const [data, setData] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    activeUsers: 0,
    activePlayersDetails: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [originalData, setOriginalData] = useState([]);
  const [filters, setFilters] = useState({ username: ""});

  const idRef = useRef(null);
  const typeRef = useRef(null);
  const tokenRef = useRef(null);

  useEffect(() => {
    idRef.current = cookies.get("LoginUserId");
    typeRef.current = cookies.get("name");
    tokenRef.current = cookies.get("token");
  }, []);

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const id = idRef.current;
        const token = tokenRef.current;

        if (!id || !token) throw new Error("Missing cookies.");

        const response = await fetch(
          `http://65.0.54.193:9999/admin/agent/dashboradData?agentId=${id}`,
          {
            headers: { "Content-Type": "application/json", token },
          }
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const result = await response.json();
        setDashboardData({
          activeUsers: result.activeUsers?.totalActiveCount || 0,
          activePlayersDetails: result.activeUsers?.activePlayersDetails || [],
        });
      } catch (err) {
        console.error("Dashboard API Error:", err.message);
      }
    };

    fetchDashboardData();
  }, []);

  // Fetch User Data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = idRef.current;
        const type = typeRef.current;
        const token = tokenRef.current;

        if (!id || !type) throw new Error("Missing cookies.");

        const response = await fetch(
          `http://65.0.54.193:9999/admin/user/agent/UserList?Id=${id}&type=${type}`,
          {
            headers: { "Content-Type": "application/json", token },
          }
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const result = await response.json();
        setData(result.userList || []);
        setOriginalData(result.userList || []);
      } catch (err) {
        console.error("User List API Error:", err.message);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Filtered Data for Display
  const filteredData = data.filter((user) =>
    dashboardData.activePlayersDetails.some(
      (player) => player.playerId === user._id
    )
  );

  const handleUserClick = (user) => {
    onUserClick(user);
  };

  const handleFilterChange = () => {
    const filteredData = originalData.filter((user) => {
      const matchesUsername =
        !filters.username ||
        user.name.toLowerCase().includes(filters.username.toLowerCase());

      return matchesUsername;
    });

    setCurrentPage(1);
    setData(filteredData);
  };

  const handleClear = () => {
    setFilters({ username: ""});
    setCurrentPage(1);
    setData(originalData);
  };

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrevious = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div className="user-list-container font-sans p-4 sm:p-6 bg-gray-100">
      <h1 className="view-users-heading text-xl sm:text-2xl text-blue-500 text-left border-b-4 border-blue-500 pb-1">
        View Active Users
      </h1>

      {/* Filter Form */}
      <div className="bg-[#e6ebff] p-5 rounded-lg shadow-lg m-1 sm:m-3">
        <form
          className="flex flex-col items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-row justify-center text-center space-x-4 mb-5 w-full">
            {/* Username Filter */}
            <div className="flex-1 mb-4 text-center">
              <label className="block mb-2">Username:</label>
              <input
                type="text"
                value={filters.username}
                onChange={(e) => {
                setFilters({ ...filters, username: e.target.value });
                handleFilterChange(); // Trigger filter on change
                }}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-center"
                placeholder="Enter username"
              />
            </div>
          </div>

          {/* Filter Buttons */}
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
          <span>TOTAL ACTIVE USERS: ({dashboardData.activeUsers})</span>
        </div>

        <div className="overflow-x-auto">
          <table className="user-table w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr>
                <th className="px-2 sm:px-4 py-2 bg-blue-500 text-white">
                  Player
                </th>
                <th className="px-2 sm:px-4 py-2 bg-blue-500 text-white">
                  Points
                </th>
                <th className="px-2 sm:px-4 py-2 bg-blue-500 text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="clickable cursor-pointer px-2 sm:px-4 py-2 text-blue-500 hover:underline">
                    {user.name || "N/A"}
                  </td>
                  <td className="px-2 sm:px-4 py-2">{user.chips || 0}</td>
                  <td className="px-2 sm:px-4 py-2">
                    <button
                      onClick={() => handleUserClick(user)}
                      className="view-button px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      View
                    </button>
                  </td>
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
    </div>
  );
};

export default SubAKickoffUsers;
