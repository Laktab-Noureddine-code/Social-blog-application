<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogCommentController extends Controller
{
    /**
     * Display the comments for a specific blog.
     */
    public function index(Blog $blog)
    {
        $comments = $blog->comments()->with('user')->get();
        
        return response()->json($comments);
    }

    /**
     * Store a newly created comment.
     */
    public function store(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:500',
        ]);
        
        $comment = $blog->comments()->create([
            'content' => $validated['content'],
            'user_id' => Auth::id(),
        ]);
        
        $comment->load('user');
        
        return response()->json($comment, 201);
    }

    /**
     * Update the specified comment.
     */
    public function update(Request $request, BlogComment $comment)
    {
        // Check if the authenticated user is the author of the comment
        if (Auth::id() !== $comment->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        $validated = $request->validate([
            'content' => 'required|string|max:500',
        ]);
        
        $comment->update([
            'content' => $validated['content'],
        ]);
        
        $comment->load('user');
        
        return response()->json($comment);
    }

    /**
     * Remove the specified comment.
     */
    public function destroy(BlogComment $comment)
    {
        // Check if the authenticated user is the author of the comment
        if (Auth::id() !== $comment->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        $comment->delete();
        
        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
