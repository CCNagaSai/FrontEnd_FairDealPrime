import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useContext, useEffect } from 'react';
import offerContext from '../../context/offerContext';

function addbanner() {

  const context = useContext(offerContext)

  const { BannerAdd,UploadBanner } = context

  const [newTitle, setNewTitle] = useState('');
  const [newLink, setNewLink] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();
  const navigateToContacts = () => {
    // 👇️ navigate to /contacts 
    navigate('/bannerlist');
  };


  const addBanner = async () => {
    if (newTitle && selectedImage) {
      const newBanner = {
        title: newTitle,
        imageUrl: selectedImage,//URL.createObjectURL(selectedImage), // Display the selected image
        date: new Date().toLocaleDateString(),
        link:newLink
      };

      let res = await BannerAdd(newBanner)
      console.log("REsponce ::::::::::::::::::::::",res)

      if(res.flags){
          setNewTitle('');
          setNewLink('');
          setSelectedImage(null);
      }else{
          alert("Error Please enter")
      }
    }
  };


  const handleImageChange = async (e) => {
    console.log("e")
   

    const imageFile = await UploadBanner(e.target.files[0])

    console.log("imageFile ",imageFile)
    if (imageFile) {
      setSelectedImage(imageFile);
    }
  };


  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
          Banner Information's
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
                  htmlFor="Title"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                Link
                </label>
                <input
                  type="text"
                  id="link"
                  placeholder="link"
                  name="link"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={(e) => setNewLink(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Platform"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                  Banner Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                aria-label="none"
                className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
                onClick={addBanner}
              >
                Add Banner
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}


export default addbanner;