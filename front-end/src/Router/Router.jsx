import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import ForgetPassword from "../components/pages/auth/ForgetPassword";
import Landing from "../pages/landing/Landing";
import Chat from "../pages/chat/Chat";
import Messages from "../components/pages/chat/Messages";
import LeftSideBarChat from "../components/pages/chat/LeftSideBarChat";


const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/chat",
    element: <Chat />,
    children : [
      {
        index: true,
        element: <LeftSideBarChat />
      },
      {
        path: ":chatId",
        element : <Messages/>
      }
    ]
  },
  {
    path: "/auth/:type/:email?",
    element: <Auth />,
  },
  {
    path: "/auth/mot-de-pass-oublier/:Email?",
    element: <ForgetPassword />,
  },
]);
export default AppRouter;