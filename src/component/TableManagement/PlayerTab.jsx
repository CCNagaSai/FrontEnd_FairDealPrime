import React, { useState, useContext, useEffect } from 'react';
import ProtoTypes from "prop-types";
import CustomerInfo from "./PlayerInfo";
import offerContext from '../../context/offerContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function PlayerTab({ }) {
  //-------------------------------------------------------------------------------------------------------
  const [active, setActive] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const Dropdown = (item) => {
    setPageSize(item)
    setActive(!active)
  }
  //------------------------------------------------------------------------------------------------------------
  const navigate = useNavigate();
  const navigateToUserRegister = () => {
    navigate('/playeradd');
  };

  const location = useLocation();
  //console.log("location ", location.state)
  const AgentInfo = location.state;

  console.log("AgentInfo ", AgentInfo)

  let [userData, setUserData] = useState([]);
  const context = useContext(offerContext)
  const { TableList } = context

  useEffect(() => {
    const submitdata = async () => {
   
        setUserData(await TableList())
    

    }
    submitdata()
  }, []);

  //--------------------------- Paggeation and No Of Pages ------------------------------------
  // Filter the user data based on date range and search term
  const filteredUsers = userData

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter the user data for the current page
  const usersOnCurrentPage = filteredUsers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const resetDate = () => {
    setFromDate("")
    setToDate("")
  }
  //-----------------------------------------------------------------------------------------------

  const handleSort = (key) => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    const sorted = [...userData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setUserData(sorted);
    setSortDirection(direction);
  };

  return (
    <>
      
      <div className="table-content w-full overflow-x-auto">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-bgray-300 dark:border-darkblack-400">


              <td className="w-[165px] px-6 py-5 xl:px-0" onClick={() => handleSort('username')}>
                <div className="flex w-full items-center space-x-2.5">
                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                    Table Id
                  </span>

                </div>
              </td>
              <td className="w-[165px] px-6 py-5 xl:px-0" onClick={() => handleSort('name')}>
                <div className="flex w-full items-center space-x-2.5">
                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                    No Of Player
                  </span>

                </div>
              </td>

              <td className="w-[165px] px-6 py-5 xl:px-0" onClick={() => handleSort('chips')}>
                <div className="flex w-full items-center space-x-2.5">
                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                    Last Update Date
                  </span>

                </div>
              </td>

              <td className="w-[165px] px-6 py-5 xl:px-0" onClick={() => handleSort('createdAt')}>
                <div className="flex w-full items-center space-x-2.5">
                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                    Table Type
                  </span>

                </div>
              </td>
          

              {cookies.get('name') == "Super Admin"  ? <td className="w-[165px] px-6 py-5 xl:px-0">
                <div className="flex w-full items-center space-x-2.5">
                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                    Action
                  </span>

                </div>
              </td> : ""}

            </tr>
            {usersOnCurrentPage?.map((user, index) =>
              pageSize
                ? index + 1 <= pageSize && (
                  <CustomerInfo
                    key={user._id}
                    tableId={user._id}
                    activePlayer={user.activePlayer}
                    turnStartTimer={user.turnStartTimer}
                    whichTable={user.whichTable}


                  />
                )
                : index < 3 && (
                  <CustomerInfo
                  key={user._id}
                  tableId={user._id}
                  activePlayer={user.activePlayer}
                  turnStartTimer={user.turnStartTimer}
                  whichTable={user.whichTable}

                  />
                )
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-content w-full">
        <div className="flex w-full items-center justify-center lg:justify-between">
          <div className="hidden items-center space-x-4 lg:flex">
            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
              Show result:
            </span>
            <div className="relative">
              <button
                aria-label="none"
                onClick={() => setActive(!active)}
                type="button"
                className="flex items-center space-x-6 rounded-lg border border-bgray-300 px-2.5 py-[14px] dark:border-darkblack-400"
              >
                <span className="text-sm font-semibold text-bgray-900 dark:text-bgray-50">
                  {pageSize}
                </span>
                <span>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271"
                      stroke="#A0AEC0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div
                id="result-filter"
                style={{ display: active ? "block" : "none" }}
                className="absolute right-0 top-14 z-10 hidden w-full overflow-hidden rounded-lg bg-white shadow-lg"
              >
                <ul>
                  {[5, 10, 20, 25, 50].map((item) => (
                    <li
                      key={item}
                      onClick={() => Dropdown(item)}
                      className="text-bgray-90 cursor-pointer px-5 py-2 text-sm font-medium hover:bg-bgray-100"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-5 sm:space-x-[35px]">
            <button aria-label="none" type="button" onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-sm font-semibold text-bgray-600 dark:text-bgray-50"
            >
              Previous
              <span>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327"
                    stroke="#A0AEC0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <button aria-label="none" type="button" onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-sm font-semibold text-bgray-600 dark:text-bgray-50"
            >
              Next
              <span>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327"
                    stroke="#A0AEC0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

PlayerTab.propTypes = {
  pageSize: ProtoTypes.number,
};

export default PlayerTab;
