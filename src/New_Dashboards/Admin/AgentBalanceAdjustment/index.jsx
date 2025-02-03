import React from "react";
import "../Admindash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import AgentBalanceAdjust from "../../Agent/AgentBalanceAdjustment/AgentBalanceAdjust";
import Topbar from "../../Common/Topbar";

const AgentBalanceAdjustments = () => {
  return (
    <div className="app">
      <div className="Header">
        <Topbar />
      </div>
      <div className="content">
        <div className="Left">
          <Sidebar />
        </div>
        <div className="Right">
          <AgentBalanceAdjust />
        </div>
      </div>
    </div>
  );
};

export default AgentBalanceAdjustments;
