import React from "react";
import "../Agentdash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AgentSidebar";
import AChangePassword from "./AgentChangePassword";
import Topbar from "../../Common/Topbar";
import ChangePassword from "../../Create_Components/ChangePassword/ChangePassword";

const AgentChangePassword = () => {
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
          <ChangePassword userRole="Agent" />
        </div>
      </div>
    </div>
  );
};

export default AgentChangePassword;
