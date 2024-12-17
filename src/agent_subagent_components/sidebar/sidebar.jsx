import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-heading">Main Menu</div>
      <ul className="menu-list">
        <li>
          <strong>Home</strong>
          <ul>
            <li><a href="/agentdashboard">Dashboard</a></li>
          </ul>
        </li>
        <li>
          <strong>User Management</strong>
          <ul>
            <li><a href="/agent/search-users">Search Users</a></li>
            <li><a href="/agent/balance-adjustment">Balance Adjustment</a></li>
            <li><a href="/agent/kickoff-users">Kickoff Users</a></li>
          </ul>
        </li>
        <li>
          <strong>Agent Management</strong>
          <ul>
            <li><a href="/agent/create-user">Create User</a></li>
            <li><a href="/agent/change-password">Change Password</a></li>
          </ul>
        </li>
        <li>
          <strong>Reports</strong>
          <ul>
            <li><a href="/agent/pointfile">Point File</a></li>
            <li><a href="/agent/inpoint">In Points</a></li>
            <li><a href="/agent/outpoint">Out Points</a></li>
            <li><a href="/agent/gamehistory">Game History</a></li>
            <li><a href="/agent/Turn-over">Turn Over</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
