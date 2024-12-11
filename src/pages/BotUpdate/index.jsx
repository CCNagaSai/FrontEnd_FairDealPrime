import BotUpdate from "../../component/BotUpdate";

function botUpdateinfo() {
  return (


    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:w-100 w-full 2xl:mb-0 mb-6">
        <BotUpdate />
        </section>
      </div>
    </main>

  );
}

export default botUpdateinfo;

// <section className="2xl:flex-1 w-full">
//           <Wallet />
//           <TeamChat />
//         </section>