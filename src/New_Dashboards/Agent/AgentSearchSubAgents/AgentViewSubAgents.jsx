import React from "react";
import "./AgentViewSubAgents.css";

const AViewSubAgents = () => {
  return (
    <div className="user-list-container">
      <h2 className="user-list-title">View Users</h2>
      <div className="user-details">
        {/* Personal Information Section */}
        <div className="section personal-info">
          <h3>Personal Information</h3>
          <div className="row">
            <div className="column">
              <p><strong>User Name:</strong> Sana3</p>
              <p><strong>Total Bets:</strong> 99880</p>
              <p><strong>Registration Date:</strong> 2024-08-29 08:51:58</p>
            </div>
            <div className="column">
              <p><strong>Agent:</strong> DUBAI69</p>
              <p><strong>Total Wons:</strong> 83781.68</p>
              <p><strong>Lock Status:</strong> UNLOCKED</p>
            </div>
            <div className="column">
              <p><strong>Points:</strong> 2.6799999999998</p>
              <p><strong>Last Login:</strong> 2024-09-05 09:32</p>
              <p><strong>Locked By:</strong> NULL</p>
            </div>
          </div>
        </div>

        {/* Manage Details Section */}
        <div className="section manage-details">
          <h3>Manage Details</h3>
          <div className="row">
            <div className="column">
              <p><strong>Password:</strong> *********</p>
              <p className="edit-link">Edit</p>
            </div>
            <div className="column">
              <p><strong>Lock:</strong></p>
              <p className="edit-link">Edit</p>
            </div>
            <div className="column">
              <p><strong>Edit Eligible Game:</strong></p>
              <p className="edit-link">Edit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AViewSubAgents;
