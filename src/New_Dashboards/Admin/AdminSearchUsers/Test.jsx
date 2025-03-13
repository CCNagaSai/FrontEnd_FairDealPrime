import React, { useState } from "react";
import "../adminDash.css";
import AdminSidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import UserList from "../../Create_Components/SearchUsers/SearchUsers";

import Topbar from "../../Common/Topbar";
import ViewUser from "../../Create_Components/ViewUser/ViewUsers";

const TestAdminSearchUsers = () => {
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
          <AdminSidebar />
        </div>
        <div className="Right">
          {selectedUser ? (
            // Render AViewUser when a user is selected
            <ViewUser
              user={selectedUser}
              onBack={handleBackToList}
              userRole="Sub-Agent"
              apiEndpoints={{
                updatePassword: "/admin/user/UpdatePassword",
                changeStatus: "/admin/user/UpdatePassword",
              }}
            />
          ) : (
            // Render AUsersList when no user is selected
            <UserList
              userRole="Admin"
              apiEndpoint="/admin/user/UserList"
              onUserClick={handleUserClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TestAdminSearchUsers;
