import GameLogic from "../../../component/gameLogic/gamelogic";
import { useLocation } from "react-router-dom";
import "../AdminDash.css";
import Topbar from "../../Common/Topbar";
import AdminSidebar from "../AdminSidebar";

function AdminGameLogic() {
  let location = useLocation();
  let gameName = location.search.split("=")[1];
  console.log("Location ", location, gameName);

  return (
    <div className="app">
      <div className="Header">
        <Topbar />
      </div>
      <div className="content">
        <div className="Left">
          <AdminSidebar />
        </div>
        <main className=" right w-full px-6 pb-6  xl:px-12 xl:pb-12">
          {/* write your code here */}
          <h3 className="text-xl font-bold underline text-bgray-900 dark:text-bgray-50 lg:text-3xl lg:leading-[36.4px]">
            {gameName} Game Logic
          </h3>
          <hr />
          <br></br>
          <div className="2xl:flex 2xl:space-x-[48px]">
            <section className="mb-6 2xl:mb-0 2xl:flex-1">
              <GameLogic gameName={gameName} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminGameLogic;
