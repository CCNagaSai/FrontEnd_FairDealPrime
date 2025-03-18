import React, { useEffect, useState } from "react";
import "./subAgentBalanceAdjust.css";
import Cookies from "universal-cookie";
import {
  LoadUserData,
  handleBalanceAdjustment,
} from "../../Common/OfferState/DashboardOfferState";

const cookies = new Cookies();
// const API_URL = import.meta.env.VITE_HOST_URL;

const SubAgentBalanceAdjust = ({ prefilledUser }) => {
  const [selectedUser, setSelectedUser] = useState(prefilledUser || "");
  const [users, setUsers] = useState([]);
  const [adjustType, setAdjustType] = useState("add"); // Default to 'add'
  const [amount, setAmount] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);

  const id = cookies.get("LoginUserId");
  const token = cookies.get("token");
  const logintype = cookies.get("logintype");
  const email = cookies.get("email");

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const usersData = await LoadUserData(id, token);
        console.log("Fetched Users:", usersData); // Debugging log
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching users:", err); // Debugging log
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleBalanceAdjustment(
      adjustType,
      selectedUser,
      amount,
      email,
      id,
      token,
      users
    );

    if (result.success) {
      setTransactionResult(result);
      setUsers(result.updatedUsers);
      setSelectedUser("");
      setAmount("");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="partner-adjustment-container">
      <h1 className="partner-adjustment-heading">Partner Adjustment</h1>
      {error && <p className="error-message">{error}</p>}
      {transactionResult && (
        <div className="transaction-result-wrapper">
          <div
            className={`transaction-result-card ${
              transactionResult.success ? "success" : "failure"
            }`}
          >
            <h2>
              {transactionResult.success
                ? "Transaction Successful"
                : "Transaction Failed"}
            </h2>
            <p>{transactionResult.message}</p>
            {transactionResult.success ? (
              <>
                <p>Previous Points: {transactionResult.previousPoints}</p>
                <p>
                  Points {adjustType === "add" ? "Added" : "Deducted"}:{" "}
                  {transactionResult.pointsChanged}
                </p>
                <p>New Points: {transactionResult.newPoints}</p>
              </>
            ) : null}
          </div>
        </div>
      )}

      <form
        className="partner-adjustment-form"
        style={{ maxWidth: "600px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="partner">Partner:</label>
          <select
            id="partner"
            name="partner"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="" disabled>
              Select
            </option>
            {Array.isArray(users) && users.length > 0 ? (
              users
                .slice()
                .sort((a, b) =>
                  (a.name || a.username || "").localeCompare(
                    b.name || b.username || ""
                  )
                )
                .map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name || user.username} -- {user.chips || 0}
                  </option>
                ))
            ) : (
              <option disabled>No users available</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="adjust">Adjust:</label>
          <select
            id="adjust"
            name="adjust"
            value={adjustType}
            onChange={(e) => setAdjustType(e.target.value)}
          >
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
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="form-group">
          <label htmlFor="transaction-password">Transaction Password:</label>
          <input
            type="password"
            id="transaction-password"
            name="transaction-password"
            value={transactionPassword}
            onChange={(e) => setTransactionPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            name="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>

        <div className="button-group">
          <button className="bg-blue-500 text-white px-4 py-2 mr-5 rounded hover:bg-blue-600">
            Submit
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              setType("");
              setSelectedUser("");
              setAmount("");
              setTransactionPassword("");
              setComments("");
              setError("");
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubAgentBalanceAdjust;
