// src/components/Card.js

import React from "react";
import "./card.css";  // Add this for styling the card

function Card({ icon, title, value, bgColor, borderColor }) {
  return (
    <div className="cardborder" style={{ borderColor: borderColor }}>
      <div className="card" style={{ backgroundColor: bgColor }}>
        <div className="icon-container">
          <i className={icon}></i>
        </div>
        <div className="content">
          <p className="value">{value}</p>
          <p className="title">{title}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
