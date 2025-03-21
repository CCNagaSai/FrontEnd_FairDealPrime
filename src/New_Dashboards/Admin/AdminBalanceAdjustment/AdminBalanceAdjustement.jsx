import React, { useEffect, useState } from "react";
import "./AdminBalanceAdjust.css";
import Cookies from "universal-cookie";
import {
  AdminfetchPartners,
  fetchhandleAdminBalanceAdjustment,
} from "../../Common/OfferState/DashboardOfferState";
const API_URL = import.meta.env.VITE_HOST_URL;
const cookies = new Cookies();

const AdminBalanceAdjust = ({ prefilledType, prefilledUser }) => {
  // const [type, setType] = useState(prefilledType || "");
  // const [selectedUser, setSelectedUser] = useState(prefilledUser || "");
  const [users, setUsers] = useState([]);
  const [type, setType] = useState(""); // New field for Type (User/Sub Agent)
  const [selectedUser, setSelectedUser] = useState("");
  const [adjustType, setAdjustType] = useState("add"); // Default to 'add'
  const [amount, setAmount] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);

  const id = cookies.get("LoginUserId");
  const token = cookies.get("token");
  // const logintype = cookies.get("logintype");
  const logintype = cookies.get("name");
  const email = cookies.get("email");

  console.log("id: ", id);
  console.log("token: ", token);
  console.log("logintype: ", logintype);
  console.log("email: ", email);

  // // Fetch users, Agents or subagents based on selected type
  // useEffect(() => {
  //   const fetchPartners = async () => {
  //     if (!type) {
  //       setUsers([]);
  //       return;
  //     }

  //     try {
  //       setLoading(true);
  //       setError(null);

  //       const url =
  //         type === "User"
  //           ? `${API_URL}/admin/user/UserList?Id=id&type=Admin`
  //           : type === "Shop"
  //           ? `${API_URL}/admin/shop/ShopList?agentId=Admin`
  //           : type === "Agent"
  //           ? `${API_URL}/admin/agent/AgentList`
  //           : null;

  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           token: token,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const result = await response.json();
  //       setUsers(result.userList || result.shopList || result.agentList || []);
  //     } catch (err) {
  //       console.error("Error fetching partners:", err.message);
  //       setError("Failed to load partners. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPartners();
  // }, [type, id, token, logintype]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Basic validation
  //   if (!type || !selectedUser || !amount || parseFloat(amount) <= 0) {
  //     setError(
  //       "Type, Partner, and Amount fields are mandatory. Amount must be positive."
  //     );
  //     return;
  //   }

  //   const selectedUserDetails = users.find((user) => user._id === selectedUser);
  //   const previousPoints = selectedUserDetails?.chips || 0;

  //   const payload = {
  //     money: amount,
  //     type: adjustType === "add" ? "Deposit" : "Deduct",
  //     userId: selectedUser,
  //     adminname: logintype,
  //     adminid: id,
  //   };

  //   const apiUrl =
  //     type === "Agent"
  //       ? adjustType === "add"
  //         ? `${API_URL}/admin/agent/agentAddMoney`
  //         : `${API_URL}/admin/agent/agentDeductMoney`
  //       : type === "Shop"
  //       ? adjustType === "add"
  //         ? `${API_URL}/admin/shop/shopAddMoney`
  //         : `${API_URL}/admin/shop/shopDeductMoney`
  //       : type === "User"
  //       ? adjustType === "add"
  //         ? `${API_URL}/admin/user/addMoney`
  //         : `${API_URL}/admin/user/deductMoney`
  //       : null;

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         token: token,
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const result = await response.json();

  //     // Check API response for success or failure
  //     if (result.status === "ok") {
  //       const newPoints =
  //         result.newPoints ||
  //         (adjustType === "add"
  //           ? previousPoints + parseFloat(amount)
  //           : previousPoints - parseFloat(amount));

  //       setTransactionResult({
  //         success: true,
  //         message: `${
  //           adjustType === "add" ? "Added" : "Deducted"
  //         } ${amount} points to ${selectedUserDetails?.name}`,
  //         previousPoints: previousPoints,
  //         pointsChanged: amount,
  //         newPoints: newPoints,
  //       });
  //     } else {
  //       // If status is not "ok", set the error message from the API
  //       setTransactionResult({
  //         success: false,
  //         message:
  //           result.msg || "Transaction failed. Please check your balance.",
  //       });
  //     }

  //     const updatedUserResponse = await fetch(
  //       `${API_URL}/admin/user/UserList?Id=${id}&type=Shop`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           token: token,
  //         },
  //       }
  //     );

  //     if (!updatedUserResponse.ok) {
  //       throw new Error(`Failed to fetch updated user data`);
  //     }

  //     const updatedUserData = await updatedUserResponse.json();
  //     setUsers(updatedUserData.userList || []);

  //     // Clear the form
  //     setType("");
  //     setSelectedUser("");
  //     setAmount("");
  //     setTransactionPassword("");
  //     setComments("");
  //     setError("");
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     setError("Transaction failed. Please try again.");
  //   }
  // };

  // Fetch users, Agents or subagents based on selected type
  useEffect(() => {
    console.log("Fetching partners for type:", type);
    AdminfetchPartners(type, token, setUsers, setLoading, setError);
  }, [type, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchhandleAdminBalanceAdjustment(
      type,
      selectedUser,
      amount,
      adjustType,
      logintype,
      id,
      token,
      users,
      setTransactionResult,
      setUsers,
      setType,
      setSelectedUser,
      setAmount,
      setTransactionPassword,
      setComments,
      setError
    );
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
            <option value="Agent">Agent</option>
            <option value="Shop">Sub Agent</option>
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
            {users
              ?.slice()
              ?.sort((a, b) =>
                (a.name || a.username || "").localeCompare(
                  b.name || b.username || ""
                )
              )
              ?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name || user.username} --{user.chips || 0}
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

        <div>
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

export default AdminBalanceAdjust;
