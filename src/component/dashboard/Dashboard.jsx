import totalEarn from "../../assets/images/icons/total-earn.svg";
import memberImg from "../../assets/images/avatar/members-2.png";

import offerContext from '../../context/offerContext'
import React, { useContext, useEffect, useState, useRef } from 'react';
import TotalWidgetCard from "./TotalWidgetCard";

function Dashboard() {

  const context = useContext(offerContext)
  const { dashboardData } = context
  let apiData = {}

  let [totalUser, settotalUser] = useState('');
  let [totalAgent, settotalAgent] = useState('');

  let [totalDeposit, settotalDeposit] = useState('');
  let [todayDeposit, settodayDeposit] = useState('');
  let [totalGamePay, setTotalgamePay] = useState('');

  let [todayWithdraw, settodayWithdraw] = useState('');
  let [totalWithdraw, settotalWithdraw] = useState('');


  let [toDayGamePay, settoDayGamePay] = useState('');
  let [todayProfit, settodayProfit] = useState('');
  let [totalProfit, settotalProfit] = useState('');


  let [totalPercentage, settotalPercentage] = useState('');

  let [dayPercentage, setdayPercentage] = useState('');


  


  useEffect(() => {
    const submitdata = async () => {

      apiData = await dashboardData("Admin")

      if (apiData.totalUser != undefined)
        settotalUser(apiData.totalUser)

      if (apiData.totalAgent != undefined)
        settotalAgent(apiData.totalAgent)

      if (apiData.totalDeposit != undefined)
        settotalDeposit(apiData.totalDeposit)

      if (apiData.todayDeposit != undefined)
        settodayDeposit(apiData.todayDeposit)

      if (apiData.totalGamePay != undefined)
        setTotalgamePay(apiData.totalGamePay)


      if (apiData.todayWithdraw != undefined)
        settodayWithdraw(apiData.todayWithdraw)



      if (apiData.totalWithdraw != undefined)
        settotalWithdraw(apiData.totalWithdraw)



      
      if (apiData.toDayGamePay != undefined)
        settoDayGamePay(apiData.toDayGamePay)


      
      if (apiData.todayProfit != undefined)
        settodayProfit(apiData.todayProfit)


      if (apiData.totalProfit != undefined)
        settotalProfit(apiData.totalProfit)

      if (apiData.totalPercentage != undefined)
        settotalPercentage(apiData.totalPercentage)
      
      if (apiData.ConfigdaywiseWinloss != undefined)
        setdayPercentage(apiData.ConfigdaywiseWinloss)
      
    }

    submitdata()
  }, []);

  return (
    <div className="mb-[24px] w-full">
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Users"
          amount={totalUser}
          groth="+ 3.5%"
          id="totalEarn"
          logo=""
          link="/transaction"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Agent"
          amount={totalAgent}
          groth="+ 3.5%"
          id="totalEarn"
          logo=""
          link="/agentmanagement"
        />

        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Deposit"
          amount={totalDeposit}
          groth="+ 3.5%"
          id="totalSpending"
          logo="₹"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Today Deposit"
          amount={todayDeposit}
          groth="+ 3.5%"
          id="totalGoal"
          logo="₹"
        />

        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total widhdraw"
          amount={totalWithdraw}
          groth="+ 3.5%"
          id="totalSpending"
          logo="₹"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Today widhdraw"
          amount={todayWithdraw}
          groth="+ 3.5%"
          id="totalGoal"
          logo="₹"
        />


        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Games Played"
          amount={totalGamePay}
          groth="+ 3.5%"
          id="totalGoal"
          logo=""
        />

        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Today Games Played"
          amount={toDayGamePay}
          groth="+ 3.5%"
          id="totalGoal"
          logo=""
        />

        <TotalWidgetCard
        totalEarnImg={totalEarn}
        memberImg={memberImg}
        title="ToDay Profit Loss"
        amount={todayProfit}
        groth="+ 3.5%"
        id="totalGoal"
        logo="₹"
      />

      <TotalWidgetCard
      totalEarnImg={totalEarn}
      memberImg={memberImg}
      title="Total Profit Loss"
      amount={totalProfit}
      groth="+ 3.5%"
      id="totalGoal"
      logo="₹"
        />
        
        
      <TotalWidgetCard
      totalEarnImg={totalEarn}
      memberImg={memberImg}
      title="Playing Win Loss Percentage One Day"
      amount={totalPercentage}
      groth="+ 3.5%"
      id="totalGoal"
      logo=""
    />
        

        <TotalWidgetCard
        totalEarnImg={totalEarn}
        memberImg={memberImg}
        title="Playing Win Loss Percentage Config Day"
        amount={dayPercentage}
        groth="+ 3.5%"
        id="totalGoal"
        logo=""
      />
        
      </div>
    </div>
  );
}

export default Dashboard;
