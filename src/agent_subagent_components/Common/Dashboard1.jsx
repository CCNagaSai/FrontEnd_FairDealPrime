import React from "react";
import "./Dashboard1.css";

const Dashboard1 = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="card-container">
        <div className="card blue">
          <div className="card-icon">
            <i className="fas fa-user"></i>
          </div>
          <div className="card-content">
            <h2>0</h2>
            <p>Active Players</p>
          </div>
        </div>

        <div className="card orange">
          <div className="card-icon">
            <i className="fas fa-user-times"></i>
          </div>
          <div className="card-content">
            <h2>0</h2>
            <p>In-active Players</p>
          </div>
        </div>

        <div className="card red">
          <div className="card-icon">
            <i className="fas fa-user-times"></i>
          </div>
          <div className="card-content">
            <h2>0</h2>
            <p>Suspend Players</p>
          </div>
        </div>
      </div>

      <div className="online-users-section">
        <p className="vertical-text">Online Users</p>
      </div>
    </div>
  );
};

export default Dashboard1;
