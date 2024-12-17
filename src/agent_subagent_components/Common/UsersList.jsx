// import React, { useState } from "react";
// import "./UsersList.css";
// import { useNavigate } from "react-router-dom";

// const UsersList = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([
//     { player: "Sana3", points: 5000, lastLogin: "2024-09-05", lockStatus: "Unlocked", lockedBy: "Admin", status: "Active" },
//     { player: "JohnDoe", points: 3000, lastLogin: "2024-09-04", lockStatus: "Locked", lockedBy: "System", status: "Inactive" },
//     { player: "JaneSmith", points: 2500, lastLogin: "2024-09-03", lockStatus: "Unlocked", lockedBy: "Admin", status: "Active" },
//     { player: "MikeTyson", points: 4000, lastLogin: "2024-09-02", lockStatus: "Unlocked", lockedBy: "Admin", status: "Active" },
//     { player: "Alice", points: 3500, lastLogin: "2024-09-01", lockStatus: "Locked", lockedBy: "System", status: "Inactive" },
//     { player: "Bob", points: 2000, lastLogin: "2024-08-31", lockStatus: "Unlocked", lockedBy: "Admin", status: "Active" },
//     { player: "Chris", points: 4500, lastLogin: "2024-08-30", lockStatus: "Locked", lockedBy: "Admin", status: "Inactive" },
//     { player: "Diana", points: 3700, lastLogin: "2024-08-29", lockStatus: "Unlocked", lockedBy: "System", status: "Active" },
//     { player: "Eve", points: 3200, lastLogin: "2024-08-28", lockStatus: "Locked", lockedBy: "Admin", status: "Inactive" },
//     { player: "Frank", points: 2900, lastLogin: "2024-08-27", lockStatus: "Unlocked", lockedBy: "System", status: "Active" },
//   ]);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

//   const handleRedirect = () => {
//     navigate("/SearchUsers");
//   };

//   const handleLockStatusClick = (lockStatus) => {
//     navigate("/UserLockStatus", { state: { lockStatus } });
//   };
  
//   const handleSort = (key) => {
//     const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
//     const sortedData = [...data].sort((a, b) => {
//       if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
//       if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
//       return 0;
//     });
//     setData(sortedData);
//     setSortConfig({ key, direction });
//   };

//   return (
//     <div className="user-list-container">
//       <h1 className="view-users-heading">View Users</h1>

//       <div className="search-filters">
//         <div className="search-by">
//           <label>
//             <input type="radio" name="searchBy" defaultChecked /> Players
//           </label>
//         </div>
//         <div className="filter-item">
//           <label htmlFor="playerName">User Name:</label>
//           <input type="text" id="playerName" placeholder="" />
//         </div>
//         <div className="filter-item">
//           <label htmlFor="email">Email Address:</label>
//           <input type="email" id="email" placeholder="" />
//         </div>
//         <div className="filter-item">
//           <label htmlFor="lockStatus">Lock Status:</label>
//           <select id="lockStatus">
//             <option value="">Select</option>
//             <option value="locked">Locked</option>
//             <option value="unlocked">Unlocked</option>
//           </select>
//         </div>
//         <div className="filter-item">
//           <label htmlFor="status">Status:</label>
//           <select id="status">
//             <option value="">Select</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>
//         <div className="buttons">
//           <button className="btn-submit">Submit</button>
//           <button className="btn-clear">Clear</button>
//         </div>
//       </div>

//       <div className="user-details">
//         <div className="user-summary">
//           <span>TOTAL USERS :( {data.length} ) TOTAL POINTS :( {data.reduce((sum, item) => sum + item.points, 0)} )</span>
//         </div>
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th onClick={() => handleSort("player")}>Player</th>
//               <th onClick={() => handleSort("points")}>Points</th>
//               <th onClick={() => handleSort("lastLogin")}>Last Login</th>
//               <th>Lock Status</th>
//               <th>Locked By</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//   {data.map((row, index) => (
//     <tr key={index}>
//       <td onClick={handleRedirect} className="clickable">
//         {row.player}
//       </td>
//       <td>{row.points}</td>
//       <td>{row.lastLogin}</td>
//       <td
//         onClick={() => handleLockStatusClick(row.lockStatus)}
//         className="clickable"
//       >
//         {row.lockStatus}
//       </td>
//       <td>{row.lockedBy}</td>
//       <td>{row.status}</td>
//       <td>TRANSFER POINTS</td>
//     </tr>
//   ))}
// </tbody>

//         </table>
//       </div>
     
//       <div className="pagination">
//         <button className="pagination-btn">Previous</button>
//         <div className="page-numbers">
//           <button className="page-btn">1</button>
//           <button className="page-btn">2</button>
//           <button className="page-btn">3</button>
//         </div>
//         <button className="pagination-btn">Next</button>
//       </div>
//     </div>
//   );
// };

// export default UsersList;






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([
    { player: "Sana3", points: 5000, lastLogin: "2024-09-05", lockStatus: "Unlocked", lockedBy: "Admin", status: "Active" },
    { player: "JohnDoe", points: 3000, lastLogin: "2024-09-04", lockStatus: "Locked", lockedBy: "System", status: "Inactive" },
    { player: "JaneSmith", points: 2500, lastLogin: "2024-09-03", lockStatus: "Unlocked", lockedBy: "Admin", status: "Active" },
    { player: "MikeTyson", points: 4000, lastLogin: "2024-09-02", lockStatus: "Unlocked", lockedBy: "Admin", status: "Active" },
    { player: "Alice", points: 3500, lastLogin: "2024-09-01", lockStatus: "Locked", lockedBy: "System", status: "Inactive" },
    { player: "Bob", points: 2000, lastLogin: "2024-08-31", lockStatus: "Unlocked", lockedBy: "Admin", status: "Active" },
    { player: "Chris", points: 4500, lastLogin: "2024-08-30", lockStatus: "Locked", lockedBy: "Admin", status: "Inactive" },
    { player: "Diana", points: 3700, lastLogin: "2024-08-29", lockStatus: "Unlocked", lockedBy: "System", status: "Active" },
    { player: "Eve", points: 3200, lastLogin: "2024-08-28", lockStatus: "Locked", lockedBy: "Admin", status: "Inactive" },
    { player: "Frank", points: 2900, lastLogin: "2024-08-27", lockStatus: "Unlocked", lockedBy: "System", status: "Active" },
  ]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleRedirect = () => {
    navigate("/SearchUsers");
  };

  const handleLockRedirect = (lockStatus) => {
    navigate("/UserLockStatus", { state: { lockStatus } });
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = data.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="user-list-container font-sans p-4 sm:p-6 bg-gray-100">
      <h1 className="view-users-heading text-xl sm:text-2xl text-blue-500 text-left border-b-4 border-blue-500 pb-2 mb-6">
        View Users
      </h1>

      <div className="search-filters flex flex-wrap gap-4 mb-6">
        <div className="filter-item w-full sm:w-auto">
          <label htmlFor="playerName" className="font-bold block mb-1">
            User Name:
          </label>
          <input type="text" id="playerName" className="p-2 w-full sm:w-52" />
          <div className="buttons mt-2">
            <button className="btn-submit p-2 px-4 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-700">
              Submit
            </button>
            <button className="btn-clear p-2 px-4 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-700">
              Clear
            </button>
          </div>
        </div>
        <div className="filter-item w-full sm:w-auto">
          <label htmlFor="email" className="font-bold block mb-1">
            Email Address:
          </label>
          <input type="email" id="email" className="p-2 w-full sm:w-52" />
        </div>
        <div className="filter-item w-full sm:w-auto">
          <label htmlFor="lockStatus" className="font-bold block mb-1">
            Lock Status:
          </label>
          <select id="lockStatus" className="p-2 w-full sm:w-52">
            <option value="">Select</option>
            <option value="locked">Locked</option>
            <option value="unlocked">Unlocked</option>
          </select>
        </div>
        <div className="filter-item w-full sm:w-auto">
          <label htmlFor="status" className="font-bold block mb-1">
            Status:
          </label>
          <select id="status" className="p-2 w-full sm:w-52">
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="user-details bg-white p-4 sm:p-6 rounded-md shadow-md">
        <div className="user-summary text-sm sm:text-lg font-bold mb-4">
          <span>
            TOTAL USERS: ({data.length}) TOTAL POINTS: (
            {data.reduce((sum, item) => sum + item.points, 0)})
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="user-table w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr>
                <th onClick={() => handleSort("player")} className="px-2 sm:px-4 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-700">
                  Player
                </th>
                <th onClick={() => handleSort("points")} className="px-2 sm:px-4 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-700">
                  Points
                </th>
                <th onClick={() => handleSort("lastLogin")} className="px-2 sm:px-4 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-700">
                  Last Login
                </th>
                <th className="px-2 sm:px-4 py-2 bg-blue-500 text-white">Lock Status</th>
                <th className="px-2 sm:px-4 py-2 bg-blue-500 text-white">Locked By</th>
                <th className="px-2 sm:px-4 py-2 bg-blue-500 text-white">Status</th>
                <th className="px-2 sm:px-4 py-2 bg-blue-500 text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td
                    onClick={handleRedirect}
                    className="clickable cursor-pointer px-2 sm:px-4 py-2 text-blue-500 hover:underline"
                  >
                    {row.player}
                  </td>
                  <td className="px-2 sm:px-4 py-2">{row.points}</td>
                  <td className="px-2 sm:px-4 py-2">{row.lastLogin}</td>
                  <td
                    onClick={() => handleLockRedirect(row.lockStatus)}
                    className="clickable cursor-pointer px-2 sm:px-4 py-2 text-blue-500 hover:underline"
                  >
                    {row.lockStatus}
                  </td>
                  <td className="px-2 sm:px-4 py-2">{row.lockedBy}</td>
                  <td className="px-2 sm:px-4 py-2">{row.status}</td>
                  <td className="px-2 sm:px-4 py-2">TRANSFER POINTS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination flex justify-between items-center mt-6">
        <button
          className="prev px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <span className="page-info text-blue-700 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="next px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;


