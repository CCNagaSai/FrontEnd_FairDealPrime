import React from 'react';
import '../SubAgentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../subAgentSidebar'; // Adjust path to Sidebar component
import SubAReportpointfile from './subAgentPointFile';
import Topbar from "../../Common/Topbar";

const SubAgentPointFile = () => {
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
          <SubAReportpointfile />
        </div>
      </div>
    </div>
  );
};

export default SubAgentPointFile;
