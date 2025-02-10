import React from 'react';
import '../Agentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../AgentSidebar'; // Adjust path to Sidebar component
import SubAgentPointsInAgent from './SubAReportpointfile';
import Topbar from "../../Common/Topbar";

const SubAPointsInAgent = () => {
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
          <SubAgentPointsInAgent />
        </div>
      </div>
    </div>
  );
};

export default SubAPointsInAgent;
