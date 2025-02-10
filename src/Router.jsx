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
import AdminTurnOver from "./New_Dashboards/Admin/AdminTurnOverReport";
import TermsAndCondition from "./pages/settings/terms&condition";
import HomeFive from "./pages/homeFive";

import Transaction from "./pages/transaction";
import Dashboard from "./pages/dashboard";
import GameHistory from "./pages/GameHistory";
import GameLogic from "./pages/gameLogic";
import BotList from "./pages/Bot";
import BotUpdate from "./pages/BotUpdate";
import Deposit from "./pages/Deposit";
import PayoutPendding from './pages/Payoutpendding'
import SocialURL from './pages/SocialURL'
import NoitceText from './pages/NoticeText'
import NotificationList from './pages/Notification'
import BannerList from './pages/Banner'
import Botadd from './pages/Botadd'
import PlayerAdd from './pages/Playeradd'
import Mail from './pages/Mail'
import Playeredit from './pages/PlayerUpdate'



import CoinManagement from './pages/CoinManagement'

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
} from "./New_Dashboards/SubAgent/SubAgentTabs";

import ShopDashboard from "./pages/shopdashboard";

import AgentManagement from "./pages/agentManagement";
import Agentdit from './pages/AgentUpdate'
import AgentAdd from './pages/agentadd'


import ShopManagement from "./pages/ShopManagment";
import ShopAdd from './pages/shopadd'
import Shopdit from './pages/ShopUpdate'


import Commission from './pages/commission'
import GamebetInfo from './pages/playingtabledata'


import BetHistoryinfo from './pages/BetHistory'


import Chnagepwd from './pages/Chnagepwd'
import SubAgentTranscation from './pages/SubAgentTranscation'
import AgentTranscation from './pages/AgentTranscation'
import AdminTranscation from './pages/AdminTranscation'

import TableTranscation from "./pages/tableManagment";
import Cookies from "universal-cookie";

const checkAuth = () => {
  const cookies = new Cookies();
  const tokendata = cookies.get("token");
  if (!tokendata) {
    throw redirect("/signin"); // Redirect to the login page if the token is missing
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    loader: checkAuth,
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
    loader: checkAuth,
    children: [
      // Agents routes
      {
        path: "/agentdashboard",
        element: <Agentdash />,
      },
      {
        path: "/agent/Turn-over",
        element: <AgentTurnOver />,
      },
      {
        path: "/agent/search-users",
        element: <AgentSearchUsers />,
      },
      {
        path: "/agent/search-sub-agents",
        element: <AgentSearchSubAgents />,
      },
      {
        path: "/agent/balance-adjustment",
        element: <AgentBalanceAdjustment />,
      },
      {
        path: "/agent/gamehistory",
        element: <AgentGameHistory />,
      },
      {
        path: "/agent/outpoint",
        element: <AgentOutPoint />,
      },
      {
        path: "/agent/inpoint",
        element: <AgentInPoint />,
      },

      {
        path: "/agent/pointfile",
        element: <AgentPointFile />,
      },

      {
        path: "/agent/change-password",
        element: <AgentChangePassword />,
      },
      {
        path: "/agent/create-user",
        element: <AgentCreateUser />,
      },
      {
        path: "/agent/create-sub-agent",
        element: <AgentCreateSubagent />,
      },
      {
        path: "/agent/kickoff-users",
        element: <AgentKickoffUsers />,
      },
      {
        path: "/agent/subAgents-points-history",
        element: <SubAPointsInAgent />,
      },

      // SubAgents routes

      {
        path: "/shopdashboard",
        element: <SubAgentdash />,
      },
      {
        path: "/sub-agent/kickoff-users",
        element: <SubAgentKickoffUsers />,
      },
      {
        path: "/sub-agent/create-user",
        element: <SubAgentCreateUser />,
      },
      {
        path: "/sub-agent/change-password",
        element: <SubAgentChangePassword />,
      },
      {
        path: "/sub-agent/pointfile",
        element: <SubAgentPointFile />,
      },
      {
        path: "/sub-agent/inpoint",
        element: <SubAgentInPoint />,
      },
      {
        path: "/sub-agent/outpoint",
        element: <SubAgentOutPoint />,
      },
      {
        path: "/sub-agent/gamehistory",
        element: <SubAgentGameHistory />,
      },
      {
        path: "/sub-agent/balance-adjustment",
        element: <SubAgentBalanceAdjustment />,
      },
      {
        path: "/sub-agent/search-users",
        element: <SubAgentSearchUsers />,
      },
      {
        path: "/sub-agent/Turn-over",
        element: <SubAgentTurnOver />,
      },
      {
        path: "/shopdashboard",
        element: <SubAgentdash />,
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