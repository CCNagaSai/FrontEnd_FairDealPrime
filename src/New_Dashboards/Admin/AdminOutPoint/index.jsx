import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import AdminSidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import AReportOutpoint from "../../Agent/AgentOutPoints/AgentOutPoints";
import Topbar from "../../Common/Topbar";

const AdminOutPoint = () => {
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
          <AReportOutpoint />
        </div>
      </div>
    </div>
  );
};

export default AdminOutPoint;
