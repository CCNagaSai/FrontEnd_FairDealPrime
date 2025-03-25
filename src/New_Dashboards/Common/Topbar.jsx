import React, { useContext, useState, useEffect, useRef } from "react";
import offerContext from "../../context/offerContext";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_HOST_URL;
const Topbar = () => {
  const Navigate = useNavigate();
  const cookies = new Cookies();
  const context = useContext(offerContext);
  const { LogoutClick } = context;

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const userName = cookies.get("email") || "Guest";
  const position = cookies.get("name") || "User";
  const agentId = cookies.get("LoginUserId");
  const token = cookies.get("token");

  const logout = async () => {
    try {
      console.log("Clearing cookies...");
      cookies.remove("logintype", { path: "/" });
      cookies.remove("name", { path: "/" });
      cookies.remove("email", { path: "/" });
      cookies.remove("LoginUserId", { path: "/" });
      cookies.remove("token", { path: "/" });

      window.location.href = "/signin";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const [weekStartDate, setWeekStartDate] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");
  const [net, setNet] = useState(0);
  const [margin, setMargin] = useState(0);
  const [endpoint, setEndpoint] = useState(0);

  // Function to Fetch Balance Periodically
  const fetchBalance = async () => {
    let apiUrl = "";
    if (position === "Shop" && agentId) {
      apiUrl = `${API_URL}/admin/shop/agentBalance?subAgentId=${agentId}`;
    } else if (position === "Agent" && agentId) {
      apiUrl = `${API_URL}/admin/agent/agentBalance?agentId=${agentId}`;
    } else if (position === "Super Admin") {
      apiUrl = `${API_URL}/admin/agent/netmargin`;
    }

    if (apiUrl && token) {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (position === "Super Admin") {
            let totalEndPoints = 0;
            let totalMargin = 0;

            data.turnOverData?.forEach((item) => {
              totalEndPoints += item.totalEndPoints || 0;
              totalMargin += item.totalMargin || 0;
            });

            const calculatedNet = totalEndPoints - totalMargin;

            // **Convert values to 2 decimal places**
            setNet(parseFloat(calculatedNet.toFixed(2)));
            setEndpoint(parseFloat(totalEndPoints.toFixed(2)));
            setMargin(parseFloat(totalMargin.toFixed(2)));

            setWeekStartDate(new Date(data.weekStartDate).toLocaleDateString());
            setWeekEndDate(new Date(data.weekEndDate).toLocaleDateString());
            // console.log("Raw Week Start Date:", data.weekStartDate);
            // console.log("Raw Week End Date:", data.weekEndDate);
          } else {
            let newBalance = data.agent?.chips || data.shop?.chips || 0;
            if (newBalance !== balance) {
              setBalance(newBalance);
            }
          }
        } else {
          console.error("Failed to fetch balance");
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  // Polling: Fetch balance every 2 seconds
  useEffect(() => {
    fetchBalance(); // Initial fetch when component mounts
    const intervalId = setInterval(fetchBalance, 2000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [position, agentId, token]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center h-15 w-full relative">
      <img
        src="https://i.imgur.com/6493z1j.png"
        alt="Fairdeal Agent"
        className="w-6 h-6 mx-auto lg:ml-5 lg:mr-11 md:mx-4"
      />

      {/* DESKTOP TOPBAR */}
      <div className="hidden md:flex z-50 flex-row justify-center items-center ml-6 md:ml-4 lg:ml-9">
        <div className="text-sm flex flex-col md:flex-row justify-center gap-4 items-center lg:gap-6">
          <p className="font-bold">
            Welcome: <span className="text-red-500 font-bold">{userName}</span>
          </p>
          {position === "Super Admin" ? (
            <>
              <p className="font-bold">
                This Week:{" "}
                <span className="text-red-500 font-bold">
                  {weekStartDate} - {weekEndDate}
                </span>
              </p>

              <p className="font-bold">
                Net: <span className="text-red-500 font-bold">{net}</span>
              </p>
              <p className="font-bold">
                Endpoint:{" "}
                <span className="text-red-500 font-bold">{endpoint}</span>
              </p>
              <p className="font-bold">
                Margin: <span className="text-red-500 font-bold">{margin}</span>
              </p>
            </>
          ) : (
            <p  className="font-bold">
              Balance: <span className="text-red-500 font-bold">{balance}</span>
            </p>
          )}

          <p  className="font-bold">
            Position: <span className="text-red-500 font-bold">{position}</span>
          </p>
          <p className="text-l text-gray-500 font-bold mr-5">{currentTime}</p>
        </div>

        <div className="flex flex-row items-center gap-2 lg:gap-4 mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs"
            onClick={() => setShowLogoutPopup(true)}
          >
            LOGOUT
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs">
            SWITCH TO CLASSIC
          </button>
        </div>
      </div>

      {showLogoutPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <p className="mb-4 text-lg font-semibold">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={logout}
              >
                Logout
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowLogoutPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU BUTTON */}
      <button
        ref={buttonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        type="button"
        className="inline-flex items-center z-50 absolute right-4 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
      >
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

      {/* MOBILE DROPDOWN MENU */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full right-4 mt-2 w-60 bg-white shadow-lg rounded-lg p-4 z-50 border border-gray-200 md:hidden"
        >
          <p className="font-bold">
            Welcome: <span className="text-red-500 font-bold">{userName}</span>
          </p>
          {position === "Super Admin" ? (
            <>
              <p className="font-bold">
                This Week:{" "}
                <span className="text-red-500 font-bold">
                  {weekStartDate} - {weekEndDate}
                </span>
              </p>

              <p className="font-bold">
                Net: <span className="text-red-500 font-bold">{net}</span>
              </p>
              <p className="font-bold">
                Endpoint:{" "}
                <span className="text-red-500 font-bold">{endpoint}</span>
              </p>
              <p className="font-bold">
                Margin: <span className="text-red-500 font-bold">{margin}</span>
              </p>
            </>
          ) : (
            <p className="font-bold">
              Balance: <span className="text-red-500 font-bold">{balance}</span>
            </p>
          )}

          <p className="font-bold">
            Position: <span className="text-red-500 font-bold">{position}</span>
          </p>
          <p className="text-gray-500 font-bold">{currentTime}</p>

          <div className="flex flex-col gap-2 mt-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs"
              onClick={() => setShowLogoutPopup(true)}
            >
              LOGOUT
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs">
              SWITCH TO CLASSIC
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;
