import ProtoTypes from "prop-types";
import offerContext from '../../context/offerContext';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

function PlayerInfo({ UserId,DateandTime,trnxAmount,oppChips,chips,trnxTypeTxt ,agentname ,adminid }) {

  const context = useContext(offerContext)
  const { PayoutUpdate,host } = context

  const styles = {
    backgroundColor: status == -1 ? "red" : status == 0 ? "red" : "green"
  };

  const navigate = useNavigate();
  const navigateToContacts = () => {
      // 👇️ navigate to /contacts 
      navigate('/payoutpendding');
     
  };

  const handleApprove = async (id) =>{
    console.log("handleApprove ",id)
    const Update = await PayoutUpdate({ trnsId:id,status:1})

    if(Update.status == "ok"){
      navigate('/payoutpendding');
    }else{
        alert("Error Please enter")
    }

  }
  const handlerejected = async (id) =>{
    console.log("handlerejected ",id)

    console.log("handleApprove ",id)
    const Update = await PayoutUpdate({ trnsId:id,status:0})

    if(Update.status == "ok"){
      navigate('/payoutpendding?status=Rejected'); 
  }else{
      alert("Error Please enter")
  }

  }

  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">

      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {UserId}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
          <p className="text-base font-semibold text-bgray-900 dark:text-white">
            {DateandTime}
          </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
        ₹{trnxAmount}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
        ₹{oppChips}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
        ₹{chips}
        </p>
      </td>
   
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
        {trnxTypeTxt} 
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {agentname}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {adminid}
        </p>
      </td>
      
      
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
//   Block:ProtoTypes.string,
//   Status:ProtoTypes.string
// };

export default PlayerInfo;
