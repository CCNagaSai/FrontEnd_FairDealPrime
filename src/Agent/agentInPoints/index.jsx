import React from 'react';
import '../Agentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../../agent_subagent_components/sidebar/sidebar'; // Adjust path to Sidebar component
import Inpoint from '../../agent_subagent_components/Reportinpoint';
import Topbar from "../../agent_subagent_components/Topbar"
const AgentInpoint = () => {
  return (
    <div>
      <Topbar />
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Inpoint />
        </div>
      </div>
    </div>
  );
};

export default AgentInpoint;
