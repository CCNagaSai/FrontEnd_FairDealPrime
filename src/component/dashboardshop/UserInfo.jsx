import ProtoTypes from "prop-types";

function CustomerInfo({ UserName, RegistrationDate}) {
  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
      
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {UserName}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {RegistrationDate}
        </p>
      </td>
    </tr>
  );
}

CustomerInfo.propTypes = {
  name: ProtoTypes.string,
  RegistrationDate: ProtoTypes.string,
};

export default CustomerInfo;
