import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AdminSidebar";
import Topbar from "../../Common/Topbar";
import IshankAChangePassword from "./ChangeAgentPassword";

const ChangeAgentPassword = () => {
  return (
    <div className="app">
      <div className="Header">
        <Topbar />
      </div>
      <div className="content">
        <div className="Left">
          <Sidebar />
        </div>
        <div className="Right">
          <IshankAChangePassword />
        </div>
      </div>
    </div>
  );
};

export default ChangeAgentPassword;
