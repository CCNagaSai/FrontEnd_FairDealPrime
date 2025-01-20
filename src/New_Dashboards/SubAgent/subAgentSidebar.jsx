import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

function SubAgentSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  return (
    <div className="relative">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block md:w-60 bg-[#e6ebff] text-white top-[10%] left-0 shadow-xl border-r-2 border-gray-200 rounded-lg font-sans">
        <div className="text-lg font-bold uppercase text-white bg-blue-800 px-2 py-1 rounded-tr-lg">
          Main Menu
        </div>
        <ul className="list-none p-0 m-0">
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Home
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                <Link to="/shopdashboard">Sub Agent Dashboard</Link>
              </li>
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              User Management
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <Link to="/sub-agent/search-users">
                <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                  Search Users
                </li>
              </Link>
              <Link to="/sub-agent/balance-adjustment">
                <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                  Balance Adjustment
                </li>
              </Link>
              <Link to="/sub-agent/kickoff-users">
                <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                  Kickoff Users
                </li>
              </Link>
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Sub Agent Management
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <Link to="/sub-agent/create-user">
                <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                  Create User
                </li>
              </Link>
              <Link to="/sub-agent/change-password">
                <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                  Change Password
                </li>
              </Link>
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Reports
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <Link to="/sub-agent/pointfile">
                <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                  Point File
                </li>
              </Link>
              <Link to="/sub-agent/inpoint">
                <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                  In Points
                </li>
              </Link>
              <Link to="/sub-agent/outpoint">
                <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                  Out Points
                </li>
              </Link>
              <Link to="/sub-agent/gamehistory">
                <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                  Game History
                </li>
              </Link>
              <Link to="/sub-agent/Turn-over">
                <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                  Turn Over
                </li>
              </Link>
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
              <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                <Link to="/shopdashboard">Dashboard</Link>
              </li>
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              User Management
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                <Link to="/sub-agent/search-users">Search Users</Link>
              </li>
              <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                <Link to="/sub-agent/balance-adjustment">
                  Balance Adjustment
                </Link>
              </li>
              <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                <Link to="/sub-agent/kickoff-users">Kickoff Users</Link>
              </li>
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Sub Agent Management
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                <Link to="/sub-agent/create-user">Create User</Link>
              </li>
              <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                <Link to="/sub-agent/change-password">Change Password</Link>
              </li>
            </ul>
          </li>
          <li className="mb-1">
            <strong className="text-lg text-blue-800 ml-2 cursor-default">
              Reports
            </strong>
            <ul className="list-none p-0 m-0 mt-1">
              <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                <Link to="/sub-agent/pointfile">Point File</Link>
              </li>
              <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                <Link to="/sub-agent/inpoint">In Points</Link>
              </li>
              <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                <Link to="/sub-agent/outpoint">Out Points</Link>
              </li>
              <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                <Link to="/sub-agent/gamehistory">Game History</Link>
              </li>
              <li className="mb-1 cursor-pointer text-sm text-black border-b-2 border-gray-200 py-1 pl-6 hover:text-yellow-500">
                <Link to="/sub-agent/Turn-over">Turn Over</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SubAgentSidebar;
