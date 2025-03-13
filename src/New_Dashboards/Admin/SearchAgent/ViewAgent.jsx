import React, { useState, useRef, useEffect } from "react";
import "../../Agent/AgentSearchUsers/AgentViewUsers.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = import.meta.env.VITE_HOST_URL;

const ViewAgents = ({ user, onBack }) => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isEditingLock, setIsEditingLock] = useState(false);
  const [lockStatus, setLockStatus] = useState(
    user.status ? "Active" : "Inactive"
  );

  const tokenRef = useRef(null);
  const agentIdRef = useRef(null);

  useEffect(() => {
    tokenRef.current = cookies.get("token");
    agentIdRef.current = cookies.get("LoginUserId");
  }, []);

  const token = tokenRef.current;
  const agentId = agentIdRef.current;

  const handlePasswordUpdate = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/agent/AgentUpdate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          // userId: "67aabdd7813bc442da34ef0c",
          // password: "87654321",

          userId: user._id,
          password: newPassword,
          name: user.name,
          location: "India",
          status: "active",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update password.");
      }

      const result = await response.json();
      console.log("Password update response:", result);
      alert("Password updated successfully!");
      setIsEditingPassword(false);
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  // `http://93.127.194.87:9999/admin/agent/changeUserStatus?agentId=${agentId}&userId=${user._id}`
  const handleLockStatusUpdate = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/agent/AgentUpdate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          userId: "67aabdd7813bc442da34ef0c",
          name: user.name,
          location: "India",
          status: lockStatus === "Active", // Converts "Active"/"Inactive" to true/false
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update lock status.");
      }

      const result = await response.json();
      console.log("Lock status update response:", result);
      alert("Lock status updated successfully!");
      setIsEditingLock(false);
    } catch (error) {
      console.error("Error updating lock status:", error);
      alert("Failed to update lock status. Please try again.");
    }
  };

  if (!user) return null;

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">View Users</h2>

      <div className="user-details">
        {/* Personal Information Section */}
        <div className="section personal-info">
          <h3>
            <strong>Personal Information</strong>
          </h3>
          <div className="row">
            <div className="column">
              <p>
                <strong>User Name:</strong> {user.name || "N/A"}
              </p>
              <p>
                <strong>Total Bets:</strong> {user.totalBets || 0}
              </p>
            </div>
            <div className="column">
              <p>
                <strong>Total Wons:</strong> {user.totalWons || 0}
              </p>
              <p>
                <strong>Lock Status:</strong> {lockStatus}
              </p>
            </div>
            <div className="column">
              <p>
                <strong>Points:</strong> {user.chips || 0}
              </p>
              <p>
                <strong>Last Login:</strong> {user.lastLoginDate || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Manage Details Section */}
        <div className="section manage-details">
          <h3>
            <strong>Manage Details</strong>
          </h3>
          <div className="row">
            <div className="column">
              <p>
                <strong>Password:</strong> *********
              </p>
              {isEditingPassword ? (
                <div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <button onClick={handlePasswordUpdate}>
                    Update Password
                  </button>
                </div>
              ) : (
                <p
                  className="edit-link"
                  onClick={() => setIsEditingPassword(true)}
                >
                  Edit
                </p>
              )}
            </div>
            <div className="column">
              <p>
                <strong>Lock:</strong>
              </p>
              {isEditingLock ? (
                <div>
                  <select
                    value={lockStatus}
                    onChange={(e) => setLockStatus(e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <button onClick={handleLockStatusUpdate}>
                    Update Status
                  </button>
                </div>
              ) : (
                <p className="edit-link" onClick={() => setIsEditingLock(true)}>
                  Edit
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={onBack}>
        Back to List
      </button>
    </div>
  );
};

export default ViewAgents;
