import GameHistory from "../../component/gameHistory";
import { useLocation } from 'react-router-dom';

function GameHistorypages() {

  let location = useLocation();
  let gameName = location.search.split("=")[1]
  console.log("Location ",location,gameName)

  return (
    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
      {/* write your code here */}
     
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:w-100 w-full 2xl:mb-0 mb-6">
          <GameHistory pageSize={9} gameName={gameName} />
        </section>
      </div>
    </main>
  );
}

export default GameHistorypages;
