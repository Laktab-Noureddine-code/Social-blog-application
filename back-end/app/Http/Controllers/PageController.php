<?php

namespace App\Http\Controllers;

use App\Events\Notifications;
use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str;
use App\Models\DemandeAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StorePageRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdatePageRequest;
use App\Models\Notification;
use Illuminate\Database\Eloquent\Collection;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function showpage(Page $page)
    {
        // Eager load posts with their medias
        $posts = Post::where('page_id', $page->id)
            ->with('page', 'Medias', 'Comments', 'Likes', 'adminPost')->orderBy("created_at", 'desc')->get();

        // Collect all media URLs
        $medias = [];

        foreach ($posts as $post) {
            foreach ($post->Medias as $media) {
                $medias[] = ['url' => $media->url, 'type' => $media->type];
            }
        }

        $followorsCount = Count($page->followers);
        $admins = $page->admins;

        return response()->json([
            'page' => $page,
            'admins' => $admins,
            'medias' => $medias,
            'posts' => $posts,
            'followorsCount' => $followorsCount
        ]);
    }



    //     public function showpage(Page $page)
    // {
    //     // Eager load posts with their medias
    //     $posts = Post::where('page_id', $page->id)
    //         ->with('page', 'Medias', 'Comments', 'Likes', 'adminPost')
    //         ->orderBy("created_at", 'desc')
    //         ->get();

    //     // Collect media URLs
    //     $medias = [];
    //     foreach ($posts as $post) {
    //         foreach ($post->Medias as $media) {
    //             $medias[] = [
    //                 'url' => $media->url,
    //                 'type' => $media->type
    //             ];
    //         }
    //     }

    //     // Load followers with pivot timestamps
    //     $page->load('followers');
    //     $followorsCount = $page->followers->count();

    //     $followers = $page->followers->map(function ($follower) {
    //         return [
    //             'id' => $follower->id,
    //             'name' => $follower->name,
    //             'image_profile_url' => $follower->image_profile_url,
    //             'couverture_url' => $follower->couverture_url,
    //             'followed_at' => $follower->pivot->created_at,
    //         ];
    //     });

    //     $admins = $page->admins;

    //     return response()->json([
    //         'page' => $page,
    //         'admins' => $admins,
    //         'followers' => $followers,
    //         'followorsCount' => $followorsCount,
    //         'medias' => $medias,
    //         'posts' => $posts,
    //     ]);
    // }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        $page->delete();
        return response()->json(['message' => 'Page deleted successfully']);
    }

    public function CreatePage(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'localisation' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'website' => 'nullable|string|max:255',
            'Pagecouverture' => 'nullable|string',
            'Page_image_profile' => 'nullable|string',
        ]);


        if ($request->filled('Pagecouverture')) {
            $couvertureData = base64_decode($request->input('Pagecouverture'));
            $couvertureName = Str::random(10) . time() . '.jpg'; // Adjust extension as needed
            Storage::disk('public')->put("page/couverture/$couvertureName", $couvertureData);
            $path_couverture = "page/couverture/$couvertureName";
        }
        if ($request->filled('Page_image_profile')) {
            $couvertureData = base64_decode($request->input('Page_image_profile'));
            $couvertureName = Str::random(10) . time() . '.jpg'; // Adjust extension as needed
            Storage::disk('public')->put("page/profile_image/$couvertureName", $couvertureData);
            $path_image_profile = "page/profile_image/$couvertureName";
        }
        $page = Page::create([
            'name' => $request['name'],
            'description' => $request['description'] ?? null,
            'localisation' => $request['localisation'] ?? null,
            'category' => $request['category'] ?? null,
            'phone' => $request['phone'] ?? null,
            'email' => $request['email'] ?? null,
            'location' => $request['location'] ?? null,
            'website' => $request['website'] ?? null,
            'cover_image_url' => $path_couverture ? asset("storage/" . $path_couverture) : null,
            'profile_image_url' => $path_image_profile ? asset("storage/" . $path_image_profile) : null,
            'user_id' => Auth::id(),
        ]);
        if (!$page) {
            // Log::error('User update failed', ['data' => $request->all()]);
            return response()->json(['success' => false, 'message' => 'Update failed'], 500);
        }

        return response()->json($page);
    }
    public function update(Request $request, Page $page)
    {
        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'localisation' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'website' => 'nullable|string|max:255',
        ]);

        $update = $page->update([
            'name' => $request['name'],
            'description' => $request['description'] ?? null,
            'localisation' => $request['localisation'] ?? null,
            'category' => $request['category'] ?? null,
            'phone' => $request['phone'] ?? null,
            'email' => $request['email'] ?? null,
            'location' => $request['location'] ?? null,
            'website' => $request['website'] ?? null,
        ]);
    if($update)
        return response()->json($page);
    }

    public function follow(Page $page, User $user)
    {
        // $user = Auth::user();
    
        // Check if already followed
        if (!$user->followedPages()->where('page_id', $page->id)->exists()) {
            $user->followedPages()->attach($page->id);
            
            // Créer une notification pour le propriétaire de la page
            $notification = Notification::create([
                'user_id' => $page->user_id, // Le propriétaire de la page
                'type' => 'follow_page',
                'description' => $user->name . ' a commencé à suivre votre page "' . $page->name . '"',
                'content' => 'page/' . $page->id,
                'is_read' => false,
            ]);
            
            // Diffuser la notification via Pusher
            event(new Notifications(
                $page->user_id,              // Destinataire (propriétaire de la page)
                $notification->description,  // Message descriptif
                'follow_page',               // Type de notification
                $notification->content       // Lien vers la page
            ));
        }
    
        return response()->json($page);
    }

    public function unfollow(Page $page, User $user)
    {
        $user->followedPages()->detach($page->id);

        return response()->json($page);
    }

    public function getUserPagesData()
    {
        $user = Auth::user();

        // 1. Pages created by the user (with followers count)
        $myPages = $user->pages()->withCount('followers')->get();

        // 2. Pages where user is admin
        $adminPages = $user->adminPages()->withCount('followers')->get();

        // 3. Pages the user is following
        $followingPages = $user->followedPages()->withCount('followers')->get();


        // 4. Pages followed by friends

        $amis = $user->amis()->with('followedPages')->get();
        $amisOf = $user->amisOf()->with('followedPages')->get();

        // Merge friends
        $allFriends = $amis->merge($amisOf)->unique('id');

        // Flatten all followed pages into a single collection
        $followedPages = $allFriends
            ->flatMap(fn($friend) => $friend->followedPages)
            ->unique('id')
            ->take(10);

        // Convert to Eloquent Collection to use loadCount
        $followedPages = new Collection($followedPages);

        // Load followers count
        $followedPages->loadCount('followers');

        // 5 -
        return response()->json([
            'my_pages' => $myPages,
            'admin_pages' => $adminPages,
            'following_pages' => $followingPages,
        ]);
    }


    public function getRecommendedPages()
    {
        $user = Auth::user();

        // Get friends with their followed pages
        $amis = $user->amis()->with('followedPages')->get();
        $amisOf = $user->amisOf()->with('followedPages')->get();

        $allFriends = $amis->merge($amisOf)->unique('id');

        // IDs des pages que l'utilisateur suit déjà (pour filtrer après)
        $followedIds = $user->followedPages()->pluck('pages.id')->toArray();

        // Flatten friends' followed pages and remove duplicates
        $friendPages = $allFriends
            ->flatMap(fn($friend) => $friend->followedPages)
            ->unique('id')
            ->filter(
                fn($page) =>
                $page->user_id !== $user->id &&              // pas ses propres pages
                    !in_array($page->id, $followedIds)          // et que l'utilisateur ne suit pas déjà
            );

        $friendPages = new Collection($friendPages);
        $friendPages->loadCount('followers');

        // Get IDs of pages user owns or is admin of
        $ownedIds = $user->pages()->pluck('pages.id');
        $adminIds = $user->adminPages()->pluck('pages.id');

        // Exclude pages where user is creator, admin, or follower
        $excludedPageIds = $ownedIds
            ->merge($adminIds)
            ->merge($followedIds)
            ->unique();

        // Get other pages NOT related to user (exclude owned, followed, admin pages)
        $otherPages = Page::whereNotIn('id', $excludedPageIds)
            ->where('user_id', '!=', $user->id)
            ->withCount('followers')
            ->latest()
            ->take(10)
            ->get();

        // Combine friend pages first, then other pages
        $allPages = $friendPages->concat($otherPages)->unique('id');

        return response()->json(
            $allPages->map(function ($page) {
                return [
                    'id' => $page->id,
                    'name' => $page->name,
                    'profile_image_url' => $page->profile_image_url,
                    'cover_image_url' => $page->cover_image_url,
                    'followers_count' => $page->followers_count,
                    'category' => $page->category,
                ];
            })->values()->all()
        );
    }


    public function remove_follower(Page $page, User $user)
    {
        $user->followedPages()->detach($page->id);
        return response()->json($user);
    }
    public function remove_admin(Page $page, User $user)
    {
        $page->admins()->detach($user->id);
        return response()->json($user);
    }

    public function inviteMembers(Request $request, $page_id)
    {
        $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $authUser = Auth::user();
        $message = "Vous avez été invité à devenir administrateur de la page.";

        foreach ($request->user_ids as $user_id) {
            // Évite les doublons
            $alreadyRequested = DemandeAdmin::where('user_id', $user_id)
                ->where('page_id', $page_id)
                ->where('id_demondeur', $authUser->id)
                ->first();

            if (!$alreadyRequested) {
                DemandeAdmin::create([
                    'user_id' => $user_id,
                    'page_id' => $page_id,
                    'id_demondeur' => $authUser->id,
                    'message' => $message,
                ]);
            }
        }

        return response()->json(['message' => 'Invitations envoyées avec succès.']);
    }


    public function updateCover(Request $request, Page $page)
    {

        // $request->validate([
        //     'image' => 'required|max:5120', // 5MB max
        // ]);
        if ($request->filled('image')) {
            $couvertureData = base64_decode($request->input('image'));
            $couvertureName = Str::random(10) . time() . '.jpg'; // Adjust extension as needed
            Storage::disk('public')->put("page/couverture/$couvertureName", $couvertureData);
            $path_couverture = "page/couverture/$couvertureName";
        }

        // $path = $request->file('image')->store("users/{$page->id}/covers", 'public');

        $page->update([
            'cover_image_url' => asset("storage/" . $path_couverture),

        ]);

        return response()->json($page);
    }

    public function updateProfileImage(Request $request, Page $page)
    {
        // $request->validate([
        //     'image' => 'required|max:5120',
        // ]);
        if ($request->filled('image')) {
            $couvertureData = base64_decode($request->input('image'));
            $couvertureName = Str::random(10) . time() . '.jpg'; // Adjust extension as needed
            Storage::disk('public')->put("page/profile_image/$couvertureName", $couvertureData);
            $path_image_profile = "page/profile_image/$couvertureName";
        }

        $page->update([
            'profile_image_url' => asset("storage/" . $path_image_profile)
        ]);

        return response()->json($page);
    }
}
