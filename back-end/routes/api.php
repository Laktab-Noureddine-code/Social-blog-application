<?php

use App\Http\Controllers\AmisController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;

use App\Http\Controllers\GroupController;
use App\Http\Controllers\GroupMessageController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

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

// Comments
Route::get('/comment/{id}', [PostController::class, 'Comments']);
Route::post('/storComment', [CommentController::class, 'store'])->middleware('auth:sanctum');

// Likes
Route::post('/likes/{id}', [LikeController::class, 'checkLike'])->middleware('auth:sanctum');
Route::get('/likes/users/{id}', [LikeController::class, 'getUersLike'])->middleware('auth:sanctum');

// Profile & user
Route::PUT('/complet_profile/{user}', [UserController::class, 'completProfile'])->middleware('auth:sanctum');
Route::get('/profile/{user}', [ProfileController::class, 'Profile_data']);
Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');

// Friends & Invitations
Route::post('/toogleamis', [UserController::class, 'toogleAmis']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/amis/{user}', [UserController::class, 'getAmis']);
    Route::post('/invitations/{user}/refuse', [InvitationController::class, 'refuse']);
    Route::post('/invitations/{user}/cancel', [InvitationController::class, 'cancel']);
    Route::post('/invitations/{user}/accept', [InvitationController::class, 'accept']);
    Route::post('/invitations/{user}/send', [InvitationController::class, 'send']);
    Route::post('/amis/{user}/remove', [AmisController::class, 'removeFriend']);
});

// getting friends 
Route::get('/users', [UserController::class, 'index'])
    ->middleware('auth:sanctum');


// messages routes
Route::middleware('auth:sanctum')->group(function () {
    // simple chat
    Route::get('/messages/{id}', [MessageController::class, 'index']);
    Route::post('/messages/send', [MessageController::class, 'sendMessage']);
    Route::put('/messages/{id}', [MessageController::class, 'update']);
    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);

    // friends and the ones in chat
    Route::get('/related-users', [MessageController::class, 'relatedUsers']);

    // group chat
    Route::post('/group/messages/send', [GroupMessageController::class, 'sendGroupMessage']);
    Route::get('/group/messages', [GroupMessageController::class, 'getAllGroupMessages']);
});

// groupes
Route::middleware('auth:sanctum')->group(function () {
    // Créer un groupe
    Route::post('/groups/create', [GroupController::class, 'store']);

    // Lister tous les groupes
    Route::get('/groups', [GroupController::class, 'index']);
    Route::get('/groups/userGroups', [GroupController::class, 'userGroups']);

    // update
    Route::put('/groups/{id}/update-info', [GroupController::class, 'updateGroupInfo']);
    Route::put('/groups/{id}/update-cover', [GroupController::class, 'updateGroupCover']);
    Route::delete('/groups/{id}', [GroupController::class, 'destroy']);

    // membership
    Route::post('/groups/{id}/join', [GroupController::class, 'joinGroup']);
    Route::put('/groups/{groupId}/accept-member/{userId}', [GroupController::class, 'acceptMember']);
    Route::delete('/groups/{group}/leave', [GroupController::class, 'leaveGroup']);
    Route::delete('/groups/{group}/remove/{user}', [GroupController::class, 'removeMember']);
    Route::post('/groups/{group}/invite-members', [GroupController::class, 'inviteMembers']);
});

// notifications
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index']);
});