<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
    // return response()->json([
    //     'message' => 'Hello World',
    // ]);
})->middleware('auth:sanctum');


Route::post('/register',[AuthController::class,'register']);
// Route::post('/register',function(Request $request){
// //    return $request->all();
//    return response()->json([
//     'message' => 'Hello World',
//    ]);
// });