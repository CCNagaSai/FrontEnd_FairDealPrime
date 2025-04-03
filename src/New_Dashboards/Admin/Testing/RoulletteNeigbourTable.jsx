import React, { useState } from "react";
import "./style.css";
const NeighbourBettingTable = () => {
  const [betinfo, setBetinfo] = useState({});

  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
          Neighbour Bet Information
        </h3>

        <div className="table-section">
          <table className="roulette-table">
            <tr>
              <td className="black" data-bet="number" data-number="2">
                <p className="Chipsbet">{betinfo["2"]}</p>10{" "}
                <button className="number63">{betinfo["63"]}</button>{" "}
                <button className="number97">{betinfo["97"]}</button>{" "}
                <button className="number120">{betinfo["120"]}</button>
              </td>
              <td className="red" data-bet="number" data-number="3">
                <p className="Chipsbet">{betinfo["3"]}</p>5{" "}
                <button className="number52">{betinfo["52"]}</button>{" "}
                <button className="number85">{betinfo["85"]}</button>{" "}
                <button className="number109">{betinfo["109"]}</button>
              </td>
              <td className="black" data-bet="number" data-number="6">
                <p className="Chipsbet">{betinfo["6"]}</p>24{" "}
                <button className="number53">{betinfo["53"]}</button>{" "}
                <button className="number86">{betinfo["86"]}</button>{" "}
                <button className="number110">{betinfo["110"]}</button>
              </td>
              <td className="red" data-bet="number" data-number="9">
                <p className="Chipsbet">{betinfo["9"]}</p>16{" "}
                <button className="number54">{betinfo["54"]}</button>{" "}
                <button className="number87">{betinfo["87"]}</button>{" "}
                <button className="number111">{betinfo["111"]}</button>{" "}
              </td>
              <td className="black" data-bet="number" data-number="12">
                <p className="Chipsbet">{betinfo["12"]}</p>33{" "}
                <button className="number55">{betinfo["55"]}</button>{" "}
                <button className="number88">{betinfo["88"]}</button>{" "}
                <button className="number112">{betinfo["112"]}</button>{" "}
              </td>
              <td className="red" data-bet="number" data-number="15">
                <p className="Chipsbet">{betinfo["15"]}</p>1{" "}
                <button className="number56">{betinfo["56"]}</button>{" "}
                <button className="number89">{betinfo["89"]}</button>{" "}
                <button className="number113">{betinfo["113"]}</button>{" "}
              </td>
              <td className="black" data-bet="number" data-number="18">
                <p className="Chipsbet">{betinfo["18"]}</p>20{" "}
                <button className="number57">{betinfo["57"]}</button>{" "}
                <button className="number90">{betinfo["90"]}</button>{" "}
                <button className="number114">{betinfo["114"]}</button>{" "}
              </td>
              <td className="red" data-bet="number" data-number="21">
                <p className="Chipsbet">{betinfo["21"]}</p>14{" "}
                <button className="number58">{betinfo["58"]}</button>{" "}
                <button className="number91">{betinfo["91"]}</button>{" "}
                <button className="number115">{betinfo["115"]}</button>{" "}
              </td>
              <td className="black" data-bet="number" data-number="24">
                <p className="Chipsbet">{betinfo["24"]}</p>31{" "}
                <button className="number59">{betinfo["59"]}</button>{" "}
                <button className="number92">{betinfo["92"]}</button>{" "}
                <button className="number116">{betinfo["116"]}</button>
              </td>
              <td className="red" data-bet="number" data-number="27">
                <p className="Chipsbet">{betinfo["27"]}</p>9{" "}
                <button className="number60">{betinfo["60"]}</button>{" "}
                <button className="number93">{betinfo["93"]}</button>{" "}
                <button className="number117">{betinfo["117"]}</button>
              </td>
              <td className="black" data-bet="number" data-number="30">
                <p className="Chipsbet">{betinfo["30"]}</p>22{" "}
                <button className="number61">{betinfo["61"]}</button>{" "}
                <button className="number94">{betinfo["94"]}</button>{" "}
                <button className="number118">{betinfo["118"]}</button>
              </td>
              <td className="red" data-bet="number" data-number="33">
                <p className="Chipsbet">{betinfo["33"]}</p>18{" "}
                <button className="number62">{betinfo["62"]}</button>{" "}
                <button className="number95">{betinfo["95"]}</button>{" "}
                <button className="number119">{betinfo["119"]}</button>
              </td>
              <td className="black" data-bet="number" data-number="29">
                <p className="Chipsbet">{betinfo["33"]}</p>29{" "}
                <button className="number62">{betinfo["62"]}</button>{" "}
                <button className="number95">{betinfo["95"]}</button>{" "}
                <button className="number119">{betinfo["119"]}</button>
              </td>
              <td className="red" data-bet="number" data-number="7">
                <p className="Chipsbet">{betinfo["33"]}</p>7{" "}
                <button className="number62">{betinfo["62"]}</button>{" "}
                <button className="number95">{betinfo["95"]}</button>{" "}
                <button className="number119">{betinfo["119"]}</button>
              </td>
              <td className="black" data-bet="number" data-number="28">
                <p className="Chipsbet">{betinfo["33"]}</p>28{" "}
                <button className="number62">{betinfo["62"]}</button>{" "}
                <button className="number95">{betinfo["95"]}</button>{" "}
                <button className="number119">{betinfo["119"]}</button>
              </td>
              <td className="red" data-bet="number" data-number="33">
                <p className="Chipsbet">{betinfo["33"]}</p>12{" "}
                <button className="number62">{betinfo["62"]}</button>{" "}
                <button className="number95">{betinfo["95"]}</button>{" "}
                <button className="number119">{betinfo["119"]}</button>
              </td>
              <td className="black" data-bet="number" data-number="33">
                <p className="Chipsbet">{betinfo["33"]}</p>35{" "}
                <button className="number62">{betinfo["62"]}</button>{" "}
                <button className="number95">{betinfo["95"]}</button>{" "}
                <button className="number119">{betinfo["119"]}</button>
              </td>
              <td className="red" data-bet="number" data-number="33">
                <p className="Chipsbet">{betinfo["33"]}</p>3{" "}
                <button className="number62">{betinfo["62"]}</button>{" "}
                <button className="number95">{betinfo["95"]}</button>{" "}
                <button className="number119">{betinfo["119"]}</button>
              </td>
            </tr>
            <tr>
              {/* Retain the first column cell with same styling but no content */}
              <td className=""></td>

              {/* BET HERE button starts from the second column and spans the remaining 5 columns */}
              <td colSpan="4" className="middle">
                <p className="">TIERS</p>
              </td>
              <td colSpan="4" className="middle">
                <p className="">ORPHELINS</p>
              </td>
              <td colSpan="4" className="middle">
                <p className="">VOISINS DU</p>
              </td>
              <td colSpan="4" className="middle">
                <p className="">ZERO SPIEL</p>
              </td>
              <td className="black" data-bet="number" data-number="33">
                <p className="Chipsbet">{betinfo["33"]}</p>36{" "}
                <button className="number62">{betinfo["62"]}</button>{" "}
                <button className="number95">{betinfo["95"]}</button>{" "}
                <button className="number119">{betinfo["119"]}</button>
              </td>
            </tr>
            <tr>
              <td className="red" data-bet="number" data-number="1">
                <p className="Chipsbet">{betinfo["1"]}</p>23{" "}
                <button className="number74">{betinfo["74"]}</button>{" "}
                <button className="number133">{betinfo["133"]}</button>{" "}
                <button className="number145">{betinfo["145"]}</button>{" "}
              </td>
              <td className="black" data-bet="number" data-number="4">
                <p className="Chipsbet">{betinfo["4"]}</p>8{" "}
                <button className="number75">{betinfo["75"]}</button>{" "}
                <button className="number134">{betinfo["134"]}</button>{" "}
                <button className="number146">{betinfo["146"]}</button>{" "}
              </td>
              <td className="red" data-bet="number" data-number="7">
                <p className="Chipsbet">{betinfo["7"]}</p>30{" "}
                <button className="number76">{betinfo["76"]}</button>{" "}
                <button className="number135">{betinfo["135"]}</button>{" "}
                <button className="number147">{betinfo["147"]}</button>{" "}
              </td>
              <td className="black" data-bet="number" data-number="10">
                <p className="Chipsbet">{betinfo["10"]}</p>11{" "}
                <button className="number77">{betinfo["77"]}</button>{" "}
                <button className="number136">{betinfo["136"]}</button>{" "}
                <button className="number148">{betinfo["148"]}</button>{" "}
              </td>
              <td className="red" data-bet="number" data-number="13">
                <p className="Chipsbet">{betinfo["13"]}</p>36{" "}
                <button className="number78">{betinfo["78"]}</button>{" "}
                <button className="number137">{betinfo["137"]}</button>{" "}
                <button className="number149">{betinfo["149"]}</button>{" "}
              </td>
              <td className="black" data-bet="number" data-number="16">
                <p className="Chipsbet">{betinfo["16"]}</p>13{" "}
                <button className="number79">{betinfo["79"]}</button>{" "}
                <button className="number138">{betinfo["138"]}</button>{" "}
                <button className="number150">{betinfo["150"]}</button>{" "}
              </td>
              <td className="red" data-bet="number" data-number="19">
                <p className="Chipsbet">{betinfo["19"]}</p>27{" "}
                <button className="number80">{betinfo["80"]}</button>{" "}
                <button className="number139">{betinfo["139"]}</button>{" "}
                <button className="number151">{betinfo["151"]}</button>{" "}
              </td>
              <td className="black" data-bet="number" data-number="22">
                <p className="Chipsbet">{betinfo["22"]}</p>6{" "}
                <button className="number81">{betinfo["81"]}</button>{" "}
                <button className="number140">{betinfo["140"]}</button>{" "}
                <button className="number152">{betinfo["152"]}</button>{" "}
              </td>
              <td className="red" data-bet="number" data-number="25">
                <p className="Chipsbet">{betinfo["25"]}</p>34{" "}
                <button className="number82">{betinfo["82"]}</button>{" "}
                <button className="number141">{betinfo["141"]}</button>{" "}
                <button className="number153">{betinfo["153"]}</button>{" "}
              </td>
              <td className="black" data-bet="number" data-number="28">
                <p className="Chipsbet">{betinfo["28"]}</p>17{" "}
                <button className="number83">{betinfo["83"]}</button>{" "}
                <button className="number142">{betinfo["142"]}</button>{" "}
                <button className="number154">{betinfo["154"]}</button>{" "}
              </td>
              <td className="red" data-bet="number" data-number="31">
                <p className="Chipsbet">{betinfo["31"]}</p>25{" "}
                <button className="number84">{betinfo["84"]}</button>{" "}
                <button className="number143">{betinfo["143"]}</button>{" "}
                <button className="number155">{betinfo["155"]}</button>{" "}
              </td>
              <td className="black" data-bet="number" data-number="31">
                <p className="Chipsbet">{betinfo["31"]}</p>2{" "}
                <button className="number84">{betinfo["84"]}</button>{" "}
                <button className="number143">{betinfo["143"]}</button>{" "}
                <button className="number155">{betinfo["155"]}</button>{" "}
              </td>
              <td className="red" data-bet="number" data-number="31">
                <p className="Chipsbet">{betinfo["31"]}</p>21{" "}
                <button className="number84">{betinfo["84"]}</button>{" "}
                <button className="number143">{betinfo["143"]}</button>{" "}
                <button className="number155">{betinfo["155"]}</button>{" "}
              </td>
              <td className="black" data-bet="number" data-number="31">
                <p className="Chipsbet">{betinfo["31"]}</p>4{" "}
                <button className="number84">{betinfo["84"]}</button>{" "}
                <button className="number143">{betinfo["143"]}</button>{" "}
                <button className="number155">{betinfo["155"]}</button>{" "}
              </td>
              <td className="red" data-bet="number" data-number="31">
                <p className="Chipsbet">{betinfo["31"]}</p>19{" "}
                <button className="number84">{betinfo["84"]}</button>{" "}
                <button className="number143">{betinfo["143"]}</button>{" "}
                <button className="number155">{betinfo["155"]}</button>{" "}
              </td>
              <td className="black" data-bet="number" data-number="31">
                <p className="Chipsbet">{betinfo["31"]}</p>15{" "}
                <button className="number84">{betinfo["84"]}</button>{" "}
                <button className="number143">{betinfo["143"]}</button>{" "}
                <button className="number155">{betinfo["155"]}</button>{" "}
              </td>
              <td className="red" data-bet="number" data-number="31">
                <p className="Chipsbet">{betinfo["31"]}</p>32{" "}
                <button className="number84">{betinfo["84"]}</button>{" "}
                <button className="number143">{betinfo["143"]}</button>{" "}
                <button className="number155">{betinfo["155"]}</button>{" "}
              </td>
              <td className="zero" data-bet="number" data-number="31">
                <p className="Chipsbet">{betinfo["31"]}</p>0{" "}
                <button className="number84">{betinfo["84"]}</button>{" "}
                <button className="number143">{betinfo["143"]}</button>{" "}
                <button className="number155">{betinfo["155"]}</button>{" "}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NeighbourBettingTable;
