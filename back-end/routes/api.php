<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);


// getting friends 
Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');

// messages routes
Route::post('messages/send', [MessageController::class, 'sendMessage'])->middleware('auth:sanctum');
Route::post('messages', [MessageController::class, 'index'])->middleware('auth:sanctum');