import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import HomeTwo from "./pages/homeTwo";
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

import AgentDashboard from "./pages/agentdashboard";
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

import TableTranscation from './pages/tableManagment'



const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
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
      {
        path: "/agentdashboard",
        element: <AgentDashboard />,
      },
      {
        path: "/shopdashboard",
        element: <ShopDashboard />,
      },
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
