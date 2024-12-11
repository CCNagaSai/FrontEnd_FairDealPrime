import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useContext, useEffect } from 'react';
import offerContext from '../../context/offerContext';

function addsocailurl() {

  const context = useContext(offerContext)

  const { SocailURLsAdd } = context

  const navigate = useNavigate();
  const navigateToContacts = () => {
    // 👇️ navigate to /contacts 
    navigate('/socialurl');
  };


  const [newPlatform, setNewPlatform] = useState('');
  const [newURL, setNewURL] = useState('');

  const addSocialURL = async () => {
    if (newPlatform && newURL) {
      const newSocialURL = {
        platform: newPlatform,
        url: newURL,
      };

      let res = await SocailURLsAdd(newSocialURL)
      console.log("REsponce ::::::::::::::::::::::", res)

      if (res.flags) {
        setNewPlatform('');
        setNewURL('');
        navigateToContacts()
      } else {
        alert("Error Please enter")
      }
    }else{
      alert("Please Input Vailed")
    }
  };


  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
          Social URL Information's
        </h3>
        <div className="mt-8">
          
            <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Platform"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                  Platform
                </label>
                <input
                  type="text"
                  id="Platform"
                  placeholder="Platform"
                  name="Platform"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={(e) => setNewPlatform(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Platform"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                  URL
                </label>
                <input
                  type="text"
                  id="URL"
                  placeholder="URL"
                  name="URL"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={(e) => setNewURL(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                aria-label="none"
                className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
                onClick={addSocialURL}
              >
                Add Social URL
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}


export default addsocailurl;