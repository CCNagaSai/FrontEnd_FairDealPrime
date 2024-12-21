import React, { useEffect, useState } from "react";
import "./subAgentBalanceAdjust.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SubAgentBalanceAdjust = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [adjustType, setAdjustType] = useState("add"); // Default to 'add'
  const [amount, setAmount] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Retrieve cookies once
  const id = cookies.get("LoginUserId");
  const type = cookies.get("name");
  const token = cookies.get("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id || !type) {
          throw new Error("Missing id or type from cookies");
        }

        // Fetch users on component mount
        const response = await fetch(
          `http://93.127.194.87:9999/admin/user/UserList?Id=${id}&type=Shop`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json(); // Parse the JSON
        setUsers(result.userList || []); // Set the users data
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, type, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !amount) {
      setError("Please fill out all required fields.");
      return;
    }

    const payload = {
      money: amount,
      type: adjustType === "add" ? "Deposit" : "Deduct",
      userId: selectedUser,
      adminname: type,
      adminid: id,
    };

    const apiUrl =
      adjustType === "add"
        ? "http://93.127.194.87:9999/admin/user/addMoney"
        : "http://93.127.194.87:9999/admin/user/deductMoney";

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Transaction successful!");
      // Clear the form
      setSelectedUser("");
      setAmount("");
      setTransactionPassword("");
      setComments("");
      setError("");
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
          <button type="submit" className="btn btn-submit">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-clear"
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

export default SubAgentBalanceAdjust;
