import React, { useState, useEffect } from "react";
import "./ChangePassword.css";
import { changeUserPassword } from "../../Common/OfferState/DashboardOfferState";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = import.meta.env.VITE_HOST_URL;

const ChangePassword = ({ userRole }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  // Function to validate the form
  const validateForm = () => {
    if (
      oldPassword.trim() &&
      newPassword.trim() &&
      confirmPassword.trim() &&
      newPassword === confirmPassword
    ) {
      setIsValid(true);
      setPasswordMatchError("");
    } else {
      setIsValid(false);
      if (newPassword !== confirmPassword) {
        setPasswordMatchError("Passwords do not match");
      } else {
        setPasswordMatchError("");
      }
    }
  };

  useEffect(() => {
    // Get user ID (Agent/SubAgent) and token from cookies dynamically
    const storedUserId = cookies.get("LoginUserId");
    const storedToken = cookies.get("token");

    console.log(`Retrieved ${userRole} ID from cookies:`, storedUserId);
    console.log("Retrieved token from cookies:", storedToken);

    if (storedUserId) setUserId(storedUserId);
    if (storedToken) setToken(storedToken);
  }, [userRole]);

  useEffect(() => {
    validateForm();
  }, [oldPassword, newPassword, confirmPassword]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") setOldPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  // Handle Reset
  const handleReset = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsValid(false);
    setPasswordMatchError("");
  };

  // Handle Password Change
  const handleChangePassword = async () => {
    console.log(`${userRole} Changing Password...`);

    const result = await changeUserPassword(
      oldPassword,
      newPassword,
      userId,
      token,
      userRole
    );

    if (result.success) {
      handleReset();
    } else {
      console.error(result.message);
    }
  };

  return (
    <div className="change-password-container">
      <h1 className="change-password-heading">Change {userRole} Password</h1>
      <form className="form">
        <div className="form-row">
          <div className="form-group">
            <label>
              Old Password: <span className="required">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter Old Password"
              className="input"
              name="oldPassword"
              value={oldPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              New Password: <span className="required">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter New Password"
              className="input"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              Confirm Password: <span className="required">*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm New Password"
              className="input"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
            {passwordMatchError && (
              <span className="error-message">{passwordMatchError}</span>
            )}
          </div>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className={`btn1 change-password ${!isValid ? "disabled" : ""}`}
            disabled={!isValid}
            onClick={handleChangePassword}
          >
            Change Password
          </button>
          <button type="reset" className="btn1 reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
