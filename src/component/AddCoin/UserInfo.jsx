import ProtoTypes from "prop-types";
import offerContext from '../../context/offerContext'
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function CustomerInfo({ inapp, price,chips,bonus,id}) {

  const context = useContext(offerContext)

  const {DeleteCoinpack } = context
  

  const navigate = useNavigate();
  const navigateToContacts = () => {
    // 👇️ navigate to /contacts 
    navigate('/coinmanagement');
  };

  const deleteSocialURL =async (id) => {
    await DeleteCoinpack(id)

    navigateToContacts()

  };


  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
      
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {inapp}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {price}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {chips}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {bonus}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
      <p className="text-base font-medium text-bgray-900 dark:text-white">
      <button
      aria-label="none"
      className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
      onClick={(e) => deleteSocialURL(id)}
    >
      Delete
    </button>
      </p>
    </td>
    </tr>
  );
}

CustomerInfo.propTypes = {
  PlatForm: ProtoTypes.string,
  URL: ProtoTypes.string,
};

export default CustomerInfo;
