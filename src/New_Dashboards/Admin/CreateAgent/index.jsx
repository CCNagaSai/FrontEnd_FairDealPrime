import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AdminSidebar";
import ACreateUser from "../../Agent/agentCreateUser/agentCreateUser";
import Topbar from "../../Common/Topbar";
const CreateAgent = () => {
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
          <ACreateUser />
        </div>
      </div>
    </div>
  );
};

export default CreateAgent;
