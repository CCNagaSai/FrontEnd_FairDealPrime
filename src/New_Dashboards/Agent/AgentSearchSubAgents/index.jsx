import React from 'react';
import '../Agentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../AgentSidebar'; // Adjust path to Sidebar component
import ASubAgentsList from './AgentSearchSubAgents';
import Topbar from "../../Common/Topbar";
const AgentSearchSubAgents = () => {
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
          <ASubAgentsList />
        </div>
      </div>
    </div>
  );
};

export default AgentSearchSubAgents;
