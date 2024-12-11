import ProtoTypes from "prop-types";
import offerContext from '../../context/offerContext'
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function CustomerInfo({ title, content, date, id }) {

  const context = useContext(offerContext)

  const { DeleteNoticeText } = context


  const navigate = useNavigate();
  const navigateToContacts = () => {
    // 👇️ navigate to /contacts 
    navigate('/noticetext');
  };

  const deleteNotice = async (id) => {
    await DeleteNoticeText(id)

    navigateToContacts()

  };


  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">

      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {title}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {content}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {date}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          <button
            aria-label="none"
            className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
            onClick={(e) => deleteNotice(id)}
          >
            Delete
          </button>
        </p>
      </td>
    </tr>
  );
}

CustomerInfo.propTypes = {
  title: ProtoTypes.string,
  content: ProtoTypes.string,
};

export default CustomerInfo;
