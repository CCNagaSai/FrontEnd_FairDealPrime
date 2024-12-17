import React, { useState } from "react";
import "./CreateUser.css";

const CreateUser = () => {
  const [selectedGames, setSelectedGames] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <div className="create-user-container">
      <h1 className="user-general-information">User - General Information</h1>
      <form className="form">
        <div className="form-group">
          <label>User Name: <span className="required">*</span></label>
          <input type="text" placeholder="Username" className="input" required />
        </div>
        <div className="form-group">
          <label>Password: <span className="required">*</span></label>
          <input type="password" placeholder="Password" className="input" required />
        </div>
        <div className="form-group">
          <label>Mobile Number: <span className="required">*</span></label>
          <input type="text" placeholder="Enter 10 Digit Only" className="input" maxLength="10" required />
        </div>
        <div className="form-group">
          <label>Agent Transaction Password: <span className="required">*</span></label>
          <input
            type="password"
            placeholder="Transaction Password"
            className="input"
            required
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
          <button type="submit" className="btn create">Create</button>
          <button type="reset" className="btn reset">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
