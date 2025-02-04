import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import AdminSidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import AReportpointfile from "../../Agent/AgentPointFile/AgentPointFile";
import Topbar from "../../Common/Topbar";

const AdminPointFile = () => {
  return (
    <div className="app">
      <div className="Header">
        <Topbar />
      </div>
      <div className="content">
        <div className="Left">
          <AdminSidebar />
        </div>
        <div className="Right">
          <AReportpointfile />
        </div>
      </div>
    </div>
  );
};

export default AdminPointFile;
