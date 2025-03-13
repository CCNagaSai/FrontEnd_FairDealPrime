import React, { useContext, useEffect, useState } from "react";
import offerContext from "../../../context/offerContext";
import Testing from "./Testing";
import TestUsersList from "./TestSearchUsers";

function TestPlayingTableData({ gameName }) {
  const [tableinfo, setTableinfo] = useState([]);
  const [activePlayers, setActivePlayers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredTableInfo, setFilteredTableInfo] = useState([]);
  const context = useContext(offerContext);
  const { GetGameBetInfo } = context;

  // Function to fetch updated data
  const fetchData = async () => {
    try {
      const robotlogicdata = await GetGameBetInfo(gameName);
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

        // Auto update filtered data if the selected user is active
        if (selectedUser) {
          const filteredData = robotlogicdata.filter(
            (data) => data.playerInfo?.playerId === selectedUser
          );
          setFilteredTableInfo(filteredData);
        }
      }
    } catch (error) {
      console.error("Error fetching game data", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch initially

    // Auto refresh every 10 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 10000); // Adjust time as needed

    return () => clearInterval(interval); // Cleanup on unmount
  }, [gameName, selectedUser]);

  // Function to handle user selection
  const handleUserConfirm = (selectedPlayerId) => {
    if (selectedPlayerId) {
      setSelectedUser(selectedPlayerId);

      // Filter table data for the selected user
      const filteredData = tableinfo.filter(
        (data) => data.playerInfo?.playerId === selectedPlayerId
      );

      setFilteredTableInfo(filteredData);
    } else {
      // Reset selection
      setSelectedUser(null);
      setFilteredTableInfo(tableinfo);
    }
  };

  return (
    <>
      {/* Pass activePlayers and handleConfirm function */}
      <TestUsersList players={activePlayers} onUserClick={handleUserConfirm} />

      {/* Show table only if a user is selected */}
      {selectedUser && filteredTableInfo.length > 0 && (
        <div className="relative">
          <Testing data={filteredTableInfo} />
        </div>
      )}
    </>
  );
}

export default TestPlayingTableData;
