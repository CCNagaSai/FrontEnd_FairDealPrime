import React, { useState, useEffect } from "react";
import "./AgentCreateUser.css";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ACreateUser = () => {
  const [selectedGames, setSelectedGames] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [token, setToken] = useState(""); 

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    mobileNumber: "",
    transactionPassword: "",
  });

  const gamesList = [
    "SPIN NORMAL",
    "SPIN TIMER",
    "ANDHAR BAHAR NORMAL",
    "ANDHAR BAHAR TIMER",
    "ROULETTE NORMAL",
    "ROULETTE TIMER",
    "LB ROULETTE TIMER",
    "LG ROULETTE TIMER",
    "TRIPLE NORMAL",
    "NORMAL SORAT TIMER",
    "SPIN 95 NORMAL",
    "SPIN 95 TIMER",
    "FAIRJET",
  ];

  useEffect(() => {
    // Get agentId and token from cookies
    const storedAgentId = cookies.get('LoginUserId'); // Fetch loginUserID from cookies
    const storedToken = cookies.get('token');        // Fetch token from cookies
  
    console.log("Retrieved loginUserID (Agent ID) from cookies:", storedAgentId);
    console.log("Retrieved token from cookies:", storedToken);
  
    if (storedAgentId) {
      setAgentId(storedAgentId); // Set the agentId in state
    } else {
      console.warn("No loginUserID found in cookies");
    }
  
    if (storedToken) {
      setToken(storedToken); // Set the token in state
    } else {
      console.warn("No token found in cookies");
    }
  }, []);
  

  const handleGameSelection = (game) => {
    if (selectedGames.includes(game)) {
      setSelectedGames(selectedGames.filter((g) => g !== game));
    } else {
      setSelectedGames([...selectedGames, game]);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Username and Password are mandatory!");
      return;
    }

    // Prepare payload
    const payload = {
      name: formData.username,
      password: formData.password,
      mobileNumber: formData.mobileNumber,
      country: "India",
      agentId: agentId,
      deviceId: "111",
      isVIP: 1,
      Iscom: 0,
      email: "",
      retailer: "",
    };

    console.log("Payload:", payload);

    try {
      const response = await fetch("http://93.127.194.87:9999/admin/user/AddUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token, // Send token from cookies
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert("User created successfully!");
        console.log("API Response:", result);
      } else {
        alert("Error creating user: " + result.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="create-user-container">
      <h1 className="user-general-information">User - General Information</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            User Name: <span className="required">*</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            Password: <span className="required">*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            placeholder="Enter 10 Digit Only"
            className="input"
            value={formData.mobileNumber}
            onChange={handleChange}
            maxLength="10"
          />
        </div>
        <div className="form-group">
          <label>Agent Transaction Password:</label>
          <input
            type="password"
            name="transactionPassword"
            placeholder="Transaction Password"
            className="input"
            value={formData.transactionPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Eligible Games:</label>
          <div className="dropdown-container">
            <div className="dropdown-box" onClick={toggleDropdown}>
              <span>Select Games</span>
              <span className="arrow">{isDropdownOpen ? "▲" : "▼"}</span>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                {gamesList.map((game) => (
                  <div key={game} className="dropdown-item">
                    <input
                      type="checkbox"
                      id={game}
                      checked={selectedGames.includes(game)}
                      onChange={() => handleGameSelection(game)}
                    />
                    <label htmlFor={game}>{game}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn create">
            Create
          </button>
          <button type="reset" className="btn reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ACreateUser;
