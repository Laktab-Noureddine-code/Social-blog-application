<?php

use App\Http\Controllers\AmisController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'LogIn']);
Route::post('/logout',[AuthController::class,'LogOut']);
Route::get('/comment/{id}',[PostController::class,'Comments']);
Route::post('/storComment',[CommentController::class,'store'])->middleware('auth:sanctum');
Route::post('/likes/{id}',[LikeController::class,'checkLike'])->middleware('auth:sanctum');
Route::get('/likes/users/{id}',[LikeController::class,'getUersLike'])->middleware('auth:sanctum');
Route::PUT('/complet_profile/{user}', [UserController::class, 'completProfile'])->middleware('auth:sanctum');
Route::post('/ajouter-post',[PostController::class,'store'])->middleware('auth:sanctum');
Route::get('/post/{post}',[PostController::class,'show'])->middleware('auth:sanctum');


Route::get('/posts',[PostController::class,'index']);

Route::post('/toogleamis',[UserController::class, 'toogleAmis']);
Route::get('/posts-videos',[PostController::class, 'indexVideos']);



Route::get('/profile/{user}',[ProfileController::class, 'Profile_data']);





Route::middleware('auth:sanctum')->group(function () {
    Route::get('/amis/{user}', [UserController::class, 'getAmis']);
    Route::post('/invitations/{user}/refuse', [InvitationController::class, 'refuse']);
    Route::post('/invitations/{user}/cancel', [InvitationController::class, 'cancel']);
    Route::post('/invitations/{user}/accept', [InvitationController::class, 'accept']);
    Route::post('/invitations/{user}/send', [InvitationController::class, 'send']);
    Route::post('/amis/{user}/remove', [AmisController::class, 'removeFriend']);

});
