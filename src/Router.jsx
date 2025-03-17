import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Statistics from "./pages/statistics";
import Analytics from "./pages/analytics";

import MyWallet from "./pages/myWallet";
import Inbox from "./pages/inbox";
import Integrations from "./pages/integrations";
import Users from "./pages/users";
import Calender from "./pages/calender";
import History from "./pages/history";
import Support from "./pages/supportTicket";
import Settings from "./pages/settings";
import SignIn from "./pages/signin";
import SignInAdmin from "./pages/signinadmin";

import SignUp from "./pages/signup";
import ComingSoon from "./pages/commingSoon";
import Error from "./pages/error";
import Layout from "./component/layout";
import PersonalInfo from "./pages/settings/personal-info";
import Notification from "./pages/settings/notifaction";
import ProgramAndResources from "./pages/settings/program&resourses";
import Payment from "./pages/settings/payment";
import Faq from "./pages/settings/faq";
import Security from "./pages/settings/security";
// import AdminTurnOver from "./New_Dashboards/Admin/AdminTurnOverReport";
import TermsAndCondition from "./pages/settings/terms&condition";
import HomeFive from "./pages/homeFive";

import Transaction from "./pages/transaction";
import Dashboard from "./pages/dashboard";
import GameHistory from "./pages/GameHistory";
import GameLogic from "./pages/gameLogic";
import BotList from "./pages/Bot";
import BotUpdate from "./pages/BotUpdate";
import Deposit from "./pages/Deposit";
import PayoutPendding from "./pages/Payoutpendding";
import SocialURL from "./pages/SocialURL";
import NoitceText from "./pages/NoticeText";
import NotificationList from "./pages/Notification";
import BannerList from "./pages/Banner";
import Botadd from "./pages/Botadd";
import PlayerAdd from "./pages/Playeradd";
import Mail from "./pages/Mail";
import Playeredit from "./pages/PlayerUpdate";

import CoinManagement from "./pages/CoinManagement";

// import AgentDashboard from "./pages/agentdashboard";
import {
  Agentdash,
  AgentSearchUsers,
  AgentSearchSubAgents,
  AgentBalanceAdjustment,
  AgentKickoffUsers,
  AgentCreateUser,
  AgentCreateSubagent,
  AgentChangePassword,
  AgentPointFile,
  AgentInPoint,
  AgentOutPoint,
  AgentGameHistory,
  AgentTurnOver,
  SubAPointsInAgent,
  TestSearchUsers,
} from "./New_Dashboards/Agent/AgentTabs";

import {
  SubAgentdash,
  SubAgentSearchUsers,
  SubAgentBalanceAdjustment,
  SubAgentKickoffUsers,
  SubAgentCreateUser,
  SubAgentChangePassword,
  SubAgentPointFile,
  SubAgentInPoint,
  SubAgentOutPoint,
  SubAgentGameHistory,
  SubAgentTurnOver,
  TestSearchUsersSA,
} from "./New_Dashboards/SubAgent/SubAgentTabs";

// import AdminDashboard from "./New_Dashboards/Admin/AdminTabs";
import {
  AdminDashboard,
  GamebetInformation,
  AdminTableManagement,
  AdminGameLogic,
  AdminSearchUsers,
  AdminBalanceAdjustment,
  AdminKickoffUsers,
  CreateAgent,
  SearchAgent,
  AgentBalanceAdjustments,
  ChangeAgentPassword,
  CreateSubAgent,
  SearchSubAgent,
  SubAgentBalanceAdjustments,
  ChangeSubAgentPassword,
  AdminPointFile,
  AdminInPoint,
  AdminOutPoint,
  AdminGameHistory,
  AdminTurnOver,
  AdminTranscations,
  AgentTranscations,
  SubAgentTranscations,
  AdminSocialURL,
  AdminNoticeText,
  AdminSettings,
  ChangeAdminPwd,
  TestingTable,
  ActivePlayerDetails,
  AgentSubAgentPointFile,
  CreateUser,
  ChangeUserPassword,
  TestAdminSearchUsers,
} from "./New_Dashboards/Admin/AdminTabs";

import ShopDashboard from "./pages/shopdashboard";

import AgentManagement from "./pages/agentManagement";
import Agentdit from "./pages/AgentUpdate";
import AgentAdd from "./pages/agentadd";

import ShopManagement from "./pages/ShopManagment";
import ShopAdd from "./pages/shopadd";
import Shopdit from "./pages/ShopUpdate";

import Commission from "./pages/commission";
import GamebetInfo from "./pages/playingtabledata";

import BetHistoryinfo from "./pages/BetHistory";

import Chnagepwd from "./pages/Chnagepwd";
import SubAgentTranscation from "./pages/SubAgentTranscation";
import AgentTranscation from "./pages/AgentTranscation";
import AdminTranscation from "./pages/AdminTranscation";

import TableTranscation from "./pages/tableManagment";
import Cookies from "universal-cookie";

// const checkAuth = () => {
//   const cookies = new Cookies();
//   const tokendata = cookies.get("token");
//   if (!tokendata) {
//     throw redirect("/signin"); // Redirect to the login page if the token is missing
//   }
//   return null;
// };

const checkAuth = (allowedRole) => {
  return () => {
    const cookies = new Cookies();
    const tokendata = cookies.get("token");
    const userRole = cookies.get("logintype");

    if (!tokendata) {
      throw redirect("/signin"); // Redirect to login if no token
    }

    if (allowedRole && userRole !== allowedRole) {
      alert("Access Denied: You are not authorized for this page.");
      throw redirect(`/${userRole.toLowerCase()}dashboard`); // Redirect to correct dashboard
    }

    return null;
  };
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    loader: checkAuth(),
    children: [
      {
        path: "/TableTranscation",
        element: <TableTranscation />,
      },
      {
        path: "/AdminTranscation",
        element: <AdminTranscation />,
      },
      {
        path: "/AgentTranscation",
        element: <AgentTranscation />,
      },
      {
        path: "/SubAgentTranscation",
        element: <SubAgentTranscation />,
      },
      {
        path: "/betHistory",
        element: <BetHistoryinfo />,
      },
      {
        path: "/gamebetInfo",
        element: <GamebetInfo />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      // {
      //   path: "/agentdashboard",
      //   element: <AgentDashboard />,
      // },
      // {
      //   path: "/shopdashboard",
      //   element: <ShopDashboard />,
      // },
      {
        path: "/home-3",
        element: <Statistics />,
      },
      {
        path: "/home-4",
        element: <Analytics />,
      },

      {
        path: "/gamehistory",
        element: <GameHistory />,
      },
      {
        path: "/gamelogic",
        element: <GameLogic />,
      },
      {
        path: "/botList",
        element: <BotList />,
      },
      {
        path: "/botUpdate",
        element: <BotUpdate />,
      },
      {
        path: "/botAddinfo",
        element: <Botadd />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },
      {
        path: "/agentmanagement",
        element: <AgentManagement />,
      },
      {
        path: "/agentedit",
        element: <Agentdit />,
      },
      {
        path: "/agentadd",
        element: <AgentAdd />,
      },
      {
        path: "/shopedit",
        element: <Shopdit />,
      },
      {
        path: "/shopadd",
        element: <ShopAdd />,
      },
      {
        path: "/shopmanagement",
        element: <ShopManagement />,
      },
      {
        path: "/commission",
        element: <Commission />,
      },

      {
        path: "/playeradd",
        element: <PlayerAdd />,
      },
      {
        path: "/playeredit",
        element: <Playeredit />,
      },
      {
        path: "/depositList",
        element: <Deposit />,
      },
      {
        path: "/payoutpendding",
        element: <PayoutPendding />,
      },
      {
        path: "/coinmanagement",
        element: <CoinManagement />,
      },
      {
        path: "/socialurl",
        element: <SocialURL />,
      },
      {
        path: "/noticetext",
        element: <NoitceText />,
      },
      {
        path: "/mail",
        element: <Mail />,
      },
      {
        path: "/notificationlist",
        element: <NotificationList />,
      },
      {
        path: "/bannerlist",
        element: <BannerList />,
      },
      {
        path: "/security",
        element: <Chnagepwd />,
      },
      {
        path: "/turn-over-report",
        element: <AdminTurnOver />,
      },
      {
        path: "/settings",
        Component: Settings,
        children: [
          {
            index: true,
            element: <PersonalInfo />,
          },
          {
            path: "notification",
            element: <Notification />,
          },
          {
            path: "program&resources",
            element: <ProgramAndResources />,
          },
          {
            path: "payment",
            element: <Payment />,
          },
          {
            path: "faq",
            element: <Faq />,
          },
          {
            path: "security",
            element: <Security />,
          },
          {
            path: "terms&conditions",
            element: <TermsAndCondition />,
          },
        ],
      },
      {
        path: "/my-wallet",
        element: <MyWallet />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/support-ticket",
        element: <Support />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/",
    loader: checkAuth(),
    children: [
      // Agents routes
      {
        path: "/agentdashboard",
        element: <Agentdash />,
        loader: checkAuth("Agent"),
      },
      {
        path: "/agent/Turn-over",
        element: <AgentTurnOver />,
        loader: checkAuth("Agent"),
      },
      {
        path: "/agent/search-users",
        element: <AgentSearchUsers />,
        loader: checkAuth("Agent"),
      },
      {
        path: "/agent/search-sub-agents",
        element: <AgentSearchSubAgents />,
        loader: checkAuth("Agent"),
      },
      {
        path: "/agent/balance-adjustment",
        element: <AgentBalanceAdjustment />,
        loader: checkAuth("Agent"),
      },
      {
        path: "/agent/gamehistory",
        element: <AgentGameHistory />,
        loader: checkAuth("Agent"),
      },
      {
        path: "/agent/outpoint",
        element: <AgentOutPoint />,
        loader: checkAuth("Agent"),
      },
      {
        path: "/agent/inpoint",
        element: <AgentInPoint />,
        loader: checkAuth("Agent"),
      },

      {
        path: "/agent/pointfile",
        element: <AgentPointFile />,
        loader: checkAuth("Agent"),
      },

      {
        path: "/agent/change-password",
        element: <AgentChangePassword />,
        loader: checkAuth("Agent"),
      },
      {
        path: "/agent/create-user",
        element: <AgentCreateUser />,
        loader: checkAuth("Agent"),
      },
      {
        path: "/agent/create-sub-agent",
        element: <AgentCreateSubagent />,
        loader: checkAuth("Agent"),
      },
      {
        path: "/agent/kickoff-users",
        element: <AgentKickoffUsers />,
        loader: checkAuth("Agent"),
      },
      {
        path: "/agent/subAgents-points-history",
        element: <SubAPointsInAgent />,
        loader: checkAuth("Agent"),
      },
      {
        path: "/agent/test-user",
        element: <TestSearchUsers />,
        loader: checkAuth("Agent"),
      },

      // SubAgents routes

      {
        path: "/shopdashboard",
        element: <SubAgentdash />,
        loader: checkAuth("Shop"),
      },
      {
        path: "/sub-agent/kickoff-users",
        element: <SubAgentKickoffUsers />,
        loader: checkAuth("Shop"),
      },
      {
        path: "/sub-agent/create-user",
        element: <SubAgentCreateUser />,
        loader: checkAuth("Shop"),
      },
      {
        path: "/sub-agent/change-password",
        element: <SubAgentChangePassword />,
        loader: checkAuth("Shop"),
      },
      {
        path: "/sub-agent/pointfile",
        element: <SubAgentPointFile />,
        loader: checkAuth("Shop"),
      },
      {
        path: "/sub-agent/inpoint",
        element: <SubAgentInPoint />,
        loader: checkAuth("Shop"),
      },
      {
        path: "/sub-agent/outpoint",
        element: <SubAgentOutPoint />,
        loader: checkAuth("Shop"),
      },
      {
        path: "/sub-agent/gamehistory",
        element: <SubAgentGameHistory />,
        loader: checkAuth("Shop"),
      },
      {
        path: "/sub-agent/balance-adjustment",
        element: <SubAgentBalanceAdjustment />,
        loader: checkAuth("Shop"),
      },
      {
        path: "/sub-agent/search-users",
        element: <SubAgentSearchUsers />,
        loader: checkAuth("Shop"),
      },
      {
        path: "/sub-agent/Turn-over",
        element: <SubAgentTurnOver />,
        loader: checkAuth("Shop"),
      },

      {
        path: "/sub-agent/test-users",
        element: <TestSearchUsersSA />,
        loader: checkAuth("Shop"),
      },

      //Admin Routes
      {
        path: "/admindashboard",
        element: <AdminDashboard />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/PlayingTableBet",
        element: <GamebetInformation />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/TableManagement",
        element: <AdminTableManagement />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/TableManagement",
        element: <AdminTableManagement />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/Admin/Gamelogic",
        element: <AdminGameLogic />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/searchUsers",
        element: <AdminSearchUsers />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/BalanceAdjustment",
        element: <AdminBalanceAdjustment />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/KickoffUsers",
        element: <AdminKickoffUsers />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/CreateAgent",
        element: <CreateAgent />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/SearchAgent",
        element: <SearchAgent />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/AgentBalanceAdjustments",
        element: <AgentBalanceAdjustments />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/ChangeAgentPassword",
        element: <ChangeAgentPassword />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/CreateSubAgent",
        element: <CreateSubAgent />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/SearchSubAgent",
        element: <SearchSubAgent />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/SubAgentBalanceAdjustments",
        element: <SubAgentBalanceAdjustments />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/ChangeSubAgentPassword",
        element: <ChangeSubAgentPassword />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/PointFile",
        element: <AdminPointFile />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/InPoint",
        element: <AdminInPoint />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/OutPoint",
        element: <AdminOutPoint />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/GameHistory",
        element: <AdminGameHistory />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/AdminTurnOverReport",
        element: <AdminTurnOver />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/Transcations",
        element: <AdminTranscations />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/AgentTranscations",
        element: <AgentTranscations />,
      },
      {
        path: "/admin/SubAgentTranscations",
        element: <SubAgentTranscations />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/SocialURL",
        element: <AdminSocialURL />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/NoticeText",
        element: <AdminNoticeText />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/Settings",
        element: <AdminSettings />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/ChangePassword",
        element: <ChangeAdminPwd />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/ActivePlayerDetails",
        element: <ActivePlayerDetails />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/AgentSubAgentPointFile",
        element: <AgentSubAgentPointFile />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/CreateUser",
        element: <CreateUser />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/ChangeUserPassword",
        element: <ChangeUserPassword />,
        loader: checkAuth("Admin"),
      },

      //Testing
      {
        path: "/admin/TestingTable",
        element: <TestingTable />,
        loader: checkAuth("Admin"),
      },
      {
        path: "/admin/TestSearchUsers",
        element: <TestAdminSearchUsers />,
        loader: checkAuth("Admin"),
      },
    ],
  },

  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signInadmin",
    element: <SignInAdmin />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/coming-soon",
    element: <ComingSoon />,
  },
  {
    path: "/home-5",
    element: <HomeFive />,
  },
  {
    path: "/404",
    element: <Error />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
