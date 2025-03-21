import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import AdminSidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import Topbar from "../../Common/Topbar";
import Adminpointfile from "./AdminPointFile";
import PointfileReport from "../../Create_Components/PointFile/PointFile";

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
          <PointfileReport userRole="Admin" />
        </div>
      </div>
    </div>
  );
};

export default AdminPointFile;
