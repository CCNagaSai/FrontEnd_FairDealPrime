import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import ProtoTypes from "prop-types";
import AdminSidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import Topbar from "../../Common/Topbar";
import "../AdminDash.css";
import PlayerTab from "../../../component/ShopManagement/PlayerTab";

function SearchSubAgent({ pageSize }) {
  return (
    <div className="app">
      <div className="Header">
        <Topbar />
      </div>
      <div className="content">
        <div className="Left">
          <AdminSidebar />
        </div>
        <div className="Right">
          <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
            <div className="flex flex-col space-y-5">
              <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
                Sub-Agent Management
              </h3>

              <PlayerTab pageSize={pageSize} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SearchSubAgent.propTypes = {
  pageSize: ProtoTypes.number,
};

export default SearchSubAgent;
