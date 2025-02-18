import React, { useState, useEffect } from "react";

const UserListInSubAgent = ({ subAgentId, onUserClick }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://65.0.54.193:9999/admin/user/UserList?Id=${subAgentId}&type=Shop`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setUserData(result.userList || []);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (subAgentId) {
      fetchUserData();
    }
  }, [subAgentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const handleUserClick = (user) => {
    // Here you should call the function passed from the parent
    onUserClick(user); // Ensure this is the function passed down as prop
    console.log("User clicked:", user);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-green-500">Users ({userData.length})</h2>
      <table className="user-table w-full border-collapse text-sm sm:text-base mt-4">
        <thead>
          <tr>
            <th className="px-2 sm:px-4 py-2 bg-green-500 text-white">Name</th>
            <th className="px-2 sm:px-4 py-2 bg-green-500 text-white">Points</th>
            <th className="px-2 sm:px-4 py-2 bg-green-500 text-white">Status</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td 
                className="px-2 sm:px-4 py-2" 
                onClick={() => handleUserClick(user)} // Handle the click event here
              >
                {user.name || "N/A"}
              </td>
              <td className="px-2 sm:px-4 py-2">{user.chips || 0}</td>
              <td className="px-2 sm:px-4 py-2">
                {user.status ? "Active" : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListInSubAgent;
