import ProtoTypes from "prop-types";
import PlayerTab from "./PlayerTab";
function PayoutPendding({ pageSize,status }) {
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
      <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
          Payout Managemnet
        </h3>
        <PlayerTab pageSize={pageSize}/>
      </div>
    </div>
  );
}

PayoutPendding.propTypes = {
  pageSize: ProtoTypes.number,
};

export default PayoutPendding;
