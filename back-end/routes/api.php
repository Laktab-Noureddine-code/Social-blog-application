<?php

use App\Http\Controllers\AuthController;
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


Route::post('/register', [AuthController::class, 'register']);

// getting friends 
Route::get('/users', [UserController::class, 'index'])
    ->middleware('auth:sanctum');


// messages routes
Route::middleware('auth:sanctum')->group(function () {
    // simple chat
    Route::get('/messages', [MessageController::class, 'index']);
    Route::post('/messages/send', [MessageController::class, 'sendMessage']);
    Route::get('/messages/{id}', [MessageController::class, 'show']);
    Route::put('/messages/{id}', [MessageController::class, 'update']);
    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);

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