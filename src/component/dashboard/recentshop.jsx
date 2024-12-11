import ProtoTypes from "prop-types";
import Pagination from "../Pagination";
import Search from "../forms/Search";
import UserTab from "./UserTabshop";
function ListTabShop({ pageSize }) {
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
      <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
      Recent Sub Agent List
      </h3>
        
        <UserTab pageSize={pageSize} />
        
      </div>
    </div>
  );
}

ListTabShop.propTypes = {
  pageSize: ProtoTypes.number,
};

export default ListTabShop;
