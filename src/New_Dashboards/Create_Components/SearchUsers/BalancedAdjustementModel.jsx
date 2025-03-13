import React from "react";
import AgentBalanceAdjust from "../../Agent/AgentBalanceAdjustment/AgentBalanceAdjust";
import "./Style.css";

const BalanceAdjustmentModal = ({ userRole, user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4 text-center">
          Transfer Points for {userRole}
        </h2>
        <AgentBalanceAdjust prefilledType={userRole} prefilledUser={user} />
      </div>
    </div>
  );
};

export default BalanceAdjustmentModal;
