import React, { useState, useEffect } from "react";
import "./AgentCreateSubagent.css";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ACreateSubagent = () => {
  const [selectedGames, setSelectedGames] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [token, setToken] = useState("");
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null); 

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    mobileNumber: "",
    transactionPassword: "",
  });

  const [submissionMessage, setSubmissionMessage] = useState(null);

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

    if (name === "username") {
      debounceCheckUsername(value);
    }
  };

  const debounceCheckUsername = (username) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      checkUsernameAvailability(username);
    }, 300);

    setDebounceTimeout(timeout);
  };

  const checkUsernameAvailability = async (username) => {
    if (!username) {
      setUsernameStatus(null);
      return;
    }

    try {
      const response = await fetch(
        "http://93.127.194.87:9999/admin/shop/check-username",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ name: username }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setUsernameStatus({
          available: !result.exists,
          message: result.exists
            ? "Sub Agent name already exists."
            : "Sub Agent name is available.",
        });
      } else {
        setUsernameStatus({
          available: false,
          message: "Error checking name availability.",
        });
      }
    } catch (error) {
      setUsernameStatus({
        available: false,
        message: "Failed to connect to the server.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setSubmissionMessage({
        type: "error",
        text: "name and Password are mandatory!",
      });
      return;
    }

    if (!usernameStatus?.available) {
      setSubmissionMessage({
        type: "error",
        text: "Please use a valid and available name.",
      });
      return;
    }

    // Prepare payload
    const payload = {
      name: formData.username,
      password: formData.password,
      mobileNumber: formData.mobileNumber,
      location: "India",
      agentId: agentId,
      deviceId: "111",
      isVIP: 1,
      Iscom: 0,
      email: "",
      retailer: "",
      status:"active"
    };

    console.log("Payload:", payload);
    // http://93.127.194.87:9999/admin/shop/AddShop
 
    try {
      const response = await fetch("http://93.127.194.87:9999/admin/shop/AddShop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token, // Send token from cookies
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.status) {
        setSubmissionMessage({
          type: "success",
          text: "Sub Agent created successfully!",
        });
        setFormData({
          username: "",
          password: "",
          mobileNumber: "",
          transactionPassword: "",
        });
        setUsernameStatus(null);
      } else {
        setSubmissionMessage({
          type: "error",
          text: result.message || "Failed to create Sub Agent.",
        });
      }
    } catch (error) {
      setSubmissionMessage({
        type: "error",
        text: "Failed to connect to the server.",
      });
    }
  };

  const handleReset = () => {
    setFormData({
      username: "",
      password: "",
      mobileNumber: "",
      transactionPassword: "",
    });
    setUsernameStatus(null);
    setSubmissionMessage(null);
  };

  return (
    <div className="create-user-container">
      <h1 className="user-general-information">Sub Agent - General Information</h1>
      {submissionMessage && (
        <p
          style={{
            color: submissionMessage.type === "success" ? "green" : "red",
            marginTop: "10px",
          }}
        >
          <strong>{submissionMessage.text}</strong>
        </p>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Sub Agent Name: <span className="required">*</span>
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
          {usernameStatus && (
            <p
              style={{
                color: usernameStatus.available ? "green" : "red",
                marginTop: "5px",
              }}
            >
              {usernameStatus.message}
            </p>
          )}
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
          <button
            type="submit"
            className="btn create"
            style={{
              backgroundColor: usernameStatus?.available ? "blue" : "grey",
              cursor: usernameStatus?.available ? "pointer" : "not-allowed",
            }}
            disabled={!usernameStatus?.available}
          >
            Create
          </button>
          <button
            type="reset"
            className="btn reset"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ACreateSubagent;
