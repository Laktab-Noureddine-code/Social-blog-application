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
import NotFound from "../pages/not-found/NotFound";
import Groups from "../pages/group/Groups";
import Group from "../pages/group/Group";
import Memebers from "../components/pages/group/Memebers";
import About from "../components/pages/group/About";
import Discussion from "../components/pages/group/Discussion";
import CreateGroup from "../pages/group/CreateGroup";
import Profile from "../pages/profile/Profile";
import Friends from "../components/pages/friends/Friends";
import CreatePost from "../components/pages/Publications/CreatePost";
import GroupLayout from "../pages/group/GroupsLayout";
import CreateBlog from "../pages/blogs/CreateBlog";


const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/chat",
    element: <Chat isGroup={false} />,
    children: [
      {
        path: ":chatId",
        element: <Messages />
      }
    ]
  },
  {
    path: "group/chat",
    element: <Chat isGroup={true} />,
    children: [
      {
        path: ":chatId",
        element: <Messages />
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
  {
    path: "/groups/create",
    element: <CreateGroup />
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/accueil",
        element: <AccueilPage />,
      },
      {
        path: "/friends",
        element: <Friends />
      },
      {
        path: "/profile/:idUser",
        element: <Profile />
      },

      {
        path: "/videos",
        element: <WatchPost />,
      },
      {
        path: "/blogs/create",
        element: <CreateBlog />,
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
        element: <GroupLayout />,
        children: [
          {
            path: "list",
            element: <Groups />
          },

          {
            path: ":groupeId",
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
                path: "chat",
                element: <Chat />
              },
              {
                path: "members",
                element: <Memebers />
              }
            ]
          },

        ]
      },
    ],
  },
  {
    // This enables scroll restoration
    scrollRestoration: "manual",
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default AppRouter;
