import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AdminSidebar";

import Topbar from "../../Common/Topbar";
import IshankCreateUser from "./CreateUser";
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
          <IshankCreateUser />
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
