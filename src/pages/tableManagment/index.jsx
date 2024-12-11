import TableManagmentdata from "../../component/TableManagement";
import TeamChat from "../../component/teamChat";
import Wallet from "../../component/wallet";

function TableManagment() {
  return (
    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:w-100 w-full 2xl:mb-0 mb-6">
          <TableManagmentdata pageSize={9} />
        </section>
      </div>
    </main>
  );
}

export default TableManagment;

// <section className="2xl:flex-1 w-full">
//           <Wallet />
//           <TeamChat />
//         </section>