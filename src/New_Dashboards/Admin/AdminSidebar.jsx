import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [password, setPassword] = useState("");
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPath, setSelectedPath] = useState("");
  const navigate = useNavigate();

  const correctPassword = "Admin@1234"; // Change this as needed

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setShowPasswordPopup(false);
      navigate(selectedPath); // Redirect to the selected page
    } else {
      alert("Incorrect password! Try again.");
      setPassword(""); // Clear input field
    }
  };

  return (
    <div className="relative">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block md:w-52 bg-[#e6ebff] text-white top-[10%] left-0 shadow-xl border-r-2 border-gray-200 rounded-lg font-sans">
        <div className="text-lg font-bold uppercase text-white bg-blue-800 px-2 py-1 rounded-tr-lg">
          Main Menu
        </div>
        <ul className="list-none p-0 m-0">
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Home
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admindashboard"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/ActivePlayerDetails"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Active Players Details
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Table Management
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/TableManagement"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Table Management
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/TestingTable"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Testing Playing Table Bet
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Games
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              {/* Games Logic Link */}
              <li
                className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedPath("/admin/GameLogic");
                  setShowPasswordPopup(true);
                }}
              >
                <span className="block text-sm text-black py-1 pl-6 hover:text-yellow-500">
                  Games Logic
                </span>
              </li>

              {/* Playing Table Bet Link */}
              <li
                className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedPath("/admin/PlayingTableBet");
                  setShowPasswordPopup(true);
                }}
              >
                <span className="block text-sm text-black py-1 pl-6 hover:text-yellow-500">
                  Playing Table Bet
                </span>
              </li>
            </ul>
          </li>
          {/* Password Popup */}
          {showPasswordPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md z-50">
              <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md text-center border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Secure Access
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 mb-6">
                  Enter your password to proceed.
                </p>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
         focus:outline-none focus:ring-2 focus:ring-blue-500 
         dark:bg-gray-700 dark:text-white text-gray-900 bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full 
         text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                  >
                    {showPassword ? "🙈 Hide" : "👁 Show"}
                  </button>
                </div>

                <button
                  onClick={handlePasswordSubmit}
                  className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all transform hover:scale-105"
                >
                  Unlock Access
                </button>

                <button
                  onClick={() => setShowPasswordPopup(false)}
                  className="mt-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Player Management
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/CreateUser"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Create Users
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/searchUsers"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Search Users
                </Link>
              </li>
              {/* <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/ChangeUserPassword"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Change Password
                </Link>
              </li> */}

              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/BalanceAdjustment"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Balance Adjustment
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/KickoffUsers"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Kickoff Users
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Agent Management
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/CreateAgent"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Create Agent
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/SearchAgent"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Search Agent
                </Link>
              </li>
              {/* <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/AgentBalanceAdjustments"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Balance Adjustment
                </Link>
              </li> */}
              {/* <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/ChangeAgentPassword"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Change Password
                </Link>
              </li> */}
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-md text-blue-800 ml-2 cursor-default">
              Sub-Agent Management
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/CreateSubAgent"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Create Sub-Agent
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/SearchSubAgent"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Search Sub-Agent
                </Link>
              </li>
              {/* <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/SubAgentBalanceAdjustments"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Balance Adjustment
                </Link>
              </li> */}
              {/* <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/ChangeSubAgentPassword"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Change Password
                </Link>
              </li> */}
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Reports
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/PointFile"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Point File
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/InPoint"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  In Points
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/OutPoint"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Out Points
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/AgentSubAgentPointFile"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Agent/Sub-Agent Point File
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/GameHistory"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Game History
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/AdminTurnOverReport"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Turn Over
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/Transcations"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Admin Transcation
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/AgentTranscations"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Agent Transcation
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/SubAgentTranscations"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Sub-Agent Transcation
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Others
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/SocialURL"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Socila URL
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/NoticeText"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Notice Text
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/Settings"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Setting
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/admin/ChangePassword"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Change Password
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Hamburger Menu for smaller screens */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        type="button"
        className="inline-flex items-center mt-4 p-2 w-10 h-10 justify-center text-sm text-black-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 absolute left-2 -top-16"
        aria-expanded={isMenuOpen ? "true" : "false"}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className={`w-5 h-5 ${
            isMenuOpen ? "rotate-180" : "rotate-0"
          } transition-transform`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>

      {/* Collapsible Sidebar for smaller screens */}
      <div
        ref={menuRef}
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } w-52 bg-[#e6ebff] text-white h-[90vh] top-[10%] left-0 shadow-xl border-r-2 border-gray-200 rounded-lg font-sans absolute z-40 transition-all duration-300 ease-in-out transform`}
      >
        <div className="text-lg font-bold uppercase text-white bg-blue-800 px-2 py-1 rounded-tr-lg">
          Main Menu
        </div>
        <ul className="list-none p-0 m-0">
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Home
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/agentdashboard"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Agent Dashboard
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              User Management
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/agent/search-users"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Search Users
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/agent/search-sub-agents"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Search Sub Agents
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/agent/balance-adjustment"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Balance Adjustment
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/agent/kickoff-users"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Kickoff Users
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Agent Management
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/agent/create-user"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Create User
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/agent/create-sub-agent"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Create Sub Agent
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/agent/change-password"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Change Password
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Reports
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/agent/pointfile"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Point File
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/agent/inpoint"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  In Points
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/agent/outpoint"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Out Points
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/agent/gamehistory"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Game History
                </Link>
              </li>
              <li className="mb-1 border-b-2 border-gray-200 hover:bg-gray-100">
                <Link
                  to="/agent/Turn-over"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Turn Over
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;
