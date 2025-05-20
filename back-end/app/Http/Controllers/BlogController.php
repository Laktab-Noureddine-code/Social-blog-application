<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all blogs with their creator, comments, and likes
        $blogs = Blog::with(['creator', 'comments.user', 'likes.user'])
                    ->orderBy('created_at', 'desc')
                    ->get();
        return response()->json($blogs);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'creator_id' => 'required|integer',
            'creator_type' => 'required|string',
        ]);
        
        // Handle cover image upload if present
        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('blog_covers', 'public');
            $validated['cover_image'] = $path;
        }
        
        // Add the authenticated user as the creator
        $validated['created_by'] = Auth::id();
        
        // Create the blog
        $blog = Blog::create($validated);
        
        // Load relationships
        $blog->load(['creator', 'comments', 'likes']);
        
        return response()->json($blog, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        // Load the blog with its creator, comments, and likes
        $blog->load(['creator', 'comments.user', 'likes.user']);
        
        return response()->json($blog);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        
        // Handle cover image upload if present
        if ($request->hasFile('cover_image')) {
            // Delete old image if exists
            if ($blog->cover_image) {
                Storage::disk('public')->delete($blog->cover_image);
            }
            
            $path = $request->file('cover_image')->store('blog_covers', 'public');
            $validated['cover_image'] = $path;
        }
        
        // Update the blog
        $blog->update($validated);
        
        // Load relationships
        $blog->load(['creator', 'comments', 'likes']);
        
        return response()->json($blog);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        // Check if the authenticated user is the creator of the blog
        $user = Auth::user();
        
        // Get the creator regardless of type (User or Group)
        $creator = $blog->creator;
        
        // For User creators, check direct ownership
        if ($blog->creator_type === 'App\\Models\\User' && $blog->creator_id === $user->id) {
            // Delete cover image if exists
            if ($blog->cover_image) {
                Storage::disk('public')->delete($blog->cover_image);
            }
            // Delete the blog
            $blog->delete();
            return response()->json(['message' => 'Blog deleted successfully']);
        }
        
        // For Group creators, check if user is a member with appropriate permissions
        if ($blog->creator_type === 'App\\Models\\Group') {
            $group = $creator;
            
            // Check if the authenticated user is the actual creator of the blog
            if ($blog->created_by === $user->id) {
                // Delete cover image if exists
                if ($blog->cover_image) {
                    Storage::disk('public')->delete($blog->cover_image);
                }
                // Delete the blog
                $blog->delete();
                return response()->json(['message' => 'Blog deleted successfully']);
            }
            
            // If not the blog creator, check if user is admin or creator of the group
            $member = $group->members()->where('user_id', $user->id)->first();
            if ($member && ($member->pivot->role === 'admin' || $group->created_by === $user->id)) {
                // Delete cover image if exists
                if ($blog->cover_image) {
                    Storage::disk('public')->delete($blog->cover_image);
                }
                // Delete the blog
                $blog->delete();
                return response()->json(['message' => 'Blog deleted successfully']);
            }
        }
        
        // If we reach here, user doesn't have permission
        return response()->json(['message' => 'You do not have permission to delete this blog'], 403);
    }
    
    /**
     * Get blogs by creator (User or Group)
     */
    public function getByCreator(Request $request, $type, $id)
    {
        // Validate creator type
        if (!in_array($type, ['user', 'group'])) {
            return response()->json(['message' => 'Invalid creator type'], 400);
        }
        
        // Map type to model namespace
        $creatorType = $type === 'user' ? 'App\\Models\\User' : 'App\\Models\\Group';
        
        // Get blogs by creator type and ID
        $blogs = Blog::where('creator_type', $creatorType)
                    ->where('creator_id', $id)
                    ->with(['creator', 'comments.user', 'likes.user'])
                    ->orderBy('created_at', 'desc')
                    ->get();
        
        return response()->json($blogs);
    }
}
