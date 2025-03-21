import React from "react";
import "../SubAgentdash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../subAgentSidebar"; // Adjust path to Sidebar component
import SubAReportInpoint from "./subAgentInPoints";
import Topbar from "../../Common/Topbar";
import InPointReport from "../../Create_Components/InPoints/InPoints";

const SubAgentInPoint = () => {
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
          <InPointReport userRole="Sub-Agent" />
        </div>
      </div>
    </div>
  );
};

export default SubAgentInPoint;
