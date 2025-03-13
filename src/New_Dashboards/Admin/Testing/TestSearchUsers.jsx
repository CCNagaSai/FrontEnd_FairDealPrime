import React, { useState } from "react";
import { FaRedo, FaUsers } from "react-icons/fa";

const TestUsersList = ({ players, onUserClick }) => {
  const [selectedUser, setSelectedUser] = useState("");

  const handleConfirm = () => {
    if (selectedUser) {
      onUserClick(selectedUser); // Send selected user ID to parent
    }
  };

  return (
    <div className="max-w-md w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
        <FaUsers className="text-blue-500" /> Select a User
      </h1>

      <div className="relative">
        <label className="block text-md font-medium text-gray-700 mb-2">
          Active Users:
        </label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring focus:ring-blue-300 text-gray-700 text-lg"
        >
          <option value="">-- Select --</option>
          {players.length > 0 ? (
            players.map((player) => (
              <option key={player.playerId} value={player.playerId}>
                {player.name || player.username}
              </option>
            ))
          ) : (
            <option disabled>No Active Players</option>
          )}
        </select>
      </div>

      <div className="flex justify-between mt-5">
        <button
          type="button"
          onClick={() => {
            setSelectedUser(""); // Reset dropdown selection
            onUserClick(null); // Reset table data
          }}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 text-md rounded-lg hover:bg-gray-700 transition"
        >
          <FaRedo /> Reset
        </button>

        <button
          type="button"
          onClick={handleConfirm}
          className="bg-blue-600 text-white px-5 py-2 text-md rounded-lg hover:bg-blue-700 transition"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
export default TestUsersList;
