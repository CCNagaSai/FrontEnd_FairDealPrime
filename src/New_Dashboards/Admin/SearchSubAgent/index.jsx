import React, { useState } from "react";
import "../AdminDash.css";
import AdminSidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import Topbar from "../../Common/Topbar";
import ViewSubAgent from "./ViewSubAgent";
import SubAgentLists from "./SearchSubAgent";
import UserList from "../../Create_Components/SearchUsers/SearchUsers";

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
          <AdminSidebar />
        </div>
        <div className="Right">
          {selectedUser ? (
            // Render AViewUser when a user is selected
            <ViewUser
              user={selectedUser}
              onBack={handleBackToList}
              userRole="SubAgent"
            />
          ) : (
            // Render AUsersList when no user is selected
            <UserList userRole="SubAgent" onUserClick={handleUserClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSearchUsers;
