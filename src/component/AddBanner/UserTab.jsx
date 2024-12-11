import ProtoTypes from "prop-types";
import CustomerInfo from "./UserInfo";
import users from "../../data/user";
import offerContext from '../../context/offerContext'
import React,{useContext,useEffect,useState,useRef} from 'react';

function UserTab({ pageSize }) {
  const context = useContext(offerContext)
  const { BannerList,host } = context
  const [notices, setNotices] = useState([]);

  useEffect( () => {
    const submitdata = async () => {
      setNotices(await BannerList())
  }
  submitdata()
  },[]);

  
  return (
    <div className="table-content w-full overflow-x-auto">
      <table className="w-full">
        <tbody>
          <tr className="border-b border-bgray-300 dark:border-darkblack-400">
            <td className="inline-block w-[250px] px-6 py-5 lg:w-auto xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Title
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
                  Banner
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
                  Posted Date
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
                 Link
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
                 Action
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
          {notices?.map((user, index) =>
            pageSize
              ? index + 1 <= pageSize && (
                  <CustomerInfo
                    key={user._id}
                    title={user.title}
                    imageUrl={user.imageUrl.indexOf('upload') != -1?host+"/"+user.imageUrl: user.imageUrl}
                    date={user.createdAt}
                    id={user._id}
                    link={user.link}

                  />
                )
              : index < 3 && (
                  <CustomerInfo
                  key={user._id}
                  title={user.title}
                  imageUrl={user.imageUrl.indexOf('upload') != -1?host+"/"+user.imageUrl: user.imageUrl}
                  date={user.createdAt}
                  id={user._id}
                  link={user.link}

                  />
                )
          )}
        </tbody>
      </table>
    </div>
  );
}

UserTab.propTypes = {
  pageSize: ProtoTypes.number,
};

export default UserTab;
