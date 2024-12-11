import ProtoTypes from "prop-types";
import CustomerInfo from "./UserInfo";
import users from "../../data/user";
import offerContext from '../../context/offerContext'
import React,{useContext,useEffect,useState,useRef} from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function UserTab({ }) {

    //-------------------------------------------------------------------------------------------------------
    const [active, setActive] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
  
    const Dropdown = (item) => {
      setPageSize(item)
      setActive(!active)
    }
    //------------------------------------------------------------------------------------------------------------


  let [jsonData, setJsonData] = useState([]);


  const context = useContext(offerContext)
  const { latatestUser } = context

  
  

  useEffect( () => {
    const submitdata = async () => {
      
      if(cookies.get('logintype')  == "Admin"){
        setJsonData(await latatestUser(cookies.get('logintype')))
      }else{
        setJsonData(await latatestUser(cookies.get('LoginUserId')))
      }


    }
  submitdata()
  },[]);


    //--------------------------- Paggeation and No Of Pages ------------------------------------
  // Filter the user data based on date range and search term
  const filteredUsers = jsonData.filter((user) => {
    console.log("dddd")
    const registrationDate = new Date(user.createdAt);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    return (
      (!from || registrationDate >= from) &&
      (!to || registrationDate <= to) &&
      (searchTerm === '' ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobileNumber.includes(searchTerm))
    );
  });

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


  
  return (
    <>
    <div className="table-content w-full overflow-x-auto">
      <table className="w-full">
        <tbody>
          <tr className="border-b border-bgray-300 dark:border-darkblack-400">
            
            <td className="inline-block w-[250px] px-6 py-5 lg:w-auto xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Player Name
                </span>
                <span>
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.332 1.31567V13.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.66602 13.3157V1.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </td>
            <td className="px-6 py-5 xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Login Date and Time
                </span>
                <span>
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.332 1.31567V13.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.66602 13.3157V1.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </td>
          </tr>
          {usersOnCurrentPage?.map((user, index) =>
            pageSize
              ? index + 1 <= pageSize && (
                  <CustomerInfo
                    key={user._id}
                    UserName={user.username}
                    RegistrationDate={user.createdAt}
                  />
                )
              : index < 3 && (
                  <CustomerInfo
                  key={user._id}
                  UserName={user.username}
                  RegistrationDate={user.createdAt}
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

UserTab.propTypes = {
  pageSize: ProtoTypes.number,
};

export default UserTab;
