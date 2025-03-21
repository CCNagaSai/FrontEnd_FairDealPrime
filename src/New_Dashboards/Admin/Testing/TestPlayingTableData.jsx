import React, { useContext, useEffect, useState } from "react";
import offerContext from "../../../context/offerContext";
import Testing from "./Testing";
import TestUsersList from "./TestSearchUsers";

function TestPlayingTableData({ gameName }) {
  const [tableinfo, setTableinfo] = useState([]);
  const [activePlayers, setActivePlayers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [filteredTableInfo, setFilteredTableInfo] = useState([]);
  const [totalBets, setTotalBets] = useState(0);
  const context = useContext(offerContext);
  const { GetGameBetInfo } = context;

  // Fetch updated data
  const fetchData = async () => {
    try {
      const robotlogicdata = await GetGameBetInfo(gameName);
      console.log("Fetched Data:", robotlogicdata); // Debugging Log
      setTableinfo(robotlogicdata || []);

      if (robotlogicdata) {
        const uniqueActivePlayers = Array.from(
          new Map(
            robotlogicdata
              .filter((data) => data.playerInfo?.playStatus === "action")
              .map((data) => [data.playerInfo.playerId, data.playerInfo])
          ).values()
        );

        setActivePlayers(uniqueActivePlayers);

        // If a user is selected, update filtered data & total bets
        if (selectedUser) {
          updateUserData(selectedUser, uniqueActivePlayers, robotlogicdata);
        }
      }
    } catch (error) {
      console.error("Error fetching game data", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch initially

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, [gameName, selectedUser]);

  // Function to update user data when selected
  const updateUserData = (playerId, activePlayersList, allBetsData) => {
    const playerInfo = activePlayersList.find(
      (player) => player.playerId === playerId
    );

    setSelectedUserName(playerInfo?.name || playerInfo?.username || "Unknown");

    // Get user bets data
    const userBets = allBetsData.filter(
      (data) => data.playerInfo?.playerId === playerId
    );

    console.log("User Bets Data for", playerId, userBets); // Debugging Log
    setFilteredTableInfo(userBets);

    // Calculate total bets
    const total = userBets.reduce(
      (sum, data) => sum + (parseFloat(data.bet) || 0), // Use 'bet' instead of 'totalbet'
      0
    );
    setTotalBets(total);
    console.log("Total Bets Calculated:", total);

    console.log("Total Bets Calculated:", total); // Debugging Log
    setTotalBets(total);
  };

  // Handle user selection
  const handleUserConfirm = (selectedPlayerId) => {
    if (selectedPlayerId) {
      setSelectedUser(selectedPlayerId);
      updateUserData(selectedPlayerId, activePlayers, tableinfo);
    } else {
      setSelectedUser(null);
      setSelectedUserName("");
      setFilteredTableInfo([]);
      setTotalBets(0);
    }
  };

  return (
    <>
      {/* User Selection Dropdown */}
      <TestUsersList players={activePlayers} onUserClick={handleUserConfirm} />

      {/* Show Selected Username & Total Bets */}
      {selectedUser && (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Player: <span className="text-blue-600">{selectedUserName}</span>
          </h2>
          <h3 className="text-md font-medium text-gray-600">
            Total Bets:{" "}
            <span className="text-red-500 font-bold">{totalBets}</span>
          </h3>
        </div>
      )}

      {/* Show Betting Data Table if user is selected */}
      {selectedUser && filteredTableInfo.length > 0 && (
        <div className="relative">
          <Testing data={filteredTableInfo} />
        </div>
      )}
    </>
  );
}

export default TestPlayingTableData;
