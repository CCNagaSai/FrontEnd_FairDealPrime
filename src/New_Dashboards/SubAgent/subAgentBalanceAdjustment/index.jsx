import React from 'react';
import '../SubAgentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../subAgentSidebar'; // Adjust path to Sidebar component
import SubAgentBalanceAdjust from './subAgentBalanceAdjust';
import Topbar from "../../Common/Topbar";

const SubAgentBalanceAdjustment = () => {
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
          <SubAgentBalanceAdjust />
        </div>
      </div>
    </div>
  );
};

export default SubAgentBalanceAdjustment;
