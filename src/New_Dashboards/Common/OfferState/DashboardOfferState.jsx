import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = import.meta.env.VITE_HOST_URL;

// ************ SUB AGENTS API ****************
const SubAgentPointsFileApi = async (
  setBackendData,
  setFilteredData,
  setLoading,
  id,
  type,
  token
) => {
  try {
    setLoading(true);

    if (!id || !type) {
      console.error("ID or type not found in cookies.");
      return;
    }

    console.log("Fetching with:", { id, type, token });

    // /admin/usertransction/AgentTranscationData?Id=${id}&type=${type}
    const response = await fetch(
      `${API_URL}/admin/usertransction/SubAgentTranscationData?Id=${id}&type=${type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    if (!response.ok) {
      console.error("API Error:", response.statusText);
      return;
    }

    const result = await response.json();

    if (result.DepositeList) {
      setBackendData(result.DepositeList);
      setFilteredData(result.DepositeList); // Initialize filtered data
    } else {
      console.error("No data found in the response.");
    }
  } catch (error) {
    console.error("Error fetching backend data:", error);
  } finally {
    setLoading(false); // Ensure loading is reset
  }
};

const fetchSubAgentTurnover = async (
  setBackendData,
  setFilteredData,
  setIsLoading,
  id,
  token,
  filters
) => {
  if (!id || !token) return;
  setIsLoading(true);

  try {
    let url = `${API_URL}/admin/agent/turnover?subAgentId=${id}`;

    // Add filters dynamically
    if (filters.userId) {
      url += `&username=${encodeURIComponent(filters.userId)}`;
    }
    if (filters.startDate && filters.endDate) {
      let startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);

      startDate.setDate(startDate.getDate() - 1);

      startDate.setUTCHours(18, 30, 0, 0);
      endDate.setUTCHours(18, 29, 59, 999);

      url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }

    console.log("Fetching Data from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Data:", data);

      if (data && Array.isArray(data.turnOverData)) {
        const flattenedHistory = data.turnOverData.flatMap(
          (entry) => entry || []
        );
        flattenedHistory.sort(
          (a, b) => new Date(b.lastPlayedDate) - new Date(a.lastPlayedDate)
        );

        setBackendData(flattenedHistory);
        setFilteredData(flattenedHistory);
      } else {
        console.error("Expected an array from the backend API:", data);
      }
    } else {
      console.error("Failed to fetch backend data");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setIsLoading(false);
  }
};

const LoadUserData = async (id, token) => {
  if (!id) throw new Error("Missing id from cookies");

  try {
    const response = await fetch(
      `${API_URL}/admin/user/UserList?Id=${id}&type=Shop`,
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
    console.log("Raw API Response:", result); // Debugging log
    return result.userList || result.users || [];
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    throw new Error("Failed to load user data. Please try again.");
  }
};

const handleBalanceAdjustment = async (
  adjustType,
  selectedUser,
  amount,
  email,
  id,
  token,
  users
) => {
  if (!selectedUser || !amount || parseFloat(amount) <= 0) {
    return {
      success: false,
      message:
        "Partner and Amount fields are mandatory. Amount must be positive.",
    };
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
      ? `${API_URL}/admin/user/addMoney`
      : `${API_URL}/admin/user/deductMoney`;

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
    if (result.status === "ok") {
      const newPoints =
        result.newPoints ||
        (adjustType === "add"
          ? previousPoints + parseFloat(amount)
          : previousPoints - parseFloat(amount));

      const updatedUsers = await LoadUserData(id, token);

      return {
        success: true,
        message: `${
          adjustType === "add" ? "Added" : "Deducted"
        } ${amount} points to ${selectedUserDetails?.name}`,
        previousPoints,
        pointsChanged: amount,
        newPoints,
        updatedUsers,
      };
    } else {
      return {
        success: false,
        message: result.msg || "Transaction failed. Please check your balance.",
      };
    }
  } catch (error) {
    console.error("Error submitting transaction:", error);
    return { success: false, message: "Transaction failed. Please try again." };
  }
};

const fetchSubAgentUserList = async (token, id, type) => {
  try {
    if (!token || !id || !type) {
      throw new Error("Missing token, id, or type");
    }

    const response = await fetch(
      `${API_URL}/admin/user/UserList?Id=${id}&type=${type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token, // Send token from cookies
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API Response:", result); // Debugging output
    return result.users || [];
  } catch (err) {
    console.error("Error fetching user list:", err.message);
    throw err;
  }
};

// ************ AGENTS API ****************
const AgentPointsFileApi = async (
  setBackendData,
  setFilteredData,
  setLoading,
  id,
  type,
  token
) => {
  try {
    setLoading(true);

    if (!id || !type) {
      console.error("ID or type not found in cookies.");
      return;
    }

    console.log("Fetching with:", { id, type, token });

    const response = await fetch(
      `${API_URL}/admin/usertransction/AgentTranscationData?Id=${id}&type=${type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    if (!response.ok) {
      console.error("API Error:", response.statusText);
      return;
    }

    const result = await response.json();

    if (result.DepositeList) {
      setBackendData(result.DepositeList);
      setFilteredData(result.DepositeList); // Initialize filtered data
    } else {
      console.error("No data found in the response.");
    }
  } catch (error) {
    console.error("Error fetching backend data:", error);
  } finally {
    setLoading(false); // Ensure loading is reset
  }
};

const fetchAgentTurnover = async (
  id,
  token,
  filters,
  setBackendData,
  setFilteredData,
  setIsLoading
) => {
  if (!id || !token) return;
  setIsLoading(true);

  try {
    let url = `${API_URL}/admin/agent/turnover?agentId=${id}`;

    // Add filters dynamically
    if (filters.userId) {
      url += `&username=${encodeURIComponent(filters.userId)}`;
    }
    if (filters.startDate && filters.endDate) {
      let startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);

      startDate.setDate(startDate.getDate() - 1);

      startDate.setUTCHours(18, 30, 0, 0);
      endDate.setUTCHours(18, 29, 59, 999);

      url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }

    console.log("Fetching Data from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Data:", data);

      if (data && Array.isArray(data.turnOverData)) {
        const flattenedHistory = data.turnOverData.flatMap(
          (entry) => entry.subAgentData || []
        );

        setBackendData(flattenedHistory);
        setFilteredData(flattenedHistory);
      } else {
        console.error("Expected an array from the backend API:", data);
      }
    } else {
      console.error("Failed to fetch backend data");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setIsLoading(false); // Stop loading
  }
};

const fetchPartners = async (
  type,
  id,
  logintype,
  token,
  setUsers,
  setLoading,
  setError
) => {
  if (!type) {
    setUsers([]);
    return;
  }

  try {
    setLoading(true);
    setError(null);

    const url =
      type === "User"
        ? `${API_URL}/admin/user/agent/UserList?Id=${id}&type=${logintype}`
        : `${API_URL}/admin/shop/ShopList?agentId=${id}`;

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

const fetchhandleBalanceAdjustment = async (
  type,
  selectedUser,
  amount,
  adjustType,
  email,
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
) => {
  if (!type || !selectedUser || !amount || parseFloat(amount) <= 0) {
    setError(
      "Type, Partner, and Amount fields are mandatory. Amount must be positive."
    );
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
    type === "User"
      ? adjustType === "add"
        ? `${API_URL}/admin/agent/addMoneyToUser`
        : `${API_URL}/admin/agent/deductMoneyToUser`
      : adjustType === "add"
      ? `${API_URL}/admin/shop/shopAddMoney`
      : `${API_URL}/admin/shop/shopDeductMoney`;

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

    if (result.status === "ok") {
      const newPoints =
        result.newPoints ||
        (adjustType === "add"
          ? previousPoints + parseFloat(amount)
          : previousPoints - parseFloat(amount));

      setTransactionResult({
        success: true,
        message: `${
          adjustType === "add" ? "Added" : "Deducted"
        } ${amount} points to ${selectedUserDetails?.name}`,
        previousPoints: previousPoints,
        pointsChanged: amount,
        newPoints: newPoints,
      });
    } else {
      setTransactionResult({
        success: false,
        message: result.msg || "Transaction failed. Please check your balance.",
      });
    }

    const updatedUserResponse = await fetch(
      `${API_URL}/admin/user/UserList?Id=${id}&type=Shop`,
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

    // Clear the form
    setType("");
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

const fetchAgentUsers = async (
  id,
  token,
  logintype,
  filters,
  currentPage = 1,
  itemsPerPage = 10
) => {
  if (!id || !token) return { users: [], totalPages: 1 };

  try {
    let url = `${API_URL}/admin/user/agent/UserList?Id=${id}&type=Agent`;

    if (filters?._id) {
      url += `&username=${encodeURIComponent(filters._id)}`;
    }
    if (filters?.startDate && filters?.endDate) {
      let startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);

      startDate.setDate(startDate.getDate() - 1);
      startDate.setUTCHours(18, 30, 0, 0);
      endDate.setUTCHours(18, 29, 59, 999);

      url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }

    console.log("Fetching Data from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch user data");

    const data = await response.json();
    console.log("User Data:", data);

    if (data && Array.isArray(data.userList)) {
      const sortedUsers = data.userList.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return { users: sortedUsers, totalPages: data.totalPages || 1 };
    } else {
      console.error("Unexpected API response format:", data);
      return { users: [], totalPages: 1 };
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], totalPages: 1 };
  }
};

const fetchAgentSubAgentList = async (token, id) => {
  try {
    if (!token || !id) {
      throw new Error("Missing token or id");
    }

    const response = await fetch(
      `${API_URL}/admin/shop/ShopList?agentId=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token, // Pass token
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result.shopList || [];
  } catch (err) {
    console.error("Error fetching shop list:", err.message);
    throw err; // Propagate error
  }
};

// ************ Admin API ****************
const AdminPointsFileApi = async (
  setBackendData,
  setLoading,
  idRef,
  typeRef,
  tokenRef
) => {
  try {
    setLoading(true);
    console.log("Attempting to fetch backend data...");

    const id = idRef.current;
    const type = typeRef.current;
    const token = tokenRef.current;

    if (!id || !type) {
      console.error("ID or type not found in cookies.");
      return;
    }

    console.log("Fetching with:", { id, type, token });

    const response = await fetch(
      `${API_URL}/admin/usertransction/AdminTranscationData`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    if (!response.ok) {
      console.error("API Error:", response.statusText);
      return;
    }

    const result = await response.json();
    console.log("Backend Data:", result);

    if (result.DepositeList) {
      setBackendData(result.DepositeList);
    } else {
      console.error("No data found in the response.");
    }
  } catch (error) {
    console.error("Error fetching backend data:", error);
  } finally {
    setLoading(false);
  }
};

// ***************** Admin Balance Adjustement *********************
const AdminfetchPartners = async (
  type,
  token,
  setUsers,
  setLoading,
  setError
) => {
  if (!type) {
    setUsers([]);
    return;
  }

  try {
    setLoading(true);
    setError(null);

    const url =
      type === "User"
        ? `${API_URL}/admin/user/UserList?Id=id&type=Admin&page=1&limit=500`
        : type === "Shop"
        ? `${API_URL}/admin/shop/ShopList?agentId=Admin`
        : type === "Agent"
        ? `${API_URL}/admin/agent/AgentList`
        : null;

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
    console.log("Api Response : ", result);
    setUsers(result.users || result.shopList || result.agentList || []);
  } catch (err) {
    console.error("Error fetching partners:", err.message);
    setError("Failed to load partners. Please try again.");
  } finally {
    setLoading(false);
  }
};

const fetchhandleAdminBalanceAdjustment = async (
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
) => {
  if (!type || !selectedUser || !amount || parseFloat(amount) <= 0) {
    setError(
      "Type, Partner, and Amount fields are mandatory. Amount must be positive."
    );
    return;
  }

  const selectedUserDetails = users.find((user) => user._id === selectedUser);
  const previousPoints = selectedUserDetails?.chips || 0;

  const payload = {
    money: amount,
    type: adjustType === "add" ? "Deposit" : "Deduct",
    userId: selectedUser,
    adminname: logintype,
    adminid: id,
  };
  // http://93.127.194.87:9999/admin/shop/shopAddMoney
  const apiUrl =
    type === "Agent"
      ? adjustType === "add"
        ? `${API_URL}/admin/agent/agentAddMoney`
        : `${API_URL}/admin/agent/agentDeductMoney`
      : type === "Shop"
      ? adjustType === "add"
        ? `${API_URL}/admin/shop/shopAddMoney`
        : `${API_URL}/admin/shop/shopDeductMoney`
      : type === "User"
      ? adjustType === "add"
        ? `${API_URL}/admin/user/addMoney`
        : `${API_URL}/admin/user/deductMoney`
      : null;

  try {
    console.log("Sending request to:", apiUrl);
    console.log("Payload:", payload);

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(payload),
    });

    console.log("API Request:", { apiUrl, payload, token });

    const result = await response.json();
    console.log("API Response:", result); // 🔍 Check what comes back
    console.log("API Response Status:", response.status);

    // Check API response for success or failure
    if (result.status === "ok") {
      const newPoints =
        result.newPoints ||
        (adjustType === "add"
          ? previousPoints + parseFloat(amount)
          : previousPoints - parseFloat(amount));

      setTransactionResult({
        success: true,
        message: `${
          adjustType === "add" ? "Added" : "Deducted"
        } ${amount} points to ${selectedUserDetails?.name}`,
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
      `${API_URL}/admin/user/UserList?Id=${id}&type=Shop`,
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
    setUsers(
      updatedUserData.users ||
        updatedUserData.shopList ||
        updatedUserData.agentList ||
        []
    );

    // Clear the form
    setType("");
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

// ************ Change Admin Search Users API for Admin  ****************
const fetchAdminUsers = async (
  id,
  token,
  filters,
  currentPage = 1,
  itemsPerPage = 10
) => {
  if (!id || !token) return { users: [], totalPages: 1 };

  try {
    let url = `${API_URL}/admin/user/UserList?Id=${id}&type=Admin&page=${currentPage}&limit=${itemsPerPage}`;

    if (filters?._id) {
      url += `&username=${encodeURIComponent(filters._id)}`;
    }
    if (filters?.startDate && filters?.endDate) {
      let startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);

      startDate.setDate(startDate.getDate() - 1);
      startDate.setUTCHours(18, 30, 0, 0);
      endDate.setUTCHours(18, 29, 59, 999);

      url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }

    console.log("Fetching Data from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!response.ok) {
      console.error("API request failed with status:", response.status);
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    console.log("API Response:", JSON.stringify(data, null, 2));

    // ✅ Handle different response formats
    const userList = data.userList || data.users || [];

    if (Array.isArray(userList)) {
      return {
        users: userList.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
        totalPages: data.totalPages || 1,
      };
    } else {
      console.error("Unexpected API response format:", data);
      return { users: [], totalPages: 1 };
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], totalPages: 1 };
  }
};

const fetchAdminAgentList = async (token) => {
  if (!token) {
    console.error("Token is missing");
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/admin/agent/AgentList`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token, // Pass token in headers
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Fetched Data:", result);
    console.log("Agent List:", result.agentList);

    return result.agentList || [];
  } catch (err) {
    console.error("Error fetching agent data:", err.message);
    return [];
  }
};

const fetchAdminSubAgents = async (
  id,
  token,
  filters,
  currentPage = 1,
  itemsPerPage = 10
) => {
  if (!id || !token) return { users: [], totalPages: 1 };

  try {
    let url = `${API_URL}/admin/shop/ShopList?agentId=Admin&page=${currentPage}&limit=${itemsPerPage}`;

    if (filters?._id) {
      url += `&username=${encodeURIComponent(filters._id)}`;
    }
    if (filters?.startDate && filters?.endDate) {
      let startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);

      startDate.setDate(startDate.getDate() - 1);
      startDate.setUTCHours(18, 30, 0, 0);
      endDate.setUTCHours(18, 29, 59, 999);

      url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }

    console.log("Fetching Data from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch user data");

    const data = await response.json();
    console.log("User Data:", data);

    if (data && Array.isArray(data.shopList)) {
      const sortedUsers = data.shopList.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return { users: sortedUsers, totalPages: data.totalPages || 1 };
    } else {
      console.error("Unexpected API response format:", data);
      return { users: [], totalPages: 1 };
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], totalPages: 1 };
  }
};

// ************ Change Search users for Admin , Agent and Sub-Agent ****************
const fetchUserData = async ({
  userRole,
  id,
  type,
  token,
  filters = {},
  currentPage = 1,
  itemsPerPage = 10,
}) => {
  if (!id || !token || !userRole) {
    console.error("Missing required parameters: id, token, or userRole.");
    return { users: [], totalPages: 1 };
  }

  const API_URL = import.meta.env.VITE_HOST_URL;

  const getApiUrl = () => {
    switch (userRole) {
      case "Admin":
        return `${API_URL}/admin/user/UserList?Id=${id}&type=Admin&page=${currentPage}&limit=${itemsPerPage}`;
      case "Agent":
        return `${API_URL}/admin/agent/AgentList?page=${currentPage}&limit=${itemsPerPage}`;
      case "SubAgent":
        return `${API_URL}/admin/shop/ShopList?agentId=Admin&page=${currentPage}&limit=${itemsPerPage}`;
      case "AgentUsers":
        return `${API_URL}/admin/user/agent/UserList?Id=${id}&type=Agent&page=${currentPage}&limit=${itemsPerPage}`;
      case "AgentSearchSubAgent":
        return `${API_URL}/admin/shop/ShopList?agentId=${id}&page=${currentPage}&limit=${itemsPerPage}`;
      case "SubAgentUsers":
        return `${API_URL}/admin/user/UserList?Id=${id}&type=${type}&page=${currentPage}&limit=${itemsPerPage}`;
      default:
        return `${API_URL}/users?page=${currentPage}&limit=${itemsPerPage}`;
    }
  };

  try {
    let url = getApiUrl();

    // ✅ Apply Filters
    if (filters?._id) {
      url += `&username=${encodeURIComponent(filters._id)}`;
    }
    if (filters?.startDate && filters?.endDate) {
      let startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);

      startDate.setDate(startDate.getDate() - 1);
      startDate.setUTCHours(18, 30, 0, 0);
      endDate.setUTCHours(18, 29, 59, 999);

      url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }

    console.log(`Fetching page ${currentPage} from URL:`, url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!response.ok) {
      console.error("API request failed with status:", response.status);
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    console.log("API Response:", JSON.stringify(data, null, 2));

    // ✅ Map correct response key based on user role
    const responseKey =
      {
        Admin: "users",
        Agent: "agentList",
        SubAgent: "shopList",
        AgentUsers: "userList",
        AgentSearchSubAgent: "shopList",
        SubAgentUsers: "userList",
      }[userRole] || "users";

    const userList = data[responseKey] || data.users || [];
    const totalPages =
      data.totalPages ||
      Math.ceil((data.totalCount || userList.length) / itemsPerPage) ||
      1;

    return {
      users: Array.isArray(userList)
        ? userList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [],
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { users: [], totalPages: 1 };
  }
};

// ************ Change Password API for Admin , Agent and Sub-Agent ****************
const changeUserPassword = async (
  oldPassword,
  newPassword,
  userId,
  token,
  userRole
) => {
  if (!oldPassword || !newPassword || !userId || !token) {
    console.error("Missing required parameters for changing password.");
    return { success: false, message: "Invalid input" };
  }

  // Determine the API endpoint based on userRole
  let apiEndpoint = "";
  switch (userRole) {
    // case "admin":
    //   apiEndpoint = "/admin/change-password";
    //   break;
    case "Agent":
      apiEndpoint = "/admin/agent/agentChangePassword";
      break;
    case "Sub-Agent":
      apiEndpoint = "/admin/shop/subagentChangePassword";
      break;
    default:
      console.error("Invalid user role:", userRole);
      return { success: false, message: "Invalid user role" };
  }

  try {
    const response = await fetch(`${API_URL}${apiEndpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ oldPassword, newPassword, userId }),
    });

    const data = await response.json();

    if (data.success) {
      console.log(`${userRole} password changed successfully.`);
      return { success: true, message: "Password changed successfully" };
    } else {
      console.error("Error changing password:", data.message);
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return { success: false, message: "Error changing password" };
  }
};

// ************ Change Dashboard API for Admin(Active Players), Agent and Sub-Agent ****************
const fetchDashboardData = async (userRole, token, id) => {
  if (!userRole || !token || !id) {
    console.error("Missing required parameters for fetching dashboard data.");
    return { success: false, message: "Invalid input", data: null };
  }

  // // Define the API endpoint dynamically based on userRole
  // let apiEndpoint = "";
  // switch (userRole) {
  //   case "Active Players":
  //     apiEndpoint = "/admin/agent/dashboradData";
  //     break;
  //   case "Agent":
  //     apiEndpoint = "/admin/agent/dashboradData?agentId=${id}";
  //     break;
  //   case "Sub-Agent":
  //     apiEndpoint = "/admin/agent/dashboradData";
  //     break;
  //   default:
  //     console.error("Invalid user role:", userRole);
  //     return { success: false, message: "Invalid user role", data: null };
  // }

  try {
    let endpoint = "";
    if (userRole === "Agent") {
      endpoint = `/admin/agent/dashboradData?agentId=${id}`;
    } else if (userRole === "Sub-Agent") {
      endpoint = `/admin/agent/dashboradData?agentId=${id}`;
    } else if (userRole === "Admin") {
      endpoint = `/admin/agent/dashboradData?adminId=${id}`;
    } else {
      console.error("Invalid user role:", userRole);
      return;
    }
    console.log("Fetching dashboard data...");

    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    console.log("API response status:", response.status);

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return { success: false, message: "Failed to fetch data", data: null };
    }

    const data = await response.json();
    console.log("API Full Response:", data);
    console.log(
      "Inactive Users Data:",
      data.inactiveUsers?.inActivePlayersDetails
    );
    console.log(
      "Inactive Users Count:",
      data.inactiveUsers?.totalInactiveCount
    );

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return { success: false, message: "Error fetching data", data: null };
  }
};

// ************ Change Game History API for Admin, Agent and Sub-Agent ****************
const fetchRouletteGameHistory = async (
  userRole,
  token,
  id,
  filters,
  currentPage,
  itemsPerPage
) => {
  if (!userRole || !token || !id) {
    console.error("Missing required parameters for fetching game history.");
    return { success: false, message: "Invalid input", data: null };
  }

  let dynamicApiEndpoint;

  if (userRole === "Admin") {
    dynamicApiEndpoint = `/admin/userhistory/RouletteGameHistory/?page=${currentPage}&limit=${itemsPerPage}`;
  } else if (userRole === "Agent") {
    dynamicApiEndpoint = `/admin/agent/RouletteGameHistory?agentId=${id}&page=${currentPage}&limit=${itemsPerPage}`;
  } else if (userRole === "Sub-Agent") {
    dynamicApiEndpoint = `/admin/agent/RouletteGameHistory?subAgentId=${id}&page=${currentPage}&limit=${itemsPerPage}`;
  } else {
    console.error("Invalid user role:", userRole);
    return { success: false, message: "Invalid user role", data: null };
  }

  try {
    let url = `${API_URL}${dynamicApiEndpoint}`;

    // Apply filters if available
    if (filters?.userId) {
      url += `&username=${encodeURIComponent(filters.userId)}`;
    }
    if (filters?.startDate && filters?.endDate) {
      let startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);

      startDate.setDate(startDate.getDate() - 1);
      startDate.setUTCHours(18, 30, 0, 0);
      endDate.setUTCHours(18, 29, 59, 999);

      url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }

    console.log("Fetching Roulette Game History from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch backend data");
      return { success: false, message: "Failed to fetch data", data: null };
    }

    const data = await response.json();
    console.log("Fetched Game History Data:", data);

    // Determine the correct key dynamically
    const historyKey = userRole === "Admin" ? "gameHistoryData" : "historyData";

    if (data && Array.isArray(data[historyKey])) {
      const flattenedHistory = data[historyKey].flatMap((entry) => entry || []);
      flattenedHistory.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return {
        success: true,
        data: flattenedHistory,
        totalPages: data.totalPages || 1,
      };
    } else {
      console.error("Expected an array from the backend API:", data);
      return { success: false, message: "Unexpected data format", data: null };
    }
  } catch (error) {
    console.error("Error fetching game history:", error);
    return { success: false, message: "Error fetching data", data: null };
  }
};

// ************ Change Kickoff Users API for Admin, Agent and Sub-Agent ****************
const kickoffUserDashboardData = async (
  id,
  token,
  userRole,
  setDashboardData
) => {
  try {
    if (!id || !token || !userRole) {
      console.error("Invalid parameters for kickoffUserDashboardData:", {
        id,
        token,
        userRole,
      });
      return;
    }

    let endpoint = "";
    if (userRole === "Agent") {
      endpoint = `/admin/agent/dashboradData?agentId=${id}`;
    } else if (userRole === "Sub-Agent") {
      endpoint = `/admin/agent/dashboradData?agentId=${id}`;
    } else if (userRole === "Admin") {
      endpoint = `/admin/agent/dashboradData?adminId=${id}`;
    } else {
      console.error("Invalid user role:", userRole);
      return;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json", token },
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const result = await response.json();

    setDashboardData({
      activeUsers: result.activeUsers?.totalActiveCount || 0,
      activePlayersDetails: result.activeUsers?.activePlayersDetails || [],
    });
  } catch (err) {
    console.error("Dashboard API Error:", err.message);
  }
};

const kickofffetchUserData = async (
  id,
  type,
  token,
  userRole,
  setData,
  setOriginalData,
  setError,
  setLoading
) => {
  try {
    if (!id || !type || !token || !userRole) {
      console.error("Invalid parameters for kickofffetchUserData:", {
        id,
        type,
        token,
        userRole,
      });
      return;
    }

    let endpoint = "";
    if (userRole === "Agent") {
      endpoint = `/admin/user/agent/UserList?Id=${id}&type=${type}`;
    } else if (userRole === "Sub-Agent") {
      endpoint = `/admin/user/agent/UserList?Id=${id}&type=${type}`;
    } else if (userRole === "Admin") {
      endpoint = `/admin/user/agent/UserList?Id=${id}&type=${type}`;
    } else {
      console.error("Invalid user role:", userRole);
      return;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json", token },
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const result = await response.json();

    setData(result.userList || []);
    setOriginalData(result.userList || []);
  } catch (err) {
    console.error("User List API Error:", err.message);
    if (setError) setError("Failed to load user data.");
  } finally {
    if (setLoading) setLoading(false);
  }
};

// ************ Change Point File API for Admin, Agent and Sub-Agent ****************
const PointsFileApi = async (
  setBackendData,
  setLoading,
  idRef,
  typeRef,
  tokenRef,
  userRole // Add userRole as a parameter
) => {
  try {
    setLoading(true);
    console.log("Attempting to fetch backend data...");

    const id = idRef.current;
    const type = typeRef.current;
    const token = tokenRef.current;

    if (!id || !type) {
      console.error("ID or type not found in references.");
      return;
    }

    console.log("Fetching with:", { id, type, token, userRole });

    // Define the dynamic API endpoint based on userRole
    let endpoint = `${API_URL}/admin/usertransction/AdminTranscationData`;

    if (userRole === "Agent") {
      endpoint = `${API_URL}/admin/usertransction/AgentTranscationData?Id=${id}&type=${type}`;
    } else if (userRole === "Sub-Agent") {
      endpoint = `${API_URL}/admin/usertransction/SubAgentTranscationData?Id=${id}&type=${type}`;
    }

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!response.ok) {
      console.error("API Error:", response.statusText);
      return;
    }

    const result = await response.json();
    console.log("Backend Data:", result);

    if (result.DepositeList) {
      setBackendData(result.DepositeList);
    } else {
      console.error("No data found in the response.");
    }
  } catch (error) {
    console.error("Error fetching backend data:", error);
  } finally {
    setLoading(false);
  }
};

// ************ Change View users API for Admin, Agent and Sub-Agent ****************
const handlePasswordUpdate = async (userId, newPassword, token, userRole) => {
  try {
    let endpoint = "";
    if (userRole === "Agent") {
      endpoint = `/admin/user/agent/UserList?Id=${id}&type=${type}`;
    } else if (userRole === "SubAgent") {
      endpoint = `/admin/user/UpdatePassword`;
    } else if (userRole === "Admin") {
      endpoint = `/admin/user/agent/UserList?Id=${id}&type=${type}`;
    } else {
      console.error("Invalid user role:", userRole);
      return;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        userId,
        password: newPassword,
      }),
    });

    if (!response.ok) throw new Error("Failed to update password.");

    alert("Password updated successfully!");
    return true;
  } catch (error) {
    alert("Failed to update password. Please try again.");
    return false;
  }
};

const handleLockStatusUpdate = async (userId, lockStatus, token, userRole) => {
  try {
    let endpoint = "";
    if (userRole === "Agent") {
      endpoint = `/admin/user/agent/UserList?Id=${id}&type=${type}`;
    } else if (userRole === "SubAgent") {
      endpoint = `/admin/agent/changeUserStatus?userId=${userId}`;
    } else if (userRole === "Admin") {
      endpoint = `/admin/user/agent/UserList?Id=${id}&type=${type}`;
    } else {
      console.error("Invalid user role:", userRole);
      return;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ status: lockStatus === "Active" }),
    });

    if (!response.ok) throw new Error("Failed to update lock status.");

    alert("Lock status updated successfully!");
    return true;
  } catch (error) {
    alert("Failed to update lock status. Please try again.");
    return false;
  }
};

// ************ Change Create users API for Admin, Agent and Sub-Agent ****************
const checkUsernameAvailable = async (username, token, userRole) => {
  if (!username) return { available: null, message: "" };

  try {
    let endpoint = "";
    if (userRole === "Agent") {
      endpoint = `/admin/agent/check-username`;
    } else if (userRole === "Sub-Agent") {
      endpoint = `/admin/shop/check-username`;
    } else if (userRole === "User") {
      endpoint = `/admin/user/check-username`;
    } else {
      console.error("Invalid user role:", userRole);
      return;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ name: username }),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        available: !result.exists,
        message: result.exists
          ? `${userRole} name already exists.`
          : `${userRole} name is available.`,
      };
    } else {
      return {
        available: false,
        message: "Error checking name availability.",
      };
    }
  } catch (error) {
    return {
      available: false,
      message: "Failed to connect to the server.",
    };
  }
};

const UserhandleSubmit = async (formData, token, userRole, agentId) => {
  if (!formData.username || !formData.password) {
    return { type: "error", text: "Username and Password are mandatory!" };
  }

  // Prepare payload based on userRole
  const payload =
    userRole === "User"
      ? {
          retailer: "",
          country: "India",
          name: formData.username,
          email: "",
          mobileNumber: formData.mobileNumber,
          password: formData.password,
          deviceId: "111",
          isVIP: 1,
          Iscom: 0,
          agentId: agentId,
        }
      : {
          name: formData.username,
          password: formData.password,
          location: "India",
          status: "active",
          agentId: agentId,
        };

  try {
    let endpoint = "";
    if (userRole === "Agent") {
      endpoint = `/admin/agent/AddAgent`;
    } else if (userRole === "Sub-Agent") {
      endpoint = `/admin/shop/AddShop`;
    } else if (userRole === "User") {
      endpoint = `/admin/user/AddUser`;
    } else {
      console.error("Invalid user role:", userRole);
      return;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok && result.status) {
      return {
        type: "success",
        text: `${userRole} created successfully!`,
      };
    } else {
      return {
        type: "error",
        text: result.message || `Failed to create ${userRole}.`,
      };
    }
  } catch (error) {
    return { type: "error", text: "Failed to connect to the server." };
  }
};

// ************ Change  API for Admin, Agent and Sub-Agent ****************

export {
  SubAgentPointsFileApi,
  fetchSubAgentTurnover,
  changeUserPassword,
  fetchDashboardData,
  fetchRouletteGameHistory,
  kickoffUserDashboardData,
  kickofffetchUserData,
  handlePasswordUpdate,
  handleLockStatusUpdate,
  checkUsernameAvailable,
  UserhandleSubmit,
  LoadUserData,
  handleBalanceAdjustment,
  AgentPointsFileApi,
  fetchAgentTurnover,
  fetchPartners,
  fetchhandleBalanceAdjustment,
  AdminPointsFileApi,
  AdminfetchPartners,
  fetchhandleAdminBalanceAdjustment,
  fetchAdminUsers,
  fetchAdminAgentList,
  fetchAdminSubAgents,
  fetchAgentUsers,
  fetchAgentSubAgentList,
  fetchSubAgentUserList,
  fetchUserData,
  PointsFileApi,
};
