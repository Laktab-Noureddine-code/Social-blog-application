<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;

// Controllers
use App\Http\Controllers\AmisController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogCommentController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\GroupMessageController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\HidePublicationsController;
use App\Http\Controllers\RapportPublicationController;
use App\Http\Controllers\SavedBlogController;

// Authenticated user
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'LogIn']);
Route::post('/logout', [AuthController::class, 'LogOut']);

// Posts
Route::post('/ajouter-post', [PostController::class, 'store'])->middleware('auth:sanctum');
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts-videos', [PostController::class, 'indexVideos']);
Route::get('/post/{post}', [PostController::class, 'show'])->middleware('auth:sanctum');
Route::post('/save-post/{post}', [PostController::class, 'save'])->middleware('auth:sanctum');
Route::delete('/unsave-post/{post}', [PostController::class, 'unSave'])->middleware('auth:sanctum');

// Comments
Route::get('/comment/{id}', [PostController::class, 'Comments']);
Route::post('/storComment', [CommentController::class, 'store'])->middleware('auth:sanctum');

// Likes
Route::post('/likes/{id}', [LikeController::class, 'checkLike'])->middleware('auth:sanctum');
Route::get('/likes/users/{id}', [LikeController::class, 'getUersLike'])->middleware('auth:sanctum');

// Profile & Users
Route::put('/complet_profile/{user}', [UserController::class, 'completProfile'])->middleware('auth:sanctum');
Route::patch('/update/{user}', [UserController::class, 'update'])->middleware('auth:sanctum');
Route::get('/profile/{user}', [ProfileController::class, 'Profile_data']);
Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');

// Friends & Invitations
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

// Pages
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
});

// Rapport (Signalements)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/declare/{post}', [RapportPublicationController::class, 'store']);
    Route::delete('/declare/{post}', [RapportPublicationController::class, 'destroy']);
    Route::get('/rapports', [RapportPublicationController::class, 'index']);
});

// Cacher les publications
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/hide/{post}', [HidePublicationsController::class, 'hide']);
    Route::delete('/hide/{post}', [HidePublicationsController::class, 'unhide']);
});

// Messages privés et groupes
Route::middleware('auth:sanctum')->group(function () {
    // Chat privé
    Route::get('/messages/{id}', [MessageController::class, 'index']);
    Route::post('/messages/send', [MessageController::class, 'sendMessage']);
    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);
    Route::get('/related-users', [MessageController::class, 'getMessagePartnersAndFriends']);

    // Recherche dans la messagerie
    Route::post('/search/propositions/{user}', [SearchController::class, 'getSearchPropositions']);

    // Chat de groupe
    Route::post('/group/messages/send', [GroupMessageController::class, 'sendGroupMessage']);
    Route::get('/group/messages/{id}', [GroupMessageController::class, 'getAllGroupMessages']);
});

// Groupes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/groups/create', [GroupController::class, 'store']);
    // Lister tous les groupes

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

// Notifications
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index']);
});


Route::middleware('auth:sanctum')->get('/saved-posts', [PostController::class, 'getSavedPostsWithRelations']);





// routes/api.php
Route::get('/users/search', [UserController::class, 'search']);



// Blogs
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
    Route::post('/blogs/{blog}/save', [SavedBlogController::class, 'store']);
    Route::delete('/blogs/{blog}/unsave', [SavedBlogController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->get('/saved-posts', [PostController::class, 'getSavedPostsWithRelations']);
