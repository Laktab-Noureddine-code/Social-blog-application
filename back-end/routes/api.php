<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers

use App\Http\Controllers\SavedBlogController;
use App\Http\Controllers\{
    AmisController,
    AuthController,
    BlogCommentController,
    BlogController,
    LikeController,
    PageController,
    PostController,
    UserController,
    GroupController,
    GroupMessageController,
    MessageController,
    NotificationController,
    SearchController,
    CommentController,
    ProfileController,
    InvitationController,
    HidePublicationsController,
    RapportPublicationController,
    NewPasswordController,
    PasswordResetLinkController
};

// 🔐 Authenticated user
Route::middleware('auth:sanctum')->get('/user', fn(Request $request) => $request->user());

// 🔐 Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'LogIn']);
Route::post('/logout', [AuthController::class, 'LogOut']);

// 📌 Posts
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/ajouter-post', [PostController::class, 'store']);
    Route::post('/save-post/{post}', [PostController::class, 'save']);
    Route::delete('/unsave-post/{post}', [PostController::class, 'unSave']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);
});
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts-videos', [PostController::class, 'indexVideos']);
Route::get('/post/{post}', [PostController::class, 'show']);
Route::get('/comment/{id}', [PostController::class, 'Comments']);

// 💬 Comments
Route::middleware('auth:sanctum')->post('/storComment', [CommentController::class, 'store']);

// 👍 Likes
Route::middleware('auth:sanctum')->post('/likes/{id}', [LikeController::class, 'checkLike']);
Route::middleware('auth:sanctum')->get('/likes/users/{id}', [LikeController::class, 'getUersLike']);

// 👤 User & Profile
Route::middleware('auth:sanctum')->group(function () {
    Route::put('/complet_profile/{user}', [UserController::class, 'completProfile']);
    Route::patch('/update/{user}', [UserController::class, 'update']);
    Route::put('/user/cover/{user}', [ProfileController::class, 'updateCover']);
    Route::put('/user/profile-image/{user}', [ProfileController::class, 'updateProfileImage']);
});
Route::get('/profile/{user}', [ProfileController::class, 'Profile_data']);
Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'index']);
Route::middleware('auth:sanctum')->get('/user/dashboard-data/{user}', [UserController::class, 'getUserDashboardData']);

// 👥 Amis & Invitations
Route::post('/toogleamis', [UserController::class, 'toogleAmis']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/amis/authers', [AmisController::class, 'GetAuthers']);
    Route::get('/amis/{user}', [UserController::class, 'getAmis']);
    Route::post('/invitations/{user}/refuse', [InvitationController::class, 'refuse']);
    Route::post('/invitations/{user}/cancel', [InvitationController::class, 'cancel']);
    Route::post('/invitations/{user}/accept', [InvitationController::class, 'accept']);
    Route::post('/invitations/{user}/send', [InvitationController::class, 'send']);
    Route::post('/amis/{user}/remove', [AmisController::class, 'removeFriend']);
});

// 📄 Pages
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/create-page', [PageController::class, 'CreatePage']);
    Route::get('/page/{page}', [PageController::class, 'showpage']);
    Route::post('/follow/{page}/{user}', [PageController::class, 'follow']);
    Route::delete('/unfollow/{page}/{user}', [PageController::class, 'unfollow']);
    Route::delete('/deleteFollowers/{page}/{user}', [PageController::class, 'remove_follower']);
    Route::delete('/removeAdmin/{page}/{user}', [PageController::class, 'remove_admin']);
    Route::get('/pages/pages', [PageController::class, 'getUserPagesData']);
    Route::get('/pages/other-pages', [PageController::class, 'getRecommendedPages']);
    Route::post('/page/{page}/invite-members', [PageController::class, 'inviteMembers']);
    Route::patch('/update-page/{page}', [PageController::class, 'update']);
    Route::put('/page/cover/{page}', [PageController::class, 'updateCover']);
    Route::put('/page/profile-image/{page}', [PageController::class, 'updateProfileImage']);
});

// 🚨 Rapports (signalements)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/declare/{post}', [RapportPublicationController::class, 'store']);
    Route::delete('/declare/{post}', [RapportPublicationController::class, 'destroy']);
    Route::get('/rapports', [RapportPublicationController::class, 'index']);
});

// 🙈 Cacher des publications
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/hide/{post}', [HidePublicationsController::class, 'hide']);
    Route::delete('/hide/{post}', [HidePublicationsController::class, 'unhide']);
});

// ✉️ Messages privés & groupes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/messages/{id}', [MessageController::class, 'index']);
    Route::post('/messages/send', [MessageController::class, 'sendMessage']);
    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);
    Route::get('/related-users', [MessageController::class, 'getMessagePartnersAndFriends']);

    // Group chat
    Route::post('/group/messages/send', [GroupMessageController::class, 'sendGroupMessage']);
    Route::get('/group/messages/{id}', [GroupMessageController::class, 'getAllGroupMessages']);
});

// 👥 Groupes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/groups/create', [GroupController::class, 'store']);
    Route::get('/groups', [GroupController::class, 'index']);
    Route::get('/groups/{group}', [GroupController::class, 'show']);
    Route::get('/groups/userGroups', [GroupController::class, 'userGroups']);
    Route::put('/groups/{id}/update-info', [GroupController::class, 'updateGroupInfo']);
    Route::put('/groups/{id}/update-cover', [GroupController::class, 'updateGroupCover']);
    Route::put('/groups/{id}/update-illustration', [GroupController::class, 'updateGroupIllustrationCover']);
    Route::delete('/groups/{id}', [GroupController::class, 'destroy']);
    Route::post('/groups/{id}/join', [GroupController::class, 'joinGroup']);
    Route::put('/groups/{groupId}/accept-member/{userId}', [GroupController::class, 'acceptMember']);
    Route::delete('/groups/{group}/leave', [GroupController::class, 'leaveGroup']);
    Route::delete('/groups/{group}/remove/{user}', [GroupController::class, 'removeMember']);
    Route::post('/groups/{group}/invite-members', [GroupController::class, 'inviteMembers']);
    Route::post('/groups/{group}/change-role', [GroupController::class, 'changeRole']);
    Route::post('/groups/{group}/accept-invitation', [GroupController::class, 'acceptInvitation']);
});

// 🔔 Notifications
Route::middleware('auth:sanctum')->get('/notifications', [NotificationController::class, 'index']);

// 🔍 Recherche
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/search/propositions/{user}', [SearchController::class, 'getSearchPropositions']);
    Route::get('/search', [SearchController::class, 'fullSearch']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/blogs/{blog}', [BlogController::class, 'show']);
    Route::post('/blogs', [BlogController::class, 'store']);
    Route::delete('/blogs/{blog}', [BlogController::class, 'destroy']);

    // blog comments
    Route::post('/blogs/{blog}/comment', [BlogController::class, 'addComment']);

    // blog likes
    Route::post('/blogs/{blog}/like', [BlogController::class, 'addLike']);

    // Get all blogs created by a specific user (regardless of where they were posted)
    Route::get('/blogs/user-created/{userId}', [BlogController::class, 'getAllUserBlogs']);
    // Get all blogs for a specific entity (group or page)
    Route::get('/blogs/entity/{type}/{entityId}', [BlogController::class, 'getEntityBlogs']);
});
// In routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/saved-blogs', [SavedBlogController::class, 'index']);
    Route::post('/blogs/{blog}/toggle-save', [SavedBlogController::class, 'toggle']);
});

Route::middleware('auth:sanctum')->get('/saved-posts', [PostController::class, 'getSavedPostsWithRelations']);
