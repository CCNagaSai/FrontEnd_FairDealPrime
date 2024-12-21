import ProtoTypes from "prop-types";
import PlayerTab from "../../component/AgentTranscation/PlayerTab";
function AgentTranscation({ pageSize }) {
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
          Points File
        </h3>
        <PlayerTab pageSize={pageSize} />
      </div>
    </div>
  );
}

AgentTranscation.propTypes = {
  pageSize: ProtoTypes.number,
};

export default AgentTranscation;
