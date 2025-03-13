import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import AdminSidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import Topbar from "../../Common/Topbar";
import IAdminGameHistory from "./AdminGameHistory";
import GameHistory from "../../Create_Components/GameHistory/GameHistory";

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
          <GameHistory userRole="Admin" />
        </div>
      </div>
    </div>
  );
};

export default AdminGameHistory;
