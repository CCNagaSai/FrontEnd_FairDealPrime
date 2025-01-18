import React, { useState, useEffect, useRef } from "react";
import FormTable from "../../Common/Report/Table";
import "./subAgentPointFile.css";
import { data } from "../../Common/data/data";
import SubAgentPointFileTable from "./subAgentPointfileTable";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const SubAReportpointfile = () => {
  const [receiveBy, setReceiveBy] = useState("");
  const [sentBy, setSentBy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateRange, setDateRange] = useState("Select");
  const [filteredData, setFilteredData] = useState(data);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [columns, setColumns] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [backendData, setBackendData] = useState([]);

  const [loading, setLoading] = useState(false);
  const desktopColumns = [
    "S.no",
    "Date",
    "Receiver",
    "Old Points",
    "In",
    "Out",
    "New Points",
    "Sender",
    "Trans.Id",
    "Comments",
  ];

  const mobileColumns = [
    "S.no",
    "Date",
    "Receiver",
    "Old Points",
    "In",
    "Out",
    "New Points",
    "Sender",
    "Trans.Id",
    "Comments",
  ];
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

  // Store id and type using useRef
  const idRef = useRef(null);
  const typeRef = useRef(null);
  const tokenRef = useRef(null);
  useEffect(() => {
    const id = cookies.get("LoginUserId");
    const type = cookies.get("name");
    const token = cookies.get("token");
    console.log("Cookies:", { id, type, token });
    idRef.current = id;
    typeRef.current = type;
    tokenRef.current = token;
  }, []);

  const fetchBackendData = async () => {
    try {
      setLoading(true);
      console.log("Attempting to fetch backend data...");
      const id = idRef.current;
      const type = typeRef.current;
      const token = tokenRef.current;

      if (!id || !type) {
        console.error("ID or type not found in cookies.");
        return;
      }

      console.log("Fetching with:", { id, type, token });

      const response = await fetch(
        `http://93.127.194.87:9999/admin/usertransction/SubAgentTranscationData?Id=${id}&type=${type}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        console.error("API Error:", response.statusText);
        return;
      }

      const result = await response.json();
      console.log("Backend Data:", result);

      if (result.DepositeList) {
        setBackendData(result.DepositeList);
      } else {
        console.error("No data found in the response.");
      }
    } catch (error) {
      console.error("Error fetching backend data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let filtered = backendData; // Start with all backend data

    // Filter by "Receive By"
    if (receiveBy) {
      filtered = filtered.filter((entry) =>
        entry.receiver.toLowerCase().includes(receiveBy.toLowerCase())
      );
    }

    // Filter by "Sent By"
    if (sentBy) {
      filtered = filtered.filter((entry) =>
        entry.sender.toLowerCase().includes(sentBy.toLowerCase())
      );
    }

    // Filter by "Start Date" and "End Date"
    if (startDate && endDate) {
      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.date); // Convert entry date to Date object
        return (
          entryDate >= new Date(startDate) && entryDate <= new Date(endDate)
        );
      });
    }

    // Filter by "Date Range"
    const today = new Date();
    if (dateRange !== "Select") {
      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.date);

        if (dateRange === "Today") {
          return entryDate.toDateString() === today.toDateString(); // Same day
        }

        if (dateRange === "Yesterday") {
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          return entryDate.toDateString() === yesterday.toDateString(); // Same day as yesterday
        }

        if (dateRange === "Last 7 Days") {
          const last7Days = new Date(today);
          last7Days.setDate(today.getDate() - 7);
          return entryDate >= last7Days && entryDate <= today;
        }

        if (dateRange === "Last 30 Days") {
          const last30Days = new Date(today);
          last30Days.setDate(today.getDate() - 30);
          return entryDate >= last30Days && entryDate <= today;
        }

        return true; // Default
      });
    }

    // Update filtered data state
    setFilteredData(filtered);
    setShowTable(true); // Show the table
  };

  const handleClear = () => {
    setReceiveBy("");
    setSentBy("");
    setStartDate("");
    setEndDate("");
    setDateRange("Select");
    setFilteredData(backendData); // Reset to all backend data
    setShowTable(false);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 ml-[4px] mr-[4px] md:max-w-[1100px] mx-auto border border-blue-500 p-[5px]">
          <h2 className="text-blue-600 text-[18px] ml-1 md:text-xl font-bold  border-b border-blue-500 pb-1 ">
            Ledger
          </h2>

          {/* Filter Form */}
          <div className="bg-[#e6ebff] p-5 rounded-lg shadow-lg m-1 sm:m-3">
            <form
              className="flex flex-col items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* First Row - Two Input Fields */}
              <div className="grid grid-cols-2 gap-4 mb-5 w-full">
                <div className="flex-1">
                  <label className="block mb-2">Receive By:</label>
                  <input
                    type="text"
                    value={receiveBy}
                    onChange={(e) => setReceiveBy(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <label className="block mb-2">Sent By:</label>
                  <input
                    type="text"
                    value={sentBy}
                    onChange={(e) => setSentBy(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Second Row - Three Input Fields */}
              <div className="grid grid-cols-3 gap-4 mb-5 w-full">
                <div className="flex-1">
                  <label className="block mb-2">Start Date:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <label className="block mb-2">End Date:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex-1">
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

              {/* Buttons */}
              <div className="flex justify-center w-full">
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* {showTable && (
            <div className="overflow-x-auto mt-6">
              <FormTable
                data={filteredData}
                columns={columns}
                showPagination={true}
                showTotalInOut={true}
              />
            </div>
          )} */}
          {/* Backend Data Table */}
          {loading ? (
            <p>Loading backend data...</p>
          ) : (
            <SubAgentPointFileTable backendData={backendData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubAReportpointfile;
