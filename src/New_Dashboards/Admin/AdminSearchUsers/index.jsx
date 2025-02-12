import React, { useState } from "react";
import "../AdminDash.css";
import Sidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import Topbar from "../../Common/Topbar";
import IshankViewUser from "./AdminViewUsers";
import IshankUsersList from "./AdminSearchUsers";

const AdminSearchUsers = () => {
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
            <IshankViewUser user={selectedUser} onBack={handleBackToList} />
          ) : (
            // Render AUsersList when no user is selected
            <IshankUsersList onUserClick={handleUserClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSearchUsers;
