import React from "react";
import "../Agentdash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../../agent_subagent_components/sidebar/sidebar"; // Adjust path to Sidebar component
import Agents from "../../agent_subagent_components/Common/AgentsList";
import Topbar from "../../agent_subagent_components/Topbar";
const AgentSearchUsers = () => {
  return (
    <div>
      <Topbar />
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Agents />
        </div>
      </div>
    </div>
  );
};

export default AgentSearchUsers;