import React, { useState, useEffect } from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Function to validate the form
  const validateForm = () => {
    // Check if all fields are filled and new password matches confirm password
    if (
      oldPassword.trim() &&
      newPassword.trim() &&
      confirmPassword.trim() &&
      newPassword === confirmPassword
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  // UseEffect to trigger validation whenever any input changes
  useEffect(() => {
    validateForm();
  }, [oldPassword, newPassword, confirmPassword]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") {
      setOldPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  // Handle Reset
  const handleReset = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsValid(false); // Reset button states to inactive
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
              <span className="info-icon">ⓘ</span>
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
              <span className="info-icon">ⓘ</span>
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
          </div>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="btn1 change-login"
            disabled={!isValid}
          >
            Change Login
          </button>
          <button
            type="button"
            className="btn1 change-transaction"
            disabled={!isValid}
          >
            Change Transaction
          </button>
          <button
            type="button"
            className="btn1 change-report"
            disabled={!isValid}
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

export default ChangePassword;

