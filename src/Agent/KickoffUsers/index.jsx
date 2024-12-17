import React from 'react';
import '../Agentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../../agent_subagent_components/sidebar/sidebar'; // Adjust path to Sidebar component
import ViewUsers from '../../agent_subagent_components/Common/ViewUsers';
import Topbar from "../../agent_subagent_components/Topbar"
const AgentKickoffUsers = () => {
  return (
    <div>
      <Topbar />
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <ViewUsers />
        </div>
      </div>
    </div>
  );
};

export default AgentKickoffUsers;
