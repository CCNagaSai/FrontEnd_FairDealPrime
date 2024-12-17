import React from 'react';
import '../Agentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../../agent_subagent_components/sidebar/sidebar';
import Turnover from '../../agent_subagent_components/turnover';
import Topbar from '../../agent_subagent_components/Topbar';

const AgentTurnover = () => {
  return (
    <div>
      <Topbar />
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Turnover />
        </div>
      </div>
    </div>
  );
};

export default AgentTurnover;