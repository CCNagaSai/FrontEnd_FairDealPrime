import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import UserTurnOverInSubAgent from "../../Agent/AgentTurnOver/UserTurnOverInSubAgent";

const API_URL = import.meta.env.VITE_HOST_URL;
const cookies = new Cookies();

const AdminAgentTurnover = ({ AgentId }) => {
  const navigate = useNavigate();

  // State
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [backendData, setBackendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
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
          `${API_URL}/admin/shop/ShopList?agentId=${AgentId}`,
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
        const shopList = result.shopList || [];
        setOriginalData(shopList);
        setData(shopList);

        // Fetch backend data (roulette game history) for each sub-agent
        const fetchBackendDataForSubAgents = async () => {
          const allBackendData = {};
          for (const shop of shopList) {
            const AgentId = shop._id;
            const responseBackend = await fetch(
              `${API_URL}/admin/agent/RouletteGameHistory?subAgentId=${AgentId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  token: token,
                },
              }
            );

            if (responseBackend.ok) {
              const data = await responseBackend.json();
              if (data && Array.isArray(data.gameHistoryData)) {
                const flattenedHistory = data.gameHistoryData.flatMap(
                  (entry) => entry.history || []
                );

                flattenedHistory.sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                allBackendData[AgentId] = flattenedHistory;
              }
            }
          }
          setBackendData(allBackendData);
          setLoading(false);
        };

        fetchBackendDataForSubAgents();
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setError("Failed to load user data. Please try again.");
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

  const toggleRow = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  return (
    <div className="user-list-container font-sans p-4 sm:p-6 bg-gray-100">
      <h1 className="view-users-heading text-xl sm:text-2xl text-blue-500 text-left border-b-4 border-blue-500 pb-2 mb-6">
        Turn Over Report
      </h1>

      <div className="user-details bg-white p-4 sm:p-6 rounded-md shadow-md">
        <div className="user-summary text-sm sm:text-lg font-bold mb-4">
          <span>TOTAL SUB-AGENTS: ({data.length})</span>
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
                  Total Play Points
                </th>
                <th
                  onClick={() => handleSort("chips")}
                  className="px-2 sm:px-4 py-2 bg-blue-500 text-white"
                >
                  Total Won Points
                </th>
                <th
                  onClick={() => handleSort("location")}
                  className="px-2 sm:px-4 py-2 bg-blue-500 text-white"
                >
                  Total End Points
                </th>
                <th className="px-2 sm:px-4 py-2 bg-blue-500 text-white">
                  Total Margin
                </th>
                <th className="px-2 sm:px-4 py-2 bg-blue-500 text-white">
                  Total Net
                </th>
                <th className="px-2 sm:px-4 py-2 bg-blue-500 text-white">
                  view users
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((row, index) => {
                const subAgentId = row._id;
                const subAgentHistory = backendData[subAgentId] || [];

                // Check if the backend data is still being fetched
                const isDataFetched = backendData.hasOwnProperty(subAgentId);

                // Calculate totals for the individual sub-agent
                const totalPlay = isDataFetched
                  ? subAgentHistory
                      .reduce((sum, item) => sum + item.play, 0)
                      .toFixed(2)
                  : "loading";
                const totalWon = isDataFetched
                  ? subAgentHistory
                      .reduce((sum, item) => sum + item.won, 0)
                      .toFixed(2)
                  : "loading";
                const totalEnd = isDataFetched
                  ? subAgentHistory
                      .reduce((sum, item) => sum + (item.play - item.won), 0)
                      .toFixed(2)
                  : "loading";
                const totalMargin = isDataFetched
                  ? subAgentHistory
                      .reduce((sum, item) => sum + (2.5 / 100) * item.play, 0)
                      .toFixed(2)
                  : "loading";
                const totalNet = isDataFetched
                  ? subAgentHistory
                      .reduce(
                        (sum, item) =>
                          sum +
                          (item.play - item.won - (2.5 / 100) * item.play),
                        0
                      )
                      .toFixed(2)
                  : "loading";

                return (
                  <React.Fragment key={row._id}>
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-2 sm:px-4 py-2">{row.name || "N/A"}</td>
                      <td className="px-2 sm:px-4 py-2">{totalPlay}</td>
                      <td className="px-2 sm:px-4 py-2">{totalWon}</td>
                      <td className="px-2 sm:px-4 py-2">{totalEnd}</td>
                      <td className="px-2 sm:px-4 py-2">{totalMargin}</td>
                      <td className="px-2 sm:px-4 py-2">{totalNet}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() => toggleRow(row._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          {expandedRow === row._id ? "Close" : "Show"}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === row._id && (
                      <tr className="bg-gray-100">
                        <td
                          colSpan="10"
                          className="border border-gray-300 px-4 py-2"
                        >
                          <UserTurnOverInSubAgent subAgentId={row._id} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-blue-100 font-bold">
                <td className="border border-gray-300 px-4 py-2">Total</td>
                <td className="border border-gray-300 px-4 py-2">
                  {data
                    .reduce((sum, item) => {
                      const subAgentHistory = backendData[item._id] || [];
                      return (
                        sum +
                        subAgentHistory.reduce(
                          (acc, history) => acc + history.play,
                          0
                        )
                      );
                    }, 0)
                    .toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data
                    .reduce((sum, item) => {
                      const subAgentHistory = backendData[item._id] || [];
                      return (
                        sum +
                        subAgentHistory.reduce(
                          (acc, history) => acc + history.won,
                          0
                        )
                      );
                    }, 0)
                    .toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data
                    .reduce((sum, item) => {
                      const subAgentHistory = backendData[item._id] || [];
                      return (
                        sum +
                        subAgentHistory.reduce(
                          (acc, history) => acc + (history.play - history.won),
                          0
                        )
                      );
                    }, 0)
                    .toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data
                    .reduce((sum, item) => {
                      const subAgentHistory = backendData[item._id] || [];
                      return (
                        sum +
                        subAgentHistory.reduce(
                          (acc, history) => acc + (2.5 / 100) * history.play,
                          0
                        )
                      );
                    }, 0)
                    .toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data
                    .reduce((sum, item) => {
                      const subAgentHistory = backendData[item._id] || [];
                      return (
                        sum +
                        subAgentHistory.reduce(
                          (acc, history) =>
                            acc +
                            (history.play -
                              history.won -
                              (2.5 / 100) * history.play),
                          0
                        )
                      );
                    }, 0)
                    .toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
              </tr>
            </tfoot>
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

export default AdminAgentTurnover;
