import React, { useState, useRef, useEffect } from "react";
import "./AgentViewSubAgents.css";
import Cookies from "universal-cookie";


const cookies = new Cookies();

const AViewSubAgents = ({ subAgent, onBack }) => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isEditingLock, setIsEditingLock] = useState(false);
  const [lockStatus, setLockStatus] = useState(subAgent.status ? "Active" : "Inactive");

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
      const response = await fetch(
        `http://65.0.54.193:9999/admin/shop/ShopUpdate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            userId: subAgent._id,
            name: subAgent.name,
            password: newPassword || subAgent.password,
            location: subAgent.location,
            status: subAgent.status,

          }),
        }
      );

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

  const handleLockStatusUpdate = async () => {
    try {
      const response = await fetch(
        `http://65.0.54.193:9999/admin/shop/ShopUpdate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            userId: subAgent._id,
            name: subAgent.name,
            password: newPassword || subAgent.password,
            location: subAgent.location,
            status: lockStatus === "Active" ? "active" : "inactive",

          }),
        }
      );

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

  if (!subAgent) return null;

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">View Sub Agents</h2>

      <div className="user-details">
        {/* Personal Information Section */}
        <div className="section personal-info">
          <h3>
            <strong>Personal Information</strong>
          </h3>
          <div className="row">
            <div className="column">
              <p>
                <strong>User Name:</strong> {subAgent.name || "N/A"}
              </p>
            </div>
            <div className="column">
              <p>
                <strong>Points:</strong> {subAgent.chips || 0}
              </p>
              <p>
                <strong>Last Login:</strong> {subAgent.lastLoginDate || "N/A"}
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
                  <button onClick={handlePasswordUpdate}>Update Password</button>
                </div>
              ) : (
                <p className="edit-link" onClick={() => setIsEditingPassword(true)}>
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
                  <select value={lockStatus} onChange={(e) => setLockStatus(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <button onClick={handleLockStatusUpdate}>Update Status</button>
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

export default AViewSubAgents;

