import React, { useEffect, useState } from "react";
import "./BalanceAdjustement.css";
import Cookies from "universal-cookie";
import {
  AdminfetchPartners,
  fetchhandleAdminBalanceAdjustment,
} from "../../Common/OfferState/DashboardOfferState";

const cookies = new Cookies();

const BalanceAdjust = ({ userRole }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [adjustType, setAdjustType] = useState("add");
  const [amount, setAmount] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);
  const [selectedType, setSelectedType] = useState("");

  const id = cookies.get("LoginUserId");
  const token = cookies.get("token");
  const logintype = cookies.get("name");

  // Available options for "Type" dropdown based on user role
  const typeOptions = {
    Admin: ["Agent", "SubAgent", "User"],
    Agent: ["SubAgent", "User"],
  };

  // Fetch users dynamically based on role and selected type (if applicable)
  useEffect(() => {
    if (!userRole || (userRole === "Admin" && !selectedType)) return;
    setLoading(true);
    const roleToFetch = userRole === "Admin" ? selectedType : userRole;
    AdminfetchPartners(roleToFetch, token, setUsers, setLoading, setError);
  }, [userRole, selectedType, token]);

  // Handle balance adjustment
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchhandleAdminBalanceAdjustment(
      userRole,
      selectedUser,
      amount,
      adjustType,
      logintype,
      id,
      token,
      users,
      setTransactionResult,
      setUsers,
      setSelectedUser,
      setAmount,
      setTransactionPassword,
      setComments,
      setError
    );
  };

  return (
    <div className="partner-adjustment-container">
      <h1 className="partner-adjustment-heading">
        {userRole} Balance Adjustment
      </h1>
      {error && <p className="error-message">{error}</p>}
      {transactionResult && (
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
          {transactionResult.success && (
            <>
              <p>Previous Points: {transactionResult.previousPoints}</p>
              <p>
                Points {adjustType === "add" ? "Added" : "Deducted"}:{" "}
                {transactionResult.pointsChanged}
              </p>
              <p>New Points: {transactionResult.newPoints}</p>
            </>
          )}
        </div>
      )}

      <form
        className="partner-adjustment-form"
        style={{ maxWidth: "600px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        {/* Type Dropdown (Only for Admin & Agent) */}
        {userRole !== "SubAgent" && (
          <div className="form-group">
            <label htmlFor="type">Select Type:</label>
            <select
              id="type"
              name="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Select Type</option>
              {typeOptions[userRole]?.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Partner Selection Dropdown */}
        <div className="form-group">
          <label htmlFor="partner">
            Select {userRole === "Admin" ? selectedType : userRole}:
          </label>
          <select
            id="partner"
            name="partner"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="" disabled>
              Select {selectedType || userRole}
            </option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name || user.username} -- {user.chips || 0}
              </option>
            ))}
          </select>
        </div>

        {/* Adjust Type Dropdown */}
        <div className="form-group">
          <label htmlFor="adjust">Adjust Type:</label>
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

        {/* Amount Input */}
        <div className="form-group">
          <label htmlFor="transaction-amount">Amount:</label>
          <input
            type="number"
            id="transaction-amount"
            name="transaction-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Transaction Password */}
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

        {/* Comments */}
        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            name="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mr-5 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => {
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

export default BalanceAdjust;
