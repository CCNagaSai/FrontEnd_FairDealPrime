import React, { useContext, useEffect, useState } from "react";
import offerContext from "../../../context/offerContext";
import Testing from "./Testing"; // Make sure you have the right path
import TestUsersList from "./TestSearchUsers";

function TestPlayingTableData({ gameName }) {
  const [tableinfo, setTableinfo] = useState([]);
  const context = useContext(offerContext);
  const { GetGameBetInfo } = context;

  useEffect(() => {
    const submitdata = async () => {
      try {
        const robotlogicdata = await GetGameBetInfo(gameName);
        setTableinfo(robotlogicdata); // Update the state with bet info
        console.log("robotlogicdata", robotlogicdata);
      } catch (error) {
        console.error("Error fetching game data", error);
      }
    };

    submitdata();
  }, [gameName]); // Re-fetch when gameName changes

  console.log("Table Info", tableinfo);

  return (
    <>
      <TestUsersList />
      {/* Render a single table with the data */}
      {tableinfo.length > 0 && (
        <div className="relative">
          <Testing data={tableinfo} />{" "}
          {/* Pass the entire tableinfo to Testing component */}
        </div>
      )}
    </>
  );
}

export default TestPlayingTableData;
