<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Http\Requests\StoreLikeRequest;
use App\Http\Requests\UpdateLikeRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLikeRequest $request)
    {
        //
    }
    public function checkLike(Request $request)
    {
        $existing = Like::where('user_id', Auth::id())
            ->where('post_id', $request->id)
            ->first();

        if ($existing) {
            $existing->delete(); // Unlike    
        } else {
            Like::create([
                'user_id' => Auth::id(),
                'post_id' => $request->id
            ]); // Like
        }
        $likes = Like::where('post_id', $request->id)->with('user')->get();
        return response()->json($likes);
    }
    public function getUersLike(Request $request)
    {
        // $users = Like::where('post_id', $request->id)->users;
        $likes = Like::where('post_id', $request->id)->with('user')->get();
        return response()->json($likes);
    }

    /**
     * Display the specified resource.
     */
    public function show(Like $like)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLikeRequest $request, Like $like)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Like $like)
    {
        //
    }
}
