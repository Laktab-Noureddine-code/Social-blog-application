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
        $savedBlogs = Auth::user()->savedBlogs()->with('creator')->get();
        return response()->json($savedBlogs);
    }

    public function toggle(Blog $blog)
    {
        $user = Auth::user();
        $exists = $blog->isSavedBy($user);

        if ($exists) {
            // Si le blog est déjà sauvegardé, on le supprime
            $user->savedBlogs()->detach($blog->id);
            return response()->json(['message' => 'Blog removed from saved', 'saved' => false]);
        } else {
            // Sinon, on le sauvegarde
            $user->savedBlogs()->attach($blog->id, ['saved_at' => now()]);
            return response()->json(['message' => 'Blog saved successfully', 'saved' => true]);
        }
    }



}
