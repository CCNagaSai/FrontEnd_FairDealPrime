import React from 'react';
import '../Agentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../../agent_subagent_components/sidebar/sidebar'; // Adjust path to Sidebar component
import ChangePassword from '../../agent_subagent_components/Common/ChangePassword';
import Topbar from "../../agent_subagent_components/Topbar"
const AgentChangePassword = () => {
  return (
    <div>
      <Topbar />
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default AgentChangePassword;
