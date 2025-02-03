import PlayingTableData from "../../../component/PlayingTableData/PlayingTableData";
import { useLocation } from "react-router-dom";
import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AdminSidebar";
import Topbar from "../../Common/Topbar";

function GamebetInformation() {
  return (
    <div className="app">
      <div className="Header">
        <Topbar />
      </div>
      <div className="content">
        <div className="Left">
          <Sidebar />
        </div>
        <div className="Right bg-gray-300 min-h-screen p-4">
          <h3 className="text-xl font-bold underline text-bgray-900 dark:text-bgray-50 lg:text-3xl lg:leading-[36.4px]">
            Playing Table Bet Info
          </h3>

          <PlayingTableData />
        </div>
      </div>
    </div>
  );
}

export default GamebetInformation;
