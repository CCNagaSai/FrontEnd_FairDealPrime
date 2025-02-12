import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import AdminSidebar from "../AdminSidebar";
import Topbar from "../../Common/Topbar";
import IshankCreateSubagent from "./CreateSubAgent";
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
          <IshankCreateSubagent />
        </div>
      </div>
    </div>
  );
};

export default CreateSubAgent;
