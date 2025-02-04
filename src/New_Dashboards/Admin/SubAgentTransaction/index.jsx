import Topbar from "../../Common/Topbar";
import AdminSidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import "../AdminDash.css";
import React from "react";
import SubAgentTranscation from "../../../component/SubAgentTranscation";

const SubAgentTranscations = () => {
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
          <SubAgentTranscation pageSize={9} />
        </div>
      </div>
    </div>
  );
};

export default SubAgentTranscations;
