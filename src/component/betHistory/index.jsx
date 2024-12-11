import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useContext, useEffect } from 'react';
import offerContext from '../../context/offerContext';
import "./styles.css";
function betHistory(data) {
  console.log("BET ::::::::::::::", data.data)

  const [betinfo, setBetinfo] = useState({});


  useEffect(() => {
    const submitdata = async () => {
      if (data != undefined && data.data != undefined && data.data.referid.length > 0) {
        let datajson = {}
        for (let i = 0; i <= data.data.referid.length - 1; i++) {
          if (data.data.referid[i].type != undefined) {


            datajson[data.data.referid[i].betIndex] = datajson[data.data.referid[i].betIndex] != undefined ? datajson[data.data.referid[i].betIndex] + data.data.referid[i].bet : data.data.referid[i].bet


          }
        }

        for (let j = 0; j <= 155; j++) {

          datajson[j.toString()] = convertRupees(datajson[j.toString()])

        }



        setBetinfo(datajson)
      }


    }
    submitdata()
  }, []);



  function convertRupees(number) {
    if (number >= 10000000) {
      return (number / 10000000).toFixed(1) + ' crore';
    } else if (number >= 100000) {
      return (number / 10 ** 5).toFixed(1) + ' lakh';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    } else {
      return number;
    }
  }



  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
          Player Bet Information
        </h3>

        <div className="table-content w-full overflow-x-auto">
          <table id="tableId" className="w-full">
            <tbody>
              <tr className="border-b border-bgray-300 dark:border-darkblack-400">


                <td className="w-[250px] px-6 py-5 xl:px-0" >
                  <div className="flex w-full items-center space-x-2.5">
                    <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      User Name
                    </span>
                  </div>
                </td>
                <td className="w-[165px] px-6 py-5 xl:px-0">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Time Of Bet
                    </span>
                  </div>
                </td>
                <td className="w-[165px] px-6 py-5 xl:px-0">
                  <div className="flex w-full items-center space-x-2.5">
                    <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Total Bet
                    </span>
                  </div>
                </td>
                <td className="w-[165px] px-6 py-5 xl:px-0">
                  <div className="flex w-full items-center space-x-2.5">
                    <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Total Won
                    </span>
                  </div>
                </td>
                <td className="w-[165px] px-6 py-5 xl:px-0">
                  <div className="flex w-full items-center space-x-2.5">
                    <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Won Number
                    </span>
                  </div>
                </td>

              </tr>

              <tr className="border-b border-bgray-300 dark:border-darkblack-400">


                <td className="w-[250px] px-6 py-5 xl:px-0">
                  <p className="text-base font-medium text-bgray-900 dark:text-white">
                    {data.data.name}
                  </p>
                </td>
                <td className="w-[165px] px-6 py-5 xl:px-0">
                  <p className="text-base font-medium text-bgray-900 dark:text-white">
                    {data.data.datetime}
                  </p>
                </td>
                <td className="w-[185px] px-6 py-5 xl:px-0">
                  <p className="text-base font-medium text-bgray-900 dark:text-white">
                    {data.data.play}
                  </p>
                </td>
                <td className="w-[165px] px-6 py-5 xl:px-0">
                  <p className="text-base font-semibold text-bgray-900 dark:text-white">
                    {data.data.won}
                  </p>
                </td>
                <td className="w-[165px] px-6 py-5 xl:px-0">
                  <p className="text-base font-medium text-bgray-900 dark:text-white">
                    {data.data.ballposition
                    }
                  </p>
                </td>

              </tr>

            </tbody>
          </table>
        </div>

        <div className="table-section">


          <table className="roulette-table">
            <tr>

              <td rowSpan="3" className="zero" data-bet="number" data-number="0"><p className='Chipsbet'>{betinfo["0"]}</p>  0 <button className='number50'>{betinfo["50"]}</button> <button className='number49'>{betinfo["49"]}</button> <button className='number51'>{betinfo["51"]}</button> <button className='number131'>{betinfo["131"]}</button> <button className='number132'>{betinfo["132"]}</button>  </td>
              <td className="red" data-bet="number" data-number="3"><p className='Chipsbet'>{betinfo["3"]}</p>3 <button className='number52'>{betinfo["52"]}</button> <button className='number85'>{betinfo["85"]}</button> <button className='number109'>{betinfo["109"]}</button></td>
              <td className="black" data-bet="number" data-number="6"><p className='Chipsbet'>{betinfo["6"]}</p>6 <button className='number53'>{betinfo["53"]}</button>  <button className='number86'>{betinfo["86"]}</button> <button className='number110'>{betinfo["110"]}</button></td>
              <td className="red" data-bet="number" data-number="9"><p className='Chipsbet'>{betinfo["9"]}</p>9  <button className='number54'>{betinfo["54"]}</button> <button className='number87'>{betinfo["87"]}</button> <button className='number111'>{betinfo["111"]}</button> </td>
              <td className="black" data-bet="number" data-number="12"><p className='Chipsbet'>{betinfo["12"]}</p>12 <button className='number55'>{betinfo["55"]}</button> <button className='number88'>{betinfo["88"]}</button> <button className='number112'>{betinfo["112"]}</button> </td>
              <td className="red" data-bet="number" data-number="15"><p className='Chipsbet'>{betinfo["15"]}</p>15 <button className='number56'>{betinfo["56"]}</button> <button className='number89'>{betinfo["89"]}</button> <button className='number113'>{betinfo["113"]}</button> </td>
              <td className="black" data-bet="number" data-number="18"><p className='Chipsbet'>{betinfo["18"]}</p>18 <button className='number57'>{betinfo["57"]}</button> <button className='number90'>{betinfo["90"]}</button> <button className='number114'>{betinfo["114"]}</button> </td>
              <td className="red" data-bet="number" data-number="21"><p className='Chipsbet'>{betinfo["21"]}</p>21 <button className='number58'>{betinfo["58"]}</button> <button className='number91'>{betinfo["91"]}</button> <button className='number115'>{betinfo["115"]}</button> </td>
              <td className="black" data-bet="number" data-number="24"><p className='Chipsbet'>{betinfo["24"]}</p>24 <button className='number59'>{betinfo["59"]}</button> <button className='number92'>{betinfo["92"]}</button> <button className='number116'>{betinfo["116"]}</button></td>
              <td className="red" data-bet="number" data-number="27"><p className='Chipsbet'>{betinfo["27"]}</p>27 <button className='number60'>{betinfo["60"]}</button> <button className='number93'>{betinfo["93"]}</button> <button className='number117'>{betinfo["117"]}</button></td>
              <td className="black" data-bet="number" data-number="30"><p className='Chipsbet'>{betinfo["30"]}</p>30 <button className='number61'>{betinfo["61"]}</button> <button className='number94'>{betinfo["94"]}</button> <button className='number118'>{betinfo["118"]}</button></td>
              <td className="red" data-bet="number" data-number="33"><p className='Chipsbet'>{betinfo["33"]}</p>33 <button className='number62'>{betinfo["62"]}</button> <button className='number95'>{betinfo["95"]}</button> <button className='number119'>{betinfo["119"]}</button></td>
              <td className="black" data-bet="number" data-number="36"><p className='Chipsbet'>{betinfo["36"]}</p>36 <button className='number96'>{betinfo["96"]}</button> </td>
              <td className="first-dozen" data-bet="number" data-number="C3"><p className='Chipsbet'>{betinfo["39"]}</p>C3</td>

            </tr>

            <tr>
              <td className="black" data-bet="number" data-number="2"><p className='Chipsbet'>{betinfo["2"]}</p>2 <button className='number63'>{betinfo["63"]}</button> <button className='number97'>{betinfo["97"]}</button> <button className='number120'>{betinfo["120"]}</button></td>
              <td className="red" data-bet="number" data-number="5"><p className='Chipsbet'>{betinfo["5"]}</p>5 <button className='number64'>{betinfo["64"]}</button> <button className='number98'>{betinfo["98"]}</button>  <button className='number121'>{betinfo["121"]}</button> </td>
              <td className="black" data-bet="number" data-number="8"><p className='Chipsbet'>{betinfo["8"]}</p>8 <button className='number65'>{betinfo["65"]}</button> <button className='number99'>{betinfo["99"]}</button> <button className='number122'>{betinfo["122"]}</button></td>
              <td className="red" data-bet="number" data-number="11"><p className='Chipsbet'>{betinfo["11"]}</p>11 <button className='number66'>{betinfo["66"]}</button> <button className='number100'>{betinfo["100"]}</button><button className='number123'>{betinfo["123"]}</button></td>
              <td className="black" data-bet="number" data-number="14"><p className='Chipsbet'>{betinfo["14"]}</p>14 <button className='number67'>{betinfo["67"]}</button> <button className='number101'>{betinfo["101"]}</button> <button className='number124'>{betinfo["124"]}</button></td>
              <td className="red" data-bet="number" data-number="17"><p className='Chipsbet'>{betinfo["17"]}</p>17 <button className='number68'>{betinfo["68"]}</button> <button className='number102'>{betinfo["102"]}</button><button className='number125'>{betinfo["125"]}</button></td>
              <td className="black" data-bet="number" data-number="20"><p className='Chipsbet'>{betinfo["20"]}</p>20 <button className='number69'>{betinfo["69"]}</button> <button className='number103'>{betinfo["103"]}</button><button className='number126'>{betinfo["126"]}</button></td>
              <td className="red" data-bet="number" data-number="23"><p className='Chipsbet'>{betinfo["23"]}</p>23 <button className='number70'>{betinfo["70"]}</button> <button className='number104'>{betinfo["104"]}</button><button className='number127'>{betinfo["127"]}</button> </td>
              <td className="black" data-bet="number" data-number="26"><p className='Chipsbet'>{betinfo["26"]}</p>26 <button className='number71'>{betinfo["71"]}</button> <button className='number105'>{betinfo["105"]}</button> <button className='number128'>{betinfo["128"]}</button></td>
              <td className="red" data-bet="number" data-number="29"><p className='Chipsbet'>{betinfo["29"]}</p>29 <button className='number72'>{betinfo["72"]}</button> <button className='number106'>{betinfo["106"]}</button><button className='number129'>{betinfo["129"]}</button></td>
              <td className="black" data-bet="number" data-number="32"><p className='Chipsbet'>{betinfo["32"]}</p>32 <button className='number73'>{betinfo["73"]}</button> <button className='number107'>{betinfo["107"]}</button> <button className='number130'>{betinfo["130"]}</button></td>
              <td className="red" data-bet="number" data-number="35"><p className='Chipsbet'>{betinfo["35"]}</p>35 <button className='number108'>{betinfo["108"]}</button></td>
              <td className="first-dozen" data-bet="number" data-number="C2"><p className='Chipsbet'>{betinfo["38"]}</p>C2</td>

            </tr>
            <tr>
              <td className="red" data-bet="number" data-number="1"><p className='Chipsbet'>{betinfo["1"]}</p>1 <button className='number74'>{betinfo["74"]}</button> <button className='number133'>{betinfo["133"]}</button> <button className='number145'>{betinfo["145"]}</button>  </td>
              <td className="black" data-bet="number" data-number="4"><p className='Chipsbet'>{betinfo["4"]}</p>4  <button className='number75'>{betinfo["75"]}</button> <button className='number134'>{betinfo["134"]}</button> <button className='number146'>{betinfo["146"]}</button> </td>
              <td className="red" data-bet="number" data-number="7"><p className='Chipsbet'>{betinfo["7"]}</p> 7 <button className='number76'>{betinfo["76"]}</button> <button className='number135'>{betinfo["135"]}</button> <button className='number147'>{betinfo["147"]}</button> </td>
              <td className="black" data-bet="number" data-number="10"><p className='Chipsbet'>{betinfo["10"]}</p>10 <button className='number77'>{betinfo["77"]}</button> <button className='number136'>{betinfo["136"]}</button> <button className='number148'>{betinfo["148"]}</button> </td>
              <td className="red" data-bet="number" data-number="13"><p className='Chipsbet'>{betinfo["13"]}</p>13 <button className='number78'>{betinfo["78"]}</button> <button className='number137'>{betinfo["137"]}</button> <button className='number149'>{betinfo["149"]}</button> </td>
              <td className="black" data-bet="number" data-number="16"><p className='Chipsbet'>{betinfo["16"]}</p>16 <button className='number79'>{betinfo["79"]}</button> <button className='number138'>{betinfo["138"]}</button> <button className='number150'>{betinfo["150"]}</button> </td>
              <td className="red" data-bet="number" data-number="19"><p className='Chipsbet'>{betinfo["19"]}</p>19 <button className='number80'>{betinfo["80"]}</button> <button className='number139'>{betinfo["139"]}</button>  <button className='number151'>{betinfo["151"]}</button> </td>
              <td className="black" data-bet="number" data-number="22"><p className='Chipsbet'>{betinfo["22"]}</p>22 <button className='number81'>{betinfo["81"]}</button> <button className='number140'>{betinfo["140"]}</button> <button className='number152'>{betinfo["152"]}</button> </td>
              <td className="red" data-bet="number" data-number="25"><p className='Chipsbet'>{betinfo["25"]}</p>25 <button className='number82'>{betinfo["82"]}</button> <button className='number141'>{betinfo["141"]}</button> <button className='number153'>{betinfo["153"]}</button> </td>
              <td className="black" data-bet="number" data-number="28"><p className='Chipsbet'>{betinfo["28"]}</p>28 <button className='number83'>{betinfo["83"]}</button> <button className='number142'>{betinfo["142"]}</button> <button className='number154'>{betinfo["154"]}</button> </td>
              <td className="red" data-bet="number" data-number="31"><p className='Chipsbet'>{betinfo["31"]}</p>31 <button className='number84'>{betinfo["84"]}</button> <button className='number143'>{betinfo["143"]}</button> <button className='number155'>{betinfo["155"]}</button> </td>
              <td className="black" data-bet="number" data-number="34"><p className='Chipsbet'>{betinfo["34"]}</p>34 <button className='number144'>{betinfo["144"]}</button> </td>
              <td className="first-dozen" data-bet="number" data-number="C1"><p className='Chipsbet'>{betinfo["37"]}</p>C1</td>


            </tr>
            <tr>
              <td></td>
              <td colSpan={4} className="first-dozen" data-bet="first-dozen"><p className='Chipsbet'>{betinfo["40"]}</p>1st 12</td>
              <td colSpan={4} className="second-dozen" data-bet="second-dozen"><p className='Chipsbet'>{betinfo["41"]}</p>2nd 12</td>
              <td colSpan={4} className="third-dozen" data-bet="third-dozen"><p className='Chipsbet'>{betinfo["42"]}</p>3rd 12</td>
            </tr>
            <tr>
              <td></td>
              <td colSpan={2} className="low" data-bet="low"><p className='Chipsbet'>{betinfo["43"]}</p>1-18</td>
              <td colSpan={2} className="even" data-bet="even"><p className='Chipsbet'>{betinfo["46"]}</p>Even</td>

              <td colSpan={2} className="red" data-bet="red"><p className='Chipsbet'>{betinfo["47"]}</p>Red</td>
              <td colSpan={2} className="black" data-bet="black"><p className='Chipsbet'>{betinfo["48"]}</p>Black</td>

              <td colSpan={2} className="odd" data-bet="odd"><p className='Chipsbet'>{betinfo["45"]}</p>Odd</td>
              <td colSpan={2} className="high" data-bet="high"><p className='Chipsbet'>{betinfo["44"]}</p>19-36</td>
            </tr>

          </table>
        </div>
      </div>
    </div>
  );
}


export default betHistory;