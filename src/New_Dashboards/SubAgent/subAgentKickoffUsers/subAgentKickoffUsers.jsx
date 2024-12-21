import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./subAgentKickoffUsers.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SubAKickoffUsers = () => {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const itemsPerPage = 2;

  // Store id and type using useRef
  const idRef = useRef(null);
  const typeRef = useRef(null);
  const tokenRef = useRef(null);

  useEffect(() => {
    // Get id and type from cookies
    idRef.current = cookies.get("LoginUserId");
    typeRef.current = cookies.get("name");
    tokenRef.current = cookies.get("token");
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const id = idRef.current;
        const type = typeRef.current;
        const token = tokenRef.current;

        if (!id || !type) {
          throw new Error("Missing id or type from cookies");
        }

        const response = await fetch(
          `http://93.127.194.87:9999/admin/user/UserList?Id=${id}&type=${type}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token, // Send token from cookies
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json(); // Parse the JSON
        setUsers(result.userList || []); // Set the data
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditStatus = async (userId, currentStatus) => {
    try {
      const token = tokenRef.current;
      const id = idRef.current;

      const response = await fetch(
        `http://93.127.194.87:9999/admin/agent/changeUserStatus?agentId=${id}6&userId=6751b636c633a3de519b78ce`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            userId: userId,
            status: !currentStatus, // Toggle the status
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedUser = await response.json();

      // Update the local state with the new status
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: !currentStatus } : user
        )
      );
    } catch (err) {
      console.error("Error updating user status:", err.message);
      setError("Failed to update user status. Please try again.");
    }
  };

  const sortData = (key) => {
    const sortedData = [...users].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[key] > b[key] ? 1 : -1;
      }
      return a[key] < b[key] ? 1 : -1;
    });
    setUsers(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDelete = (name) => {
    setUsers(users.filter((user) => user.name !== name));
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="view-users-container">
      <h3 className="view-users-title">View Users</h3>
      <div className="user-search-section">
        <div className="search-box">
          <label htmlFor="name">User Name:</label>
          <input type="text" id="name" placeholder="Enter User Name" />
        </div>
        <div className="buttons">
          <button className="btn submit blue-box">Submit</button>
          <button className="btn clear blue-box">Clear</button>
        </div>
      </div>
      <div className="user-summary">
        <span>
          Total Users: (<span className="count">{users.length}</span>)
        </span>
        <span>
          Total Points: (
          <span className="count">
            {users.reduce((sum, user) => sum + user.chips, 0)}
          </span>
          )
        </span>
      </div>
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th onClick={() => sortData("name")}>
                User Name{" "}
                <span className="sort-icon">
                  {sortOrder === "asc" ? "↑" : "↓"}
                </span>
              </th>
              <th onClick={() => sortData("chips")}>
                Points{" "}
                <span className="sort-icon">
                  {sortOrder === "asc" ? "↑" : "↓"}
                </span>
              </th>
              <th onClick={() => sortData("lastLoginDate")}>
                Last Login{" "}
                <span className="sort-icon">
                  {sortOrder === "asc" ? "↑" : "↓"}
                </span>
              </th>
              <th onClick={() => sortData("status")}>
                Status{" "}
                <span className="sort-icon">
                  {sortOrder === "asc" ? "↑" : "↓"}
                </span>
              </th>
              <th onClick={() => sortData("status")}>
                Action{" "}
                <span className="sort-icon">
                  {sortOrder === "asc" ? "↑" : "↓"}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  No data available in table
                </td>
              </tr>
            ) : (
              currentUsers
                .filter((user) => !user.status) // Filter out active users
                .map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.chips}</td>
                    <td>{new Date(user.lastLoginDate).toLocaleString()}</td>
                    <td>{user.status ? "Active" : "Inactive"}</td>
                    <td>
                      <button
                        className="btn action-btn red-box"
                        onClick={() => handleDelete(user.name)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn action-btn green-box"
                        onClick={() => handleEditStatus(user._id, user.status)}
                      >
                        {user.status ? "Active" : "Inactive"}
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
        <div className="pagination">
          <button
            className="prev"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(users.length / itemsPerPage)}
          </span>
          <button
            className="next"
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubAKickoffUsers;
