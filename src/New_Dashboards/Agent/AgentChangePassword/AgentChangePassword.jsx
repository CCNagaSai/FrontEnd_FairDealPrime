import React, { useState, useEffect } from "react";
import "./AgentChangePassword.css";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const AChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(""); // Error state
  const [token, setToken] = useState("");
  const [agentId, setAgentId] = useState("");

  // Function to validate the form
  const validateForm = () => {
    if (
      oldPassword.trim() &&
      newPassword.trim() &&
      confirmPassword.trim() &&
      newPassword === confirmPassword
    ) {
      setIsValid(true);
      setPasswordMatchError(""); // Clear error if passwords match
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
      // Get agentId and token from cookies
      const storedAgentId = cookies.get('LoginUserId'); // Fetch loginUserID from cookies
      const storedToken = cookies.get('token');        // Fetch token from cookies
    
      console.log("Retrieved loginUserID (Agent ID) from cookies:", storedAgentId);
      console.log("Retrieved token from cookies:", storedToken);
    
      if (storedAgentId) {
        setAgentId(storedAgentId); // Set the agentId in state
      } else {
        console.warn("No loginUserID found in cookies");
      }
    
      if (storedToken) {
        setToken(storedToken); // Set the token in state
      } else {
        console.warn("No token found in cookies");
      }
    }, []);

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
    setPasswordMatchError(""); // Clear error on reset
  };

  // Handle backend password validation
  const handleChangePassword = async (actionType) => {
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    // http://65.0.54.193:9999/admin/agent/agentChangePassword
    try {
      const response = await fetch("http://65.0.54.193:9999/admin/agent/agentChangePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ oldPassword, newPassword, agentId }),
      });

      const data = await response.json();

      if (data.isValid) {
        console.log(`Password validation success! Proceeding with: ${actionType}`);
        await updatePassword(actionType);
      } else {
        console.error("Old password is incorrect.");
      }
    } catch (error) {
      console.error("Error validating password:", error);
    }
  };

  const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  };

  const updatePassword = async (actionType) => {
    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getTokenFromCookies(),
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          actionType,
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log(`${actionType} password changed successfully.`);
        handleReset();
      } else {
        console.error("Error changing password:", data.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="change-password-container">
      <h1 className="change-password-heading">Change Password</h1>
      <form className="form">
        <div className="form-row">
          <div className="form-group">
            <label>
              Old Password: <span className="required">*</span>
            </label>
            <input
              type="password"
              placeholder="Password"
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
              placeholder="New Password"
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
              placeholder="Confirm Password"
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
            className={`btn1 change-login ${!isValid ? "disabled" : ""}`}
            disabled={!isValid}
            onClick={() => handleChangePassword("Change Login")}
          >
            Change Login
          </button>
          <button
            type="button"
            className="btn1 change-transaction disabled"
            disabled={true} // Always disabled
          >
            Change Transaction
          </button>
          <button
            type="button"
            className="btn1 change-report disabled"
            disabled={true} // Always disabled
          >
            Change Report
          </button>
          <button
            type="reset"
            className="btn1 reset"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AChangePassword;
