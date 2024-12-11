import PlayerUpdate from "../../component/PlayerUpdate";
import UserInfoCard from "../../component/PlayerUpdate/userinfocard";
import HistoryTable from "../../component/PlayerUpdate/playerhistory";
import TransactionData from "../../component/PlayerUpdate/Transaction/playertransaction";
import DepositData from "../../component/PlayerUpdate/Deposit/playerdeposit";


function playerUpdateinfo() {
  return (


    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
      <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <HistoryTable gameName="Roulette"/>
          

          {/* 
            <HistoryTable gameName="Andar Bahar"/>
          <HistoryTable gameName="SORAT"/>
          <HistoryTable gameName="One To Twelve"/>
          write your code here <TransactionData gameName="Withdrawal"/>
          <DepositData gameName="Deposite"/>*/}

          


        </section>
        <section className="2xl:w-[400px] w-full flex flex-col lg:flex-row 2xl:space-x-0 2xl:flex-col lg:space-x-6 space-x-0">
          <UserInfoCard />
        </section>
      </div>
    </main>

  );
}

export default playerUpdateinfo;

// <section className="2xl:flex-1 w-full">
//           <Wallet />
//           <TeamChat />
//         </section>