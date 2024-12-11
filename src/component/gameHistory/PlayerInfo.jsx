import ProtoTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import offerContext from '../../context/offerContext';
import edit from "../../assets/images/edit.png";
function PlayerInfo({ datetime, userId, ballposition, beforeplay, play, won, afterplaypoint, referid ,name}) {

  const navigate = useNavigate();


  const navigateToContacts = (datetime, userId, ballposition, beforeplay, play, won, afterplaypoint, referid,name) => {
    navigate('/betHistory', { state:{datetime, userId, ballposition, beforeplay, play, won, afterplaypoint, referid,name } });
  }
  function formatDateTo12hr(dateTimeStr) {
    const dateTime = new Date(dateTimeStr);
    const formattedDate = dateTime.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true // Set to true for 12-hour format
    });
    return formattedDate;
  }

  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
      
      <td className="w-[250px] px-6 py-5 xl:px-0">
        <div className="flex w-full items-center space-x-2.5">
          
          <p className="text-base font-semibold text-bgray-900 dark:text-white">
            {formatDateTo12hr(datetime)}
          </p>
        </div>
      </td>
      <td className="w-[250px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {name}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {ballposition}
        </p>
      </td>
      <td className="w-[185px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
        ₹{beforeplay}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
        ₹{play}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
        ₹{won}
        </p>
      </td> 
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
        ₹{afterplaypoint}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
      <button styles={{
        "margin": "1px",
        "background-color": "white",
        "color": "white",
        "border": "none",
        "padding": "5px 10px",
        "cursor": "pointer",
        "border-radius": "4px"
      }} onClick={() => navigateToContacts(formatDateTo12hr(datetime), userId, ballposition, beforeplay, play, won, afterplaypoint, referid,name)} >
      <img style={{"width": "30px","height": "30px","margin": "30px"}} src={edit} />
      </button>

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
