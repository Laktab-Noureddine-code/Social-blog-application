<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\SavedBlog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SavedBlogController extends Controller
{
    public function index()
    {
        $savedBlogs = Auth::user()->savedBlogs()->with(['user', 'creator'])->paginate(10);
        return response()->json($savedBlogs);
    }

    public function store(Blog $blog)
    {
        $existingSave = SavedBlog::where('user_id', Auth::id())
            ->where('blog_id', $blog->id)
            ->first();

        if ($existingSave) {
            return response()->json(['message' => 'Blog already saved'], 409);
        }

        $savedBlog = SavedBlog::create([
            'user_id' => Auth::id(),
            'blog_id' => $blog->id,
            'saved_at' => now()
        ]);

        return response()->json([
            'message' => 'Blog saved successfully',
            'saved_blog' => $savedBlog
        ], 201);
    }

    public function destroy(Blog $blog)
    {
        $deleted = SavedBlog::where('user_id', Auth::id())
            ->where('blog_id', $blog->id)
            ->delete();

        if ($deleted) {
            return response()->json(['message' => 'Blog removed from saved']);
        }

        return response()->json(['message' => 'Blog not found in saved items'], 404);
    }
}
