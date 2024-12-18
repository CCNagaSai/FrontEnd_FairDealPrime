import React, { useState, useEffect, useRef, useContext } from "react";
import offerContext from "../context/offerContext";
import ProtoTypes from "prop-types";

const Topbar = ({ active }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref for the menu
  const buttonRef = useRef(null); // Ref for the hamburger button

  const context = useContext(offerContext);
  const { LogoutClick } = context;

  const logout = async () => {
    await LogoutClick();
  };

  // Update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []);

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false); // Close the menu if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center h-10">
      {/* Logo */}
      <img
        src="https://i.imgur.com/6493z1j.png"
        alt="Fairdeal Agent"
        className="w-6 h-6 mx-auto lg:ml-5 lg:mr-11 md:mx-0"
      />

      {/* Desktop View */}
      <div className="hidden lg:flex bg-white z-50 flex-row justify-center items-center ml-9 mt-2 space-y-4 lg:space-y-0">
        <div className="text-sm flex flex-col lg:flex-row justify-center gap-6 items-center ml-9  lg:mt-2 space-y-2 lg:space-y-0">
          <p className="font-bold">
            Welcome: <span className="text-red-500 font-bold">Amzad999</span>
          </p>
          <p>
            Balance: <span className="text-red-500 font-bold">0</span>
          </p>
          <p>
            Position:{" "}
            <span className="text-red-500 font-bold">SUPER AGENT</span>
          </p>
          <p className="text-xs text-gray-500">{currentTime}</p>
        </div>

        <div className="flex flex-row items-center mt-4 space-y-0">
          <button
            className="bg-blue-500 hover:bg-blue-700 ml-3 text-white font-bold py-1 px-3 rounded text-xs"
            onClick={logout}
          >
            LOGOUT
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 ml-3 text-white font-bold py-1 px-3 rounded text-xs">
            SWITCH TO CLASSIC
          </button>
        </div>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <button
        ref={buttonRef} // Attach ref to the button
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu state on click
        type="button"
        className="inline-flex items-center mt-4 p-2 w-10 h-10 justify-center z-50 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 absolute right-1"
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

      {/* Collapsible Menu for Small Screens */}
      <div
        ref={menuRef} // Attach ref to the menu container
        id="navbar-user"
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } w-full mt-[320px] z-40 flex flex-col items-center space-y-4 absolute left-8 transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-y-0" : "-translate-y-6"
        }`}
      >
        <ul className="flex flex-col font-medium p-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800">
          <li>
            <p className="font-bold text-[18px] py-2 px-3">
              Welcome: <span className="text-red-500 font-bold">Amzad999</span>
            </p>
          </li>
          <li>
            <p className="font-bold text-[18px] py-2 px-3">
              Balance: <span className="text-red-500 font-bold">0</span>
            </p>
          </li>
          <li>
            <p className="font-bold text-[18px] py-2 px-3">
              Position:{" "}
              <span className="text-red-500 font-bold">SUPER AGENT</span>
            </p>
          </li>
          <li>
            <p className="py-2 px-3 text-[17px] text-gray-500">{currentTime}</p>
          </li>
          <li>
            <div className="flex flex-row gap-2 items-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs">
                LOGOUT
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs">
                SWITCH TO CLASSIC
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
Topbar.propTypes = {
  active: ProtoTypes.bool,
  handlePopup: ProtoTypes.func,
};

export default Topbar;
