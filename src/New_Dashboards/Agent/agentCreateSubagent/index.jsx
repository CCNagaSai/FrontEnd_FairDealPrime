import React from 'react';
import '../Agentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../AgentSidebar';
import ACreateSubagent from './agentCreateSubagent';
import Topbar from "../../Common/Topbar";
const AgentCreateSubagent = () => {
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
          <ACreateSubagent />
        </div>
      </div>
    </div>
  );
};

export default AgentCreateSubagent;
