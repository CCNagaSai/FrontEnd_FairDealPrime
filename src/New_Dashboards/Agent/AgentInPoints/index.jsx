import React from "react";
import "../Agentdash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AgentSidebar"; // Adjust path to Sidebar component
import AReportInpoint from "./AgentInPoints";
import Topbar from "../../Common/Topbar";
import InPointReport from "../../Create_Components/InPoints/InPoints";

const AgentInPoint = () => {
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
          <InPointReport userRole="Agent" />
        </div>
      </div>
    </div>
  );
};

export default AgentInPoint;
