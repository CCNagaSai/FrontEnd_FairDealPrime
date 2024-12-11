import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useContext, useEffect } from 'react';
import offerContext from '../../context/offerContext';

function changepwd() {

  const context = useContext(offerContext)

  const { Chnageidpwd, LogoutClick} = context

  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [oldEmail, setoldEmail] = useState('');


 
  const navigate = useNavigate();
  const navigateToContacts = () => {
    // 👇️ navigate to /contacts 
    navigate('/signin');
  };


  const ChnagePWD = async () => {
    console.log("oldPwd ",oldPwd)
    if (oldPwd) {
      const newBanner = {
        oldPwd: oldPwd,
        newPwd: newPwd,
        newEmail:newEmail,
        email:oldEmail
      };

      let res = await Chnageidpwd(newBanner)
      console.log("REsponce ::::::::::::::::::::::",res)

      if(res.status == 1){
        setOldPwd('');
        setNewPwd('');
        setNewEmail('');
        setoldEmail('')
        alert(res.message)
        LogoutClick()
        navigateToContacts()

      }else{
          alert(res.message)
      }
    }
  };


  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
          Change Admin Password
        </h3>
        <div className="mt-8">
          
            <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
            <label
              htmlFor="Title"
              className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
            >
            Old Email Id
            </label>
            <input
              type="text"
              id="link"
              placeholder="Old Email Id"
              name="link"
              className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
              onChange={(e) => setoldEmail(e.target.value)}
            />
          </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Title"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                Old Password
                </label>
                <input
                  type="text"
                  id="Title"
                  placeholder="Old password"
                  name="Title"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={(e) => setOldPwd(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Title"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                New Email Id
                </label>
                <input
                  type="text"
                  id="link"
                  placeholder="New Email Id"
                  name="link"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
              <label
                htmlFor="Title"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
              New Password
              </label>
              <input
                type="text"
                id="link"
                placeholder="New password"
                name="link"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                onChange={(e) => setNewPwd(e.target.value)}
              />
            </div>
            
            </div>
            <div className="flex justify-end">
              <button
                aria-label="none"
                className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
                onClick={ChnagePWD}
              >
                Change Password 
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}


export default changepwd;