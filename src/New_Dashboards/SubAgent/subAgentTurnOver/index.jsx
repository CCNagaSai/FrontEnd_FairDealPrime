import React from 'react';
import '../SubAgentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../subAgentSidebar'; // Adjust path to Sidebar component
import SubATurnover from './subAgentTurnOver';
import Topbar from "../../Common/Topbar";

const SubAgentTurnOver = () => {
  return (
    <div className="app">
      <div className="Header">
        <Topbar />
      </div>
      <div className="content">
        <div className="Left">
          <Sidebar />
        </div>
        <div className="Right">
          <SubATurnover />
        </div>
      </div>
    </div>
  );
};

export default SubAgentTurnOver;
