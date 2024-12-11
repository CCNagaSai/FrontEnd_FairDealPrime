import ProtoTypes from "prop-types";


function PlayerInfo({ datetime, trnxTypeTxt, trnxAmount, previouschips, currentchips, previousWinner, currentWinner }) {
  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">

      <td className="w-[185px] px-6 py-5 xl:px-0">
        <div className="flex w-full items-center space-x-2.5">

          <p className="text-base font-semibold text-bgray-900 dark:text-white">
            {datetime}
          </p>
        </div>
      </td>
      <td className="w-[155px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {trnxTypeTxt}
        </p>
      </td>

      <td className="w-[155px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          {previouschips}
        </p>
      </td>
      <td className="w-[155px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {trnxAmount}
        </p>
      </td>
      <td className="w-[155px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          ₹{currentchips}
        </p>
      </td>


    </tr>
  );
}

// PlayerInfo.propTypes = {
//   UserId:ProtoTypes.string,
//   UserName:ProtoTypes.string,
//   MobileNo:ProtoTypes.string,
//   GamePlay:ProtoTypes.Number,
//   MainWallet:ProtoTypes.Number,
//   RegistrationDate:ProtoTypes.string,
//   LastLogin:ProtoTypes.string,
//   Block:ProtoTypes.string,
//   Status:ProtoTypes.string
// };

export default PlayerInfo;
