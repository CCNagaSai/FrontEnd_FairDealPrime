import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ASubAgentsList = () => {
  const navigate = useNavigate();

  // State
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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
          `http://93.127.194.87:9999/admin/shop/ShopList?agentId=${id}`,
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

  const totalPages = Math.ceil(data.length / itemsPerPage);



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

  return (
    <div className="user-list-container font-sans p-4 sm:p-6 bg-gray-100">
      <h1 className="view-users-heading text-xl sm:text-2xl text-blue-500 text-left border-b-4 border-blue-500 pb-2 mb-6">
        View Sub Agents
      </h1>

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
              </tr>
            </thead>
            <tbody>
              {displayedData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td
                    className="px-2 sm:px-4 py-2"
                  >
                    {row.name || "N/A"}
                  </td>
                  <td className="px-2 sm:px-4 py-2">{row.chips || 0}</td>
                  <td
                    className="px-2 sm:px-4 py-2 text-blue-500 hover:underline"
                  >
                    {row.status ? "Active" : "Inactive"}
                  </td>
                  <td className="px-2 sm:px-4 py-2">{row.location || "N/A"}</td>
                  <td className="px-2 sm:px-4 py-2">TRANSFER POINTS</td>
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

export default ASubAgentsList;