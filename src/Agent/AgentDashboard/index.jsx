import React from 'react';
import '../Agentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../../agent_subagent_components/sidebar/sidebar'; // Adjust path to Sidebar component
import Dashboard1 from '../../agent_subagent_components/Common/Dashboard1';
import Topbar from "../../agent_subagent_components/Topbar"
const Agentdash = () => {
  return (
    <div>
      <Topbar />
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Dashboard1 />
        </div>
      </div>
    </div>
  );
};

export default Agentdash;
