import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import AdminSidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import Topbar from "../../Common/Topbar";
import AdminInpoints from "./AdminInPoint";
import InPointReport from "../../Create_Components/InPoints/InPoints";

const AdminInPoint = () => {
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
          <InPointReport userRole="Admin" />
        </div>
      </div>
    </div>
  );
};

export default AdminInPoint;
