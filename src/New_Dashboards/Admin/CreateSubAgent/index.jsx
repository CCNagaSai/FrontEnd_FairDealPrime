import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import AdminSidebar from "../AdminSidebar";
import SubACreateUser from "../../SubAgent/subagentCreateUser/subagentCreateUser";
import Topbar from "../../Common/Topbar";
const CreateSubAgent = () => {
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
          <SubACreateUser />
        </div>
      </div>
    </div>
  );
};

export default CreateSubAgent;
