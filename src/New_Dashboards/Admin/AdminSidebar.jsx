import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [password, setPassword] = useState("");
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPath, setSelectedPath] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

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
                  setSelectedPath("/Admin/Gamelogic?gamename=ROULETTE");
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
                  to="/admin/TestSearchUsers"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Test Search Users
                </Link>
              </li> */}
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
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 absolute left-2 -top-12"
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

      {/* Sidebar Overlay (click outside to close) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-[#e6ebff] text-white shadow-xl border-r-2 border-gray-200 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 overflow-y-auto max-h-screen`}
      >
        {/* Sidebar Header */}
        <div className="text-lg font-bold uppercase text-white bg-blue-800 px-4 py-3 sticky top-0 z-50">
          Main Menu
        </div>

        {/* Sidebar Content (Scrollable) */}
        <ul className="list-none p-0">
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
                  setIsMenuOpen(false); // Close sidebar first
                  setTimeout(() => setShowPasswordPopup(true), 300); // Small delay for smooth transition
                  setSelectedPath("/admin/GameLogic?gamename=ROULETTE");
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
                  setIsMenuOpen(false);
                  setTimeout(() => setShowPasswordPopup(true), 300);
                  setSelectedPath("/admin/PlayingTableBet");
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
                  to="/admin/TestSearchUsers"
                  className="block text-sm text-black py-1 pl-6 hover:text-yellow-500"
                >
                  Test Search Users
                </Link>
              </li> */}
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
    </div>
  );
}

export default AdminSidebar;
