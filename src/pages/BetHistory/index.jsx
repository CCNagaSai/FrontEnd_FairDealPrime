import PlayerUpdate from "../../component/PlayerUpdate";
import UserInfoCard from "../../component/PlayerUpdate/userinfocard";
import TransactionData from "../../component/PlayerUpdate/Transaction/playertransaction";
import DepositData from "../../component/PlayerUpdate/Deposit/playerdeposit";
import BetHistory from "../../component/betHistory";
import { useLocation } from 'react-router-dom';


function betHistoryinfo() {

  let location = useLocation();
  console.log("location ",location)
  let data = location.state
 
  console.log("data :::::::",data)

  return (


    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
      <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <BetHistory data={data}/>
        </section>
        
      </div>
    </main>

  );
}

export default betHistoryinfo;

// <section className="2xl:flex-1 w-full">
//           <Wallet />
//           <TeamChat />
//         </section>