import React, { useContext, useState, useEffect, useRef } from "react";
import offerContext from "../../context/offerContext";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const Navigate = useNavigate();
  const cookies = new Cookies();
  const context = useContext(offerContext);
  const { LogoutClick } = context;

  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State to control the logout confirmation popup
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

      // Optional: Redirect to the login page or another route
      window.location.href = "/signin";
      // Log cookie values to verify they're cleared

      // Logout click logic (if any)
      // await LogoutClick();

      // Navigate to the signin page
      // setTimeout(() => Navigate("/signin"), 1000);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      let apiUrl = "";

      if (position === "Shop" && agentId) {
        apiUrl = `http://93.127.194.87:9999/admin/shop/agentBalance?subAgentId=${agentId}`;
      } else if (position === "Agent" && agentId) {
        apiUrl = `http://93.127.194.87:9999/admin/agent/agentBalance?agentId=${agentId}`;
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
            setBalance(data.agent.chips || 0);
          } else {
            console.error("Failed to fetch balance");
          }
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    fetchBalance();
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
    <div className='flex items-center h-10'>
      <img
        src='https://i.imgur.com/6493z1j.png'
        alt='Fairdeal Agent'
        className='w-6 h-6 mx-auto lg:ml-5 lg:mr-11 md:mx-4'
      />

      <div className='hidden md:flex z-50 flex-row justify-center items-center ml-6 md:ml-4 lg:ml-9'>
        <div className='text-sm flex flex-col md:flex-row justify-center gap-4 items-center lg:gap-6'>
          <p className='font-bold'>
            Welcome: <span className='text-red-500 font-bold'>{userName}</span>
          </p>
          <p>
            Balance: <span className='text-red-500 font-bold'>{balance}</span>
          </p>
          <p>
            Position: <span className='text-red-500 font-bold'>{position}</span>
          </p>
          <p className='text-l text-gray-500 font-bold mr-5'>{currentTime}</p>
        </div>

        <div className='flex flex-row items-center gap-2 lg:gap-4 mt-4'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs'
            onClick={() => setShowLogoutPopup(true)}
          >
            LOGOUT
          </button>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs'>
            SWITCH TO CLASSIC
          </button>
        </div>
      </div>

      {showLogoutPopup && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg p-6 shadow-lg'>
            <p className='mb-4 text-lg font-semibold'>
              Are you sure you want to logout?
            </p>
            <div className='flex justify-end gap-4'>
              <button
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'
                onClick={logout}
              >
                Logout
              </button>
              <button
                className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400'
                onClick={() => setShowLogoutPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        type='button'
        className='inline-flex items-center mt-4 p-2 w-10 h-10 justify-center z-50 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none'
      >
        <svg
          className={`w-5 h-5 ${
            isMenuOpen ? "rotate-180" : "rotate-0"
          } transition-transform`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 17 14'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M1 1h15M1 7h15M1 13h15'
          />
        </svg>
      </button>

      <div
        ref={menuRef}
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } w-half z-40 flex flex-col items-center space-y-4 absolute top-4 right-4 mt-10 bg-gray-50 border rounded-lg p-4`}
      >
        <ul className='flex flex-col font-medium'>
          <li>
            <p className='font-bold text-[16px] py-2'>
              Welcome: <span className='text-red-500'>{userName}</span>
            </p>
          </li>
          <li>
            <p className='font-bold text-[16px] py-2'>
              Balance: <span className='text-red-500'>{balance}</span>
            </p>
          </li>
          <li>
            <p className='font-bold text-[16px] py-2'>
              Position: <span className='text-red-500'>{position}</span>
            </p>
          </li>
          <li>
            <p className='text-gray-500 text-sm'>{currentTime}</p>
          </li>
          <li>
            <div className='flex gap-2 items-center'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs'
                onClick={() => setShowLogoutPopup(true)}
              >
                LOGOUT
              </button>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs'>
                SWITCH TO CLASSIC
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
