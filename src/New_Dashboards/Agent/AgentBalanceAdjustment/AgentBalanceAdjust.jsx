import React, { useEffect, useState } from "react";
import "./AgentBalanceAdjust.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const AgentBalanceAdjust = ({ prefilledType, prefilledUser }) => {
  const [type, setType] = useState(prefilledType || "");
  const [selectedUser, setSelectedUser] = useState(prefilledUser || "");
  const [users, setUsers] = useState([]);
  // const [type, setType] = useState(""); // New field for Type (User/Sub Agent)
  // const [selectedUser, setSelectedUser] = useState("");
  const [adjustType, setAdjustType] = useState("add"); // Default to 'add'
  const [amount, setAmount] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const id = cookies.get("LoginUserId");
  const token = cookies.get("token");
  const logintype = cookies.get("logintype")
  const email = cookies.get("email")

  // Fetch users or subagents based on selected type
  useEffect(() => {
    const fetchPartners = async () => {
      if (!type) {
        setUsers([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const url =
          type === "User"
            ? `http://93.127.194.87:9999/admin/user/agent/UserList?Id=${id}&type=${logintype}`
            : `http://93.127.194.87:9999/admin/shop/ShopList?agentId=${id}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setUsers(result.userList || result.shopList || []);
      } catch (err) {
        console.error("Error fetching partners:", err.message);
        setError("Failed to load partners. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, [type, id, token, logintype]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!type || !selectedUser || !amount || parseFloat(amount) <= 0) {
      setError("Type, Partner, and Amount fields are mandatory. Amount must be positive.");
      return;
    }

    const payload = {
      money: amount,
      type: adjustType === "add" ? "Deposit" : "Deduct",
      userId: selectedUser,
      adminname: email,
      adminid: id,
    };

    const apiUrl =
      type === "User"
        ? adjustType === "add"
          ? "http://93.127.194.87:9999/admin/agent/addMoneyToUser"
          : "http://93.127.194.87:9999/admin/agent/deductMoneyToUser"
        : adjustType === "add"
        ? "http://93.127.194.87:9999/admin/shop/shopAddMoney"
        : "http://93.127.194.87:9999/admin/shop/shopDeductMoney";

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      // Check API response for success or failure
      if (result.status === "ok") {
        alert(result.msg || "Transaction successful!");
        // Clear the form
        setType("");
        setSelectedUser("");
        setAmount("");
        setTransactionPassword("");
        setComments("");
        setError("");
      } else {
        alert(result.msg || "Transaction failed. Please check your balance.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="partner-adjustment-container">
      <h1 className="partner-adjustment-heading">Partner Adjustment</h1>
      {error && <p className="error-message">{error}</p>}
      <form
        className="partner-adjustment-form"
        style={{ maxWidth: "600px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="User">User</option>
            <option value="Sub Agent">Sub Agent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="partner">Partner:</label>
          <select
            id="partner"
            name="partner"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="" disabled>
              Select Partner
            </option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name || user.username}
              </option>
            ))}
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
            type="number"
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
          <button type="submit" className="btn btn-submit">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-clear"
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

export default AgentBalanceAdjust;
