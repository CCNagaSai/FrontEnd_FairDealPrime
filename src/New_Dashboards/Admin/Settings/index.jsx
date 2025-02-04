import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AdminSidebar";
import Topbar from "../../Common/Topbar";
import ProtoTypes from "prop-types";
import SettingsSidebar from "../../../component/settings/SettingsSidebar";
import { Outlet } from "react-router-dom";

const AdminSettings = ({ children }) => {
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
          <main className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] ">
            <div className="grid grid-cols-1 xl:grid-cols-12 bg-white dark:bg-darkblack-600 rounded-xl">
              <SettingsSidebar />
              <div className="py-8 px-10 col-span-9 tab-content">
                <Outlet />
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

AdminSettings.propTypes = {
  children: ProtoTypes.node,
};

export default AdminSettings;
