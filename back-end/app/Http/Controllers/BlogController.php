<?php

namespace App\Http\Controllers;

use App\Events\Notifications;
use App\Models\Blog;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Models\Notification;
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
        // Get all blogs with their creator, comments, likes, and the user who created it
        $blogs = Blog::with(['creator', 'comments.user', 'likes.user', 'createdByUser'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        // Pour chaque blog, vérifier si le creator_type est une page ou un groupe
        // et ajouter les administrateurs et le créateur si nécessaire
        foreach ($blogs as $blog) {
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
        
        return response()->json($blogs);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        // Load the blog with its relationships including the user who created it
        $blog->load(['creator', 'comments.user', 'likes.user', 'createdByUser']);
        
        // Vérifier si le creator_type est une page ou un groupe
        // et ajouter les administrateurs et le créateur si nécessaire
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
        
        return response()->json($blog);
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
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'creator_type' => 'required|in:App\\Models\\User,App\\Models\\Group,App\\Models\\Page',
            'creator_id' => 'required|integer',
        ]);
    
        // Handle file upload if there's a cover image
        $coverImagePath = null;
        if ($request->hasFile('cover_image')) {
            $coverImagePath = $request->file('cover_image')->store('blog_covers', 'public');
        }
    
        // Create the blog
        $blog = Blog::create([
            'title' => $request->title,
            'content' => $request->content,
            'cover_image' => $coverImagePath,
            'creator_type' => $request->creator_type,
            'creator_id' => $request->creator_id,
            'created_by' => Auth::id(), // The user who created the blog
        ]);
    
        return response()->json(['message' => 'Blog created successfully', 'blog' => $blog], 201);
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

        // For Page creators, check if user has appropriate permissions
        if ($blog->creator_type === 'App\\Models\\Page') {
            $page = $creator;

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
        
            // If not the blog creator, check if user is admin or creator of the page
            if ($page->created_by === $user->id || $page->isAdmin($user->id)) {
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
    /**
     * Get blogs by creator (User, Group, or Page)
     */
    public function getByCreator(Request $request, $type, $id)
    {
        // Validate creator type
        if (!in_array($type, ['user', 'group', 'page'])) {
            return response()->json(['message' => 'Invalid creator type'], 400);
        }
    
        // Map type to model namespace
        $creatorType = match($type) {
            'user' => 'App\\Models\\User',
            'group' => 'App\\Models\\Group',
            'page' => 'App\\Models\\Page',
            default => null
        };
    
        // Get blogs by creator type and ID
        $blogs = Blog::where('creator_type', $creatorType)
            ->where('creator_id', $id)
            ->with(['creator', 'comments.user', 'likes.user'])
            ->orderBy('created_at', 'desc')
            ->get();
    
        return response()->json($blogs);
    }

    /**
     * Get all blogs created by a specific user (regardless of where they were posted)
     * This includes blogs the user created on their profile, in groups, or on pages
     */
    public function getAllUserBlogs($userId)
    {
        // Get all blogs created by this user, regardless of creator_type
        $blogs = Blog::where('created_by', $userId)
            ->with(['creator', 'comments.user', 'likes.user', 'createdByUser'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        // Pour chaque blog, vérifier si le creator_type est une page ou un groupe
        // et ajouter les administrateurs et le créateur si nécessaire
        foreach ($blogs as $blog) {
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
        
        return response()->json($blogs);
    }

    /**
     * Get all blogs for a specific entity (group or page)
     */
    public function getEntityBlogs($type, $entityId)
    {
        // Validate entity type
        if (!in_array($type, ['group', 'page'])) {
            return response()->json(['message' => 'Invalid entity type'], 400);
        }
        
        // Map type to model namespace
        $creatorType = match($type) {
            'group' => 'App\\Models\\Group',
            'page' => 'App\\Models\\Page',
            default => null
        };
        
        // Get blogs for this entity
        $blogs = Blog::where('creator_type', $creatorType)
            ->where('creator_id', $entityId)
            ->with(['creator', 'comments.user', 'likes.user', 'createdByUser'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        // Pour chaque blog, ajouter les administrateurs et le créateur si nécessaire
        foreach ($blogs as $blog) {
            if ($creatorType === 'App\\Models\\Group') {
                // Pour les groupes, charger le créateur et les membres admin
                $blog->creator->load('creator');
                $blog->group_admins = $blog->creator->members()
                    ->wherePivot('role', 'admin')
                    ->get();
            } elseif ($creatorType === 'App\\Models\\Page') {
                // Pour les pages, charger le propriétaire et les administrateurs
                $blog->creator->load('owner');
                $blog->creator->load('admins');
            }
        }
        
        return response()->json($blogs);
    }

    /**
     * Add a like to a blog
     */
    public function addLike(Request $request, Blog $blog)
    {
        $user = Auth::user();
        
        // Check if the user has already liked this blog
        $existingLike = $blog->likes()->where('user_id', $user->id)->first();
        
        if ($existingLike) {
            // User already liked this blog, so remove the like (toggle)
            $existingLike->delete();
            return response()->json(['message' => 'Like removed successfully']);
        }
        
        // Create a new like
        $blog->likes()->create([
            'user_id' => $user->id
        ]);
        
        // Éviter de notifier si l'utilisateur like son propre blog
        if ($blog->created_by != $user->id) {
            $notification = Notification::create([
                'user_id' => $blog->created_by, // Le créateur du blog
                'type' => 'like_blog',
                'description' => $user->name . ' a aimé votre blog',
                'content' => 'blogs/' . $blog->id,
                'is_read' => false,
            ]);
            
            // Diffuser la notification via Pusher
            event(new Notifications(
                $blog->created_by,            // Destinataire (créateur du blog)
                $notification->description,   // Message descriptif
                'like_blog',                  // Type de notification
                $notification->content        // Lien vers le blog
            ));
        }
        
        return response()->json(['message' => 'Blog liked successfully']);
    }
    
    /**
     * Add a comment to a blog
     */
    public function addComment(Request $request, Blog $blog)
    {
        $request->validate([
            'content' => 'required|string'
        ]);
        
        $user = Auth::user();
        
        // Create the comment
        $comment = $blog->comments()->create([
            'user_id' => $user->id,
            'content' => $request->content
        ]);
        
        // Load the user relationship for the new comment
        $comment->load('user');
        
        return response()->json(['message' => 'Comment added successfully', 'comment' => $comment]);
    }
}
