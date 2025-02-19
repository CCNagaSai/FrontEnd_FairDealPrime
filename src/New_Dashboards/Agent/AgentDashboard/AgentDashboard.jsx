import React, { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import "./AgentDashboard.css";
const API_URL = import.meta.env.VITE_HOST_URL;

const ADashboard = ({ onUserClick }) => {
  const [dashboardData, setDashboardData] = useState({
    activeUsers: 0,
    inactiveUsers: 0,
    suspendedUsers: 0,
    activePlayersDetails: [],
    inactivePlayersDetails: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null); // Track which card is clicked

  const idRef = useRef(null);
  const tokenRef = useRef(null);
  const cookies = new Cookies();

  useEffect(() => {
    // Fetch the ID and token from cookies
    idRef.current = cookies.get("LoginUserId");
    tokenRef.current = cookies.get("token");
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log("Fetching dashboard data...");

        setLoading(true);

        const id = idRef.current;
        const token = tokenRef.current;

        if (!id || !token) {
          console.error("Missing agent ID or token in cookies.");
          return;
        }

        console.log("Sending request to backend with ID:", id);

        const response = await fetch(
          `${API_URL}/admin/agent/dashboradData?agentId=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        console.log("API response status:", response.status);

        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          return;
        }

        const result = await response.json();
        console.log("Backend Response:", result); // Debug the backend response

        // Check if result.data exists and log it
        const data = result || {};
        console.log("Processed Data:", data); // Debug processed data

        const normalizePlayers = (players, key) =>
          players.map((player) => ({
            ...player,
            chips: player[key] || 0, // Use `chips` or fallback to `coins` value
          }));

        const activePlayers = normalizePlayers(
          data.activeUsers?.activePlayersDetails || [],
          "coins"
        );
        const inactivePlayers = normalizePlayers(
          data.inactiveUsers?.inActivePlayersDetails || [],
          "chips"
        );
        const suspendedPlayers = normalizePlayers(
          data.suspendedUsers?.suspendedPlayerDetails || [],
          "chips"
        );

        const filteredInactivePlayers = inactivePlayers.filter(
          (player) =>
            !activePlayers.some(
              (activePlayer) => activePlayer.playerId === player._id
            )
        );

        const filteredSuspendedPlayers = suspendedPlayers.filter(
          (player) =>
            !activePlayers.some(
              (activePlayer) => activePlayer.playerId === player._id
            )
        );

        setDashboardData({
          activeUsers: data.activeUsers?.totalActiveCount || 0,
          inactiveUsers: data.inactiveUsers?.totalInactiveCount || 0,
          suspendedUsers: data.suspendedUsers?.suspendedUsersCount || 0,
          activePlayersDetails: activePlayers,
          inactivePlayersDetails: filteredInactivePlayers,
          suspendedPlayersDetails: filteredSuspendedPlayers,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleCardClick = (cardType) => {
    setSelectedCard(cardType); // Set selected card to show the table
  };

  console.log("Dashboard Data:", dashboardData); // Debug the state after update

  const renderDetailsTable = (playersDetails) => {
    return (
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm sm:text-base">
        <thead>
          <tr className="bg-blue-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Chips</th>
            {/* <th className="border border-gray-300 px-4 py-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {playersDetails.length === 0 ? (
            <tr>
              <td colSpan="3">No players available</td>
            </tr>
          ) : (
            playersDetails.map((player) => (
              <tr key={player._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {player.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {player.chips}
                </td>
                {/* <td className="border border-gray-300 px-4 py-2">
                  <button onClick={() => handleViewButtonClick(player)}>
                    View
                  </button>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  };

  const handleViewButtonClick = (user) => {
    onUserClick(user);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="card-container">
        <div className="card blue" onClick={() => handleCardClick("active")}>
          <div className="card-icon">
            <i className="fas fa-user"></i>
          </div>
          <div className="card-content">
            <div className="icon-number-row">
              <i className="fas fa-user"></i>
              <h2>{dashboardData.activeUsers}</h2>
            </div>
            <p>Active Players</p>
          </div>
        </div>

        <div
          className="card orange"
          onClick={() => handleCardClick("inactive")}
        >
          <div className="card-icon">
            <i className="fas fa-user-times"></i>
          </div>
          <div className="card-content">
            <div className="icon-number-row">
              <i className="fas fa-user-times"></i>
              <h2>{dashboardData.inactiveUsers}</h2>
            </div>
            <p>Inactive Players</p>
          </div>
        </div>

        <div className="card red" onClick={() => handleCardClick("suspended")}>
          <div className="card-icon">
            <i className="fas fa-user-times"></i>
          </div>
          <div className="card-content">
            <div className="icon-number-row">
              <i className="fas fa-user-times"></i>
              <h2>{dashboardData.suspendedUsers}</h2>
            </div>
            <p>Suspended Players</p>
          </div>
        </div>
      </div>

      <div className="online-users-section"></div>

      {selectedCard === "active" && (
        <div className="details-table">
          {renderDetailsTable(dashboardData.activePlayersDetails)}
        </div>
      )}

      {selectedCard === "inactive" && (
        <div className="details-table">
          {renderDetailsTable(dashboardData.inactivePlayersDetails)}
        </div>
      )}

      {selectedCard === "suspended" && (
        <div className="details-table">
          {renderDetailsTable(dashboardData.suspendedPlayersDetails)}
        </div>
      )}
    </div>
  );
};

export default ADashboard;
