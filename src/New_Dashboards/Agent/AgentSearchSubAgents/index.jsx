import React, { useState } from 'react';
import '../Agentdash.css';
import ReactDOM from 'react-dom/client';
import Sidebar from '../AgentSidebar'; // Adjust path to Sidebar component
import ASubAgentsList from './AgentSearchSubAgents';
import AViewSubAgents from './AgentViewSubAgents';
import Topbar from "../../Common/Topbar";
import UserListInSubAgent from './UserListInSubAgent';

const AgentSearchSubAgents = () => {
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user
  
  // Function to handle user click and set the selected user
  const handleUserClick = (user) => {
    setSelectedUser(user); // Set the clicked user
  };
  
  // Function to handle back button click to reset user selection
  const handleBackToList = () => {
    setSelectedUser(null); // Reset the selected user
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
            <AViewSubAgents subAgent={selectedUser} onBack={handleBackToList} />
          ) : (
            <ASubAgentsList onSubAgentClick={handleUserClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentSearchSubAgents;
