import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useContext, useEffect } from 'react';
import offerContext from '../../context/offerContext';

function addnotification() {

  const context = useContext(offerContext)
  console.log("Contect ",context)
  const { SendPushnotification } = context
  



  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationDescription, setNotificationDescription] = useState('');

  const handleTitleChange = (e) => {
    setNotificationTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNotificationDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // You can add your logic here to handle the form submission
    const res =  await SendPushnotification({title:notificationTitle,notification:notificationDescription})

    res.falgs ? alert("Successfully Sent Push notification....") : alert("Fail to Push notification....")
    console.log('Title:', res);
    console.log('Description:', notificationDescription);
    setNotificationTitle("")
    setNotificationDescription("")

  };


  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
          Notification Information's
        </h3>
        <div className="mt-8">
          
            <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="NotificationTitle"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                  Notification Title
                </label>
                <input
                  type="text"
                  id="notificationTitle"
                  placeholder="notificationTitle"
                  name="notificationTitle"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={handleTitleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Notification Description"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                Notification Description
                </label>
                <input
                  type="text"
                  id="Notification Description"
                  placeholder="Notification Description"
                  name="Notification Description"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                aria-label="none"
                className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
                onClick={handleSubmit}
              >
                Add Push Notificatioin
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}


export default addnotification;