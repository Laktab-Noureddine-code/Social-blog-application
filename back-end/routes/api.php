<?php

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;
// use Illuminate\Support\Facades\Broadcast;

// // Controllers
// use App\Http\Controllers\AmisController;
// use App\Http\Controllers\AuthController;
// use App\Http\Controllers\BlogCommentController;
// use App\Http\Controllers\BlogController;
// use App\Http\Controllers\LikeController;
// use App\Http\Controllers\PageController;
// use App\Http\Controllers\PostController;
// use App\Http\Controllers\UserController;
// use App\Http\Controllers\GroupController;
// use App\Http\Controllers\GroupMessageController;
// use App\Http\Controllers\MessageController;
// use App\Http\Controllers\NotificationController;
// use App\Http\Controllers\SearchController;
// use App\Http\Controllers\CommentController;
// use App\Http\Controllers\ProfileController;
// use App\Http\Controllers\InvitationController;
// use App\Http\Controllers\HidePublicationsController;
// use App\Http\Controllers\NewPasswordController;
// use App\Http\Controllers\PasswordResetLinkController;
// use App\Http\Controllers\RapportPublicationController;

// // Authenticated user
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// // Auth routes
// Route::post('/register', [AuthController::class, 'register']);
// Route::post('/login', [AuthController::class, 'LogIn']);
// Route::post('/logout', [AuthController::class, 'LogOut']);

// // Posts
// Route::post('/ajouter-post', [PostController::class, 'store'])->middleware('auth:sanctum');
// Route::get('/posts', [PostController::class, 'index']);
// Route::get('/posts-videos', [PostController::class, 'indexVideos']);
// Route::get('/post/{post}', [PostController::class, 'show'])->middleware('auth:sanctum');
// Route::post('/save-post/{post}', [PostController::class, 'save'])->middleware('auth:sanctum');
// Route::delete('/unsave-post/{post}', [PostController::class, 'unSave'])->middleware('auth:sanctum');
// Route::delete('/posts/{post}', [PostController::class, 'destroy'])->middleware('auth:sanctum');
// // posts / ${post . id}

// // Comments
// Route::get('/comment/{id}', [PostController::class, 'Comments']);
// Route::post('/storComment', [CommentController::class, 'store'])->middleware('auth:sanctum');

// // Likes
// Route::post('/likes/{id}', [LikeController::class, 'checkLike'])->middleware('auth:sanctum');
// Route::get('/likes/users/{id}', [LikeController::class, 'getUersLike'])->middleware('auth:sanctum');

// // Profile & Users
// Route::put('/complet_profile/{user}', [UserController::class, 'completProfile'])->middleware('auth:sanctum');
// Route::patch('/update/{user}', [UserController::class, 'update'])->middleware('auth:sanctum');
// Route::get('/profile/{user}', [ProfileController::class, 'Profile_data']);
// Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');
// Route::middleware('auth:sanctum')->group(function () {
//     Route::put('/user/cover/{user}', [ProfileController::class, 'updateCover']);
//     Route::put('/user/profile-image/{user}', [ProfileController::class, 'updateProfileImage']);
// });

// // Friends & Invitations
// Route::post('/toogleamis', [UserController::class, 'toogleAmis']);
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/amis/authers', [AmisController::class, 'GetAuthers']);
//     Route::get('/amis/{user}', [UserController::class, 'getAmis']);
//     Route::post('/invitations/{user}/refuse', [InvitationController::class, 'refuse']);
//     Route::post('/invitations/{user}/cancel', [InvitationController::class, 'cancel']);
//     Route::post('/invitations/{user}/accept', [InvitationController::class, 'accept']);
//     Route::post('/invitations/{user}/send', [InvitationController::class, 'send']);
//     Route::post('/amis/{user}/remove', [AmisController::class, 'removeFriend']);
// });
// Route::get('/user/dashboard-data/{user}', [UserController::class, 'getUserDashboardData'])->middleware('auth:sanctum');

// // Pages
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/create-page', [PageController::class, 'CreatePage']);
//     Route::get('/page/{page}', [PageController::class, 'showpage']);
//     Route::post('/follow/{page}/{user}', [PageController::class, 'follow']);
//     Route::delete('/unfollow/{page}/{user}', [PageController::class, 'unfollow']);
//     Route::delete('/deleteFollowers/{page}/{user}', [PageController::class, 'remove_follower']);
//     Route::delete('/removeAdmin/{page}/{user}', [PageController::class, 'remove_admin']);
//     Route::get('/pages/pages', [PageController::class, 'getUserPagesData']);
//     Route::get('/pages/other-pages', [PageController::class, 'getRecommendedPages']);
//     Route::post('/page/{page}/invite-members', [PageController::class, 'inviteMembers']);
//     Route::PATCH('/update-page/{page}', [PageController::class, 'update']);
//     Route::put('/page/cover/{page}', [PageController::class, 'updateCover']);
//     Route::put('/page/profile-image/{page}', [PageController::class, 'updateProfileImage']);
// });

// // Rapport (Signalements)
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/declare/{post}', [RapportPublicationController::class, 'store']);
//     Route::delete('/declare/{post}', [RapportPublicationController::class, 'destroy']);
//     Route::get('/rapports', [RapportPublicationController::class, 'index']);
// });

// // Cacher les publications
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/hide/{post}', [HidePublicationsController::class, 'hide']);
//     Route::delete('/hide/{post}', [HidePublicationsController::class, 'unhide']);
// });

// // Messages privés et groupes
// Route::middleware('auth:sanctum')->group(function () {
//     // Chat privé
//     Route::get('/messages/{id}', [MessageController::class, 'index']);
//     Route::post('/messages/send', [MessageController::class, 'sendMessage']);
//     Route::delete('/messages/{id}', [MessageController::class, 'destroy']);
//     Route::get('/related-users', [MessageController::class, 'relatedUsers']);

//     // Recherche dans la messagerie
//     // Ajouter ces routes dans la section des routes authentifiées
    
//     // Recherche - suggestions en temps réel
//     Route::post('/search/propositions/{user}', [SearchController::class, 'getSearchPropositions']);
    
//     // Recherche complète avec pagination
//     Route::get('/search', [SearchController::class, 'fullSearch']);

//     // Chat de groupe
//     Route::post('/group/messages/send', [GroupMessageController::class, 'sendGroupMessage']);
//     Route::get('/group/messages/{id}', [GroupMessageController::class, 'getAllGroupMessages']);
// });

// // Groupes
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/groups/create', [GroupController::class, 'store']);
//     // Lister tous les groupes

//     Route::get('/groups', [GroupController::class, 'index']);
//     Route::get('/groups/{group}', [GroupController::class, 'show']);
//     Route::get('/groups/userGroups', [GroupController::class, 'userGroups']);
//     Route::put('/groups/{id}/update-info', [GroupController::class, 'updateGroupInfo']);
//     Route::put('/groups/{id}/update-cover', [GroupController::class, 'updateGroupCover']);
//     Route::delete('/groups/{id}', [GroupController::class, 'destroy']);
//     Route::post('/groups/{id}/join', [GroupController::class, 'joinGroup']);
//     Route::put('/groups/{groupId}/accept-member/{userId}', [GroupController::class, 'acceptMember']);
//     Route::delete('/groups/{group}/leave', [GroupController::class, 'leaveGroup']);
//     Route::delete('/groups/{group}/remove/{user}', [GroupController::class, 'removeMember']);
//     Route::post('/groups/{group}/invite-members', [GroupController::class, 'inviteMembers']);
//     Route::post('/groups/{group}/change-role', [GroupController::class, 'changeRole']);
//     Route::get('/groups/{group}/posts', [GroupController::class, 'postsGroup']);
// });

// // Notifications
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/notifications', [NotificationController::class, 'index']);
// });


// <<<<<<< HEAD

// =======
// >>>>>>> 1fc7c82a87fac63603f53d9f7e30ac5ccac045dd
// Route::middleware('auth:sanctum')->get('/saved-posts', [PostController::class, 'getSavedPostsWithRelations']);





// // routes/api.php
// Route::get('/users/search', [UserController::class, 'search']);


// <<<<<<< HEAD
// // router pour suppromer un foller d'une page
// =======
// >>>>>>> 1fc7c82a87fac63603f53d9f7e30ac5ccac045dd

// // Blogs
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/blogs', [BlogController::class, 'index']);
//     Route::get('/blogs/{blog}', [BlogController::class, 'show']);
//     Route::post('/blogs', [BlogController::class, 'store']);
//     Route::delete('/blogs/{blog}', [BlogController::class, 'destroy']);

//     // blog comments
//     Route::post('/blogs/{blog}/comment', [BlogController::class, 'addComment']);

//     // blog likes
//     Route::post('/blogs/{blog}/like', [BlogController::class, 'addLike']);

//     // Get all blogs created by a specific user (regardless of where they were posted)
//     Route::get('/blogs/user-created/{userId}', [BlogController::class, 'getAllUserBlogs']);
//     // Get all blogs for a specific entity (group or page)
//     Route::get('/blogs/entity/{type}/{entityId}', [BlogController::class, 'getEntityBlogs']);
// });
// <<<<<<< HEAD
// Route::middleware('auth:sanctum')->get('/saved-posts', [PostController::class, 'getSavedPostsWithRelations']);







// // Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
// // Route::get('/reset-password', [NewPasswordController::class, 'reset'])->middleware('guest')->name('password.reset');
// Route::post('/reset-password', [NewPasswordController::class, 'store']);
// Route::post('/forgot-password', [PasswordResetLinkController::class, 'sendResetLink']);

// // Route::get('/reset-password/{token}', function ($token) {
// //     return view('auth.reset-password', ['token' => $token]);
// // })->middleware('guest')->name('password.reset');
// =======

// Route::middleware('auth:sanctum')->get('/saved-posts', [PostController::class, 'getSavedPostsWithRelations']);
// >>>>>>> 1fc7c82a87fac63603f53d9f7e30ac5ccac045dd


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
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
    Route::get('/related-users', [MessageController::class, 'relatedUsers']);

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
    Route::delete('/groups/{id}', [GroupController::class, 'destroy']);
    Route::post('/groups/{id}/join', [GroupController::class, 'joinGroup']);
    Route::put('/groups/{groupId}/accept-member/{userId}', [GroupController::class, 'acceptMember']);
    Route::delete('/groups/{group}/leave', [GroupController::class, 'leaveGroup']);
    Route::delete('/groups/{group}/remove/{user}', [GroupController::class, 'removeMember']);
    Route::post('/groups/{group}/invite-members', [GroupController::class, 'inviteMembers']);
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