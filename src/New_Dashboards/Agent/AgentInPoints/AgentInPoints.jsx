import React, { useState, useEffect, useRef } from "react";
import FormTable from "../../Common/Report/Table";
import "./AgentInPoints.css";
import { data } from "../../Common/data/data";
import AgentInPointTable from "./AgentInPointsTable";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const AReportInpoint = () => {
  const [filters, setFilters] = useState({
    receiveBy: "",
    sentBy: "",
    startDate: "",
    endDate: "",
    dateRange: "Select",
  });
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
        `http://93.127.194.87:9999/admin/usertransction/AgentTranscationData?Id=${id}&type=${type}`,
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

  // Handle filter change and date range calculations
  const handleDateRangeChange = (range) => {
    const today = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (range) {
      case "Today":
        startDate.setDate(today.getDate());
        endDate.setHours(23, 59, 59, 999);
        break;
      case "Yesterday":
        startDate.setDate(today.getDate() - 1);
        endDate.setDate(today.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "Last 7 Days":
        startDate.setDate(today.getDate() - 7);
        startDate.setHours(0, 0, 0, 0);
        break;
      case "Last 30 Days":
        startDate.setDate(today.getDate() - 30);
        startDate.setHours(0, 0, 0, 0);
        break;
      default:
        break;
    }

    setFilters((prev) => ({
      ...prev,
      startDate: startDate ? startDate.toISOString().split("T")[0] : "",
      endDate: endDate ? endDate.toISOString().split("T")[0] : "",
      dateRange: range,
    }));
  };

  const handleManualDateChange = (e, field) => {
    setFilters((prev) => ({
      ...prev,
      [field]: e.target.value,
      dateRange: "Select", // Reset range if manual dates are entered
    }));
  };

  const handleSubmit = () => {
    const { receiveBy, sentBy, startDate, endDate } = filters;

    let filtered = backendData;

    // Filter by Receive By
    if (receiveBy) {
      filtered = filtered.filter((entry) =>
        entry.receiver.toLowerCase().includes(receiveBy.toLowerCase())
      );
    }

    // Filter by Sent By
    if (sentBy) {
      filtered = filtered.filter((entry) =>
        entry.sender.toLowerCase().includes(sentBy.toLowerCase())
      );
    }

    // Filter by Date Range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.createdAt);
        return entryDate >= start && entryDate <= end;
      });
    }

    setFilteredData(filtered);
    setShowTable(true);
    fetchBackendData();
  };

  const handleClear = () => {
    setFilters({
      receiveBy: "",
      sentBy: "",
      startDate: "",
      endDate: "",
      dateRange: "Select",
    });
    setFilteredData(backendData); // Reset to all data
    setShowTable(false);
  };
  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 ml-[4px] mr-[4px] md:max-w-[1100px] mx-auto border border-blue-500 p-[5px]">
          <h2 className="text-blue-600 text-[18px] ml-1 md:text-xl font-bold  border-b border-blue-500 pb-1 ">
            In Points
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
                    value={filters.receiveBy}
                    onChange={(e) =>
                      setFilters({ ...filters, receiveBy: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <label className="block mb-2">Sent By:</label>
                  <input
                    type="text"
                    value={filters.sentBy}
                    onChange={(e) =>
                      setFilters({ ...filters, sentBy: e.target.value })
                    }
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
                    value={filters.startDate}
                    onChange={(e) => handleManualDateChange(e, "startDate")}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <label className="block mb-2">End Date:</label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => handleManualDateChange(e, "endDate")}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <label className="block mb-2">Date Range:</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => handleDateRangeChange(e.target.value)}
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
                    className="bg-blue-500 text-white p-2 md:p-3 md:px-4 py-2 rounded-lg font-bold hover:bg-blue-600 text-sm md:text-base w-20 md:w-auto"
                    onClick={handleSubmit}
                    style={{ width: "150px" }}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="bg-blue-500 text-white p-2 md:p-3 md:px-4 py-2 rounded-lg font-bold hover:bg-blue-600 text-sm md:text-base w-20 md:w-auto"
                    onClick={handleClear}
                    style={{ width: "150px" }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Backend Data Table */}
          {loading ? (
            <p>Loading backend data...</p>
          ) : (
            <AgentInPointTable backendData={backendData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AReportInpoint;
