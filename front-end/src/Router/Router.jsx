import { createBrowserRouter } from "react-router-dom";

// components & pages
import Auth from "../pages/Auth/Auth";
import ForgetPassword from "../components/pages/auth/ForgetPassword";

import AccueilPage from "../pages/Accueil Page/AccueilPage";
import WatchPost from "../components/pages/Publications/WatchPost";
import Layout from "./Layout";
import Blogs from "../pages/blogs/Blogs";
import Landing from "../pages/landing/Landing";
import Chat from "../pages/chat/Chat";
import Messages from "../components/pages/chat/Messages";
import NotFound from "../pages/not-found/NotFound";
import Groups from "../pages/group/Groups";
import Group from "../pages/group/Group";
import Memebers from "../components/pages/group/Memebers";
import Discussion from "../components/pages/group/Discussion";
import CreateGroup from "../pages/group/CreateGroup";
import Profile from "../pages/profile/Profile";
import Friends from "../components/pages/friends/Friends";
import CreatePost from "../components/pages/Publications/CreatePost";

import MediaView from "../components/Accueil Page/components/MediaView";
import CompletProfile from "../components/Accueil Page/components/CompletProfile";
import ProfilePublication from "../pages/profile/ProfilePublication";
import Photos_Vidos from "../components/pages/profile/Photos_Vidos";
// import PostsAll from "../components/pages/Publications/PostsAll";
import PostsHome from "../components/pages/Publications/PostsHome";
import PostsVideos from "../components/pages/Publications/PostsVideos";
import Amis from "../pages/profile/Amis";
import GroupLayout from "../pages/group/GroupsLayout";
import CreateBlog from "../pages/blogs/CreateBlog";
import FriendsSidebar from "../components/pages/chat/FriendsSidebar";
import GroupsSidebar from "../components/pages/chat/GroupsSidebar";
import AboutGroup from "../components/pages/group/AboutGroup";
import Blog from "../pages/blogs/Blog";
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
        index: true,
        element: <FriendsSidebar />,
      },
      {
        index: true,
        element: <GroupsSidebar />,
      },
      {
        path: ":chatId",
        element: <Messages />,
      },
    ],
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
        element: <AccueilPage />,
        children: [
          {
            path: "/accueil",
            element: <PostsHome />,
          },
          {
            path: "/watch",
            element: <PostsVideos />,
          },
        ],
      },
      // {
      //   path: "/accueil",
      //   element: <AccueilPage />,
      // },
      {
        path: "/profile/complet",
        element: <CompletProfile />,
      },
      {
        path: "/post/:id/:index",
        element: <MediaView />,
      },
      {
        path: "/friends",
        element: <Friends />
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
        element: <Blog />,
      },
      {
        element: <Profile />,
        children: [
          {
            path: "/profile/:id",
            element: <ProfilePublication />,
          },
          {
            path: "/profile/:id/images",
            element: <Photos_Vidos />,
          },
          {
            path: "/profile/:id/videos",
            element: <Photos_Vidos />,
          },
          {
            path: "/profile/:id/amis",
            element: <Amis />,
          },
        ],
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
                element: <AboutGroup />
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
    element: <NotFound />,
  },
]);

export default AppRouter;
