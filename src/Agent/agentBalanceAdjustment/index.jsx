import React from 'react';
import '../Agentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../../agent_subagent_components/sidebar/sidebar'; // Adjust path to Sidebar component
import PartnerAdjustment from '../../agent_subagent_components/Common/PartnerAdjustment';
import Topbar from "../../agent_subagent_components/Topbar"
const AgentPartnerAdjustment = () => {
  return (
    <div>
      <Topbar />
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <PartnerAdjustment />
        </div>
      </div>
    </div>
  );
};

export default AgentPartnerAdjustment;
