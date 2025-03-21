import React from "react";
import "../SubAgentdash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../subAgentSidebar"; // Adjust path to Sidebar component
import SubAReportOutpoint from "./subAgentOutPoints";
import Topbar from "../../Common/Topbar";
import OutPointReport from "../../Create_Components/OutPoints/OutPoints";

const SubAgentOutPoint = () => {
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
          <OutPointReport userRole="Sub-Agent" />
        </div>
      </div>
    </div>
  );
};

export default SubAgentOutPoint;
