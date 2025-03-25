import React from "react";
import "../Agentdash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AgentSidebar"; // Adjust path to Sidebar component
import ADashboard from "./AgentDashboard";
import Topbar from "../../Common/Topbar";
import Dashboardplayers from "../../Create_Components/DashBoardPlayers/DashBoardPlayers";
const Agentdash = () => {
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
          <Dashboardplayers userRole="Agent" />
        </div>
      </div>
    </div>
  );
};

export default Agentdash;
