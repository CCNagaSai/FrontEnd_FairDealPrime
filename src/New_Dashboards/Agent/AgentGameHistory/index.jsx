import React from "react";
import "../Agentdash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AgentSidebar"; // Adjust path to Sidebar component
import AGameHistory from "./AgentGameHistory";
import Topbar from "../../Common/Topbar";
import GameHistory from "../../Create_Components/GameHistory/GameHistory";

const AgentGameHistory = () => {
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
          <GameHistory userRole="Agent" />
        </div>
      </div>
    </div>
  );
};

export default AgentGameHistory;
