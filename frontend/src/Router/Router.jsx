/**
 * Application Router Configuration
 * 
 * Route Structure:
 * ├── / (Landing - Public)
 * ├── /login (Auth - Guest Only)
 * ├── /register (Auth - Guest Only)
 * ├── /forgot-password (Auth - Guest Only)
 * ├── /reset-password/:token/:email (Auth - Guest Only)
 * │
 * └── Protected Routes (Require Auth + AppLayout)
 *     ├── /feed (Home Feed)
 *     ├── /watch (Videos)
 *     ├── /search
 *     ├── /chat, /chat/:chatId
 *     ├── /group/chat, /group/chat/:chatId
 *     ├── /settings, /settings/password, /settings/delete-account
 *     ├── /profile/:id, /profile/:id/articles, etc.
 *     ├── /friends, /friends/invitations, etc.
 *     ├── /groups, /groups/:groupeId
 *     ├── /pages, /page/:id
 *     ├── /blogs, /blogs/:id
 *     └── /saves, /saves/posts, /saves/blogs
 */

import { createBrowserRouter, Navigate } from "react-router-dom";

// ============================================
// GUARDS & LAYOUTS
// ============================================
import { RequireAuth, RequireGuest } from "./guards";
import { AppLayout, AuthLayout } from "./layouts";

// ============================================
// AUTH PAGES (Guest Only)
// ============================================
import Auth from "@/features/auth/pages/Auth";
import LoginPage from "@/features/auth/components/Login";
import SignUpPage from "@/features/auth/components/Signup";
import ForgetPassword from "@/features/auth/components/ForgetPassword";
import ResetPassword from "@/features/auth/components/REsetePassword";

// ============================================
// LANDING & PUBLIC PAGES
// ============================================
import Landing from "@/features/landing/pages/Landing";
import NotFound from "@/shared/components/NotFound";

// ============================================
// FEED & HOME
// ============================================
import AccueilPage from "@/features/home/pages/AccueilPage";
import PostsHome from "@/features/posts/components/PostsHome";
import PostsVideos from "@/features/posts/components/PostsVideos";
import MediaView from "@/features/home/components/MediaView";
import WatchPost from "@/features/posts/components/WatchPost";

// ============================================
// SEARCH
// ============================================
import SearchResultsPage from "@/shared/components/layout/SearchResultsPage ";

// ============================================
// SETTINGS
// ============================================
import SettingsPage from "@/features/settings/pages/MenuPara";
import ChangePassword from "@/features/settings/pages/ChangePasssword";
import DropCompt from "@/features/settings/pages/DropCompt";

// ============================================
// CHAT & MESSAGING
// ============================================
import Chat from "@/features/chat/pages/Chat";
import Messages from "@/features/chat/components/Messages";

// ============================================
// PROFILE
// ============================================
import Profile from "@/features/profile/pages/Profile";
import PProfilepublication from "@/features/profile/pages/ProfilePublication";
import UserBlogs from "@/features/profile/pages/UserBlogs";
import VideosGalleryProfile from "@/features/profile/pages/VideosPage";
import ImagesGalleryProfile from "@/features/profile/pages/ImagesProfile";
import Amis from "@/features/profile/pages/Amis";
import UpdateProfileForm from "@/features/profile/components/UpdateProfileForm";
import CompletProfile from "@/features/profile/components/CompletProfile";

// ============================================
// FRIENDS
// ============================================
import Friends from "@/features/friends/pages/Friends";
import AmisPage from "@/features/friends/components/Amis";
import InvitationsPage from "@/features/friends/components/Invitaions";
import MesInvitesPage from "@/features/friends/components/MeInvitaion";
import AutresPage from "@/features/friends/components/Autre";

// ============================================
// GROUPS
// ============================================
import GroupLayout from "@/features/groups/pages/GroupsLayout";
import Groups from "@/features/groups/pages/Groups";
import Group from "@/features/groups/pages/Group";
import CreateGroup from "@/features/groups/pages/CreateGroup";
import Discussion from "@/features/groups/components/Discussion";
import AboutGroup from "@/features/groups/components/AboutGroup";
import Memebers from "@/features/groups/components/Memebers";
import GroupBlogs from "@/features/groups/components/GroupBlogs";

// ============================================
// PAGES (Business/Fan Pages)
// ============================================
import PagesLayout from "@/features/pages/components/show/PageLayout";
import PagesUser from "@/features/pages/components/show/PagesUser";
import AdminPages from "@/features/pages/components/show/AdminPages";
import PageListFollow from "@/features/pages/components/show/PageListFollow";
import PageListUnfollow from "@/features/pages/components/show/PageListUnfollow";
import CreatePage from "@/features/pages/components/CreatePage";
import Page from "@/features/pages/pages/Page";
import PagePublication from "@/features/pages/pages/PagePublication";
import PageBlogs from "@/features/pages/pages/PageBlogs";
import VideosGallery from "@/features/pages/pages/VideosPage";
import ImagesGallery from "@/features/pages/pages/ImagesPage";
import UpdatePage from "@/features/pages/components/UpdatePage/UpdatePage";
import ParamiterComponent from "@/features/pages/components/settings/ParamiterComponent";
import AdminsTab from "@/features/pages/components/settings/SettingsAdminsPage";
import FollowersTab from "@/features/pages/components/settings/Followers";

// ============================================
// BLOGS
// ============================================
import Blogs from "@/features/blogs/pages/Blogs";
import Blog from "@/features/blogs/pages/Blog";
import CreateBlog from "@/features/blogs/pages/CreateBlog";

// ============================================
// POSTS & PUBLICATIONS
// ============================================
import CreatePost from "@/features/posts/components/CreatePost";

// ============================================
// SAVED ITEMS
// ============================================
import Saved from "@/features/blogs/components/SavedBlogs/Saved";
import SavedBlogsContainer from "@/features/blogs/components/SavedBlogs/SavedBlogsContainer";
import SavedPostsContainer from "@/features/posts/components/saved/SavedPOstsCotainer";

// ============================================
// DASHBOARD (Admin)
// ============================================
import Dashboard from "@/features/dashboard/pages/Dashboard";

// ============================================
// ROUTER CONFIGURATION
// ============================================
const AppRouter = createBrowserRouter([
  // ==========================================
  // PUBLIC ROUTES
  // ==========================================
  {
    path: "/",
    element: <Landing />,
  },

  // ==========================================
  // GUEST-ONLY ROUTES (Login, Register, etc.)
  // Redirects to /feed if already logged in
  // ==========================================
  {
    element: <RequireGuest />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <SignUpPage />,
          },
          // Legacy routes - redirect to new paths
          {
            path: "/auth/:type/:email?",
            element: <Auth />,
          },
          {
            path: "/forgot-password/:email?",
            element: <ForgetPassword />,
          },
          // Legacy forgot password route
          {
            path: "/auth/mot-de-pass-oublier/:Email?",
            element: <ForgetPassword />,
          },
          {
            path: "/reset-password/:token/:email",
            element: <ResetPassword />,
          },
        ],
      },
    ],
  },

  // ==========================================
  // PROTECTED ROUTES (Require Authentication)
  // ==========================================
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          // ----------------------------------
          // FEED & HOME
          // ----------------------------------
          {
            element: <AccueilPage />,
            children: [
              {
                path: "/feed",
                element: <PostsHome />,
              },
              {
                path: "/watch",
                element: <PostsVideos />,
              },
              // Legacy route redirect
              {
                path: "/accueil",
                element: <Navigate to="/feed" replace />,
              },
            ],
          },

          // ----------------------------------
          // SEARCH
          // ----------------------------------
          {
            path: "/search",
            element: <SearchResultsPage />,
          },

          // ----------------------------------
          // SETTINGS
          // ----------------------------------
          {
            path: "/settings",
            element: <SettingsPage />,
          },
          {
            path: "/settings/password",
            element: <ChangePassword />,
          },
          {
            path: "/settings/delete-account",
            element: <DropCompt />,
          },
          // Legacy settings routes - redirect
          {
            path: "/les paramiter",
            element: <Navigate to="/settings" replace />,
          },
          {
            path: "/les paramiter/changer mot de pass",
            element: <Navigate to="/settings/password" replace />,
          },
          {
            path: "/les paramiter/supprimer profile",
            element: <Navigate to="/settings/delete-account" replace />,
          },

          // ----------------------------------
          // PROFILE
          // ----------------------------------
          {
            path: "/profile/complet",
            element: <CompletProfile />,
          },
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
                path: "/profile/:id/friends",
                element: <Amis />,
              },
              // Legacy route
              {
                path: "/profile/:id/amis",
                element: <Navigate to="../friends" replace />,
              },
              {
                path: "/profile/:id/update",
                element: <UpdateProfileForm />,
              },
            ],
          },

          // ----------------------------------
          // FRIENDS
          // ----------------------------------
          {
            element: <Friends />,
            children: [
              {
                path: "/friends",
                element: <AmisPage />,
              },
              {
                path: "/friends/requests",
                element: <MesInvitesPage />,
              },
              {
                path: "/friends/invitations",
                element: <InvitationsPage />,
              },
              {
                path: "/friends/suggestions",
                element: <AutresPage />,
              },
              // Legacy routes
              {
                path: "/friends/mes-invites",
                element: <Navigate to="/friends/requests" replace />,
              },
              {
                path: "/friends/autres",
                element: <Navigate to="/friends/suggestions" replace />,
              },
            ],
          },

          // ----------------------------------
          // MEDIA
          // ----------------------------------
          {
            path: "/post/:id/:index",
            element: <MediaView />,
          },
          {
            path: "/videos",
            element: <WatchPost />,
          },

          // ----------------------------------
          // BLOGS
          // ----------------------------------
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

          // ----------------------------------
          // PUBLICATIONS
          // ----------------------------------
          {
            path: "/publications/create",
            element: <CreatePost />,
          },

          // ----------------------------------
          // SAVED ITEMS
          // ----------------------------------
          {
            path: "/saves",
            element: <Saved />,
            children: [
              {
                index: true,
                element: <SavedPostsContainer />,
              },
              {
                path: "posts",
                element: <SavedPostsContainer />,
              },
              {
                path: "blogs",
                element: <SavedBlogsContainer />,
              },
            ],
          },

          // ----------------------------------
          // PAGES (Business/Fan Pages)
          // ----------------------------------
          {
            path: "/pages/create",
            element: <CreatePage />,
          },
          // Legacy route
          {
            path: "/pages/create-page",
            element: <Navigate to="/pages/create" replace />,
          },
          {
            element: <PagesLayout />,
            children: [
              {
                path: "/pages",
                element: <PagesUser />,
              },
              {
                path: "/pages/my-pages",
                element: <PagesUser />,
              },
              // Legacy route
              {
                path: "/pages/mes-pages",
                element: <Navigate to="/pages/my-pages" replace />,
              },
              {
                path: "/pages/admin",
                element: <AdminPages />,
              },
              // Legacy route
              {
                path: "/pages/admin-pages",
                element: <Navigate to="/pages/admin" replace />,
              },
              {
                path: "/pages/following",
                element: <PageListFollow />,
              },
              // Legacy route
              {
                path: "/pages/abone-pages",
                element: <Navigate to="/pages/following" replace />,
              },
              {
                path: "/pages/discover",
                element: <PageListUnfollow />,
              },
              // Legacy route
              {
                path: "/pages/autres-pages",
                element: <Navigate to="/pages/discover" replace />,
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
                    path: "/page/:id/settings/admins",
                    element: <AdminsTab />,
                  },
                  {
                    path: "/page/:id/settings/followers",
                    element: <FollowersTab />,
                  },
                  {
                    path: "/page/:id/settings/edit",
                    element: <UpdatePage />,
                  },
                  // Legacy routes
                  {
                    path: "/page/:id/paramiter/admin",
                    element: <Navigate to="../settings/admins" replace />,
                  },
                  {
                    path: "/page/:id/paramiter/followers",
                    element: <Navigate to="../settings/followers" replace />,
                  },
                  {
                    path: "/page/:id/paramiter/update",
                    element: <Navigate to="../settings/edit" replace />,
                  },
                ],
              },
            ],
          },
          {
            path: "/page/:id/update",
            element: <UpdatePage />,
          },

          // ----------------------------------
          // GROUPS
          // ----------------------------------
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

      // ----------------------------------
      // CHAT (Full screen, no sidebar needed inside)
      // ----------------------------------
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
        path: "/group/chat",
        element: <Chat isGroup={true} />,
        children: [
          {
            path: ":chatId",
            element: <Messages />,
          },
        ],
      },

      // ----------------------------------
      // DASHBOARD (Admin only - separate layout)
      // ----------------------------------
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },

  // ==========================================
  // 404 - NOT FOUND
  // ==========================================
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default AppRouter;
