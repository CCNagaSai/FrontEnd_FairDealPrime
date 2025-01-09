import React, { useState } from 'react';
import '../SubAgentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../subAgentSidebar';
import SubAKickoffUsers from './subAgentKickoffUsers';
import Topbar from "../../Common/Topbar";
import SubAViewUser from '../subAgentSearchUsers/subAgentViewUsers';

const SubAgentKickoffUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  
    const handleUserClick = (user) => {
      setSelectedUser(user);
    };
  
    const handleBackToList = () => {
      setSelectedUser(null);
    };

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
          {selectedUser ? (
            <SubAViewUser user={selectedUser} onBack={handleBackToList} />
          ) : (
            <SubAKickoffUsers onUserClick={handleUserClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubAgentKickoffUsers;
