import React, { useState, useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import {
  handlePasswordUpdate,
  handleLockStatusUpdate,
} from "../../Common/OfferState/DashboardOfferState";
import "./ViewUser.css";

const cookies = new Cookies();
const API_URL = import.meta.env.VITE_HOST_URL;

const ViewUser = ({ user, userRole, onBack }) => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isEditingLock, setIsEditingLock] = useState(false);
  const [lockStatus, setLockStatus] = useState(
    user.status ? "Active" : "Inactive"
  );

  const tokenRef = useRef(null);
  const userIdRef = useRef(null);

  useEffect(() => {
    tokenRef.current = cookies.get("token");
    userIdRef.current = cookies.get("LoginUserId");
  }, []);

  const token = tokenRef.current;
  const loggedInUserId = userIdRef.current;

  const handlePasswordUpdates = async () => {
    const success = await handlePasswordUpdate(
      user._id,
      newPassword,
      token,
      userRole
    );
    if (success) {
      setIsEditingPassword(false);
    }
  };

  const handleLockStatusUpdates = async () => {
    const success = await handleLockStatusUpdate(
      user._id,
      lockStatus,
      token,
      userRole
    );
    if (success) {
      setIsEditingLock(false);
    }
  };

  if (!user) return null;

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">{userRole} Details</h2>

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
                  <button onClick={handlePasswordUpdates}>
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
                  <button onClick={handleLockStatusUpdates}>
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
export default ViewUser;
