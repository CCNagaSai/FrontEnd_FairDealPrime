import React from 'react';
import Card from './Card/card';  
import "./agentdashboard.css";

const Agentdashboard = () => {
  return (
    <div className='page'>
      <div className="Card-container">
        <Card icon="fa-solid fa-user" title={"Active Player"} value={10} bgColor="blue" borderColor="blue" />
        <Card icon="fa-solid fa-cogs" title={"Pending Tasks"} value={5} bgColor="orange" borderColor="orange" />
        <Card icon="fa-solid fa-chart-line" title={"Sales Data"} value={1000} bgColor="red" borderColor="red" />
      </div>
    </div>
  );
};

export default Agentdashboard;
