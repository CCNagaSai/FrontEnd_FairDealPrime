import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import AdminSidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import AGameHistory from "../../Agent/AgentGameHistory/AgentGameHistory";
import Topbar from "../../Common/Topbar";

const AdminGameHistory = () => {
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
          <AGameHistory />
        </div>
      </div>
    </div>
  );
};

export default AdminGameHistory;
