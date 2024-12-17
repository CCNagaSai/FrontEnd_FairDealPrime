import React, { useState, useEffect } from 'react';
import Sidebar from '../common/sidebar/sidebar';
import FormTable from '../common/Report/Table';
import './history.css'; // You can keep your custom styles here
import { mData } from '../common/data/mData';  // Correct path for mData.jsx
import ImageComponent from './Header';

const GameHistory = () => {
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

  // Desktop and mobile columns
  const desktopColumns = [
    "S.No",
    "User Id",
    "Agent",
    "Sub Distributor",
    "Play Points",
    "Win Points",
    "End Points"
  ];

  const mobileColumns = [
    "S.No",
    "User Id",
    "Agent",
    "Play Points",
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
    setColumns(isMobile ? mobileColumns : desktopColumns);
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
    <div>
      {/* Header Section */}
      <div className="text-blue-600 text-2xl font-bold border-b-2 pb-4 mb-5">
        <ImageComponent />
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row">
        <div className="flex-none w-full  sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 pr-2">
          <Sidebar />
        </div>

        <div className="flex-1 max-w-[1100px] mx-auto border border-blue-500">
          <h2 className="text-blue-600 text-2xl font-bold mb-6 border-b border-blue-500 pb-3 ml-5">Game History</h2>

          {/* Filter Form */}
          <div className="bg-[#e6ebff] p-5 rounded-lg shadow-lg m-3">
            <form className="flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
              {/* First row: Game Name, User Id, Hand Id */}
              <div className="flex flex-col sm:flex-row justify-between space-x-4 mb-5 w-full">
                <div className="flex-1 mb-4 sm:mb-0">
                  <label className="block mb-2">Game Name:</label>
                  <input
                    type="text"
                    value={filters.gameName}
                    onChange={(e) => setFilters({ ...filters, gameName: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex-1 mb-4 sm:mb-0">
                  <label className="block mb-2">User Id:</label>
                  <input
                    type="text"
                    value={filters.userId}
                    onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex-1 mb-4 sm:mb-0">
                  <label className="block mb-2">Hand Id:</label>
                  <input
                    type="text"
                    value={filters.handId}
                    onChange={(e) => setFilters({ ...filters, handId: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Date filters */}
              <div className="flex flex-col sm:flex-row justify-between space-x-4 mb-5 w-full">
                <div className="flex-1 mb-4 sm:mb-0">
                  <label className="block mb-2">Start Date:</label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex-1 mb-4 sm:mb-0">
                  <label className="block mb-2">End Date:</label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex-1 mb-4 sm:mb-0">
                  <label className="block mb-2">Date Range:</label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
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

              {/* Submit and Clear buttons */}
              <div className="flex justify-center w-full">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleFilterChange}
                    className="bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600"
                    style={{ width: '100px' }}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600"
                    style={{ width: '100px' }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-[#e6ebff] p-4 flex gap-6 rounded-md m-2">
            <span className="block">Game Name: {filters.gameName || 'Not Selected'}</span>
            <span className="block">Start Date: {filters.startDate || 'Not Selected'}</span>
            <span className="block">End Date: {filters.endDate || 'Not Selected'}</span>
            <span className="block">Play Points: {totalPlayPoints}</span>
          </div>

          {/* Conditionally render the table */}
          {showTable && (
            <div className="overflow-x-auto mt-6">
              <FormTable
                data={filteredData}
                showPagination={true}
                columns={columns}
                showTotals={true} // Assuming you want totals displayed
                totalPlayPoints={totalPlayPoints}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameHistory;
