import { createBrowserRouter } from "react-router-dom";

// components & pages
import Auth from "@/features/auth/pages/Auth";
import ForgetPassword from "@/features/auth/components/ForgetPassword";

import AccueilPage from "@/features/home/pages/AccueilPage";
import WatchPost from "@/features/posts/components/WatchPost";
import Layout from "./Layout";
import Blogs from "@/features/blogs/pages/Blogs";
import Landing from "@/features/landing/pages/Landing";
import Chat from "@/features/chat/pages/Chat";
// import ChatLayout from "@/features/chat/pages/ChatLayout";
import Messages from "@/features/chat/components/Messages";
import NotFound from "@/shared/components/NotFound";
import Groups from "@/features/groups/pages/Groups";
import Group from "@/features/groups/pages/Group";
import Memebers from "@/features/groups/components/Memebers";
import Discussion from "@/features/groups/components/Discussion";
import CreateGroup from "@/features/groups/pages/CreateGroup";
import Profile from "@/features/profile/pages/Profile";
import Friends from "@/features/friends/pages/Friends";
import CreatePost from "@/features/posts/components/CreatePost";

import MediaView from "@/features/home/components/MediaView";
import CompletProfile from "@/features/profile/components/CompletProfile";
import PostsHome from "@/features/posts/components/PostsHome";
import PostsVideos from "@/features/posts/components/PostsVideos";
import Amis from "@/features/profile/pages/Amis";
import GroupLayout from "@/features/groups/pages/GroupsLayout";
import CreateBlog from "@/features/blogs/pages/CreateBlog";

// import LeftSideBarChat from "../components/pages/chat/LeftSideBarChat";

import AmisPage from "@/features/friends/components/Amis";
import InvitationsPage from "@/features/friends/components/Invitaions";
import MesInvitesPage from "@/features/friends/components/MeInvitaion";
import AutresPage from "@/features/friends/components/Autre";
import CreatePage from "@/features/pages/components/CreatePage";
import Page from "@/features/pages/pages/Page";
import PagePublication from "@/features/pages/pages/PagePublication";
import VideosGallery from "@/features/pages/pages/VideosPage";
import ImagesGallery from "@/features/pages/pages/ImagesPage";
import VideosGalleryProfile from "@/features/profile/pages/VideosPage";
import ImagesGalleryProfile from "@/features/profile/pages/ImagesProfile";
import PProfilepublication from "@/features/profile/pages/ProfilePublication";
import UpdateProfileForm from "@/features/profile/components/UpdateProfileForm";
import PagesLayout from "@/features/pages/components/show/PageLayout";
import AdminPages from "@/features/pages/components/show/AdminPages";
import PageListFollow from "@/features/pages/components/show/PageListFollow";
import PageListUnfollow from "@/features/pages/components/show/PageListUnfollow";
import PagesUser from "@/features/pages/components/show/PagesUser";
import UpdatePage from "@/features/pages/components/UpdatePage/UpdatePage";

import FriendsSidebar from "@/features/chat/components/FriendsSidebar";
import GroupsSidebar from "@/features/chat/components/GroupsSidebar";
import AboutGroup from "@/features/groups/components/AboutGroup";
import Blog from "@/features/blogs/pages/Blog";
import SavedPostsContainer from "@/features/posts/components/saved/SavedPOstsCotainer";
import UserBlogs from "@/features/profile/pages/UserBlogs";
import PageBlogs from "@/features/pages/pages/PageBlogs";
import GroupBlogs from "@/features/groups/components/GroupBlogs";
import ParamiterComponent from "@/features/pages/components/settings/ParamiterComponent";
import AdminsTab from "@/features/pages/components/settings/SettingsAdminsPage";
import FollowersTab from "@/features/pages/components/settings/Followers";
import SavedBlogsPage from "@/features/blogs/components/SavedBlogsPage";
import SearchResultsPage from "@/shared/components/layout/SearchResultsPage ";
import Saved from "@/features/blogs/components/SavedBlogs/Saved";
import SavedBlogsContainer from "@/features/blogs/components/SavedBlogs/SavedBlogsContainer";
import ProfileBlogs from "@/features/profile/components/ProfileBlogs";
import ResetPassword from "@/features/auth/components/REsetePassword";
import SettingsPage from "@/features/settings/pages/MenuPara";
import ChangePassword from "@/features/settings/pages/ChangePasssword";
import DropCompt from "@/features/settings/pages/DropCompt";
import Dashboard from "@/features/dashboard/pages/Dashboard";
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/chat",
    element: <Chat isGroup={false} />,
    children: [
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
    path: "/reset-password/:token/:email",
    element: <ResetPassword />,
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
      {
        path: "/search",
        element: <SearchResultsPage />,
      },
      {
        path: "/les paramiter",
        element: <SettingsPage />,
      },
      {
        path: "/les paramiter/changer mot de pass",
        element: <ChangePassword />,
      },
      {
        path: "/les paramiter/supprimer profile",
        element: <DropCompt />,
      },
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
        element: <CreateBlog />,
      },

      // Find the Profile routes section and add this route
      {
        element: <Profile />,
        children: [
          {
            path: "/profile/:id",
            element: <PProfilepublication />,
          },

          {
            path: "/profile/:id/articles",
            element: <UserBlogs />,
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
            path: "/page/:id/articles",
            element: <PageBlogs />,
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

      // Find this section in the router configuration
      {
        path: "/saves",
        element: <Saved />,
        children: [
          {
            path: "blogs",
            element: <SavedBlogsContainer />,
          },
          {
            path: "posts",
            element: <SavedPostsContainer />,
          },
          {
            index: true,
            element: <SavedPostsContainer />, // Default to showing blogs
          },
        ],
      },

      // Remove these routes as they're now handled by the nested routes above
      // {
      //   path: "/saved-blogs",
      //   element: <SavedBlogsPage />
      // },
      // {
      //   path: "/Publications enregistrées",
      //   element: <SavedPostsContainer />,
      // },
      {
        path: "/blogs/:id",
        element: <Blog />,
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
            element: <Groups />,
          },
          {
            path: "create",
            element: <CreateGroup />,
          },
          {
            path: "/groups/:groupeId",
            element: <Group />,
            children: [
              {
                index: true,
                element: <Discussion />,
              },
              {
                path: "articles",
                element: <GroupBlogs />,
              },
              {
                path: "about",
                element: <AboutGroup />,
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
