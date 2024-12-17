// PartnerAdjustment.jsx
import React from "react";
import "./PartnerAdjustment.css";

const PartnerAdjustment = () => {
  return (
    <div className="partner-adjustment-container">
      <h1 className="partner-adjustment-heading">Partner Adjustment</h1>

      <form className="partner-adjustment-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select id="type" name="type">
            <option value="" disabled selected>
              Select
            </option>
            <option value="type1">Refer Agent</option>
            <option value="type2">User</option>
          </select>
          <small>Please select type</small>
        </div>

        <div className="form-group">
          <label htmlFor="partner">Partner:</label>
          <select id="partner" name="partner">
            <option value="" disabled selected>
              Select
            </option>
            <option value="partner1">Partner 1</option>
            <option value="partner2">Partner 2</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="adjust">Adjust:</label>
          <select id="adjust" name="adjust">
            <option value="" disabled selected>
              Select
            </option>
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
          </select>
        </div>
        <div className="form-group">
  <label htmlFor="transaction-amount">Amount:</label>
  <input
    type="text"
    id="transaction-amount"
    name="transaction-amount"
    placeholder="Enter amount"
  />
</div>


        <div className="form-group">
          <label htmlFor="transaction-password">Transaction Password:</label>
          <input
            type="password"
            id="transaction-password"
            name="transaction-password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <textarea id="comments" name="comments"></textarea>
        </div>

        <div className="button-group">
          <button className="btn btn-submit">
            Submit
          </button>
          <button className="btn btn-clear">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerAdjustment;



