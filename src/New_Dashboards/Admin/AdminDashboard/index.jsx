import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import Topbar from "../../Common/Topbar";
import AdminSidebar from "../AdminSidebar";
import Dashboard from "../../../component/dashboard/Dashboard";
const Admindash = () => {
  return (
    <div className="app">
      <div className="Header">
        <Topbar />
      </div>
      <div className="content">
        <div className="Left">
          <AdminSidebar />
        </div>
        <div className="Right bg-gray-300 min-h-screen p-4">
          <h3 className="text-3xl font-bold  underline text-gray-900 p-5">
            Admin DashBoard
          </h3>
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Admindash;
