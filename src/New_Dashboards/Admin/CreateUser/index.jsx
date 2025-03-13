import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AdminSidebar";

import Topbar from "../../Common/Topbar";
import CreateUserForm from "../../Create_Components/CreateUsers/CreateUsers";
const CreateUser = () => {
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
          <CreateUserForm userRole="User" />
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
