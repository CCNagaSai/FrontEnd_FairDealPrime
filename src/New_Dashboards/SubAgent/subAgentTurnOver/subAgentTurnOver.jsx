import React, { useState, useEffect, useRef } from "react";
import "./subAgentTurnOver.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = import.meta.env.VITE_HOST_URL;

const SubATurnover = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [backendData, setBackendData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [filters, setFilters] = useState({
    gameName: "",
    userId: "",
    handId: "",
    startDate: "",
    endDate: "",
  });
  const [dateRange, setDateRange] = useState("Select");
  const [columns, setColumns] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showTable, setShowTable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [noResults, setNoResults] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [inputPage, setInputPage] = useState("");

  const idRef = useRef(null);
  const typeRef = useRef(null);
  const tokenRef = useRef(null);

  // Fetch and set user data from cookies
  useEffect(() => {
    idRef.current = cookies.get("LoginUserId");
    typeRef.current = cookies.get("name");
    tokenRef.current = cookies.get("token");
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  }, [filteredData]);

  const token = tokenRef.current;
  const id = idRef.current;

  // Desktop and mobile columns
  const desktopColumns = [
    "S.No",
    "User Id",
    "Agent",
    "Sub Distributor",
    "Play Points",
    "Win Points",
    "End Points",
  ];

  const mobileColumns = [
    "S.No",
    "User Id",
    "Agent",
    "Sub Distributor",
    "Play Points",
    "Win Points",
    "End Points",
  ];

  // Dynamically adjust columns based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setColumns(isMobile ? mobileColumns : desktopColumns);
  }, [isMobile]);

  useEffect(() => {
    if (id && token) {
      const fetchBackendData = async () => {
        if (!id || !token) return;
        setIsLoading(true);

        try {
          let url = `${API_URL}/admin/agent/turnover?subAgentId=${id}`;

          // Add filters dynamically
          if (filters.userId) {
            url += `&username=${encodeURIComponent(filters.userId)}`;
          }
          if (filters.startDate && filters.endDate) {
            let startDate = new Date(filters.startDate);
            const endDate = new Date(filters.endDate);

            startDate.setDate(startDate.getDate() - 1);

            startDate.setUTCHours(18, 30, 0, 0);
            endDate.setUTCHours(18, 29, 59, 999);

            url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
          }
          console.log("Fetching Data from:", url);

          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Data:", data);

            if (data && Array.isArray(data.turnOverData)) {
              const flattenedHistory = data.turnOverData.flatMap(
                (entry) => entry || []
              );
              flattenedHistory.sort(
                (a, b) =>
                  new Date(b.lastPlayedDate) - new Date(a.lastPlayedDate)
              );

              setBackendData(flattenedHistory);
              setFilteredData(flattenedHistory);
            } else {
              console.error("Expected an array from the backend API:", data);
            }
          } else {
            console.error("Failed to fetch backend data");
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setIsLoading(false); // Stop loading
        }
      };
      fetchBackendData();
    }
  }, [token, id, filters]);

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

  const handleFilterChange = () => {
    let filtered = backendData;

    // Filter by username
    if (filters.username) {
      filtered = filtered.filter((entry) =>
        entry.username.toLowerCase().includes(filters.username.toLowerCase())
      );
    }

    // Filter by date range only if both startDate and endDate are provided
    if (filters.startDate && filters.endDate) {
      const startDate = new Date(filters.startDate);
      startDate.setHours(0, 0, 0, 0); // Start of the day
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999); // End of the day

      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.lastPlayedDate);
        return entryDate >= startDate && entryDate <= endDate;
      });
    }

    // Sort by date (most recent first)

    filtered.sort(
      (a, b) => new Date(b.lastPlayedDate) - new Date(a.lastPlayedDate)
    );

    // Update state
    setCurrentPage(1);
    setFilteredData(filtered);
    setShowTable(filtered.length > 0);
    setNoResults(filtered.length === 0); // Check if no results are found
    setIsSubmitted(true); // Indicate filters have been applied
  };

  const handleClear = () => {
    setFilters({
      gameName: "",
      userId: "",
      handId: "",
      startDate: "",
      endDate: "",
    });
    setCurrentPage(1);
    setDateRange("Select");
    setFilteredData(backendData); // Reset filters
    setShowTable(false); // Hide the table when cleared
    setIsSubmitted(false); // Reset the "submitted" state
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
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

  const toggleRow = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  console.log(filteredData, "cccccccc");

  useEffect(() => {
    if (isSubmitted) {
      handleFilterChange();
    }
  }, [backendData, filters, isSubmitted]);

  console.log("Backend Data:", backendData);

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 ml-[4px] mr-[4px] md:max-w-[1100px] mx-auto border border-blue-500 p-[5px]">
          <h2 className="text-blue-600 text-[18px] ml-1 md:text-xl font-bold  border-b border-blue-500 pb-1 ">
            Turn Over Report{" "}
          </h2>

          {/* Filter Form */}
          <div className="bg-[#e6ebff] p-5 rounded-lg shadow-lg m-1 sm:m-3">
            <form
              className="flex flex-col items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Row 1: Username (Desktop: Full row, Mobile: Shared with Start Date) */}
              <div className="w-full flex flex-wrap gap-4 mb-5">
                <div className="flex-1 min-w-[140px] sm:w-full">
                  <label className="block mb-2">Username:</label>
                  <input
                    type="text"
                    value={filters.userId}
                    onChange={(e) =>
                      setFilters({ ...filters, userId: e.target.value })
                    }
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
                    placeholder="Enter username"
                  />
                </div>

                <div className="flex-1 min-w-[140px] sm:w-full sm:hidden">
                  <label className="block mb-2">Start Date:</label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => handleManualDateChange(e, "startDate")}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Row 2: Start Date, End Date, and Date Range */}
              <div className="w-full flex flex-wrap gap-4 mb-5">
                {/* Start Date: Shown here for Desktop */}
                <div className="flex-1 min-w-[140px] hidden sm:block">
                  <label className="block mb-2">Start Date:</label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => handleManualDateChange(e, "startDate")}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* End Date */}
                <div className="flex-1 min-w-[140px]">
                  <label className="block mb-2">End Date:</label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => handleManualDateChange(e, "endDate")}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Date Range */}
                <div className="flex-1 min-w-[140px]">
                  <label className="block mb-2">Date Range:</label>
                  <select
                    value={dateRange}
                    onChange={(e) => handleDateRangeChange(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
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

              {/* Submit and Clear Buttons */}
              <div className="flex justify-center w-full">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleFilterChange}
                    className="bg-blue-500 text-white p-2 sm:p-3 md:px-4 py-2 rounded-lg font-bold hover:bg-blue-600 text-sm sm:text-base w-20 sm:w-auto"
                    style={{ width: "150px" }}
                  >
                    Apply Filters
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="bg-blue-500 text-white p-2 sm:p-3 md:px-4 py-2 rounded-lg font-bold hover:bg-blue-600 text-sm sm:text-base w-20 sm:w-auto"
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
            <div className="bg-[#e6ebff] p-2 flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 mt-2 rounded-md m-2 text-sm sm:text-base">
              <span className="block w-full sm:w-auto flex-[0_1_45%] sm:flex-auto">
                <strong>Start Date:</strong>{" "}
                {filters.startDate || "Not Selected"}
              </span>
              <span className="block w-full sm:w-auto flex-[0_1_45%] sm:flex-auto">
                <strong>End Date:</strong> {filters.endDate || "Not Selected"}
              </span>
              <span className="block w-full sm:w-auto flex-[0_1_45%] sm:flex-auto">
                <strong>Total Play Points:</strong>{" "}
                {filteredData
                  .reduce((sum, item) => sum + (item.totalPlayPoints ?? 0), 0)
                  .toFixed(2)}
              </span>
              <span className="block w-full sm:w-auto flex-[0_1_45%] sm:flex-auto">
                <strong>Total Won Points:</strong>{" "}
                {filteredData
                  .reduce((sum, item) => sum + (item.totalWonPoints ?? 0), 0)
                  .toFixed(2)}
              </span>
              <span className="block w-full sm:w-auto flex-[0_1_45%] sm:flex-auto">
                <strong>Total End Points:</strong>{" "}
                {filteredData
                  .reduce((sum, item) => sum + (item.endPoints ?? 0), 0)
                  .toFixed(2)}
              </span>
              <span className="block w-full sm:w-auto flex-[0_1_45%] sm:flex-auto">
                <strong>Total Margin:</strong>{" "}
                {filteredData
                  .reduce(
                    (sum, item) =>
                      sum + (2.5 / 100) * (item.totalPlayPoints ?? 0),
                    0
                  )
                  .toFixed(2)}
              </span>
              <span className="block w-full sm:w-auto flex-[0_1_45%] sm:flex-auto">
                <strong>Total Net:</strong>{" "}
                {filteredData
                  .reduce(
                    (sum, item) =>
                      sum +
                      ((item.endPoints ?? 0) -
                        (2.5 / 100) * (item.totalPlayPoints ?? 0)),
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          )}
          {isLoading ? (
            <div className="text-center py-4 font-bold text-blue-500">
              Loading data...
            </div>
          ) : (
            showTable && (
              <div>
                <div className="overflow-x-auto mt-8">
                  <table className="table-auto border-collapse border border-gray-300 w-full text-xs sm:text-base">
                    <thead>
                      <tr className="bg-blue-200">
                        {/* <th className="border border-gray-300 px-4 py-2">User ID</th> */}
                        <th className="border border-gray-300 px-4 py-2">
                          Username
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Play Points
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Won Points
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          End Points
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Margin
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Net
                        </th>
                        <th className="border border-gray-300 px-14 py-2">
                          Last Played Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {filteredData.map((item, index) => ( */}
                      {filteredData
                        .filter((item) => item.totalPlayPoints > 0)
                        .slice(startIndex, startIndex + itemsPerPage)
                        .map((item, index) => {
                          // Calculate derived values
                          const playPoints = item.totalPlayPoints || 0;
                          const wonPoints = item.totalWonPoints || 0;
                          const endPoints = item.endPoints || 0;
                          const margin =
                            (2.5 / 100) * item.totalPlayPoints || 0;
                          const net = endPoints - margin || 0;

                          // Helper function to format numbers
                          const formatValue = (value) =>
                            value % 1 === 0 ? value : value?.toFixed(2);

                          return (
                            <React.Fragment key={item.uuid}>
                              <tr
                                key={index}
                                className="odd:bg-white even:bg-gray-100"
                              >
                                {/* <td className="border border-gray-300 px-4 py-2">{item.userId}</td> */}
                                <td className="border border-gray-300 px-4 py-2">
                                  {item.name}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {formatValue(playPoints)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {formatValue(wonPoints)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {formatValue(endPoints)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {formatValue(margin)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {formatValue(net)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {(() => {
                                    const date = new Date(item.lastPlayedDate);
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
                                    const formattedDate = date.toLocaleString(
                                      "en-GB",
                                      options
                                    );
                                    return `${formattedDate}, IST`;
                                  })()}
                                </td>
                              </tr>
                            </React.Fragment>
                          );
                        })}
                    </tbody>
                    {/* Total row in tfoot */}
                    <tfoot>
                      <tr className="bg-gray-200 font-bold">
                        <td className="border border-gray-300 px-4 py-2">
                          Total
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {filteredData
                            .reduce(
                              (sum, item) => sum + (item.totalPlayPoints ?? 0),
                              0
                            )
                            .toFixed(2)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {filteredData
                            .reduce(
                              (sum, item) => sum + (item.totalWonPoints ?? 0),
                              0
                            )
                            .toFixed(2)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {filteredData
                            .reduce(
                              (sum, item) => sum + (item.endPoints ?? 0),
                              0
                            )
                            .toFixed(2)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {filteredData
                            .reduce(
                              (sum, item) =>
                                sum + (2.5 / 100) * (item.totalPlayPoints ?? 0),
                              0
                            )
                            .toFixed(2)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {filteredData
                            .reduce(
                              (sum, item) =>
                                sum +
                                ((item.endPoints ?? 0) -
                                  (2.5 / 100) * (item.totalPlayPoints ?? 0)),
                              0
                            )
                            .toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* Pagination controls */}
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
        </div>
      </div>
    </div>
  );
};

export default SubATurnover;
