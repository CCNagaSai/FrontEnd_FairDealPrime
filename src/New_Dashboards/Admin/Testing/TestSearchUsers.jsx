import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { FaRedo, FaUsers } from "react-icons/fa"; // Import icons

const cookies = new Cookies();
const API_URL = import.meta.env.VITE_HOST_URL;

const TestUsersList = ({ onUserClick }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");

  // Store id and type using useRef
  const idRef = useRef(null);
  const typeRef = useRef(null);
  const tokenRef = useRef(null);

  useEffect(() => {
    idRef.current = cookies.get("LoginUserId");
    typeRef.current = cookies.get("name");
    tokenRef.current = cookies.get("token");

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = tokenRef.current;

        if (!idRef.current || !typeRef.current) {
          throw new Error("Missing id or type from cookies");
        }

        const response = await fetch(
          `${API_URL}/admin/user/UserList?Id=${idRef.current}&type=Admin`,
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

        const result = await response.json();
        setData(result.userList || []);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleReset = () => {
    setSelectedUser(""); // Clear selection
  };

  if (loading) return <div className="text-gray-700 text-sm">Loading...</div>;
  if (error) return <div className="text-red-500 text-sm">{error}</div>;

  return (
    <div className="max-w-md w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white ">
      <h1 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
        <FaUsers className="text-blue-500" /> Select a User
      </h1>

      {/* User Dropdown */}
      <div className="relative">
        <label className="block text-md font-medium text-gray-700 mb-2">
          User List:
        </label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring focus:ring-blue-300 text-gray-700 text-lg"
        >
          <option value="">-- Select --</option>
          {data.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-5">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 text-md rounded-lg hover:bg-gray-700 transition"
        >
          <FaRedo /> Reset
        </button>
        <button
          type="button"
          onClick={() => alert(`Selected: ${selectedUser || "None"}`)}
          className="bg-blue-600 text-white px-5 py-2 text-md rounded-lg hover:bg-blue-700 transition"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default TestUsersList;
