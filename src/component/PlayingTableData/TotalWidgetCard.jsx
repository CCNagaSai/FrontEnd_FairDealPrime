import { useEffect } from "react";
import { useRef } from "react";


function TotalWidgetCard({ id, type, bet, number, whichTable }) {

  console.log("userdata type ", type)
  console.log("id ", id)
  console.log("id ", bet)
  console.log("number ", number)




  useEffect(() => {

  }, []);


  return (



    <tr className="border-b border-bgray-300 dark:border-darkblack-400">

      <td className="px-6 py-5 xl:px-0">
        <div className="flex w-full items-center space-x-2.5">
          <p className="text-base font-semibold text-bgray-900 dark:text-white">
            {type}
          </p>
        </div>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {bet}
        </p>
      </td>

      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          {number}
        </p>
      </td>

      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          {whichTable}
        </p>
      </td>
    </tr>






  );
}

// TotalWidgetCard.propTypes = {
//   title: ProtoTypes.string,
//   "": ProtoTypes.number,
//   "": ProtoTypes.string,
//   "": ProtoTypes.string,
//   "": ProtoTypes.string,
// };

export default TotalWidgetCard;
