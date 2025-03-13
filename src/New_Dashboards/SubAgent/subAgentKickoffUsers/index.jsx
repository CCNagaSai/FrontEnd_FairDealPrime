import React, { useState } from "react";
import "../SubAgentdash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../subAgentSidebar";
import SubAKickoffUsers from "./subAgentKickoffUsers";
import Topbar from "../../Common/Topbar";
import SubAViewUser from "../subAgentSearchUsers/subAgentViewUsers";
import KickoffUsers from "../../Create_Components/KickoffUsers/KickoffUsers";
import ViewUser from "../../Create_Components/ViewUser/ViewUsers";

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
            // Render AViewUser when a user is selected
            <ViewUser
              user={selectedUser}
              onBack={handleBackToList}
              userRole="Sub-Agent"
            />
          ) : (
            // Render AUsersList when no user is selected
            <KickoffUsers onUserClick={handleUserClick} userRole="Sub-Agent" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubAgentKickoffUsers;
