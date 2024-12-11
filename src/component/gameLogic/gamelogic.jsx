
import offerContext from '../../context/offerContext'
import React, { useContext, useEffect, useState, useRef } from 'react';

function gameLogic(gameName) {

  const [robotlogic, setRobotlogic] = useState({
    gamename: gameName.gameName,
    selectedMode: "",
    greenfixnumberwon: -1,
    bluefixnumberwon: -1,
    PERCENTAGE: -1,
    DAY: -1
  });

  const handleModeChange = (event) => {

    const { name, value } = event.target;
    console.log("NAME :::::::::::::::::", name)
    console.log("value :::::::::::::::::", value)

    setRobotlogic({
      ...robotlogic,
      [name]: value,
    });

    console.log("robotlogic ::::::::::::::::::::::", robotlogic)

  };

  const context = useContext(offerContext)

  const { GameLogicSet, GetGameLogic } = context

  useEffect(() => {
    console.log("HELO LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL", gameName.gameName)
    const submitdata = async () => {

      //setSelectedMode(await GetGameLogic(gameName.gameName))
      let robotlogicdata = await GetGameLogic(gameName.gameName)

      console.log("robotlogicdata ", robotlogicdata)

      setRobotlogic({
        gamename: gameName.gameName,
        selectedMode: robotlogicdata.selectedMode,
        greenfixnumberwon: robotlogicdata.greenfixnumberwon,
        bluefixnumberwon: robotlogicdata.bluefixnumberwon,
        PERCENTAGE: robotlogicdata.PERCENTAGE,
        DAY: robotlogicdata.DAY
      })


    }
    submitdata()
  }, [gameName.gameName]);

  const handleSubmit = async () => {

    console.log("BEFOPRE :::::::::::::::", robotlogic)

    let res = await GameLogicSet(robotlogic)
    console.log("REs :::::::::::::::::::::", res)
    if (res.falgs == true) {
      alert("Success Save")
    }
  };
  return (
    <div className="mb-[24px] w-full">
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">

        <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center space-x-[7px]">
              <div className="icon">
                <span>
                  <p className="text-1xl font-bold leading-[48px] text-bgray-900 dark:text-white">No One Will Win</p>
                </span>
              </div>
              <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                <input
                  type="radio"
                  id="ClientWillWin"
                  name="selectedMode"
                  value="Client"
                  checked={robotlogic.selectedMode === 'Client'}
                  onChange={handleModeChange}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center space-x-[7px]">
              <div className="icon">
                <span>
                  <p className="text-1xl font-bold leading-[48px] text-bgray-900 dark:text-white">latest Amount Will Win</p>
                </span>
              </div>
              <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                <input
                  type="radio"
                  id="List Will Win"
                  name="selectedMode"
                  value="User"
                  checked={robotlogic.selectedMode === 'User'}
                  onChange={handleModeChange}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center space-x-[7px]">
              <div className="icon">
                <span>
                  <p className="text-1xl font-bold leading-[48px] text-bgray-900 dark:text-white">Normal Games</p>
                </span>
              </div>
              <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                <input
                  type="radio"
                  id="normalgame"
                  name="selectedMode"
                  value="Normal"
                  checked={robotlogic.selectedMode === 'Normal'}
                  onChange={handleModeChange}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center space-x-[17px]">
              <div className="icon">
                <span>
                  <p className="text-1xl font-bold leading-[48px] text-bgray-900 dark:text-white">Blue Fix Number Won</p>
                </span>
              </div>
              <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                <input
                  type="text"
                  id="bluefixnumberwon"
                  name="bluefixnumberwon"
                  placeholder={robotlogic.bluefixnumberwon}
                  className="bg-bgray-500 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"

                  onChange={handleModeChange}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center space-x-[17px]">
              <div className="icon">
                <span>
                  <p className="text-1xl font-bold leading-[48px] text-bgray-900 dark:text-white">Percentage</p>
                </span>
              </div>
              <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                <input
                  type="text"
                  id="PERCENTAGE"
                  name="PERCENTAGE"
                  placeholder={robotlogic.PERCENTAGE}
                  className="bg-bgray-500 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"

                  onChange={handleModeChange}
                />
              </span>
             
            </div>
          </div>
        </div>


        <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center space-x-[17px]">
             
              <div className="icon">
                <span>
                  <p className="text-1xl font-bold leading-[48px] text-bgray-900 dark:text-white">Day</p>
                </span>
              </div>
              <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                <input
                  type="text"
                  id="DAY"
                  name="DAY"
                  placeholder={robotlogic.DAY}
                  className="bg-bgray-500 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"

                  onChange={handleModeChange}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center space-x-[17px]">
              <div className="icon">
                <span>
                  <p className="text-1xl font-bold leading-[48px] text-bgray-900 dark:text-white">Green Fix Number Won</p>
                </span>
              </div>
              <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                <input
                  type="text"
                  id="greenfixnumberwon"
                  name="greenfixnumberwon"
                  placeholder={robotlogic.greenfixnumberwon}
                  className="bg-bgray-500 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"

                  onChange={handleModeChange}
                />
              </span>
            </div>
          </div>
        </div>



        <div className="rounded-lg  p-5">

          <div className="mb-5 flex items-center justify-between">
            <button onClick={handleSubmit}
              aria-label="none"
              className="bg-success-300 dark:bg-success-300 dark:text-bgray-900 border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm">
              Submit
            </button>
          </div>
        </div>







      </div>
    </div>
  );
}

export default gameLogic;










