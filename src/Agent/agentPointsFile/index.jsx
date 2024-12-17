import React from 'react';
import '../Agentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../../agent_subagent_components/sidebar/sidebar'; // Adjust path to Sidebar component
import Reportpointfile from '../../agent_subagent_components/Reportpointfile';
import Topbar from "../../agent_subagent_components/Topbar"
const AgentPointFile = () => {
  return (
    <div>
      <Topbar />
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Reportpointfile />
        </div>
      </div>
    </div>
  );
};

export default AgentPointFile;
