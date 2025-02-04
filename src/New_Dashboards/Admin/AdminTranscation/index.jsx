import AdminTranscation from "../../../component/AdminTranscation";
import Topbar from "../../Common/Topbar";
import AdminSidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import "../AdminDash.css";
import React from "react";

const AdminTranscations = () => {
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
          <AdminTranscation pageSize={9} />
        </div>
      </div>
    </div>
  );
};

export default AdminTranscations;
