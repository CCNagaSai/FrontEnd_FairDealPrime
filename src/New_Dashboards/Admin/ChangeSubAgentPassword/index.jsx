import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import AdminSidebar from "../AdminSidebar";
import Topbar from "../../Common/Topbar";
import SubAgentChangePassword from "./ChangeSubAgentPwd";

const ChangeSubAgentPassword = () => {
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
          <SubAgentChangePassword />
        </div>
      </div>
    </div>
  );
};

export default ChangeSubAgentPassword;
