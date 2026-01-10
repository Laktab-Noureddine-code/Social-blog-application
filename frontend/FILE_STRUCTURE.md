# Frontend File Structure

> Last updated: January 10, 2026

This document describes the feature-based architecture refactoring applied to the frontend.

## 📁 Current Structure

```
src/
├── app/                          # Application-level config
│   ├── chatReducer.js
│   └── Store.js
│
├── features/                     # ✅ FEATURE-BASED MODULES
│   │
│   ├── auth/                     # 🔐 Authentication Feature
│   │   ├── pages/
│   │   │   └── Auth.jsx          # Login/Signup page container
│   │   └── components/
│   │       ├── Login.jsx
│   │       ├── Signup.jsx
│   │       ├── ForgetPassword.jsx
│   │       └── REsetePassword.jsx
│   │
│   ├── blogs/                    # 📝 Blog Feature
│   │   ├── pages/
│   │   │   ├── Blog.jsx          # Single blog view
│   │   │   ├── Blogs.jsx         # Blogs list
│   │   │   ├── CreateBlog.jsx
│   │   │   └── ViewBlog.jsx
│   │   └── components/
│   │       ├── Blog-card.jsx
│   │       ├── Blog-post.jsx
│   │       ├── BlogCommentButton.jsx
│   │       ├── BlogCommentModal.jsx
│   │       ├── BlogCreatorHeader.jsx
│   │       ├── BlogEditor.jsx
│   │       ├── BlogEditor.css
│   │       ├── BlogLikeButton.jsx
│   │       ├── BlogPreview.jsx
│   │       ├── BlogPreview.css
│   │       ├── DeleteBlogButton.jsx
│   │       ├── SaveBlogButton.jsx
│   │       ├── SavedBlogsPage.jsx
│   │       ├── SubmitBlog.jsx
│   │       └── SavedBlogs/
│   │           ├── Saved.jsx
│   │           ├── SavedBlogsContainer.jsx
│   │           └── SavedBlogsList.jsx
│   │
│   ├── groups/                   # 👥 Groups Feature
│   │   ├── pages/
│   │   │   ├── Groups.jsx        # Groups list
│   │   │   ├── Group.jsx         # Single group view
│   │   │   ├── CreateGroup.jsx   # Create new group
│   │   │   └── GroupsLayout.jsx  # Groups layout wrapper
│   │   └── components/
│   │       ├── AboutGroup.jsx
│   │       ├── ContainerPostsGroup.jsx
│   │       ├── GroupBlogs.jsx
│   │       ├── GroupMembers.jsx
│   │       ├── GroupSettings.jsx
│   │       ├── MyGroups.jsx
│   │       ├── header/
│   │       │   └── GroupCover.jsx
│   │       └── models/
│   │           └── memberships/
│   │               ├── InviterAmisTab.jsx
│   │               ├── MemberItem.jsx
│   │               ├── MembersTab.jsx
│   │               └── RequestsTab.jsx
│   │
│   ├── profile/                  # 👤 Profile Feature
│   │   ├── pages/
│   │   │   ├── Profile.jsx       # Main profile page
│   │   │   ├── Amis.jsx          # Friends section
│   │   │   ├── ConfirmationModal.jsx
│   │   │   ├── ImagesAboitProfile.jsx
│   │   │   ├── ImagesProfile.jsx
│   │   │   ├── ProfileAbout.jsx
│   │   │   ├── ProfileHeader.jsx
│   │   │   ├── ProfilePublication.jsx
│   │   │   ├── UserBlogs.jsx
│   │   │   ├── VideosAboitPage.jsx
│   │   │   └── VideosPage.jsx
│   │   └── components/
│   │       ├── About_Amis.jsx
│   │       ├── CompletProfile.jsx
│   │       ├── CompletProfileForm.jsx
│   │       ├── EditProfile.jsx
│   │       ├── Photos_Vidos.jsx
│   │       ├── ProfileAbout.jsx
│   │       ├── ProfileBlogs.jsx
│   │       ├── ProfileHeader.jsx
│   │       ├── ProfilePosts.jsx
│   │       └── ProfilePreview.jsx
│   │
│   ├── friends/                  # 🤝 Friends Feature
│   │   ├── pages/
│   │   │   └── Friends.jsx       # Friends layout with outlet
│   │   └── components/
│   │       ├── Amis.jsx          # Friends list
│   │       ├── Autre.jsx         # Suggestions
│   │       ├── Invitaions.jsx    # Received invitations
│   │       ├── MeInvitaion.jsx   # Sent invitations
│   │       └── NavigationFriend.jsx
│   │
│   ├── posts/                    # 📝 Posts/Publications Feature
│   │   └── components/
│   │       ├── ContainerPosts.jsx
│   │       ├── CreatePost.jsx
│   │       ├── HeaderPost.jsx
│   │       ├── MenuPublication.jsx
│   │       ├── Popover.jsx
│   │       ├── PostDetails.jsx
│   │       ├── Posts.jsx
│   │       ├── PostsAll.jsx
│   │       ├── PostsHome.jsx
│   │       ├── PostsVideos.jsx
│   │       ├── TopPost.jsx
│   │       ├── UserProfileBlogs.jsx
│   │       ├── UserProfilePosts.jsx
│   │       ├── WatchPost.jsx
│   │       ├── actions/          # Post action components
│   │       │   ├── CaseFriend.jsx
│   │       │   ├── CaseFriends.jsx
│   │       │   ├── DeclareButton.jsx
│   │       │   ├── Diclaration.jsx
│   │       │   ├── HidePost.jsx
│   │       │   ├── HidePublication.jsx
│   │       │   ├── SavePublication.jsx
│   │       │   ├── SupprimerPublication.jsx
│   │       │   └── ToogleAbooner.jsx
│   │       └── saved/            # Saved posts components
│   │           ├── SavedPOstsCard.jsx
│   │           ├── SavedPOstsCotainer.jsx
│   │           └── SavedPostsList.jsx
│   │
│   └── chat/                     # 💬 Chat/Messaging Feature
│       ├── pages/
│       │   └── Chat.jsx
│       └── components/
│           ├── FriendsSidebar.jsx
│           ├── GroupsSidebar.jsx
│           ├── Message.jsx
│           ├── MessageField.jsx
│           ├── MessageFieldGroup.jsx
│           ├── Messages.jsx
│           ├── RightSideBar.jsx
│           ├── RightSideBarGroup.jsx
│           └── images/
│   │
│   └── pages/                    # 📄 Pages Feature (Facebook-like Pages)
│       ├── pages/
│       │   ├── Page.jsx          # Main page view
│       │   ├── PagePublication.jsx
│       │   ├── PageBlogs.jsx
│       │   ├── TopPostPage.jsx
│       │   ├── VideosPage.jsx
│       │   └── ImagesPage.jsx
│       └── components/
│           ├── CreatePage.jsx
│           ├── CreatePageForm.jsx
│           ├── CurentPagePosts.jsx
│           ├── EditProfile.jsx
│           ├── Followers.jsx
│           ├── ImagesAboitPage.jsx
│           ├── PageAbout.jsx
│           ├── PageHeader.jsx
│           ├── PagePosts.jsx
│           ├── PagePreview.jsx
│           ├── VideosAboitPage.jsx
│           ├── settings/
│           │   ├── AddAminPage.jsx
│           │   ├── Followers.jsx
│           │   ├── ParamiterComponent.jsx
│           │   └── SettingsAdminsPage.jsx
│           ├── show/
│           │   ├── AdminPages.jsx
│           │   ├── PageCardeFollow.jsx
│           │   ├── PageCardeUnfollow.jsx
│           │   ├── PageLayout.jsx
│           │   ├── PageListFollow.jsx
│           │   ├── PageListUnfollow.jsx
│           │   ├── PagesUser.jsx
│           │   ├── SidebarDesktop.jsx
│           │   └── SidebarMobile.jsx
│           └── UpdatePage/
│               ├── PagePreview.jsx
│               ├── UpdarePageForm.jsx
│               └── UpdatePage.jsx
│   │
│   └── landing/                  # 🏠 Landing Page Feature
│       ├── pages/
│       │   └── Landing.jsx       # Main landing page
│       └── components/
│           ├── DevelopersSection.jsx
│           ├── Faq.jsx
│           ├── Features.jsx
│           ├── Footer.jsx
│           ├── HeroSection.jsx
│           ├── LoginForm.jsx
│           └── Navbar.jsx
│   │
│   └── home/                     # 🏡 Home/Accueil Feature
│       ├── pages/
│       │   ├── AccueilPage.jsx   # Main home page
│       │   ├── UserDashboard.jsx
│       │   └── SkeletonUserDashboeard.jsx
│       └── components/
│           ├── ButtonLike.jsx
│           ├── CommantsSections.jsx
│           ├── CommentButton.jsx
│           ├── CommentsSectionViwe.jsx
│           ├── GetRelativeTimes.jsx
│           ├── InviationActions.jsx
│           ├── LikessSection.jsx
│           ├── MediaGallery.jsx
│           ├── MediaView.jsx
│           ├── MediaViwe.jsx
│           ├── Prompt_Profile.jsx
│           ├── Unknown.jsx
│           ├── UnknownCoverPhoto.jsx
│           └── Video.jsx
│   │
│   └── settings/                 # ⚙️ Settings Feature
│       └── pages/
│           ├── MenuPara.jsx      # Settings menu
│           ├── ChangePasssword.jsx
│           └── DropCompt.jsx     # Delete account
│   │
│   └── dashboard/                # 📊 Dashboard Feature
│       ├── pages/
│       │   └── Dashboard.jsx     # Main dashboard
│       └── components/
│           ├── DateRangePicker.jsx
│           ├── Overview.jsx
│           ├── PopularityInsights.jsx
│           ├── PostsAnalytics.jsx
│           └── UserReports.jsx
│   │
│   └── notifications/            # 🔔 Notifications Feature
│       └── components/
│           └── NotificationsModel.jsx  # Bell dropdown component
│
├── shared/                       # ✅ SHARED UTILITIES & UI
│   │
│   ├── components/               # Shared reusable components
│   │   ├── NotFound.jsx          # 404 page
│   │   ├── Loader.jsx            # Global loader
│   │   ├── layout/               # App layout components
│   │   │   ├── NavBar.jsx
│   │   │   ├── NavItem.jsx
│   │   │   ├── SearchOverlay.jsx
│   │   │   ├── SearchResultsPage.jsx
│   │   │   ├── Searsh.jsx
│   │   │   └── Sidebar.jsx
│   │   └── skeletons/            # Loading skeleton components
│   │       ├── SkeletonAdmins.jsx
│   │       ├── SkeletonFollowers.jsx
│   │       ├── SkeletonInviter.jsx
│   │       ├── SkeletonMessages.jsx
│   │       ├── SkeletonOthers.jsx
│   │       ├── SkeletonOthersPage/
│   │       ├── SkeletonPage.jsx
│   │       ├── SkeletonPost.jsx
│   │       ├── SkeletonSavedPosts.jsx
│   │       ├── SkeletonShowPost.jsx
│   │       └── SkeletonsImage.jsx
│   │
│   ├── lib/
│   │   └── utils.js              # cn() helper for Tailwind
│   │
│   ├── ui/                       # shadcn/ui components
│   │   ├── accordion.jsx
│   │   ├── alert-dialog.jsx
│   │   ├── alert.jsx
│   │   ├── avatar.jsx
│   │   ├── badge.jsx
│   │   ├── button.jsx
│   │   ├── calendar.jsx
│   │   ├── card.jsx
│   │   ├── checkbox.jsx
│   │   ├── dialog.jsx
│   │   ├── dropdown-menu.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   ├── popover.jsx
│   │   ├── scroll-area.jsx
│   │   ├── select.jsx
│   │   ├── separator.jsx
│   │   ├── sheet.jsx
│   │   ├── sonner.jsx
│   │   ├── table.jsx
│   │   ├── tabs.jsx
│   │   ├── textarea.jsx
│   │   └── tooltip.jsx
│   │
│   ├── helpers/                  # Utility functions
│   │   ├── helper.jsx            # formatDate, formatNumber, etc.
│   │   ├── invitationActions.js  # Friend invitation actions
│   │   └── Text.jsx
│   │
│   └── hooks/                    # Custom React hooks
│       ├── useAuthLoader.jsx
│       ├── useDashboard.js
│       ├── useGroupMessages.js
│       ├── useMessagesLoader.js
│       ├── useNotifications.js
│       ├── useReltedUsers.js
│       ├── useSavedBlogs.js
│       ├── useUserGroups.js
│       └── useUsersLoader.js
│
├── Redux/                        # 🔄 State Management (to be moved to app/store/)
│   ├── store.js
│   ├── authSlice.js
│   ├── AmisSicie.js
│   ├── blogInteractionsSlice.js
│   ├── groupsSlice.js
│   ├── InvitationSlice.js
│   ├── messagesSlice.js
│   ├── notificationsSlice.js
│   ├── PageSlice.js
│   ├── PagesSlice.js
│   ├── PostsSilce.js
│   ├── ProfileSlice.js
│   ├── relatedUsersSlice.js
│   ├── UserSilce.js
│   └── usersSlice.js
│
├── Router/                       # Application routing
│   ├── Router.jsx
│   └── Layout.jsx
│
├── config/                       # Configuration
│   └── pusher.js
│
├── data/                         # Static/mock data
│   ├── blogs-data.jsx
│   ├── chat.js
│   ├── data-post.jsx
│   ├── group.js
│   ├── users.js
│   └── videosdata.jsx
│
├── assets/                       # Static assets
├── style/                        # Global styles
│
├── App.jsx                       # Root component
├── main.jsx                      # Entry point
├── index.css                     # Global CSS
└── Logo.jsx
```

---

## 🔄 Import Aliases

The project uses these path aliases (defined in `jsconfig.json`):

| Alias | Path | Example |
|-------|------|---------|
| `@/*` | `./src/*` | `import { Button } from "@/shared/ui/button"` |

### Import Examples

```jsx
// Shared UI Components
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";

// Shared Helpers
import { formatDate, userProfile } from "@/shared/helpers/helper";

// Shared Hooks
import useAuthLoader from "@/shared/hooks/useAuthLoader";
import useSavedBlogs from "@/shared/hooks/useSavedBlogs";

// Redux Store
import { setToken } from "@/Redux/authSlice";

// Feature Components
import Auth from "@/features/auth/pages/Auth";
import BlogCard from "@/features/blogs/components/Blog-card";
import Messages from "@/features/chat/components/Messages";
```

---

## 📋 Migration Progress

### ✅ Completed
- [x] Move `lib/utils.js` → `shared/lib/utils.js`
- [x] Move `components/ui/*` → `shared/ui/*`
- [x] Move `helpers/*` → `shared/helpers/*`
- [x] Move `hooks/*` → `shared/hooks/*`
- [x] Create `features/auth/` (pages + components)
- [x] Create `features/chat/` (pages + components)
- [x] Create `features/blogs/` (pages + components)

### 🔲 Pending
- [ ] Create `features/groups/` (pages + components)
- [ ] Create `features/profile/` (pages + components)
- [ ] Create `features/pages/` (Page feature)
- [ ] Create `features/friends/`
- [ ] Create `features/notifications/`
- [ ] Create `features/landing/`
- [ ] Create `features/publications/`
- [ ] Move `Redux/` → `app/store/`
- [ ] Move `config/` → `shared/config/`
- [ ] Move `data/` → `shared/data/`

---

## 🏗️ Architecture Principles

### Feature-Based Structure
Each feature folder contains everything related to that feature:
```
features/[feature-name]/
├── pages/          # Page-level components (routes)
├── components/     # Feature-specific components
├── hooks/          # Feature-specific hooks (optional)
├── api/            # API calls (optional)
└── types/          # TypeScript types (optional)
```

### Shared Layer
The `shared/` folder contains code used across multiple features:
- **ui/** - Reusable UI primitives (shadcn/ui)
- **lib/** - Utility functions
- **helpers/** - Business logic helpers
- **hooks/** - Reusable custom hooks
- **config/** - Configuration (to be added)

### Import Rules
1. **Features can import from `shared/`**
2. **Features should NOT import from other features directly** (use Redux or props)
3. **Shared should NOT import from features**
4. **Use absolute imports with `@/` prefix**

---

## 🛠️ Adding shadcn/ui Components

The `components.json` is configured to install new components to `shared/ui/`:

```bash
npx shadcn-ui@latest add [component-name]
```

Components will be added to `src/shared/ui/`.
