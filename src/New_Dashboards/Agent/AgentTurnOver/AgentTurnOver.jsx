import React, { useState, useEffect, useRef } from 'react';
import FormTable from '../../Common/Report/Table';
import '../AgentGameHistory/AgentGameHistory.css'; 
import { mData } from '../../Common/data/mData';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ATurnover = () => {
  const [filteredData, setFilteredData] = useState(mData);
  const [filters, setFilters] = useState({
    gameName: '',
    userId: '',
    handId: '',
    startDate: '',
    endDate: '',
  });
  const [dateRange, setDateRange] = useState('Select');
  const [columns, setColumns] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Track screen size
  const [showTable, setShowTable] = useState(false); // State to control table visibility
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendData, setBackendData] = useState([]);


  // References for cookies
  const idRef = useRef(null);
  const typeRef = useRef(null);
  const tokenRef = useRef(null);

  // Define columns for both tables
  const desktopColumnsTable1 = [
    "Sub Agent", "Play Points", "Win Points", "End Points", "Margin", "Net", "Bonus", "PL"
  ];

  const desktopColumnsTable2 = [
    "##", "User", "Play Points", "Win Points", "End Points", "Margin", "Net", "Bonus"
  ];

  const mobileColumnsTable1 = [
    "Sub Agent", "Play Points", "Win Points", "End Points", "Margin", "Net", "Bonus", "PL"
  ];

  const mobileColumnsTable2 = [
    "##", "User", "Play Points", "Win Points", "End Points", "Margin", "Net", "Bonus"
  ];

  // Fetch user data from the backend
  useEffect(() => {
    idRef.current = cookies.get("LoginUserId");
    typeRef.current = cookies.get("name");
    tokenRef.current = cookies.get("token");

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
          `http://93.127.194.87:9999/admin/user/agent/UserList?Id=${id}&type=${type}`,
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
        console.log("API Response:", result);
    
        const userList = result.userList || [];
        console.log("User List:", userList);
    
        // Mapping API response to match table structure
        const processedData = userList.map((user) => ({
          name: user.name || 'N/A',
          // playPoints: user.chips || 0,  // Map chips to playPoints
          // winPoints: user.counters.totalMatch || 0, // You can adjust this based on available fields
          // endPoints: 0,  // Adjust based on actual data
          // margin: 0,  // Adjust based on actual data
          // net: 0,  // Adjust based on actual data
          // bonus: 0,  // Adjust based on actual data
          // pl: 0,  // Adjust based on actual data
          // userId: user.id || '',
          // handId: user.uniqueId || ''
        }));
    
        console.log("Processed Data:", processedData);
    
        // Set the data for both tables
        setFilteredData(processedData); // First table data
        setBackendData(processedData);   // Second table data
        setShowTable(processedData.length > 0);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
        
    fetchUserData();
  }, []);

  // Dynamically adjust columns based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setColumns({
      table1: isMobile ? mobileColumnsTable1 : desktopColumnsTable1,
      table2: isMobile ? mobileColumnsTable2 : desktopColumnsTable2
    });
  }, [isMobile]);

  const handleFilterChange = () => {
    let filtered = mData;

    // Filter by selected date range
    if (dateRange !== 'Select') {
      const today = new Date();
      let startDate, endDate;

      if (dateRange === 'Today') {
        startDate = endDate = today;
      } else if (dateRange === 'Yesterday') {
        startDate = new Date(today.setDate(today.getDate() - 1));
        endDate = startDate;
      } else if (dateRange === 'Last 7 Days') {
        startDate = new Date(today.setDate(today.getDate() - 7));
        endDate = today;
      } else if (dateRange === 'Last 30 Days') {
        startDate = new Date(today.setDate(today.getDate() - 30));
        endDate = today;
      }

      if (startDate && endDate) {
        filtered = filtered.filter((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate >= startDate && entryDate <= endDate;
        });
      }
    }

    // Filter by start and end date
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= new Date(filters.startDate) && entryDate <= new Date(filters.endDate);
      });
    }

    // Filter by other fields
    if (filters.gameName) {
      filtered = filtered.filter((entry) =>
        entry.gameName.toLowerCase().includes(filters.gameName.toLowerCase())
      );
    }

    if (filters.userId) {
      filtered = filtered.filter((entry) =>
        entry.userId.toLowerCase().includes(filters.userId.toLowerCase())
      );
    }

    if (filters.handId) {
      filtered = filtered.filter((entry) =>
        entry.handId.toLowerCase().includes(filters.handId.toLowerCase())
      );
    }

    setFilteredData(filtered);

    // Show the table after applying filters
    setShowTable(filtered.length > 0);
    setIsSubmitted(true); // Mark the form as submitted
  };

  const handleClear = () => {
    setFilters({
      gameName: '',
      userId: '',
      handId: '',
      startDate: '',
      endDate: '',
    });
    setDateRange('Select');
    setFilteredData(mData); // Reset filters
    setShowTable(false); // Hide the table when cleared
    setIsSubmitted(false); // Reset form submission state
  };

  const totalPlayPoints = filteredData.reduce((acc, entry) => acc + parseFloat(entry.playPoints || 0), 0);

  return (
    <div className="bg-gray-50">
      <div className="flex flex-col md:flex-row">


        <div className="flex-1 ml-[4px] mr-[4px] md:max-w-[1100px] mx-auto border border-blue-500 p-[5px]">
        <h2 className="text-blue-600 text-[18px] ml-1 md:text-xl font-bold mb-6 border-b border-blue-500 pb-3 ">
            Turn Over Report Search </h2>

          {/* Filter Form */}
          <div className="bg-[#e6ebff] p-5 rounded-lg shadow-lg m-1 sm:m-3">
            <form className="space-y-6">
              {/* First row: Game Type, Affiliate, and Date Range */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-6">
              {/* Game Type Radio Buttons */}
                <div className="filter-group w-[11]">
                  <label className="block text-gray-700  font-medium">Game Type:</label>
                  <div className="radio-group flex gap-3 items-center">
                    {['All', 'PC', 'Mobile', 'iOS', 'Web'].map((type, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 w-20" // Restrict the width of the labels
                      >
                        <span className="text-sm truncate">{type}</span> {/* Truncate text if needed */}
                        <input
                          type="radio"
                          name="gameType"
                          value={type.toLowerCase()}
                          checked={filters.gameType === type.toLowerCase()}
                          onChange={(e) => setFilters({ ...filters, gameType: e.target.value })}
                          className="w-4 h-4 appearance-none border border-blue-500 rounded-full checked:bg-blue-500 checked:border-blue-700 hover:border-blue-700 transition duration-300 cursor-pointer"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Affiliate Dropdown */}
                <div className="filter-group">
                  <label className="block text-gray-700 font-medium">Affiliate:</label>
                  <select
                    name="affiliate"
                    value={filters.affiliate || ''}
                    onChange={(e) => setFilters({ ...filters, affiliate: e.target.value })}
                    className="w-full sm:w-auto md:w-1/2 p-2 sm:p-3 border border-gray-300 rounded-lg"
                    >
                    <option value="">Select Affiliate</option>
                    <option value="affiliate1">Affiliate 1</option>
                    <option value="affiliate2">Affiliate 2</option>
                    {/* Add more affiliates as needed */}
                  </select>
                </div>

                {/* Date Range Dropdown */}
                <div className="filter-group">
                  <label className="block text-gray-700 font-medium">Date Range:</label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full sm:w-auto md:w-1/2 p-2 sm:p-3 border border-gray-300 rounded-lg"
                    >
                    <option value="Select">Select</option>
                    <option value="Today">Today</option>
                    <option value="Yesterday">Yesterday</option>
                    <option value="Last 7 Days">Last 7 Days</option>
                    <option value="Last 30 Days">Last 30 Days</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              </div>

              {/* Second row: Start Date, End Date, and Report Password */}
              <div className="grid grid-cols-1  sm:grid-cols-3 gap-1 sm:gap-6">
              {/* Start Date */}
                <div className="filter-group">
                  <label className="block text-gray-700 font-medium">Start Date:</label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                    className="w-full p-2 sm:p-3  border  border-gray-300 rounded-lg"
                  />
                </div>

                {/* End Date */}
                <div className="filter-group">
                  <label className="block text-gray-700 font-medium">End Date:</label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                    className="w-full p-2 sm:p-3  border  border-gray-300 rounded-lg"
                  />
                </div>

                {/* Report Password */}
                <div className="filter-group">
                  <label className="block text-gray-700 font-medium">Report Password:</label>
                  <input
                    type="password"
                    name="reportPassword"
                    value={filters.reportPassword}
                    onChange={(e) => setFilters({ ...filters, reportPassword: e.target.value })}
                    className="w-full p-2 sm:p-3  border  border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Submit and Clear buttons */}
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={handleFilterChange}
                  className="bg-blue-500 text-white p-2 sm:p-3 md:px-4 py-2 rounded-lg font-bold hover:bg-blue-600 text-sm sm:text-base w-20 sm:w-auto"
                  >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-blue-500 text-white p-2 sm:p-3 md:px-4 py-2 rounded-lg font-bold hover:bg-blue-600 text-sm sm:text-base w-20 sm:w-auto"
                  >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* Filtered Data Information */}
          {isSubmitted && (
            <div className="bg-[#e6ebff] p-4 flex flex-col sm:flex-row gap-2 sm:gap-6 mt-4 rounded-md m-2 text-sm sm:text-base">
              <span className="block">Start Date: {filters.startDate || 'Not Selected'}</span>
              <span className="block">End Date: {filters.endDate || 'Not Selected'}</span>
            </div>
          )}
          {loading ? (
            <div className="text-center text-blue-500">Loading...</div>
          ) : showTable ? (
            <div className="overflow-x-auto mt-2 sm:mt-3">
              <div className="">
                <FormTable
                  data={filteredData}
                  showPagination={false}
                  columns={columns.table1}
                  showTotals={false}
                  totalPlayPoints={totalPlayPoints}
                />
              </div>
              <div>
                <FormTable
                  data={backendData}
                  showPagination={false}
                  columns={columns.table2}
                  showTotals={false}
                  totalPlayPoints={totalPlayPoints}
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">No data available</div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ATurnover;
