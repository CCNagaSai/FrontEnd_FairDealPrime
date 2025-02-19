import offerContext from "./offerContext";
import React, { useState, useEffect } from "react";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const API_URL = import.meta.env.VITE_HOST_URL;

// const host = import.meta.env.VITE_HOST_URL;
// "http://93.127.194.87:9999"; //"http://192.168.0.203:9999" //
//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ5Y2NlM2JhNDA4YTJlMjg3ZjJlYzUiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHNpc3VnYW16LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHhZZzVMUlNRRWxiNENOZnVocjdncmUyUjNMOUQ5eDhaWmc0c0QxSW9uY1N6ZWFTSHgzMTIuIiwiY3JlYXRlZEF0IjoiMjAyMy0xMS0wN1QwNTozNjozNS42NjBaIiwibW9kaWZpZWRBdCI6IjIwMjMtMTEtMDdUMDU6MzY6MzUuNjYwWiIsImlhdCI6MTY5OTMzNTQxMywiZXhwIjoxNjk5OTQwMjEzfQ.NrLsWSnyD09P3h30rsng_R3bygn3TsKl8nXyD7qom4c";

const OfferState = (props) => {
  // console.log("props.adminname ",props.adminname)
  // console.log("props.adminname Email ",props.adminname)

  //props.adminname
  //props.adminEmail
  const [adminname, setAdminname] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [token, setToken] = useState(cookies.get("token"));

  const LogoutClick = async () => {
    console.log(
      "HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH"
    );
    setToken("");
    cookies.set("token", "");
    return false;
  };

  const dashboardData = async (id) => {
    try {
      console.log("DAshboard ::::::::::::::::::::::", id);
      const response = await fetch(`${API_URL}/admin/dashboard?Id=` + id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
      }).then((data) => data.json());

      const json = response;

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        console.log(
          "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 45"
        );

        LogoutClick();
        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const latatestUser = async (uid) => {
    try {
      console.log(
        `${API_URL}/admin/latatestUser`,
        `${API_URL}/admin/dashboard/latatestUser`
      );
      console.log("latatestUser ::::::::::::::::::::", uid);

      const response = await fetch(
        `${API_URL}/admin/dashboard/latatestUser?Id=` + uid,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"), //token
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :Recent Player  latatestUser :::...", json);
      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        console.log(
          "dffffffffffffffffffffffffffffffffffffffffffffffffff",
          cookies.get("token")
        );
        console.log(
          "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 75"
        );

        LogoutClick();

        console.log(
          "dffffffffffffffffffffffffffffffffffffffffffffffffff",
          cookies.get("token")
        );

        return [];
      } else {
        return await json.RecentUser;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const latatestShop = async (uid) => {
    try {
      console.log(
        "${API_URL}/admin/latatestShop",
        `${API_URL}/admin/dashboard/latatestShop`
      );
      console.log("latatestShop ::::::::::::::::::::", uid);

      const response = await fetch(
        `${API_URL}/admin/dashboard/latatestShop?Id=` + uid,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"), //token
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :Recent Player  latatestShop :::...", json);
      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        console.log(
          "dffffffffffffffffffffffffffffffffffffffffffffffffff",
          cookies.get("token")
        );
        console.log(
          "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 75"
        );

        LogoutClick();

        console.log(
          "dffffffffffffffffffffffffffffffffffffffffffffffffff",
          cookies.get("token")
        );

        return [];
      } else {
        return await json.RecentUser;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const latatestAgent = async () => {
    try {
      console.log(
        `${API_URL}/admin/latatestAgent`,
        `${API_URL}/admin/dashboard/latatestAgent`
      );
      console.log("latatestAgent ::::::::::::::::::::");

      const response = await fetch(`${API_URL}/admin/dashboard/latatestAgent`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"), //token
        },
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :Recent Player  latatestAgent :::...", json);
      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        console.log(
          "dffffffffffffffffffffffffffffffffffffffffffffffffff",
          cookies.get("token")
        );
        console.log(
          "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 75"
        );

        LogoutClick();

        console.log(
          "dffffffffffffffffffffffffffffffffffffffffffffffffff",
          cookies.get("token")
        );

        return [];
      } else {
        return await json.RecentUser;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };
  //============== Table ======================

  const TableList = async (uid, type) => {
    try {
      console.log("TableList :::::::", `${API_URL}/admin/games/TableList`);
      const response = await fetch(`${API_URL}/admin/games/TableList`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.tabInfo;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const TableDelete = async (userId) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(
        `${API_URL}/admin/games/DeleteTable/` + userId,
        {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  // ========= User Details =================

  const PlayerList = async (uid, type) => {
    try {
      console.log("PlayerList :::::::", `${API_URL}/admin/user/UserList`);
      const response = await fetch(
        `${API_URL}/admin/user/UserList?Id=` + uid + `&type=` + type,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.userList;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const PlayerAdd = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(`${API_URL}/admin/user/AddUser`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const PlayerDelete = async (userId) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(
        `${API_URL}/admin/user/DeleteUser/` + userId,
        {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const PlayerData = async (userId) => {
    try {
      console.log("PlayerList :::::::", `${API_URL}/admin/user/UserData`);
      const response = await fetch(
        `${API_URL}/admin/user/UserData?userId=` + userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json.userInfo;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };
  //==========================================================================
  //=============================== Agent ====================================

  const AgentList = async () => {
    try {
      console.log("AgentList :::::::", `${API_URL}/admin/agent/AgentList`);
      const response = await fetch(`${API_URL}/admin/agent/AgentList`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestagent :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        setToken("");
        cookies.set("token", "");

        return [];
      } else {
        return await json.agentList;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const AgentAdd = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(`${API_URL}/admin/agent/AddAgent`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((d) => d.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        setToken("");
        cookies.set("token", "");

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const AgentDelete = async (userId) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(
        `${API_URL}/admin/agent/Deleteagent/` + userId,
        {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        setToken("");
        cookies.set("token", "");

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const AgentData = async (userId) => {
    try {
      console.log("PlayerList :::::::", `${API_URL}/admin/agent/AgentData`);
      const response = await fetch(
        `${API_URL}/admin/agent/AgentData?userId=` + userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        setToken("");
        cookies.set("token", "");

        return {};
      } else {
        return await json.userInfo;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const AgentUpdate = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      console.log("BotUpdate :::::::", data);

      const response = await fetch(`${API_URL}/admin/agent/AgentUpdate`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((d) => d.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        setToken("");
        cookies.set("token", "");

        return {};
      } else {
        return json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const agentAddMoney = async (data) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/agent/agentAddMoney`,
        data
      );
      const response = await fetch(`${API_URL}/admin/agent/agentAddMoney`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :agentAddMoney :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const agentDeductMoney = async (data) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/agent/agentDeductMoney`,
        data
      );
      const response = await fetch(`${API_URL}/admin/agent/agentDeductMoney`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :agentDeductMoney :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  //===========================================================================
  //=============================== Shop ======================================

  const ShopList = async (uid) => {
    try {
      console.log("ShopList :::::::", `${API_URL}/admin/shop/ShopList`);
      const response = await fetch(
        `${API_URL}/admin/shop/ShopList?agentId=` + uid,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestshop :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        setToken("");
        cookies.set("token", "");

        return [];
      } else {
        return await json.shopList;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const ShopAdd = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(`${API_URL}/admin/shop/AddShop`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((d) => d.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        setToken("");
        cookies.set("token", "");

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const ShopDelete = async (userId) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(
        `${API_URL}/admin/shop/Deleteshop/` + userId,
        {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        setToken("");
        cookies.set("token", "");

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const ShopData = async (userId) => {
    try {
      console.log("PlayerList :::::::", `${API_URL}/admin/shop/ShopData`);
      const response = await fetch(
        `${API_URL}/admin/shop/ShopData?userId=` + userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        setToken("");
        cookies.set("token", "");

        return {};
      } else {
        return await json.userInfo;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const ShopUpdate = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      console.log("BotUpdate :::::::", data);

      const response = await fetch(`${API_URL}/admin/shop/ShopUpdate`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((d) => d.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        setToken("");
        cookies.set("token", "");

        return {};
      } else {
        return json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const shopAddMoney = async (data) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/shop/shopAddMoney`,
        data
      );
      const response = await fetch(`${API_URL}/admin/shop/shopAddMoney`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :shopAddMoney :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const shopDeductMoney = async (data) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/shop/shopDeductMoney`,
        data
      );
      const response = await fetch(`${API_URL}/admin/shop/shopDeductMoney`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :shopDeductMoney :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const SubAgentTranscationData = async (id, type) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/usertransction/SubAgentTranscationData`
      );
      const response = await fetch(
        `${API_URL}/admin/usertransction/SubAgentTranscationData?Id=` +
          id +
          `&type=` +
          type,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return json.DepositeList;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const AgentTranscationData = async (id, type) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/usertransction/AgentTranscationData`
      );
      const response = await fetch(
        `${API_URL}/admin/usertransction/AgentTranscationData?Id=` +
          id +
          `&type=` +
          type,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return json.DepositeList;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const AdminTranscationData = async (id, type) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/usertransction/AdminTranscationData`
      );
      const response = await fetch(
        `${API_URL}/admin/usertransction/AdminTranscationData`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return json.DepositeList;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  //============================================================================

  // History  User
  const GetSpinnerHistoryData = async (userId) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/UserData`,
        userId
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/GetSpinnerHistoryData?userId=` + userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log(
        "data api from :GetBlackandWhiteHistoryData :::...111111111111111",
        json.GameHistoryData
      );

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.GameHistoryData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  // History
  const GetSoratHistoryData = async (userId) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/GetSoratHistoryData`,
        userId
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/GetSoratHistoryData?userId=` + userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :GetSoratHistoryData :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.GameHistoryData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const GetandarbaharHistoryData = async (userId) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/GetandarbaharHistoryData`,
        userId
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/GetandarbaharHistoryData?userId=` +
          userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :GetBlackandWhiteHistoryData :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.GameHistoryData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  // History
  const GetOneToTwelveHistoryData = async (userId) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/GetOneToTwelveHistoryData`,
        userId
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/GetOneToTwelveHistoryData?userId=` +
          userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :GetOneToTwelveHistoryData :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.GameHistoryData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  // History GetRouletteHistoryData
  const GetRouletteHistoryData = async (userId) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/GetRouletteHistoryData`,
        userId
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/GetRouletteHistoryData?userId=` + userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :GetOneToTwelveHistoryData :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.GameHistoryData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  //=================================================================================

  const GetCompleteWithdrawalData = async (userId) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/completeWithdrawal`,
        userId
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/completeWithdrawal?userId=` + userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :GetCompleteWithdrawalData :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.completeWithdrawalData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const GetCompleteDespositeData = async (userId) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/completeDeposite`,
        userId
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/completeDeposite?userId=` + userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :GetCompleteDespositeData :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();
        return [];
      } else {
        return await json.completeDepositeData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const GetRegisterReferralBonusData = async (userId) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/registerRaferralBonus`,
        userId
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/registerRaferralBonus?userId=` + userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :GetRegisterReferralBonusData :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.registerRaferralBonusData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const GetMyReferralData = async (userId) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/myRaferrals`,
        userId
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/myRaferrals?userId=` + userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :GetMyReferralData :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.myRaferralsData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const UpdatePassword = async (data) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/user/UpdatePassword`,
        data
      );
      const response = await fetch(`${API_URL}/admin/user/UpdatePassword`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :UpdatePassword :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const AddMoney = async (data) => {
    try {
      console.log("PlayerList :::::::", `${API_URL}/admin/user/addMoney`, data);
      const response = await fetch(`${API_URL}/admin/user/addMoney`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :AddMoney :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const DeductMoney = async (data) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/user/deductMoney`,
        data
      );
      const response = await fetch(`${API_URL}/admin/user/deductMoney`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :DeductMoney :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const blockandunblock = async (data) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/user/blockandunblock`,
        data
      );
      const response = await fetch(`${API_URL}/admin/user/blockandunblock`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :DeductMoney :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const getprintdataapi = async (userId) => {
    try {
      console.log("PlayerList :::::::", `${API_URL}/admin/user/UserInfoPrint`);
      // + userId
      const response = await fetch(
        `${API_URL}/admin/user/UserInfoPrint?userId=65967296eae703374096d4dd`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  //======================
  // game History

  const SoratGameHistory = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/SoratGameHistory`
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/SoratGameHistory`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.gameHistoryData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const SpinGameHistory = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/SpinGameHistory`
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/SpinGameHistory`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.gameHistoryData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const AndarBaharGameHistory = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/AndarBaharGameHistory`
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/AndarBaharGameHistory`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.gameHistoryData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const WheelofFortuneGameHistory = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/WheelofFortuneGameHistory`
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/WheelofFortuneGameHistory`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.gameHistoryData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const BaraKaDumGameHistory = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/BaraKaDumGameHistory`
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/BaraKaDumGameHistory`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.gameHistoryData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const RouletteGameHistory = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/userhistory/RouletteGameHistory`
      );
      const response = await fetch(
        `${API_URL}/admin/userhistory/RouletteGameHistory`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.gameHistoryData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const GetGameLogic = async (gamename) => {
    try {
      console.log("PlayerList :::::::", `${API_URL}/admin/games/getgamelogic`);
      const response = await fetch(
        `${API_URL}/admin/games/getgamelogic?gamename=` + gamename,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return await json.logic;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const GameLogicSet = async (data) => {
    try {
      console.log("PlayerList :::::::", `${API_URL}/admin/games/gameLogicSet`);
      const response = await fetch(`${API_URL}/admin/games/gameLogicSet`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const GetGameBetInfo = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/games/GetGameBetInfo`
      );
      const response = await fetch(`${API_URL}/admin/games/GetGameBetInfo`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return await json.tabInfo;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  //==================================== Commission

  const GetGameCom = async (gamename) => {
    try {
      console.log("PlayerList :::::::", `${API_URL}/admin/games/getgamecom`);
      const response = await fetch(
        `${API_URL}/admin/games/getgamecom?gamename=` + gamename,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const GameComSet = async (data) => {
    try {
      console.log("PlayerList :::::::", `${API_URL}/admin/games/GameComSet`);
      const response = await fetch(`${API_URL}/admin/games/GameComSet`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  //================= socail List

  const SocailURLsList = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}//admin/social/socialURLsList`
      );
      const response = await fetch(`${API_URL}/admin/social/socialURLsList`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.socialURLs;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const SocailURLsAdd = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(`${API_URL}/admin/social/socialurl`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((d) => d.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const DeleteSocailURLs = async (socialid) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(
        `${API_URL}/admin/social/socialurldelete/` + socialid,
        {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);
      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  //=============================

  //================= coin Management

  const CoinsList = async () => {
    try {
      console.log("PlayerList :::::::", `${API_URL}//admin/coin/coinlist`);
      const response = await fetch(`${API_URL}/admin/coin/coinlist`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
      }).then((data) => data.json());

      const json = response;

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        console.log("data api from :CoinsList :::...", json.coinlist);

        return await json.coinlist;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const CoinPackeAdd = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(`${API_URL}/admin/coin/coinadded`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((d) => d.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const DeleteCoinpack = async (socialid) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(
        `${API_URL}/admin/coin/coindelete/` + socialid,
        {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);
      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  //=============================

  //================= Notice  List

  const NoticeTextList = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}//admin/noticetext/noticeTextList`
      );
      const response = await fetch(
        `${API_URL}/admin/noticetext/noticeTextList`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.noticeText;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const NoticeTextLsAdd = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(`${API_URL}/admin/noticetext/noticeText`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((d) => d.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const DeleteNoticeText = async (id) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(
        `${API_URL}/admin/noticetext/noticedelete/` + id,
        {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  //=============================

  //================= Mail  List

  const mailList = async () => {
    try {
      console.log("PlayerList :::::::", `${API_URL}//admin/mail/mailList`);
      const response = await fetch(`${API_URL}/admin/mail/mailList`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return await json.maillist;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const MailsAdd = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(`${API_URL}/admin/mail/mailInsert`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((d) => d.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const DeleteMail = async (id) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(`${API_URL}/admin/mail/maildelete/` + id, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
      }).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  //=============================

  //================= gamementenance  List

  const GetMentenance = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}//admin/gamementenance/getMentenanceStatus`
      );
      const response = await fetch(
        `${API_URL}/admin/gamementenance/getMentenanceStatus`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);
      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const MentenanceUpdate = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(
        `${API_URL}/admin/gamementenance/mentenanceStatusUpdate`,
        {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
          body: JSON.stringify({ flag: data }),
        }
      ).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);
      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  //=============================

  //================= notification  List

  const SendPushnotification = async (data) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}//admin/notification/sendNotification`
      );
      const response = await fetch(
        `${API_URL}/admin/notification/sendNotification`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
          body: JSON.stringify(data),
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :SendPushnotification :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };
  //=================================================

  //================= Banner   List

  const BannerList = async () => {
    try {
      console.log("PlayerList :::::::", `${API_URL}//admin/banner/bannerList`);
      const response = await fetch(`${API_URL}/admin/banner/bannerList`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json.bannerListData;
      } else {
        return await json.bannerListData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const BannerAdd = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(`${API_URL}/admin/banner/bannerAdd`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((d) => d.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const UploadBanner = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);

      const formData = new FormData();
      formData.append("image", data);

      const response = await fetch(`${API_URL}/admin/banner/BannerUpload`, {
        method: "POST",
        headers: {
          token: cookies.get("token"),
        },
        body: formData,
      }).then((d) => d.json());

      console.log("response ", response);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        if (json.flag) {
          return json.path;
        } else {
          return "";
        }
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const DeleteBanner = async (id) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(
        `${API_URL}/admin/banner/bannerdelete/` + id,
        {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  //=============================

  // ========= Bot Details =================

  const BotList = async () => {
    try {
      console.log("PlayerList :::::::", `${API_URL}/admin/bot/UserList`);
      const response = await fetch(`${API_URL}/admin/bot/BotList`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
      }).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return json.userList;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const BotAdd = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(`${API_URL}/admin/bot/BotAdd`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const UploadProfile = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);

      const formData = new FormData();
      formData.append("image", data);

      const response = await fetch(`${API_URL}/admin/bot/ProfileUpload`, {
        method: "POST",
        headers: {
          token: cookies.get("token"),
        },
        body: formData,
      }).then((d) => d.json());

      console.log("response ", response);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return "";
      } else {
        if (json.flag) {
          return json.path;
        } else {
          return "";
        }
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const BotDelete = async (userId) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(`${API_URL}/admin/bot/BotDelete/` + userId, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
      }).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const BotData = async (userId) => {
    try {
      console.log("PlayerList :::::::", `${API_URL}/admin/bot/BotData`);
      const response = await fetch(
        `${API_URL}/admin/bot/BotData?userId=` + userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return json.userInfo;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const BotUpdate = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      console.log("BotUpdate :::::::", data);

      const response = await fetch(`${API_URL}/admin/bot/BotUpdate`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((d) => d.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  //======================================================================================

  // ========= Deposite List  Details =================

  const DepositeList = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/usertransction/DepositList`
      );
      const response = await fetch(
        `${API_URL}/admin/usertransction/DepositList`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return json.DepositeList;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const DepositeAccptedList = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/usertransction/AcceptList`
      );
      const response = await fetch(
        `${API_URL}/admin/usertransction/AcceptList`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return json.AcceptList;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const DepositeRejectedList = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/usertransction/RejectList`
      );
      const response = await fetch(
        `${API_URL}/admin/usertransction/RejectList`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return json.RejectList;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const DepositeAdd = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(`${API_URL}/admin/bot/BotAdd`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const UploadScreenshort = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);

      const formData = new FormData();
      formData.append("image", data);

      const response = await fetch(`${API_URL}/admin/bot/ProfileUpload`, {
        method: "POST",
        headers: {
          token: cookies.get("token"),
        },
        body: formData,
      }).then((d) => d.json());

      console.log("response ", response);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return "";
      } else {
        if (json.flag) {
          return json.path;
        } else {
          return "";
        }
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const DepositeDelete = async (userId) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(`${API_URL}/admin/bot/BotDelete/` + userId, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
      }).then((d) => d);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const DepositeData = async (userId) => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/usertransction/DepositData?id=` + userId
      );
      const response = await fetch(
        `${API_URL}/admin/usertransction/DepositData?id=` + userId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return json.DepositeData;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const DepositeUpdate = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      console.log("DepositeUpdate :::::::", data);

      const response = await fetch(
        `${API_URL}/admin/usertransction/DepositeUpdate`,
        {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
          body: JSON.stringify(data),
        }
      ).then((d) => d.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };
  //===============================================

  // ========= Payout Details =================

  const PayoutList = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/usertransction/PayoutList`
      );
      const response = await fetch(
        `${API_URL}/admin/usertransction/PayoutList`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return json.PayoutList;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const PayoutAccptedList = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/usertransction/PayoutAcceptList`
      );
      const response = await fetch(
        `${API_URL}/admin/usertransction/PayoutAcceptList`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return json.AcceptList;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const PayoutRejectedList = async () => {
    try {
      console.log(
        "PlayerList :::::::",
        `${API_URL}/admin/usertransction/PayoutRejectList`
      );
      const response = await fetch(
        `${API_URL}/admin/usertransction/PayoutRejectList`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
        }
      ).then((data) => data.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return [];
      } else {
        return json.RejectList;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const PayoutUpdate = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      console.log("PayoutUpdate :::::::", data);

      const response = await fetch(
        `${API_URL}/admin/usertransction/payoutUpdate`,
        {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookies.get("token"),
          },
          body: JSON.stringify(data),
        }
      ).then((d) => d.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return {};
      } else {
        return json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  const UploadScreenshortPayout = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);

      const formData = new FormData();
      formData.append("image", data);

      const response = await fetch(
        `${API_URL}/admin/usertransction/UploadScreenShortPayOut`,
        {
          method: "POST",
          headers: {
            token: cookies.get("token"),
          },
          body: formData,
        }
      ).then((d) => d.json());

      console.log("response ", response);

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return "";
      } else {
        if (json.flag) {
          return json.path;
        } else {
          return "";
        }
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  //=================================

  const Chnageidpwd = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      console.log("PlayerList ::::::: data ", data);

      const response = await fetch(`${API_URL}/admin/signup-admin-update`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookies.get("token"),
        },
        body: JSON.stringify(data),
      }).then((d) => d.json());

      const json = response;
      console.log("data api from :latatestUser :::...", json);

      if (
        json.message != undefined &&
        (json.message == "jwt expired" || json.message == "Unauthorized access")
      ) {
        LogoutClick();

        return json;
      } else {
        return await json;
      }
    } catch (e) {
      console.log("e :", e);
    }
  };

  return (
    <offerContext.Provider
      value={{
        API_URL,
        adminname,
        adminEmail,
        dashboardData,
        latatestUser,
        latatestShop,
        latatestAgent,
        PlayerList,
        PlayerData,
        PlayerAdd,
        PlayerDelete,
        GameLogicSet,
        GetGameBetInfo,
        GetGameLogic,
        GetCompleteWithdrawalData,
        GetCompleteDespositeData,
        GetRegisterReferralBonusData,
        GetMyReferralData,
        SocailURLsList,
        SocailURLsAdd,
        DeleteSocailURLs,
        CoinsList,
        CoinPackeAdd,
        DeleteCoinpack,
        NoticeTextList,
        NoticeTextLsAdd,
        DeleteNoticeText,
        mailList,
        MailsAdd,
        DeleteMail,
        GetMentenance,
        MentenanceUpdate,
        SendPushnotification,
        BannerList,
        BannerAdd,
        DeleteBanner,
        UploadBanner,
        BotList,
        BotAdd,
        BotDelete,
        BotData,
        UploadProfile,
        BotUpdate,
        AddMoney,
        UpdatePassword,
        DeductMoney,
        getprintdataapi,
        LogoutClick,
        DepositeList,
        DepositeAccptedList,
        DepositeRejectedList,
        DepositeAdd,
        UploadScreenshort,
        DepositeDelete,
        DepositeData,
        DepositeUpdate,
        PayoutList,
        PayoutAccptedList,
        PayoutRejectedList,
        PayoutUpdate,
        UploadScreenshortPayout,
        AgentList,
        AgentAdd,
        AgentDelete,
        AgentData,
        AgentUpdate,
        ShopList,
        ShopAdd,
        ShopDelete,
        ShopData,
        ShopUpdate,
        SoratGameHistory,
        SpinGameHistory,
        AndarBaharGameHistory,
        WheelofFortuneGameHistory,
        BaraKaDumGameHistory,
        RouletteGameHistory,
        GetGameCom,
        GameComSet,
        GetRouletteHistoryData,
        GetSpinnerHistoryData,
        GetSoratHistoryData,
        GetandarbaharHistoryData,
        GetOneToTwelveHistoryData,
        Chnageidpwd,
        blockandunblock,
        agentAddMoney,
        agentDeductMoney,
        shopAddMoney,
        shopDeductMoney,
        SubAgentTranscationData,
        AgentTranscationData,
        AdminTranscationData,
        TableList,
        TableDelete,
      }}
    >
      {props.children}
    </offerContext.Provider>
  );
};
//LogoutClick,
export default OfferState;
