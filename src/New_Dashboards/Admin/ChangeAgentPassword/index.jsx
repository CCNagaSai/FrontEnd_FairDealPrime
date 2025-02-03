import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AdminSidebar";
import AChangePassword from "../../Agent/AgentChangePassword/AgentChangePassword";
import Topbar from "../../Common/Topbar";

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
          <AChangePassword />
        </div>
      </div>
    </div>
  );
};

export default ChangeAgentPassword;
