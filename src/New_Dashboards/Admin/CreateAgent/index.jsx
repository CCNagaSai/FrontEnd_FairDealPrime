import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import AdminSidebar from "../AdminSidebar";
import Topbar from "../../Common/Topbar";
import CreateUserForm from "../../Create_Components/CreateUsers/CreateUsers";
const CreateAgent = () => {
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
          <CreateUserForm userRole="Agent" />
        </div>
      </div>
    </div>
  );
};

export default CreateAgent;
