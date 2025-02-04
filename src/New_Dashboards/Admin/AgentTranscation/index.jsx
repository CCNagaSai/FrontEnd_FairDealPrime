import AgentTranscation from "../../../component/AgentTranscation";
import Topbar from "../../Common/Topbar";
import AdminSidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import "../AdminDash.css";
import React from "react";

const AgentTranscations = () => {
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
          <AgentTranscation pageSize={9} />
        </div>
      </div>
    </div>
  );
};

export default AgentTranscations;
