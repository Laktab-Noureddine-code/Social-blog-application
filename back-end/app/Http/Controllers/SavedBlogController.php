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
        // Get saved blogs with their creator, comments, likes, and the user who created it
        $savedBlogs = Auth::user()->savedBlogs()
            ->with(['creator', 'comments.user', 'likes.user', 'createdByUser'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        // Pour chaque blog, vérifier si le creator_type est une page ou un groupe
        // et ajouter les administrateurs et le créateur si nécessaire
        foreach ($savedBlogs as $blog) {
            if ($blog->creator_type === 'App\\Models\\Group') {
                // Pour les groupes, charger le créateur et les membres admin
                $blog->creator->load('creator');
                $blog->group_admins = $blog->creator->members()
                    ->wherePivot('role', 'admin')
                    ->get();
            } elseif ($blog->creator_type === 'App\\Models\\Page') {
                // Pour les pages, charger le propriétaire et les administrateurs
                $blog->creator->load('owner');
                $blog->creator->load('admins');
            }
        }
        
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
