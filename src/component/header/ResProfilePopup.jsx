import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState, useRef } from 'react';
import offerContext from '../../context/offerContext'
import ModeToggler from "./ModeToggler";

function ResProfilePopup({ isActive }) {

  const context = useContext(offerContext)
  const { LogoutClick } = context

  const logout = async () => {
    await LogoutClick()

  }

  
  return (
    <div className="profile-wrapper text-left">
      <div
        style={{
          filter: `drop-shadow(12px 12px 40px rgba(0, 0, 0, 0.08))`,
          display: isActive ? "block" : "none",
        }}
        className={`profile-box transition-all origin-top absolute right-0 top-[81px] hidden w-[300px] overflow-hidden rounded-lg bg-white dark:bg-darkblack-600 ${isActive ? " block introAnimation" : "hidden"
          } `}
      >
        <div className="relative w-full px-3 py-2">
          <div>
            <ul>

              <li className="w-full">
                <Link to="/signin">
                  <div className="flex items-center space-x-[18px] rounded-lg p-[14px] text-success-300">
                    <div className="w-[20px]">
                      <span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 10L13.7071 11.2929C13.3166 11.6834 13.3166 12.3166 13.7071 12.7071L15 14M14 12L22 12M6 20C3.79086 20 2 18.2091 2 16V8C2 5.79086 3.79086 4 6 4M6 20C8.20914 20 10 18.2091 10 16V8C10 5.79086 8.20914 4 6 4M6 20H14C16.2091 20 18 18.2091 18 16M6 4H14C16.2091 4 18 5.79086 18 8"
                            stroke="#22C55E"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="flex-1">
                      <button onClick={logout}>
                        <span className="text-sm font-semibold">Log Out</span>
                      </button>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="w-full">
              
                  <div className="flex items-center space-x-[18px] rounded-lg p-[14px] text-success-300">
                   
                    <div className="flex-1">
                     
                        <ModeToggler/>
                    </div>
                  </div>
              </li>
            </ul>
          </div>
          <div className="my-[14px] h-[1px] w-full bg-bgray-300"></div>

        </div>
      </div>
    </div>
    
  );
}

ResProfilePopup.propTypes = {
  isActive: ProtoTypes.bool,
};

export default ResProfilePopup;
