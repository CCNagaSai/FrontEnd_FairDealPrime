// import React from "react";
import "../Agentdash.css";
// import ReactDOM from "react-dom/client";
import Sidebar from "../../agent_subagent_components/sidebar/sidebar"; // Adjust path to Sidebar component
import CreateUser from "../../agent_subagent_components/Common/CreateUser";
import Topbar from "../../agent_subagent_components/Topbar";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

const AgentCreateUser = () => {
  return (
    <div>
      <Topbar />
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <CreateUser method={"POST"} />
        </div>
      </div>
    </div>
  );
};

export default AgentCreateUser;
