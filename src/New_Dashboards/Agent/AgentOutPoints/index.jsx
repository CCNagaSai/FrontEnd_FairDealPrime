import React from "react";
import "../Agentdash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AgentSidebar"; // Adjust path to Sidebar component
import AReportOutpoint from "./AgentOutPoints";
import Topbar from "../../Common/Topbar";
import OutPointReport from "../../Create_Components/OutPoints/OutPoints";

const AgentOutPoint = () => {
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
          <OutPointReport userRole="Agent" />
        </div>
      </div>
    </div>
  );
};

export default AgentOutPoint;
