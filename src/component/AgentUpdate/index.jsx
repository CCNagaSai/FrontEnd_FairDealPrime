import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useContext, useEffect } from 'react';
import offerContext from '../../context/offerContext';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function agentUpdate() {

  const location = useLocation();
  //console.log("location ", location.state)
  const Botinfo = location.state;

  const context = useContext(offerContext)
  const { AgentUpdate, host ,agentAddMoney, agentDeductMoney} = context

  console.log("Botinfo :::::::::::::::::", Botinfo)

  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();
  const navigateToContacts = () => {
    // 👇️ navigate to /contacts 
    navigate('/agentmanagement');
  };

  let [userInfo, SetuserInfo] = useState({
    userId: Botinfo.UserId,
    email: "",
    name: "",
    mobileno: "",
    password: "",
    location: "",
    area: "",
    status: ""
  })

  useEffect(() => {

    const submitdata = async () => {
      SetuserInfo({
        userId: Botinfo.UserId,
        name: Botinfo.UserName,
        password: Botinfo.password,
        location: Botinfo.location,
        status: Botinfo.status

      })

    }
    submitdata()
  }, []);

  const OnChange = (event) => {
    let { name, value } = event.target;
    SetuserInfo({
      ...userInfo,
      [name]: value,
    });


    console.log("handleChange ::::::::::::::::::::::", userInfo)

  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("NAME :::::::::::::::::", value)
    SetuserInfo({
      ...userInfo,
      [name]: value,
    });

    console.log("handleChange ::::::::::::::::::::::", userInfo)

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can handle the form submission here
    // This example just logs the data to the console

    console.log("userInfo ", userInfo)

    if(!/^[a-zA-Z\s]+$/.test(userInfo.name)  ){
      alert("Invalid Agent name. Agent name should only contain alphabetic characters and spaces.")
      return false
    }

    if(userInfo.password.length < 8){
      alert("Invalid password Value leangth Must be 8 characters.")
      return false
    }
    
    let res = await AgentUpdate(userInfo)

    console.log("REsponce ::::::::::::::::::::::", res)

    if (res.status == "ok") {
      navigateToContacts()
    } else {
      alert("Error Please enter")
    }
    console.log(userInfo);
  };


  const handleAmount = async (event) => {
    const { name, value } = event.target;
    await setAmount(value)

    console.log("amount", amount)

  }

  const SaveChange = async () => {
    console.log("amount ", amount)

    let res = await agentAddMoney({ money: amount, type: "Deposit", userId: Botinfo.UserId, adminname: cookies.get('name'), adminid: cookies.get('LoginUserId') })

    if (res.msg != undefined) {

      alert(res.msg)
    } else {
      alert("Error Please enter")
    }


    setAmount(0)

  }



  const SaveChangeDeduct = async () => {


    let res = await agentDeductMoney({ money: amount, type: "Deduct", userId: Botinfo.UserId, adminname: cookies.get('name'), adminid: cookies.get('LoginUserId') })

    if (res.msg != undefined) {

      alert(res.msg)
    } else {
      alert("Error Please enter")
    }


    setAmount(0)

  }

  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
          Agent Updation
        </h3>
        <div className="mt-8">
          <form action="">
            <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="robotname"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                  Agent Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder={userInfo.name}
                  name="name"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={handleChange}
                />

              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="robotname"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  placeholder={userInfo.password}
                  name="password"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={handleChange}
                />

              </div>


              <div className="flex flex-col gap-2">
                <label
                  htmlFor="robotname"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder={userInfo.location}
                  name="location"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={handleChange}
                />

              </div>

              <div className="flex flex-col gap-2">

                <label
                  htmlFor="Status"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                  Status
                </label>

                <label htmlFor="Active"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium">
                  <input
                    type="radio"
                    value="active"
                    name="status"
                    checked={userInfo.status === "active"}
                    onChange={OnChange}
                  />
                  Active
                </label>
                <label htmlFor="Inactive"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium">
                  <input
                    type="radio"
                    value="inactive"
                    name="status"
                    checked={userInfo.status === "inactive" || userInfo.status === ""}
                    onChange={OnChange}
                  />
                  Inactive
                </label>
              </div>


            </div>

            <div className="flex justify-end">
              <button
                aria-label="none"
                className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
                onClick={handleSubmit}
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>

        <div className='mt-8'>

          <div className="flex h-[98px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
            <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
              Enter amount deposit
            </p>
            <div className="flex h-[35px] w-full items-center justify-between">
              <span className="text-2xl font-bold text-bgray-900 dark:text-white">
                ₹
              </span>
              <label className="w-full">
                <input
                  type="text" onChange={handleAmount}
                  className="w-full border-none p-0 text-2xl font-bold text-bgray-900 focus:outline-none focus:ring-0 dark:border-darkblack-400 dark:bg-darkblack-600 dark:text-white"
                />
              </label>
            </div>
          </div>


          <button aria-label="none" onClick={SaveChange}
            className="mt-7 bg-success-300 dark:bg-success-300 dark:text-bgray-900 border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm">Add Money</button>



          <div className="flex h-[98px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
            <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
              Enter amount Deduct
            </p>
            <div className="flex h-[35px] w-full items-center justify-between">
              <span className="text-2xl font-bold text-bgray-900 dark:text-white">
                ₹
              </span>
              <label className="w-full">
                <input
                  type="text" onChange={handleAmount}
                  className="w-full border-none p-0 text-2xl font-bold text-bgray-900 focus:outline-none focus:ring-0 dark:border-darkblack-400 dark:bg-darkblack-600 dark:text-white"
                />
              </label>
            </div>
          </div>

          <button aria-label="none" onClick={SaveChangeDeduct}
            className="mt-7 bg-red-300 dark:text-bgray-900 border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm">Deduct Money</button>
          <br></br>
        </div>

      </div>
    </div>
  );
}


export default agentUpdate;