import React from 'react';
import '../SubAgentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../subAgentSidebar';
import SubACreateUser from './subagentCreateUser';
import Topbar from "../../Common/Topbar";
const SubAgentCreateUser = () => {
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
          <SubACreateUser />
        </div>
      </div>
    </div>
  );
};

export default SubAgentCreateUser;
