import React from 'react';
import './Agentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../../agent_subagent_components/sidebar/sidebar'; // Adjust path to Sidebar component
import Agentdashboard from '../../agent_subagent_components/agentdashboard'; // Path to your actual Agentdashboard component

const Agentdash = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Agentdashboard />
      </div>
    </div>
  );
};

export default Agentdash;