import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar/sidebar';
import FormTable from './Report/Table';
import { mData } from './data/mData';  // Correct path for mData.jsx
import ImageComponent from './Topbar';
import "./History.css"

const Turnover = () => {
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

  // Define columns for both tables
  const desktopColumnsTable1 = [
    "Agent", "Play Points", "Win Points", "End Points", "Margin", "Net", "Bonus", "PL"
  ];

  const desktopColumnsTable2 = [
    "#", "User", "Play Points", "Win Points", "End Points", "Margin", "Net", "Bonus"
  ];

  const mobileColumnsTable1 = [
    "Agent", "Play Points", "Win Points", "End Points"
  ];

  const mobileColumnsTable2 = [
    "#", "User", "Play Points", "Win Points", "End Points"
  ];

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
  };

  const totalPlayPoints = filteredData.reduce((acc, entry) => acc + parseFloat(entry.playPoints || 0), 0);

  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      {/* <div className="text-blue-600 text-2xl font-bold border-b-2 pb-4 mb-5"><ImageComponent /></div> */}


      {/* Main Content Section */}
      <div className="flex flex-wrap">
        {/* <div className="flex-none w-full  sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 pr-2">
          <Sidebar />
        </div> */}

        <div className="flex-1 max-w-[1100px] mx-auto border border-blue-500">
          <h2 className="text-blue-600 text-2xl font-bold mb-6 border-b border-blue-500 pb-3 ml-5">Turn Over Report Search </h2>

          {/* Filter Form */}
          <div className="bg-[#e6ebff] p-5 rounded-lg shadow-lg m-3">
            <form className="space-y-6">
              {/* First row: Game Type, Affiliate, and Date Range */}
              <div className="grid grid-cols-3 gap-6">
                {/* Game Type Radio Buttons */}
                <div className="filter-group w-[11]">
                  <label className="block text-gray-700  font-medium">Game Type:</label>
                  <div className="radio-group flex gap-4 items-center">
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
                    className="w-32 md:w-80 p-2 border rounded-md"
                    
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
                    className="w-full p-2 border rounded-md"
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
              <div className="grid grid-cols-3 gap-6">
                {/* Start Date */}
                <div className="filter-group">
                  <label className="block text-gray-700 font-medium">Start Date:</label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                {/* End Date */}
                <div className="filter-group">
                  <label className="block text-gray-700 font-medium">End Date:</label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                    className="w-full p-2 border rounded-md"
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
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              {/* Submit and Clear buttons */}
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={handleFilterChange}
                  className="bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600"
                >
                  Clear
                </button>
              </div>
            </form>


          </div>

          {/* Filtered Data Information */}
          <div className="bg-[#e6ebff] p-4 flex gap-6 rounded-md m-2">
            <span className="block">Game Name: {filters.gameName || 'Not Selected'}</span>
            <span className="block">Start Date: {filters.startDate || 'Not Selected'}</span>
            <span className="block">End Date: {filters.endDate || 'Not Selected'}</span>
            <span className="block">Play Points: {totalPlayPoints}</span>
          </div>

          {/* Conditionally render the tables */}
          {showTable && (
            <div className="overflow-x-auto mt-6">
              <div className="mb-6">
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
                  data={filteredData}
                  showPagination={false}
                  columns={columns.table2}
                  showTotals={false}
                  totalPlayPoints={totalPlayPoints}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Turnover;
