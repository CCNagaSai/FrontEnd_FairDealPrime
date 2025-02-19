import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import SubAReportpointfile from "../../SubAgent/subAgentPointFile/subAgentPointFile";
import SubAReportInpoint from "../../SubAgent/subAgentInPoints/subAgentInPoints";
import SubAReportOutpoint from "../../SubAgent/subAgentOutPoints/subAgentOutPoints";
import AReportpointfile from "../../Agent/AgentPointFile/AgentPointFile";
import AReportOutpoint from "../../Agent/AgentOutPoints/AgentOutPoints";
import AReportInpoint from "../../Agent/AgentInPoints/AgentInPoints";

const API_URL = import.meta.env.VITE_HOST_URL;
const AgentSubAgentPointFile = () => {
  const [userList, setUserList] = useState([]); // Store agents/sub-agents
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [selectedRole, setSelectedRole] = useState(""); // Role: Agent / Sub Agent
  const navigate = useNavigate();
  const cookies = new Cookies();
  const id = cookies.get("LoginUserId");
  // Dynamically set type based on role
  const type = selectedRole === "Agent" ? "Agent" : "Shop";

  // Fetch Agents or Sub Agents based on Role Selection
  useEffect(() => {
    if (!selectedRole) return; // Stop if no role selected

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        setUserList([]); // Clear previous list
        const token = cookies.get("token");
        if (!id) throw new Error("Missing id from cookies");

        let endpoint =
          selectedRole === "Agent"
            ? `${API_URL}/admin/agent/AgentList`
            : `${API_URL}/admin/shop/ShopList?agentId=Admin`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const result = await response.json();
        console.log("Fetched Data:", result);

        // FIXED: Use correct key from API response
        const userKey = selectedRole === "Agent" ? "agentList" : "shopList";
        setUserList(result[userKey] || []); // Set the data
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [selectedRole]); // Runs when `selectedRole` changes

  // Submit button handler
  const handleSubmit = () => {
    console.log("Submitting with selected user:", selectedUser);
    setShowReport(true);
  };

  // Clear button handler
  const handleClear = () => {
    setSelectedUser("");
    setSelectedType("");
    setSelectedRole("");
    setShowReport(false);
    setUserList([]); // Reset user list
  };

  return (
    <div className="p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Agent/Sub Agent Points File</h2>

      <div className="mb-4 flex justify-center space-x-4 w-full">
        {/* Role Selection */}
        <div className="w-1/3">
          <label className="block mb-1">Select Role:</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="">Select Role</option>
            <option value="Agent">Agent</option>
            <option value="Sub Agent">Sub Agent</option>
          </select>
        </div>

        {/* Dynamic User List (Agents or Sub Agents) */}
        <div className="w-1/3">
          <label className="block mb-1">Select {selectedRole}:</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="p-2 border rounded w-full"
            disabled={!selectedRole || loading} // Disable if no role is selected or loading
          >
            <option value="">Select {selectedRole}</option>
            {loading ? (
              <option>Loading...</option>
            ) : (
              userList.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Select Report Type */}
        <div className="w-1/3">
          <label className="block mb-1">Select Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="">Select Type</option>
            <option value="Points File">Points File</option>
            <option value="InPoints">InPoints</option>
            <option value="OutPoints">OutPoints</option>
          </select>
        </div>
      </div>

      {/* Submit & Clear Buttons */}
      <div className="flex justify-center space-x-4 mt-4 mb-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded w-32"
          disabled={!selectedUser || !selectedType}
        >
          Submit
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-400 text-white p-2 rounded w-32"
        >
          Clear
        </button>
      </div>

      {/* Report Components for Sub-Agent */}
      {showReport && selectedRole === "Sub Agent" && (
        <>
          {selectedType === "InPoints" && (
            <SubAReportInpoint subAgentId={selectedUser} type={type} />
          )}
          {selectedType === "OutPoints" && (
            <SubAReportOutpoint subAgentId={selectedUser} type={type} />
          )}
          {selectedType === "Points File" && (
            <SubAReportpointfile subAgentId={selectedUser} type={type} />
          )}
        </>
      )}

      {/* Report Components for Agent */}
      {showReport && selectedRole === "Agent" && (
        <>
          {selectedType === "InPoints" && (
            <AReportInpoint agentId={selectedUser} type={type} />
          )}
          {selectedType === "OutPoints" && (
            <AReportOutpoint agentId={selectedUser} type={type} />
          )}
          {selectedType === "Points File" && (
            <AReportpointfile agentId={selectedUser} type={type} />
          )}
        </>
      )}
    </div>
  );
};

export default AgentSubAgentPointFile;
