import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./AgentKickoffUsers.css";

const cookies = new Cookies();

const AKickoffUsers = ({onUserClick}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Store id, type, and token using useRef
  const idRef = useRef(null);
  const typeRef = useRef(null);
  const tokenRef = useRef(null);

  useEffect(() => {
    // Get id, type, and token from cookies
    idRef.current = cookies.get("LoginUserId");
    typeRef.current = cookies.get("name");
    tokenRef.current = cookies.get("token");
  }, []);

  // Fetch users from both APIs
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const id = idRef.current;
        const type = typeRef.current;
        const token = tokenRef.current;

        if (!id || !type || !token) {
          throw new Error("Missing id, type, or token from cookies");
        }

        // Fetch data from the first API (Users)
        const userResponse = await fetch(
          `http://93.127.194.87:9999/admin/user/agent/UserList?Id=${id}&type=${type}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        const userResult = await userResponse.json();
        const usersData = userResult.userList || [];

        // Fetch data from the second API (Sub-agents)
        const subAgentResponse = await fetch(
          `http://93.127.194.87:9999/admin/shop/ShopList?agentId=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        const subAgentResult = await subAgentResponse.json();
        const subAgentsData = subAgentResult.shopList || [];

        // Combine both data sets and filter for status = false or inactive
        const allUsers = [
          ...usersData.filter((user) => user.status === false), // Users with status false
          ...subAgentsData.filter((user) => user.status === "inactive"), // Sub-agents with status "inactive"
        ];

        setUsers(allUsers);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUserClick = (user) => {
    onUserClick(user);
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
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th onClick={() => sortData("userName")}>
                User Name <span className="sort-icon">{sortOrder === "asc" ? "↑" : "↓"}</span>
              </th>
              <th onClick={() => sortData("points")}>
                Points <span className="sort-icon">{sortOrder === "asc" ? "↑" : "↓"}</span>
              </th>
              <th onClick={() => sortData("lastLogin")}>
                Last Login <span className="sort-icon">{sortOrder === "asc" ? "↑" : "↓"}</span>
              </th>
              <th onClick={() => sortData("userType")}>
                User Type <span className="sort-icon">{sortOrder === "asc" ? "↑" : "↓"}</span>
              </th>
              <th>Status</th>
              <th>Action</th>

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
              currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.chips}</td>
                  <td>{user.lastLoginDate}</td>
                  <td>{user.userType}</td>
                  <td>{user.status === false || user.status === "inactive" ? "Inactive" : "Active"}</td>
                  <td
                    onClick={() => handleUserClick(user)}
                    className="clickable cursor-pointer px-2 sm:px-4 py-2 text-blue-500 hover:underline"
                  >
                    View
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

export default AKickoffUsers;
