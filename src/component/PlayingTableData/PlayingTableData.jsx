
import offerContext from '../../context/offerContext'
import React, { useContext, useEffect, useState, useRef } from 'react';
import CustomerInfo from "./TotalWidgetCard";

function PlayingTableData(gameName) {

  const [tableinfo, setTableinfo] = useState([]);
  const [pageSize, setPageSize] = useState(100);

  const context = useContext(offerContext)

  const { GetGameBetInfo } = context

  useEffect(() => {

    const submitdata = async () => {

      let robotlogicdata = await GetGameBetInfo()

      setTableinfo(robotlogicdata)
      console.log("robotlogicdata LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL", robotlogicdata)
    }
    submitdata()
  }, [gameName.gameName]);

  return (
    <div className="table-content w-full overflow-x-auto">
      <table className="w-full">
        <tbody>
          <tr className="border-b border-bgray-300 dark:border-darkblack-400">
            <td className="w-[165px] px-6 py-5 xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Bet Type
                </span>
               
              </div>
            </td>
            <td className="w-[165px] px-6 py-5 xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Bet Amount
                </span>
                
              </div>
            </td>
            <td className="w-[165px] px-6 py-5 xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Number
                </span>
              
              </div>
            </td>
            <td className="w-[165px] px-6 py-5 xl:px-0">
            <div className="flex w-full items-center space-x-2.5">
              <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                Type
              </span>
           
            </div>
          </td>
          </tr>

          {tableinfo?.map((user, index) =>
            pageSize
              ? index + 1 <= pageSize && (
                <CustomerInfo
                  key={user._id}
                  id={user._id}
                  type={user.type}
                  bet={user.bet.toFixed(2)}
                  number={user.number}
                whichTable = {user.whichTable}

                />
              )
              : index < 3 && (
                <CustomerInfo
                  key={user._id}
                  id={user._id}
                  type={user.type}
                  bet={user.bet.toFixed(2)}
                  number={user.number}
                whichTable = {user.whichTable}
                />
              )
          )}

        </tbody>
      </table>
    </div>
  );
}

export default PlayingTableData;










