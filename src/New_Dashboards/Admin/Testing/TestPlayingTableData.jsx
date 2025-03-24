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
  const [playerBets, setPlayerBets] = useState({});
  const context = useContext(offerContext);
  const { GetGameBetInfo } = context;

  // Fetch Data Function
  const fetchData = async () => {
    try {
      const robotlogicdata = await GetGameBetInfo(gameName);
      console.log("Fetched Data:", robotlogicdata);
      setTableinfo(robotlogicdata || []);

      if (robotlogicdata) {
        // Extract unique active players
        const uniqueActivePlayers = Array.from(
          new Map(
            robotlogicdata
              .filter((data) => data.playerInfo?.playStatus === "action")
              .map((data) => [data.playerInfo.playerId, data.playerInfo])
          ).values()
        );

        setActivePlayers(uniqueActivePlayers);

        // Calculate total bets for each player
        const betsData = {};
        robotlogicdata.forEach((data) => {
          const playerId = data.playerInfo?.playerId;
          if (playerId) {
            betsData[playerId] =
              (betsData[playerId] || 0) + (parseFloat(data.bet) || 0);
          }
        });

        setPlayerBets(betsData);

        // **Default: Show All Players' Data**
        if (!selectedUser) {
          setFilteredTableInfo(robotlogicdata);
        }
      }
    } catch (error) {
      console.error("Error fetching game data", error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial Fetch

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, [gameName, selectedUser]);

  // Function to update user data when selected
  const updateUserData = (playerId) => {
    if (!playerId) {
      setSelectedUser(null);
      setSelectedUserName("");
      setFilteredTableInfo(tableinfo);
      setTotalBets(0);
    } else {
      const playerInfo = activePlayers.find(
        (player) => player.playerId === playerId
      );

      setSelectedUserName(
        playerInfo?.name || playerInfo?.username || "Unknown"
      );

      // Filter user's bets
      const userBets = tableinfo.filter(
        (data) => data.playerInfo?.playerId === playerId
      );

      setFilteredTableInfo(userBets);

      // Calculate total bets
      const total = userBets.reduce(
        (sum, data) => sum + (parseFloat(data.bet) || 0),
        0
      );
      setTotalBets(total);
    }
  };

  // Handle user selection from dropdown
  const handleUserConfirm = (selectedPlayerId) => {
    setSelectedUser(selectedPlayerId);
    updateUserData(selectedPlayerId);
  };

  return (
    <>
      {/* User Selection Dropdown */}
      <TestUsersList players={activePlayers} onUserClick={handleUserConfirm} />

      {/* Show All Active Players Name & Their Bets */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Active Players:
        </h2>

        <div className="flex flex-wrap gap-4">
          {activePlayers.map((player) => (
            <div
              key={player.playerId}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 bg-white p-3 rounded-lg shadow-md text-center"
            >
              <p className="text-blue-600 font-medium">
                {player.name || player.username}
              </p>
              <p className="text-gray-700">
                Total Bets:{" "}
                <span className="text-red-500 font-bold">
                  {playerBets[player.playerId] || 0}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Show Selected Player Data */}
      {selectedUser && (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Player: <span className="text-blue-600">{selectedUserName}</span>
          </h2>
          <h3 className="text-md font-medium text-gray-600">
            Total Bets:{" "}
            <span className="text-red-500 font-bold">
              {playerBets[selectedUser] || 0}
            </span>
          </h3>
        </div>
      )}

      {/* Show Betting Data Table */}
      {filteredTableInfo.length > 0 && (
        <div className="relative">
          <Testing data={filteredTableInfo} />
        </div>
      )}
    </>
  );
}

export default TestPlayingTableData;
