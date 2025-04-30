import { createBrowserRouter } from "react-router-dom";

// components & pages
import Auth from "../pages/Auth/Auth";
import ForgetPassword from "../components/pages/auth/ForgetPassword";
import Landing from "../pages/landing/Landing";
import Chat from "../pages/chat/Chat";
import Messages from "../components/pages/chat/Messages";
import LeftSideBarChat from "../components/pages/chat/LeftSideBarChat";
import NotFound from "../pages/not-found/NotFound";
import Groups from "../pages/group/Groups";
import Group from "../pages/group/Group";
import Memebers from "../components/pages/group/Memebers";
import About from "../components/pages/group/About";
import Discussion from "../components/pages/group/Discussion";
import CreateGroup from "../pages/group/CreateGroup";
import Profile from "../pages/profile/Profile";


const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/chat",
    element: <Chat />,
    children: [
      {
        index: true,
        element: <LeftSideBarChat />
      },
      {
        path: ":chatId",
        element: <Messages />
      }
    ]
  },
  {
    path: "/groups",
    element: <Groups />,
  },
  {
    path: "/groups/create",
    element: <CreateGroup />
  },
  {
    path: "group/:groupeId",
    element: <Group />,
    children: [
      {
        index: true,
        element: <Discussion />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "members",
        element: <Memebers />
      }
    ]
  },
  {
    path:"/profile",
    element : <Profile/>
  },
  {
    path: "/auth/:type/:email?",
    element: <Auth />,
  },
  {
    path: "/auth/mot-de-pass-oublier/:Email?",
    element: <ForgetPassword />,
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
export default AppRouter;