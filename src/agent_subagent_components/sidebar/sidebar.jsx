import React from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-heading">Main Menu</div>
      <ul className="menu-list">
        <li>
          <strong>Home</strong>
          <ul>
            <li>
              <a href="/agentdashboard">Dashboard</a>
            </li>
          </ul>
        </li>
        <li>
          <strong>User Management</strong>
          <ul>
            <li>
              <a href="/agent/search-users">Search Users</a>
            </li>
            <li>
              <a href="/agent/balance-adjustment">Balance Adjustment</a>
            </li>
            <li>
              <a href="/agent/kickoff-users">Kickoff Users</a>
            </li>
          </ul>
        </li>
        <li>
          <strong>Agent Management</strong>
          <ul>
            <li>
              <a href="/agent/create-user">Create User</a>
            </li>
            <li>
              <a href="/agent/change-password">Change Password</a>
            </li>
          </ul>
        </li>
        <li>
          <strong>Reports</strong>
          <ul>
            <li>
              <a href="/agent/pointfile">Point File</a>
            </li>
            <li>
              <a href="/agent/inpoint">In Points</a>
            </li>
            <li>
              <a href="/agent/outpoint">Out Points</a>
            </li>
            <li>
              <a href="/agent/gamehistory">Game History</a>
            </li>
            <li>
              <a href="/agent/Turn-over">Turn Over</a>
            </li>
          </ul>
        </li>
        <li>
          <strong>others</strong>
          <ul>
            {cookies.get("name") == "Agent" ? (
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  location === "/agentdashboard" ? "nav-active" : ""
                } `}
              >
                <Link to="/agentdashboard">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico">
                        <svg
                          width="18"
                          height="20"
                          viewBox="0 0 18 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 16V6C18 3.79086 16.2091 2 14 2H4C1.79086 2 0 3.79086 0 6V16C0 18.2091 1.79086 20 4 20H14C16.2091 20 18 18.2091 18 16Z"
                            fill="#1A202C"
                            className="path-1"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.25 8C4.25 7.58579 4.58579 7.25 5 7.25H13C13.4142 7.25 13.75 7.58579 13.75 8C13.75 8.41421 13.4142 8.75 13 8.75H5C4.58579 8.75 4.25 8.41421 4.25 8Z"
                            fill="#22C55E"
                            className="path-2"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H13C13.4142 11.25 13.75 11.5858 13.75 12C13.75 12.4142 13.4142 12.75 13 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12Z"
                            fill="#22C55E"
                            className="path-2"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.25 16C4.25 15.5858 4.58579 15.25 5 15.25H9C9.41421 15.25 9.75 15.5858 9.75 16C9.75 16.4142 9.41421 16.75 9 16.75H5C4.58579 16.75 4.25 16.4142 4.25 16Z"
                            fill="#22C55E"
                            className="path-2"
                          />
                          <path
                            d="M11 0H7C5.89543 0 5 0.895431 5 2C5 3.10457 5.89543 4 7 4H11C12.1046 4 13 3.10457 13 2C13 0.895431 12.1046 0 11 0Z"
                            fill="#22C55E"
                            className="path-2"
                          />
                        </svg>
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Agent Dashboard
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ) : (
              ""
            )}

            {cookies.get("name") == "Super Admin" ||
            cookies.get("name") == "Agent" ? (
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  location === "/shopmanagement" ? "nav-active" : ""
                } `}
              >
                <Link to="/shopmanagement">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico">
                        <svg
                          width="18"
                          height="20"
                          viewBox="0 0 18 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 16V6C18 3.79086 16.2091 2 14 2H4C1.79086 2 0 3.79086 0 6V16C0 18.2091 1.79086 20 4 20H14C16.2091 20 18 18.2091 18 16Z"
                            fill="#1A202C"
                            className="path-1"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.25 8C4.25 7.58579 4.58579 7.25 5 7.25H13C13.4142 7.25 13.75 7.58579 13.75 8C13.75 8.41421 13.4142 8.75 13 8.75H5C4.58579 8.75 4.25 8.41421 4.25 8Z"
                            fill="#22C55E"
                            className="path-2"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H13C13.4142 11.25 13.75 11.5858 13.75 12C13.75 12.4142 13.4142 12.75 13 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12Z"
                            fill="#22C55E"
                            className="path-2"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.25 16C4.25 15.5858 4.58579 15.25 5 15.25H9C9.41421 15.25 9.75 15.5858 9.75 16C9.75 16.4142 9.41421 16.75 9 16.75H5C4.58579 16.75 4.25 16.4142 4.25 16Z"
                            fill="#22C55E"
                            className="path-2"
                          />
                          <path
                            d="M11 0H7C5.89543 0 5 0.895431 5 2C5 3.10457 5.89543 4 7 4H11C12.1046 4 13 3.10457 13 2C13 0.895431 12.1046 0 11 0Z"
                            fill="#22C55E"
                            className="path-2"
                          />
                        </svg>
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Sub Agent Management
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ) : (
              ""
            )}

            {cookies.get("name") == "Super Admin" ||
            cookies.get("name") == "Agent" ? (
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  location === "/AgentTranscation" ? "nav-active" : ""
                } `}
              >
                <Link to="/AgentTranscation">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico">
                        <svg
                          width="20"
                          height="18"
                          viewBox="0 0 20 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 4C20 1.79086 18.2091 0 16 0H4C1.79086 0 0 1.79086 0 4V14C0 16.2091 1.79086 18 4 18H16C18.2091 18 20 16.2091 20 14V4Z"
                            fill="#1A202C"
                            className="path-1"
                          />
                          <path
                            d="M6 9C6 7.34315 4.65685 6 3 6H0V12H3C4.65685 12 6 10.6569 6 9Z"
                            fill="#22C55E"
                            className="path-2"
                          />
                        </svg>
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Agent Transcation
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ) : (
              ""
            )}

            <li
              className={`item py-[11px] text-bgray-900 dark:text-white ${
                location === "/transaction" ? "nav-active" : ""
              } `}
            >
              <Link to="/transaction">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="item-ico">
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 16V6C18 3.79086 16.2091 2 14 2H4C1.79086 2 0 3.79086 0 6V16C0 18.2091 1.79086 20 4 20H14C16.2091 20 18 18.2091 18 16Z"
                          fill="#1A202C"
                          className="path-1"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.25 8C4.25 7.58579 4.58579 7.25 5 7.25H13C13.4142 7.25 13.75 7.58579 13.75 8C13.75 8.41421 13.4142 8.75 13 8.75H5C4.58579 8.75 4.25 8.41421 4.25 8Z"
                          fill="#22C55E"
                          className="path-2"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H13C13.4142 11.25 13.75 11.5858 13.75 12C13.75 12.4142 13.4142 12.75 13 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12Z"
                          fill="#22C55E"
                          className="path-2"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.25 16C4.25 15.5858 4.58579 15.25 5 15.25H9C9.41421 15.25 9.75 15.5858 9.75 16C9.75 16.4142 9.41421 16.75 9 16.75H5C4.58579 16.75 4.25 16.4142 4.25 16Z"
                          fill="#22C55E"
                          className="path-2"
                        />
                        <path
                          d="M11 0H7C5.89543 0 5 0.895431 5 2C5 3.10457 5.89543 4 7 4H11C12.1046 4 13 3.10457 13 2C13 0.895431 12.1046 0 11 0Z"
                          fill="#22C55E"
                          className="path-2"
                        />
                      </svg>
                    </span>
                    <span className="item-text text-lg font-medium leading-none">
                      Player Management
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li
              className={`item py-[11px] text-bgray-900 dark:text-white ${
                location === "/SubAgentTranscation" ? "nav-active" : ""
              } `}
            >
              <Link to="/SubAgentTranscation">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="item-ico">
                      <svg
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 4C20 1.79086 18.2091 0 16 0H4C1.79086 0 0 1.79086 0 4V14C0 16.2091 1.79086 18 4 18H16C18.2091 18 20 16.2091 20 14V4Z"
                          fill="#1A202C"
                          className="path-1"
                        />
                        <path
                          d="M6 9C6 7.34315 4.65685 6 3 6H0V12H3C4.65685 12 6 10.6569 6 9Z"
                          fill="#22C55E"
                          className="path-2"
                        />
                      </svg>
                    </span>
                    <span className="item-text text-lg font-medium leading-none">
                      Sub Agent Transcation
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
