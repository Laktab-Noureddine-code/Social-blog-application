<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Http\Requests\UpdateCommentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:500',
            'post_id' => 'required|exists:posts,id'
        ]);
        $comment = Comment::create([
            'content' => $validated['content'],
            'post_id' =>$validated['post_id'],
            'user_id' => Auth::id(),
        ]);
        $comments = Comment::where('post_id', $validated['post_id'])->with('user')->get();
        $comment = $comment->load('user');
        // return response()->json([  'content' => $validated['content'],
        //     'post_id' =>$validated['post_id'],
        //     'user_id' => Auth::id(),] // include related user
        return response()->json(compact('comments','comment'));// include related user
    }


    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
