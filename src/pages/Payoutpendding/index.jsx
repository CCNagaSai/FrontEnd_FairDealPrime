import PayoutPendding from "../../component/PayoutPenddingList";
import TeamChat from "../../component/teamChat";
import Wallet from "../../component/wallet";
import { useLocation } from 'react-router-dom';


function Transaction() {

  let location = useLocation();
  let status = location.search.split("=")[1]
  console.log("Location ",location,status)

  return (
    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
      {/* write your code here */}
     

      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:w-100 w-full 2xl:mb-0 mb-6">
          <PayoutPendding pageSize={10}/>
        </section>
      </div>
    </main>
  );
}

export default Transaction;

// <section className="2xl:flex-1 w-full">
//           <Wallet />
//           <TeamChat />
//         </section>