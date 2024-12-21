import React, { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import "./subAgentDashboard.css";

const SubADashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    activeUsers: 0,
    inactiveUsers: 0,
    suspendedUsers: 0,
  }); // Default values for dashboard
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(true);
        setError(null);

        const id = idRef.current;
        const token = tokenRef.current;

        if (!id || !token) {
          throw new Error("Missing agent ID or token in cookies.");
        }

        const response = await fetch(
          `http://93.127.194.87:9999/admin/agent/dashboradData?agentId=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token, // Attach token from cookies
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const data = result.data[0]; // Assuming the first item in the array contains the data
        setDashboardData({
          activeUsers: data.activeUsers || 0,
          inactiveUsers: data.inactiveUsers || 0,
          suspendedUsers: data.suspendedUsers || 0,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err.message);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="card-container">
        <div className="card blue">
          <div className="card-icon">
            <i className="fas fa-user"></i>
          </div>
          <div className="card-content">
            <h2>{dashboardData.activeUsers}</h2>
            <p>Active Players</p>
          </div>
        </div>

        <div className="card orange">
          <div className="card-icon">
            <i className="fas fa-user-times"></i>
          </div>
          <div className="card-content">
            <h2>{dashboardData.inactiveUsers}</h2>
            <p>In-active Players</p>
          </div>
        </div>

        <div className="card red">
          <div className="card-icon">
            <i className="fas fa-user-times"></i>
          </div>
          <div className="card-content">
            <h2>{dashboardData.suspendedUsers}</h2>
            <p>Suspend Players</p>
          </div>
        </div>
      </div>

      <div className="online-users-section">
        <p className="vertical-text">Online Users</p>
      </div>
    </div>
  );
};

export default SubADashboard;
