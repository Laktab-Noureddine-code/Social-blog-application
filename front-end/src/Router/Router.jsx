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
import CompletProfile from "../components/ComponentsProfile/CompletProfile";
import PostsHome from "../components/pages/Publications/PostsHome";
import PostsVideos from "../components/pages/Publications/PostsVideos";
import Amis from "../pages/profile/Amis";
import GroupLayout from "../pages/group/GroupsLayout";
import CreateBlog from "../pages/blogs/CreateBlog";



// import LeftSideBarChat from "../components/pages/chat/LeftSideBarChat";



import AmisPage from "../components/pages/friends/Amis";
import InvitationsPage from "../components/pages/friends/Invitaions";
import MesInvitesPage from "../components/pages/friends/MeInvitaion";
import AutresPage from "../components/pages/friends/Autre";
import CreatePage from "../components/ComponentsPage/CreatePage";
import Page from "../pages/Page/Page";
import PagePublication from "../pages/Page/PagePublication";
import VideosGallery from "../pages/Page/VideosPage";
import ImagesGallery from "../pages/Page/ImagesPage";
import VideosGalleryProfile from "../pages/profile/VideosPage";
import ImagesGalleryProfile from "../pages/profile/ImagesProfile";
import PProfilepublication from "../pages/profile/ProfilePublication";
import UpdateProfileForm from "../components/UpdateProfile/UpdateProfileForm";
import PagesLayout from "../pages/Page/ShowPages/PageLayout";
import AdminPages from "../pages/Page/ShowPages/AdminPages";
import PageListFollow from "../pages/Page/ShowPages/PageListFollow";
import PageListUnfollow from "../pages/Page/ShowPages/PageListUnfollow";
import PagesUser from "../pages/Page/ShowPages/PagesUser";
import UpdatePage from "../components/ComponentsPage/UpdatePage/UpdatePage";

import FriendsSidebar from "../components/pages/chat/FriendsSidebar";
import GroupsSidebar from "../components/pages/chat/GroupsSidebar";
import AboutGroup from "../components/pages/group/AboutGroup";
import Blog from "../pages/blogs/Blog";
import SavedPostsContainer from "../components/pages/Publications/SavedPosts/SavedPOstsCotainer";
import UserBlogs from "../pages/profile/UserBlogs";
import PageBlogs from "../pages/Page/PageBlogs";
import GroupBlogs from "../components/pages/group/GroupBlogs";
import ParamiterComponent from "../pages/Page/SettingsPage/ParamiterComponent";
import AdminsTab from "../pages/Page/SettingsPage/SettingsAdminsPage";
import FollowersTab from "../pages/Page/SettingsPage/Followers";
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
    path: "/groups/create",
    element: <CreateGroup />,
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
        path: "/pages/create-page",
        element: <CreatePage />,
      },
      {
        path: "/post/:id/:index",
        element: <MediaView />,
      },
      {
        element: <Friends />,
        children: [
          {
            path: "/friends",
            element: <AmisPage />,
          },
          {
            path: "/friends/mes-invites",
            element: <MesInvitesPage />,
          },
          {
            path: "/friends/invitations",
            element: <InvitationsPage />,
          },
          {
            path: "/friends/autres",
            element: <AutresPage />,
          },
        ],
      },
      {
        element: <PagesLayout />,
        children: [
          {
            path: "/pages/mes-pages",
            element: <PagesUser />,
          },
          {
            path: "/pages/admin-pages",
            element: <AdminPages />,
          },
          {
            path: "/pages/abone-pages",
            element: <PageListFollow />,
          },
          {
            path: "/pages/autres-pages",
            element: <PageListUnfollow />,
          },
        ],
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
        element: <Blog />,
      },
      {
        path: "/blogs/create/:typeCreator/:id",
        element: <CreateBlog />
      },

      {
        element: <Profile />,
        children: [
          {
            path: "/profile/:id",
            element: <PProfilepublication />,
          },
          {
            path: "/profile/:id/images",
            element: <ImagesGalleryProfile />,
          },
          {
            path: "/profile/:id/videos",
            element: <VideosGalleryProfile />,
          },
          {
            path: "/profile/:id/amis",
            element: <Amis />,
          },
          {
            path: "/profile/:id/update",
            element: <UpdateProfileForm />,
          },
          {
            path: "/profile/:id/articles",
            element: <UserBlogs />,
          },
        ],
      },
      {
        element: <Page />,
        children: [
          {
            path: "/page/:id",
            element: <PagePublication />,
          },
          {
            path: "/page/:id/images",
            element: <ImagesGallery />,
          },
          {
            path: "/page/:id/videos",
            element: <VideosGallery />,
          },
          {
            path: "/page/:id/followers",
            element: <Amis />,
          },
          {
            element: <ParamiterComponent />,
            children: [
              {
                path: "/page/:id/paramiter/admin",
                element: <AdminsTab />,
              },
              {
                path: "/page/:id/paramiter/followers",
                element: <FollowersTab />,
              },
              {
                path: "/page/:id/paramiter/update",
                element: <UpdatePage />,
              },
            ],
          },
        ],
      },
      {
        path: "/page/:id/update",
        element: <UpdatePage />,
      },
      {
        path: "/page/:id/articles",
        element: <PageBlogs />
      },
      {
        path: "/Publications enregistrées",
        element: <SavedPostsContainer />,
      },
      {
        path: "/blogs/:id",
        element: <Blog />,
      },
      {
        path: "/publications/create",
        element: <CreatePost />,
      },
      {
        path: "/groups/:groupeId/articles",
        element: <GroupBlogs />
      },
      {
        path: "/groups",
        element: <GroupLayout />,
        children: [
          {
            path: "list",
            element: <Groups />,
          },
          {
            path: ":groupeId",
            element: <Group />,
            children: [
              {
                index: true,
                element: <Discussion />,
              },
              {
                path: "about",
                element: <AboutGroup />
                // element: <About />,
              },
              {
                path: "chat",
                element: <Chat />,
              },
              {
                path: "members",
                element: <Memebers />,
              },
            ],
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
