import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useContext, useEffect } from 'react';
import offerContext from '../../context/offerContext';

function addnoticetext() {

  const context = useContext(offerContext)

  const { NoticeTextLsAdd } = context

  const navigate = useNavigate();
  const navigateToContacts = () => {
    // 👇️ navigate to /contacts 
    navigate('/noticetext');
  };



  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const addNotice = async () => {
    if (newTitle && newContent) {
      const newNotice = {
        title: newTitle,
        content: newContent,
        date: new Date().toLocaleDateString(),
      };

      let res = await NoticeTextLsAdd(newNotice)
      console.log("REsponce ::::::::::::::::::::::", res)

      if (res.flags) {
        setNewTitle('');
        setNewContent('');
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
          Notice Information's
        </h3>
        <div className="mt-8">
          
            <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Title"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                Title
                </label>
                <input
                  type="text"
                  id="Title"
                  placeholder="Title"
                  name="Title"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Platform"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                  Content
                </label>
                <textarea
                  type="text"
                  id="Content"
                  placeholder="Content"
                  name="Content"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={(e) => setNewContent(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                aria-label="none"
                className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
                onClick={addNotice}
              >
                Add Notice Text
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}


export default addnoticetext;