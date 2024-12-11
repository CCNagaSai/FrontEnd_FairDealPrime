
import offerContext from '../../context/offerContext'
import React, { useContext, useEffect, useState, useRef } from 'react';

function commissionInfo() {
 
  const [selectedcom, setSelectedcom] = useState("");
  const [agentselectedcom, setAgentSelectedcom] = useState("");


  const handleChangeadmin = (event) => {
    setSelectedcom(event.target.value);
  };

  const handleChangeagent = (event) => {
    setAgentSelectedcom(event.target.value);
  };



  const context = useContext(offerContext)
  const {  GetGameCom,GameComSet  } = context

  useEffect( () => {
    const submitdata = async () => {
      
      let data = await GetGameCom()
      console.log("data :::::::::::::::::::",data)

      setSelectedcom(data.admincommission)
      setAgentSelectedcom(data.agentcommission)
     
      
  }
  submitdata()
  },[]);

  const handleSubmit = async () => {
   let res = await  GameComSet({
        "game":"SORAT",
        "selectedcom":selectedcom,
        "agentselectedcom":agentselectedcom

    })
    console.log("REs :::::::::::::::::::::",res)
    if(res.falgs == true){
      alert("Success Save")
    }
    console.log(selectedcom);
  };
  return (
    <div className="mb-[24px] w-full">
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">

        <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center space-x-[7px]">
              <div className="icon">
                <span>
                <label style={{"color":"white"}} htmlFor="noOneWillWin">Admin Commission :</label>
                </span>
              </div>
              <span className="text-lg font-semibold text-bgray-900 dark:text-white">
          

            <input
            type="text"
            id="name"
            placeholder="Please Insert Name"
            name="name"
            value={selectedcom}
            className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14  w-14 border-0 focus:border focus:border-success-300 focus:ring-0"
            onChange={handleChangeadmin}
            />

              </span>
            </div>
          </div>
        </div>



        <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center space-x-[7px]">
              <div className="icon">
                <span>
                <label style={{"color":"white"}} htmlFor="noOneWillWin">Agent Commission :</label>
                </span>
              </div>
              <span className="text-lg font-semibold text-bgray-900 dark:text-white">
          

            <input
            type="text"
            id="name"
            placeholder="Please Insert Name"
            name="name"
            value={agentselectedcom}
            className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14  w-14 border-0 focus:border focus:border-success-300 focus:ring-0"
            onChange={handleChangeagent}
            />

              </span>
            </div>
          </div>
        </div>


 



        <div className="rounded-lg  p-5">

          <div className="mb-5 flex items-center justify-between">
            <button onClick={handleSubmit}
              aria-label="none"
              className="bg-success-300 dark:bg-success-300 dark:text-bgray-900 border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm">
            Submit
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default commissionInfo;


          
          


          
          
          
        
        