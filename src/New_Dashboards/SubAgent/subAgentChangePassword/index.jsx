import React from 'react';
import '../SubAgentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../subAgentSidebar';
import SubAChangePassword from './subAgentChangePassword';
import Topbar from "../../Common/Topbar";

const SubAgentChangePassword = () => {
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
          <SubAChangePassword />
        </div>
      </div>
    </div>
  );
};

export default SubAgentChangePassword;
