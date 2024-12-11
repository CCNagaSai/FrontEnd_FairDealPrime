import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useContext, useEffect } from 'react';
import offerContext from '../../context/offerContext';

function addsocailurl() {

  const context = useContext(offerContext)

  const { CoinPackeAdd } = context

  const navigate = useNavigate();
  const navigateToContacts = () => {
    // 👇️ navigate to /contacts 
    navigate('/coinmanagement');
  };


  const [price, setPrice] = useState('');
  const [inapp, setInapp] = useState('');
  const [chips, setChips] = useState('');
  const [bonus, setBonus] = useState('');

  const AddCoinPack = async () => {
    if (price && inapp && chips && bonus) {
      const newSocialURL = {
        price: price,
        inapp: inapp,
        chips: chips,
        bonus: bonus
      };

      let res = await CoinPackeAdd(newSocialURL)
      console.log("REsponce ::::::::::::::::::::::", res)

      if (res.flags) {
        setPrice('');
        setInapp('');
        setChips('');
        setBonus('');

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
          Coin Management
        </h3>
        <div className="mt-8">
          
            <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Platform"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                  Inapp
                </label>
                <input
                  type="text"
                  id="inapp"
                  placeholder="Inapp"
                  name="inapp"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={(e) => setInapp(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Platform"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  placeholder="price"
                  name="price"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Platform"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                  Chips
                </label>
                <input
                  type="text"
                  id="chips"
                  placeholder="chips"
                  name="chips"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={(e) => setChips(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Platform"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                  Bonus
                </label>
                <input
                  type="text"
                  id="Bonus"
                  placeholder="Bonus"
                  name="Bonus"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={(e) => setBonus(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                aria-label="none"
                className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
                onClick={AddCoinPack}
              >
                Add Coin Pack
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}


export default addsocailurl;