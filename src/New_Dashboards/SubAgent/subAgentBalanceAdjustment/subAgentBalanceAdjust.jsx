import React, { useEffect, useState } from "react";
import "./subAgentBalanceAdjust.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

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
  const logintype = cookies.get("logintype")
  const email = cookies.get("email")

  useEffect(() => {
    const fetchUserData = async () => {

      try {
        setLoading(true);
        setError(null);


        if (!id) {
          throw new Error("Missing id or type from cookies");
        }
        
        console.log("dataaa", id)

        // Fetch users on component mount
        const response = await fetch(
          `http://65.0.54.193:9999/admin/user/UserList?Id=${id}&type=Shop`,
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
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !amount || parseFloat(amount) <= 0) {
      setError("Partner and Amount fields are mandatory. Amount must be positive.");
      return;
    }
  
    const selectedUserDetails = users.find((user) => user._id === selectedUser);
    const previousPoints = selectedUserDetails?.chips || 0;
  
    const payload = {
      money: amount,
      type: adjustType === "add" ? "Deposit" : "Deduct",
      userId: selectedUser,
      adminname: email,
      adminid: id,
    };
  
    const apiUrl =
      adjustType === "add"
        ? "http://65.0.54.193:9999/admin/user/addMoney"
        : "http://65.0.54.193:9999/admin/user/deductMoney";
  
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
      console.log("API Response:", result);
  
      if (result.status === "ok") {
        // const newPoints = result.newPoints;
        const newPoints = result.newPoints || (adjustType === "add"
          ? previousPoints + parseFloat(amount)
          : previousPoints - parseFloat(amount));
  
        setTransactionResult({
          success: true,
          message: `${adjustType === "add" ? "Added" : "Deducted"} ${amount} points to ${selectedUserDetails?.name}`,
          previousPoints: previousPoints,
          pointsChanged: amount,
          newPoints: newPoints,
        });
      } else {
        // If status is not "ok", set the error message from the API
        setTransactionResult({
          success: false,
          message: result.msg || "Transaction failed. Please check your balance.",
        });
      }

        const updatedUserResponse = await fetch(
          `http://65.0.54.193:9999/admin/user/UserList?Id=${id}&type=Shop`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        if (!updatedUserResponse.ok) {
          throw new Error(`Failed to fetch updated user data`);
        }

        const updatedUserData = await updatedUserResponse.json();
        setUsers(updatedUserData.userList || []);
  
        // Update user's points locally
        // setUsers((prevUsers) =>
        //   prevUsers.map((user) =>
        //     user._id === selectedUser
        //       ? { ...user, chips: newPoints }
        //       : user
        //   )
        // );
  
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
      {transactionResult && (
        <div className="transaction-result-wrapper">
          <div
            className={`transaction-result-card ${transactionResult.success ? "success" : "failure"}`}
          >
            <h2>{transactionResult.success ? "Transaction Successful" : "Transaction Failed"}</h2>
            <p>{transactionResult.message}</p>
            {transactionResult.success ? (
              <>
                <p>Previous Points: {transactionResult.previousPoints}</p>
                <p>Points {adjustType === "add" ? "Added" : "Deducted"}: {transactionResult.pointsChanged}</p>
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
            {users
            ?.slice()
            ?.sort((a, b) => (a.name || a.username || "").localeCompare(b.name || b.username || ""))
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
