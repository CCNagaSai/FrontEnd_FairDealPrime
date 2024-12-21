import React, { useState } from "react";
import "./subAgentKickoffUsers.css";

const SubAKickoffUsers = () => {
  const [users, setUsers] = useState([
    { userName: "Alice", points: 50, lastLogin: "2024-12-12", userType: "Admin" },
    { userName: "Bob", points: 20, lastLogin: "2024-12-10", userType: "User" },
    { userName: "Charlie", points: 70, lastLogin: "2024-12-11", userType: "Moderator" },
  ]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

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

  const handleDelete = (userName) => {
    setUsers(users.filter((user) => user.userName !== userName));
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
          <label htmlFor="userName">User Name:</label>
          <input type="text" id="userName" placeholder="Enter User Name" />
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
            {users.reduce((sum, user) => sum + user.points, 0)}
          </span>
          )
        </span>
      </div>
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
              <th onClick={() => sortData("userType")}>
                Action <span className="sort-icon">{sortOrder === "asc" ? "↑" : "↓"}</span>
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
              currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.userName}</td>
                  <td>{user.points}</td>
                  <td>{user.lastLogin}</td>
                  <td>{user.userType}</td>
                  <td>
                    <button
                      className="btn action-btn red-box"
                      onClick={() => handleDelete(user.userName)}
                    >
                      Delete
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
