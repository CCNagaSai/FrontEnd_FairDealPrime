import ProtoTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import offerContext from '../../context/offerContext';
import React, { useState, useContext, useEffect } from 'react';

import edit from "../../assets/images/edit.png";
import trash from "../../assets/images/trash.png";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function PlayerInfo({ UserId, UserName, name, totalPlayPoints, totalWonPoints, endPoints,  margin, MainWallet, RegistrationDate, LastLogin,  status, profileUrl,email,uniqueId }) {

  const navigate = useNavigate();

  const context = useContext(offerContext)
  const { PlayerDelete } = context
  

  const DeleteUser = async (userid) => {
    console.log("delete ::::::::::::::")
    await PlayerDelete(userid)
    window.location.reload();
  }

  const navigateToContacts = (UserId, UserName, name,  totalPlayPoints, totalWonPoints, endPoints,  margin, MainWallet,  RegistrationDate, LastLogin, status, profileUrl,email,uniqueId) => {
    navigate('/playeredit', { state:{ UserId, UserName, name, totalPlayPoints, totalWonPoints, endPoints,  margin, MainWallet,  RegistrationDate, LastLogin, status, profileUrl,email,uniqueId } });
  }

  function formatDateTo12hr(dateTimeStr) {
    const dateTime = new Date(dateTimeStr);
    const formattedDate = dateTime.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true // Set to true for 12-hour format
    });
    return formattedDate;
  }

  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
      
      <td className="px-6 py-5 xl:px-0">
        <div className="flex w-full items-center space-x-2.5">
          <p className="text-base font-semibold text-bgray-900 dark:text-white">
            {UserName}
          </p>
        </div>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {name}
        </p>
      </td>

      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {totalPlayPoints}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {totalWonPoints}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {endPoints}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {margin}
        </p>
      </td>
      
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
        ₹{MainWallet}
        </p>
      </td>
      
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {formatDateTo12hr(RegistrationDate)}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {formatDateTo12hr(LastLogin)}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {status}
        </p>
      </td>

      {cookies.get('name') == "Super Admin" || cookies.get('name') == "Agent" || cookies.get('name') == "Shop" ? <td className="px-6 py-5 xl:px-0">
        <div className="flex justify-center">
          <button styles={{
            "margin": "1px",
            "background-color": "white",
            "color": "white",
            "border": "none",
            "padding": "5px 10px",
            "cursor": "pointer",
            "border-radius": "4px"
          }} onClick={() => navigateToContacts(UserId, UserName, name, totalPlayPoints, totalWonPoints, endPoints,  margin, MainWallet, RegistrationDate, LastLogin, status, profileUrl, email, uniqueId)} >
            <img style={{ "width": "30px", "height": "30px", "margin": "30px" }} src={edit} />
          </button>

          <button styles={{
            "margin": "1px",
            "background-color": "white",
            "color": "white",
            "border": "none",
            "padding": "5px 10px",
            "cursor": "pointer",
            "border-radius": "4px"
          }} onClick={() => DeleteUser(UserId)} >
            <img style={{ "width": "30px", "height": "30px", "margin": "30px" }} src={trash} />
          </button>
        </div>
      </td> : ""}
    </tr>
  );
}

// PlayerInfo.propTypes = {
//   UserId:ProtoTypes.string,
//   UserName:ProtoTypes.string,
//   MobileNo:ProtoTypes.string,
//   GamePlay:ProtoTypes.Number,
//   MainWallet:ProtoTypes.Number,
//   RegistrationDate:ProtoTypes.string,
//   LastLogin:ProtoTypes.string,
//   status:ProtoTypes.string,
//   Status:ProtoTypes.string
// };

export default PlayerInfo;
