import { createBrowserRouter } from "react-router-dom";

// components & pages
import Auth from "../pages/Auth/Auth";
import ForgetPassword from "../components/pages/auth/ForgetPassword";

import AccueilPage from "../pages/Accueil Page/AccueilPage";
import WatchPost from "../components/pages/Publications/WatchPost";
import Layout from "./Layout";
import Blogs from "../components/pages/Publications/Blogs";
import BlogTetaills from "../components/pages/Publications/Blog-tetaills";
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
import CreatePost from "../components/pages/Publications/CreatePost";
import MediaView from "../components/Accueil Page/components/MediaView";
import CompletProfile from "../components/Accueil Page/components/CompletProfile";


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
        element: <LeftSideBarChat />,
      },
      {
        path: ":chatId",
        element: <Messages />,
      },
    ],
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
    element: <Layout />, // <-- wrap these pages with Sidebar
    children: [
      {
        path: "/accueil",
        element: <AccueilPage />,
      },
      {
        path: "/profile/complet",
        element: <CompletProfile />,
      },
      {
        path: "/post/:id/:index",
        element: <MediaView />,
      },
      {
        path: "/videos",
        element: <WatchPost />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:id",
        element: <BlogTetaills />,
      },
      {
        path: "/publications/create",
        element: <CreatePost />,
      },
      {
        path: "/groups",
        element: <Groups />,
      },
      {
        path: "/groups/create",
        element: <CreateGroup />,
      },
      {
        path: "group/:groupeId",
        element: <Group />,
        children: [
          {
            index: true,
            element: <Discussion />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "members",
            element: <Memebers />,
          },
        ],
      },
    ],
  },
  {
    // This enables scroll restoration
    scrollRestoration: "manual",
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default AppRouter;
