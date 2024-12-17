import React, { useState, useEffect } from 'react';
import FormTable from './Report/Table';
import './Reportoutpoint.css';
import { data } from './data/data'; // Import your data


const Inpoint = () => {
    const [receiveBy, setReceiveBy] = useState('');
    const [sentBy, setSentBy] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateRange, setDateRange] = useState('Select');
    const [filteredData, setFilteredData] = useState(data);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Track screen size
    const [showTable, setShowTable] = useState(false); // State to control table visibility

    // Desktop and mobile columns
    const desktopColumns = [
        'S.no',
        'Trans.Id',
        'Date',
        'Receiver',
        'Old Points',
        'In',
        'New Points',
        'Sender',
        'Comments',
    ];

    const mobileColumns = [
        'S.no',
        'Trans.Id',
        'Date',
        'Receiver',
    ];

    // Dynamically adjust columns based on screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [columns, setColumns] = useState(isMobile ? mobileColumns : desktopColumns);

    // Set the appropriate columns based on the screen size
    useEffect(() => {
        setColumns(isMobile ? mobileColumns : desktopColumns);
    }, [isMobile]);

    // Filter function
    const handleFilterChange = (event) => {
        event.preventDefault();
        let filtered = data;

        // Apply filtering logic here
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

        setFilteredData(filtered); // Update the filtered data
        setShowTable(true); // Show the table after filtering
    };

    const handleClear = () => {
        // Reset the form filters to their default values and show all data
        setSentBy('');
        setStartDate('');
        setEndDate('');
        setDateRange('Select');
        setFilteredData(data); // Set the filtered data back to the full dataset
        setShowTable(false); // Hide the table after clearing filters
    };

    return (
        <div>
            {/* Header Section */}
            {/* <div className="text-blue-600 text-2xl font-bold border-b-2 pb-4 mb-5">
                <Header />
            </div> */}

            {/* Main Content Section */}
            <div className="flex flex-col md:flex-row">
            {/* <div className="flex-none w-full sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 pr-2">
                    <Sidebar />
                </div> */}

                <div className="flex-1 ml-[4px] mr-[4px] md:max-w-[1100px] mx-auto border border-blue-500 p-[5px]">
                <h2 className="text-blue-600 text-[18px] ml-1 md:text-xl font-bold mb-6 border-b border-blue-500 pb-3 ">
                        In Points Report
                    </h2>

                    {/* Form to filter data */}
                    <div className="bg-[#e6ebff] p-5 rounded-lg shadow-lg m-1 sm:m-3">
                    <form className="flex flex-col items-center" onSubmit={handleFilterChange}>
                            {/* Sent By Input */}
                            <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 mb-0 sm:mb-5 w-full">
                            <div className="flex-1 mb-4 ">
                            <label className="block mb-2">Sent By:</label>
                                    <input
                                        type="text"
                                        value={sentBy}
                                        onChange={(e) => setSentBy(e.target.value)}
                                        className="w-full p-2 sm:p-3 max-w-[450px] border  border-gray-300 rounded-lg"
                                        />
                                </div>
                            </div>

                            {/* Start Date, End Date, Date Range Inputs */}
                            <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 mb-5 w-full">
                                <div className="flex-1 mb-4 ">
                                    <label className="block mb-2">Start Date:</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
                                        />
                                </div>

                                <div className="flex-1 mb-4 sm:mb-0">
                                    <label className="block mb-2">End Date:</label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
                                        />
                                </div>

                                <div className="flex-1 mb-4 sm:mb-0">
                                    <label className="block mb-2">Date Range:</label>
                                    <select
                                        value={dateRange}
                                        onChange={(e) => setDateRange(e.target.value)}
                                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
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
                                        type="submit"
                                        className="bg-blue-500 text-white p-2 sm:p-3 md:px-4 py-2 rounded-lg font-bold hover:bg-blue-600 text-sm sm:text-base w-20 sm:w-auto"
                                        style={{ width: '100px' }}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white p-2 sm:p-3 md:px-4 py-2 rounded-lg font-bold hover:bg-blue-600 text-sm sm:text-base w-20 sm:w-auto"
                                        onClick={handleClear}
                                        style={{ width: '100px' }}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Display the Table */}
                    {showTable && (
                        <div className="overflow-x-auto mt-6">
                            <FormTable
                                data={filteredData}
                                columns={columns}
                                showTotals={false}
                                showTotalIn={true}
                                showPagination={true}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Inpoint;
