import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import AdminSidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import AGameHistory from "../../Agent/AgentGameHistory/AgentGameHistory";
import Topbar from "../../Common/Topbar";
import Testing from "./Testing";
import TestPlayingTableData from "./TestPlayingTableData";
import NeighbourBettingTable from "./RoulletteNeigbourTable";

const TestingTable = () => {
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
          <TestPlayingTableData />
          {/* <NeighbourBettingTable /> */}
        </div>
      </div>
    </div>
  );
};

export default TestingTable;
