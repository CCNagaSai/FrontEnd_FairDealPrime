import React from "react";
import "../Agentdash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../../agent_subagent_components/sidebar/sidebar"; // Adjust path to Sidebar component
import Reportpointfile from "../../agent_subagent_components/Reportpointfile";
import Topbar from "../../agent_subagent_components/Topbar";
import PlayerTab from "../../component/AgentManagement/PlayerTab";
import AgentTranscation from "./agentsTransaction";

const AgentPointFile = ({ pageSize }) => {
  return (
    <div>
      <Topbar />
      <div className="app">
        <Sidebar />
        {/* <div className="main-content"> */}
        {/* <Reportpointfile /> */}
        <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
          {/* write your code here */}

          <div className="2xl:flex 2xl:space-x-[48px]">
            <section className="2xl:w-100 w-full 2xl:mb-0 mb-6">
              <AgentTranscation pageSize={9} />
            </section>
          </div>
        </main>
        {/* </div> */}
      </div>
    </div>
  );
};

export default AgentPointFile;
