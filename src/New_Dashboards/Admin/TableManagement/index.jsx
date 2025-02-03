import ProtoTypes from "prop-types";
import "../AdminDash.css";
import Topbar from "../../Common/Topbar";
import AdminSidebar from "../AdminSidebar";
import PlayerTab from "../../../component/TableManagement/PlayerTab";
function AdminTableManagement({ pageSize }) {
  return (
    <div className="app">
      <div className="Header">
        <Topbar />
      </div>
      <div className="content">
        <div className="Left">
          <AdminSidebar />
        </div>
        <div className=" right w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
          <div className="flex flex-col space-y-5">
            <h3 className="text-2xl font-bold  underline pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
              Table Management
            </h3>

            <PlayerTab pageSize={pageSize} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTableManagement;
