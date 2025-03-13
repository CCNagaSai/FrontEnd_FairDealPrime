import React, { useState, useEffect } from "react";
import "./CreateUsers.css";
import Cookies from "universal-cookie";
import {
  checkUsernameAvailable,
  UserhandleSubmit,
} from "../../Common/OfferState/DashboardOfferState";
const cookies = new Cookies();
// const API_URL = import.meta.env.VITE_HOST_URL;
const CreateUserForm = ({ userRole, apiEndpointCheck, apiEndpointAdd }) => {
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
    const storedAgentId = cookies.get("LoginUserId"); // Fetch loginUserID from cookies
    const storedToken = cookies.get("token"); // Fetch token from cookies

    console.log(
      "Retrieved loginUserID (Agent ID) from cookies:",
      storedAgentId
    );
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
    const status = await checkUsernameAvailable(username, token, userRole);
    setUsernameStatus(status);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await UserhandleSubmit(formData, token, userRole, agentId);
    setSubmissionMessage(result);

    if (result.type === "success") {
      setFormData({
        username: "",
        password: "",
        mobileNumber: "",
      });
      setUsernameStatus(null);
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
      <h1 className="user-general-information">
        {userRole} - General Information
      </h1>
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
            {userRole} Name: <span className="required">*</span>
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
          <label>{userRole} Transaction Password:</label>
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
          <button type="reset" className="btn reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
