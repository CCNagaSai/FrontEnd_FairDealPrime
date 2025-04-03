import React, { useContext, useEffect, useState } from "react";
import offerContext from "../../../context/offerContext";
import Testing from "./Testing";
import TestUsersList from "./TestSearchUsers";

function TestPlayingTableData({ gameName }) {
  const [tableinfo, setTableinfo] = useState([]);
  const [activePlayers, setActivePlayers] = useState([]);
  const [totalBlueBets, setTotalBlueBets] = useState(0);
  const [totalGreenBets, setTotalGreenBets] = useState(0);
  const context = useContext(offerContext);
  const { GetGameBetInfo } = context;

  // Fetch Data Function
  const fetchData = async () => {
    try {
      const robotlogicdata = await GetGameBetInfo(gameName);
      console.log("Fetched Data:", robotlogicdata);
      setTableinfo(robotlogicdata || []);

      if (robotlogicdata) {
        let blueBetSum = 0;
        let greenBetSum = 0;
        let activePlayersMap = new Map();
        let bluePlayers = new Set();
        let greenPlayers = new Set();

        robotlogicdata.forEach((data) => {
          const player = data.playerInfo;
          const tableName = data.whichTable?.toLowerCase();
          const betAmount = player?.totalbet || 0;

          // ✅ Only count each player's bet ONCE per table
          if (player?.playStatus === "action") {
            if (
              tableName === "bluetable" &&
              !bluePlayers.has(player.playerId)
            ) {
              blueBetSum += betAmount;
              bluePlayers.add(player.playerId);
            }
            if (
              tableName === "greentable" &&
              !greenPlayers.has(player.playerId)
            ) {
              greenBetSum += betAmount;
              greenPlayers.add(player.playerId);
            }

            // Store unique active players
            activePlayersMap.set(player.playerId, {
              ...player,
              tableName: data.whichTable || "N/A",
              totalBet: betAmount,
            });
          }
        });

        setActivePlayers(Array.from(activePlayersMap.values()));
        setTotalBlueBets(blueBetSum);
        setTotalGreenBets(greenBetSum);
      }
    } catch (error) {
      console.error("Error fetching game data", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(interval);
  }, [gameName]);

  return (
    <>
      {/* User Selection Dropdown */}
      <TestUsersList players={activePlayers} />

      {/* ✅ Correct Total Bets Section */}
      <div className="p-4 bg-blue-100 rounded-lg shadow-md mt-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Bets</h2>
        <div className="text-lg font-bold">
          <p className="text-blue-600">Blue Table: {totalBlueBets} Coins</p>
          <p className="text-green-600">Green Table: {totalGreenBets} Coins</p>
        </div>
      </div>

      {/* ✅ Active Players Display */}
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
              <p className="text-black-500 font-bold">
                {player.name || player.username}
              </p>
              <p className="text-black-700">
                Total Bets:{" "}
                <span className="text-red-500 font-bold">
                  {player.totalBet || 0} Coins
                </span>
              </p>
              <p className="text-black-700">
                Table:{" "}
                <span className="text-indigo-500 font-bold">
                  {player.tableName ? player.tableName : "N/A"}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Separate Betting Tables for Blue & Green */}
      <div className="mt-4">
        {/* Blue Table */}
        {tableinfo.some(
          (data) => data.whichTable?.toLowerCase() === "bluetable"
        ) && (
          <div className="relative border-4 border-blue-500 p-4 rounded-lg shadow-lg mt-4">
            <h1 className="text-lg font-bold text-blue-600 mb-2">Blue Table</h1>
            <Testing
              data={tableinfo.filter(
                (data) => data.whichTable?.toLowerCase() === "bluetable"
              )}
            />
          </div>
        )}

        {/* Green Table */}
        {tableinfo.some(
          (data) => data.whichTable?.toLowerCase() === "greentable"
        ) && (
          <div className="relative border-4 border-green-500 p-4 rounded-lg shadow-lg mt-4">
            <h1 className="text-lg font-bold text-green-600 mb-2">
              Green Table
            </h1>
            <Testing
              data={tableinfo.filter(
                (data) => data.whichTable?.toLowerCase() === "greentable"
              )}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default TestPlayingTableData;
