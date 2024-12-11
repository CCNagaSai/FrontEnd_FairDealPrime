import PlayingTableData from "../../component/PlayingTableData/PlayingTableData";
import { useLocation } from 'react-router-dom';

function GamebetInfo() {

  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      {/* write your code here */}
      <h3 className="text-xl font-bold text-bgray-900 dark:text-bgray-50 lg:text-3xl lg:leading-[36.4px]">
       Playing Table Bet Info
      </h3>
      <hr/>
      <br></br>
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <PlayingTableData/>
        </section>
      </div>
    </main>
  );
}

export default GamebetInfo;
