import React, { useState, useEffect } from 'react';
import Sidebar from '../common/sidebar/sidebar';
import FormTable from '../common/Report/Table';
import './Reportoutpoint.css';
import { data } from '../common/data/data';  // Import your data
import ImageComponent from './Header';

const Reportoutpoint = () => {
  const [receiveBy, setReceiveBy] = useState('');
  const [sentBy, setSentBy] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateRange, setDateRange] = useState('Select');
  const [filteredData, setFilteredData] = useState(data);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Track screen size
  const [columns, setColumns] = useState([]); // State to hold dynamic columns
  const [showTable, setShowTable] = useState(false); // State to control table visibility


  // Desktop and mobile columns
  const desktopColumns = [
    'S.no',
    'Trans.Id',
    'Date',
    'Sender',
    'Old Points',
    'Out',
    'New Points',
    'Receiver',
    'Comments',
  ];

  const mobileColumns = [
    'S.no',
    'Trans.Id',
    'Date',
    'Sender',
  ];

  // Dynamically adjust columns based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set the appropriate columns based on the screen size
  useEffect(() => {
    setColumns(isMobile ? mobileColumns : desktopColumns);
  }, [isMobile]);

  const handleFilterChange = () => {
    let filtered = data;

    if (startDate && endDate) {
      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
      });
    }

    if (receiveBy) {
      filtered = filtered.filter((entry) =>
        entry.receiver.toLowerCase().includes(receiveBy.toLowerCase())
      );
    }

    if (sentBy) {
      filtered = filtered.filter((entry) =>
        entry.sender.toLowerCase().includes(sentBy.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setShowTable(true); // Show the table after applying filters
  };

  const handleClear = () => {
    setReceiveBy('');
    setSentBy('');
    setStartDate('');
    setEndDate('');
    setDateRange('Select');
    setFilteredData(data); // Reset filters
    setShowTable(false); // Hide the table after clearing filters
  };

  // Calculate total for "Out" column
  const totalOut = filteredData.reduce((acc, entry) => acc + parseFloat(entry.out || 0), 0);

  return (
    <div>
      {/* Header Section */}
      <div className="text-blue-600 text-2xl font-bold border-b-2 pb-4 mb-5"><ImageComponent/></div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row">
        <div className="flex-none w-full  sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 pr-2">
          <Sidebar />
        </div>

        <div className="flex-1 max-w-[1100px] mx-auto border border-blue-500">
          <h2 className="text-blue-600 text-2xl font-bold mb-6 border-b border-blue-500 pb-3 ml-5">Out Points Report</h2>

          {/* Filter Form */}
          <div className="bg-[#e6ebff] p-5 rounded-lg shadow-lg m-3">
            <form className="flex flex-col items-center">
              {/* First row: Received By */}
              <div className="flex flex-col sm:flex-row justify-between space-x-4 mb-5 w-full">
                <div className="flex-1 mb-4 sm:mb-0">
                  <label className="block mb-2">Received By:</label>
                  <input
                    type="text"
                    value={receiveBy}
                    onChange={(e) => setReceiveBy(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    style={{ width: '350px' }}
                  />
                </div>
              </div>

              {/* Second row: Start Date, End Date, Date Range */}
              <div className="flex flex-col sm:flex-row justify-between space-x-4 mb-5 w-full">
                <div className="flex-1 mb-4 sm:mb-0">
                  <label className="block mb-2">Start Date:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex-1 mb-4 sm:mb-0">
                  <label className="block mb-2">End Date:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
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

          {/* Display total for Out only */}
          <div className="mt-6 text-blue-600 text-lg font-bold ml-3">
            <h3>Total: Out ({totalOut})</h3>
          </div>

          {/* Pass filtered data and dynamic columns */}
          {showTable && <FormTable data={filteredData} columns={columns} showTotals={false} />}
        </div>
      </div>
    </div>
  );
};

export default Reportoutpoint;
