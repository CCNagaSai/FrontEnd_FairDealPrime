import React, { useState } from "react";
import "../Agentdash.css";
import Sidebar from "../AgentSidebar"; // Adjust path to Sidebar component
import AUsersList from "./AgentSearchUsers";
import AViewUser from "./AgentViewUsers"; // Import the AViewUser component
import Topbar from "../../Common/Topbar";
import UserList from "../../Create_Components/SearchUsers/SearchUsers";

const AgentSearchUsers = () => {
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
            // Render AViewUser when a user is selected
            <AViewUser user={selectedUser} onBack={handleBackToList} />
          ) : (
            // Render AUsersList when no user is selected
            <UserList userRole="AgentUsers" onUserClick={handleUserClick} />
            // <AUsersList></AUsersList>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentSearchUsers;
