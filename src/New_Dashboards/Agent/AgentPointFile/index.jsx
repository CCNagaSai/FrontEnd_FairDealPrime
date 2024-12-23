import React from 'react';
import '../Agentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../AgentSidebar'; // Adjust path to Sidebar component
import AReportpointfile from './AgentPointFile';
import Topbar from "../../Common/Topbar";

const AgentPointFile = () => {
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
          <AReportpointfile />
        </div>
      </div>
    </div>
  );
};

export default AgentPointFile;
