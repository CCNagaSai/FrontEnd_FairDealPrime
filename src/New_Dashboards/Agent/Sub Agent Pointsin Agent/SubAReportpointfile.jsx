import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import SubAReportpointfile from "../../SubAgent/subAgentPointFile/subAgentPointFile";
import SubAReportInpoint from "../../SubAgent/subAgentInPoints/subAgentInPoints";
import SubAReportOutpoint from "../../SubAgent/subAgentOutPoints/subAgentOutPoints";

const SubAgentPointsInAgent = () => {
  const [shopList, setShopList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const id = cookies.get("LoginUserId");
  const type = "Shop";

  useEffect(() => {
    const fetchShopList = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = cookies.get("token");
        if (!id) {
          throw new Error("Missing id from cookies");
        }

        const response = await fetch(
          `http://65.0.54.193:9999/admin/shop/ShopList?agentId=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetched result:", result);
        const sortedShopList = (result.shopList || []).sort((a, b) => a.name.localeCompare(b.name));
        setOriginalData(sortedShopList);
        setShopList(sortedShopList);
      } catch (err) {
        console.error("Error fetching shop data:", err.message);
        setError("Failed to load shop data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchShopList();
  }, []);

  const handleSubmit = () => {
    setShowReport(true);
  };

  const handleClear = () => {
    setSelectedShop("");
    setSelectedType("");
    setShowReport(false);
  };

  return (
    <div className="p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Sub Agent Points</h2>
      <div className="mb-4 flex justify-center space-x-4 w-full">
        <div className="w-1/3">
          <label className="block mb-1">Select Sub Agent:</label>
          <select
            value={selectedShop}
            onChange={(e) => setSelectedShop(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="">Select Sub Agent</option>
            {shopList.map((shop) => (
              <option key={shop._id} value={shop._id}>
                {shop.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/3">
          <label className="block mb-1">Select Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="">Select Type</option>
            <option value="Points File">Points File</option>
            <option value="InPoints">InPoints</option>
            <option value="OutPoints">OutPoints</option>
          </select>
        </div>
      </div>


      <div className="flex justify-center space-x-4 mt-4 mb-4">
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded w-32">
          Submit
        </button>
        <button onClick={handleClear} className="bg-gray-400 text-white p-2 rounded w-32">
          Clear
        </button>
      </div>

      {showReport && selectedType === "InPoints" && (
        <SubAReportInpoint subAgentId={selectedShop} type={type} />
      )}

      {showReport && selectedType === "OutPoints" && (
        <SubAReportOutpoint subAgentId={selectedShop} type={type} />
      )}

      {showReport && selectedType === "Points File" && (
        <SubAReportpointfile subAgentId={selectedShop} type={type} />
      )}
    </div>
  );
};

export default SubAgentPointsInAgent;
