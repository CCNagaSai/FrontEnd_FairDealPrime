import React, { useState } from "react";
import "../SubAgentdash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../subAgentSidebar"; // Adjust path to Sidebar component
import SubAUsersList from "./subAgentSearchUsers";
import Topbar from "../../Common/Topbar";
import SubAViewUser from "./subAgentViewUsers";
import UserList from "../../Create_Components/SearchUsers/SearchUsers";

const SubAgentSearchUsers = () => {
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
            <SubAViewUser user={selectedUser} onBack={handleBackToList} />
          ) : (
            // Render AUsersList when no user is selected
            <UserList userRole="SubAgentUsers" onUserClick={handleUserClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubAgentSearchUsers;
