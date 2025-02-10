import React, { useState, useEffect, useRef } from "react";
import FormTable from "../../Common/Report/Table";
import "./subAgentInPoints.css";
import { data } from "../../Common/data/data";
import SubAgentInPointTable from "./subAgentInPointsTable";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const SubAReportInpoint = ({subAgentId, type}) => {
  const [filters, setFilters] = useState({
    receiveBy: "",
    sentBy: "",
    startDate: "",
    endDate: "",
    dateRange: "Select",
  });

  const [filteredData, setFilteredData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [columns, setColumns] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [backendData, setBackendData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Store id and type using useRef
  const idRef = useRef(null);
  const typeRef = useRef(null);
  const tokenRef = useRef(null);
  
    useEffect(() => {
      console.log("Location State:", location.state); // Debugging: check received state
    
      const id = subAgentId || cookies.get("LoginUserId"); 
      const types = type || cookies.get("name");
      const token = cookies.get("token");
    
      console.log("Received from First Code:", { id, types });
    
      idRef.current = id;
      typeRef.current = types;
      tokenRef.current = token;
    }, [subAgentId, type]);

  useEffect(() => {
    fetchBackendData();
  }, []);
  
  const fetchBackendData = async () => {
    try {
      setLoading(true);
      const id = idRef.current;
      const type = typeRef.current;
      const token = tokenRef.current;
  
      if (!id || !type) {
        console.error("ID or type not found in cookies.");
        return;
      }


      console.log("Fetching with:", { id, type, token });

  
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
  
      if (result.DepositeList) {
        setBackendData(result.DepositeList);
        setFilteredData(result.DepositeList); // Initialize filtered data
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
  // Handle filter change and date range calculations
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
    setFilters((prev) => ({
      ...prev,
      [field]: e.target.value,
      dateRange: "Select", // Reset range if manual dates are entered
    }));
  };

  const handleSubmit = () => {
    const { receiveBy, sentBy, startDate, endDate, username } = filters;
    let filtered = backendData;
  
    console.log("Filters:", filters); // Log filters for debugging
  
    // Filter by Receive By (Case-insensitive)
    // Filter by Receive By
    if (receiveBy) {
      filtered = filtered.filter((entry) => {
        let receiver = '';
        switch (entry.trnxTypeTxt) {
          case 'Agent Addeed Chips':
            receiver = entry.name ? entry.name.toLowerCase() : ''; // Subagent is receiver
            break;
          case 'Agent duduct Chips':
            receiver = entry.adminname ? entry.adminname.toLowerCase() : ''; // Admin is receiver
            break;
          case 'Add Chips to User':
            receiver = entry.username ? entry.username.toLowerCase() : ''; // User is receiver
            break;
          case 'User Deduct Chips Added':
            receiver = entry.adminname ? entry.adminname.toLowerCase() : '';
            break;
          default:
            receiver = '';
        }
        return receiver.includes(receiveBy.toLowerCase());
      });
    }

    // Filter by Sent By
    if (sentBy) {
      filtered = filtered.filter((entry) => {
        let sender = '';
        switch (entry.trnxTypeTxt) {
          case 'Agent Addeed Chips':
            sender = entry.adminname ? entry.adminname.toLowerCase() : '';
            break;
          case 'Agent duduct Chips':
            sender = entry.name ? entry.name.toLowerCase() : '';
            break;
          case 'Add Chips to User':
            sender = entry.adminname ? entry.adminname.toLowerCase() : '';
            break;
          case 'User Deduct Chips Added':
            sender = entry.username ? entry.username.toLowerCase() : '';
            break;
          default:
            sender = '';
        }
        return sender.includes(sentBy.toLowerCase());
      });
    }

  
    // Filter by Username (either receiver or sender)
    // Filter by Username (either receiver or sender)
    if (username) {
      filtered = filtered.filter((entry) => {
        const adminName = entry.adminname ? entry.adminname.toLowerCase() : "";
        const agentName = entry.name ? entry.name.toLowerCase() : "";
        const userName = entry.username ? entry.username.toLowerCase() : "";

        return (
          adminName.includes(username.toLowerCase()) ||
          agentName.includes(username.toLowerCase()) ||
          userName.includes(username.toLowerCase())
        );
      });
    }
  
    // Filter by Date Range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.createdAt.split('T')[0]); // Extract only date part for comparison
        return entryDate >= start && entryDate <= end;
      });
    }
  
    console.log("Filtered Data:", filtered); // Log filtered data for debugging
    setFilteredData(filtered);
  
    // Only show table if there is data to display
    setShowTable(filtered.length > 0);
  };
  
  
  const handleClear = () => {
    setFilters({
      receiveBy: "",
      sentBy: "",
      startDate: "",
      endDate: "",
      dateRange: "Select",
      username: "",
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
                <label className="block mb-2">Username:</label>
                <input
                  type="text"
                  value={filters.username}
                  onChange={(e) =>
                    setFilters({ ...filters, username: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              </div>
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

                {/* Date Range */}
                <div className="flex-1 min-w-[140px]">
                  <label className="block mb-2">Date Range:</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => handleDateRangeChange(e.target.value)}
                    className="w-full p-2 md:p-3 border border-gray-300 rounded-lg"
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
            showTable ? (
              <SubAgentInPointTable backendData={filteredData} />
            ) : (
              <p></p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SubAReportInpoint;
