import React from "react";
import "../SubAgentdash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../subAgentSidebar"; // Adjust path to Sidebar component
import SubAGameHistory from "./subAgentGameHistory";
import Topbar from "../../Common/Topbar";
import GameHistory from "../../Create_Components/GameHistory/GameHistory";

const SubAgentGameHistory = () => {
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
          <GameHistory userRole="Sub-Agent" />
        </div>
      </div>
    </div>
  );
};

export default SubAgentGameHistory;
