import React from "react";
import "./UserLockStatus.css";

const UserLockStatus = () => {
  return (
    <div className="user-lock-status-container">
      <h1 className="user-lock-status-heading">
        User Lock Status - <span className="status-cool">COOL</span>
      </h1>
      <div className="user-lock-status-box">
        <div className="form-group">
          <label htmlFor="lockStatus">USER LOCK STATUS:</label>
          <input type="text" id="lockStatus" className="input-box" value="UNLOCKED" readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="transactionPassword">TRANSACTION PASSWORD:</label>
          <input type="password" id="transactionPassword" className="input-box" />
        </div>
        <div className="button-group">
          <button className="btn btn-lock">LOCK</button>
          <button className="btn btn-unlock">UNLOCK</button>
          <button className="btn btn-clear">CLEAR</button>
          <button className="btn btn-close">CLOSE</button>
        </div>
      </div>
    </div>
  );
};

export default UserLockStatus;
