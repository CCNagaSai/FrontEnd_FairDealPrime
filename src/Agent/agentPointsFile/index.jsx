import React from "react";
import "../Agentdash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../../agent_subagent_components/sidebar/sidebar"; // Adjust path to Sidebar component
import Reportpointfile from "../../agent_subagent_components/Reportpointfile";
import Topbar from "../../agent_subagent_components/Topbar";
import PlayerTab from "../../component/AgentManagement/PlayerTab";

const AgentPointFile = ({ pageSize }) => {
  return (
    <div>
      <Topbar />
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Reportpointfile />
          <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
            <div className="flex flex-col space-y-5">
              <PlayerTab pageSize={pageSize} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPointFile;
