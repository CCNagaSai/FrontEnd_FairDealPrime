import React, { useState } from "react";
import "../SubAgentdash.css";
import Sidebar from "../subAgentSidebar"; // Adjust path to Sidebar component
import UserList from "../../Create_Components/SearchUsers/SearchUsers";

import Topbar from "../../Common/Topbar";
import ViewUser from "../../Create_Components/ViewUser/ViewUsers";

const TestSearchUsersSA = () => {
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
            <ViewUser
              user={selectedUser}
              onBack={handleBackToList}
              userRole="Sub-Agents"
              apiEndpoints={{
                updatePassword: "/admin/user/UpdatePassword",
                changeStatus: "/admin/agent/changeUserStatus",
              }}
            />
          ) : (
            // Render AUsersList when no user is selected
            <UserList
              userRole="Sub-Agents"
              // apiEndpoint="/admin/user/UserList"
              onUserClick={handleUserClick} // Added this prop
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TestSearchUsersSA;
