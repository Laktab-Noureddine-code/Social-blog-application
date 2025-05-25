<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }














    public function Profile_data(User $user)
    {
        // Eager load posts with their medias
        $posts = Post::where('user_id', $user->id)
            ->with('User', 'Medias', 'Comments', 'Likes')->orderBy("created_at", 'desc')->get();

        // Collect all media URLs
        $medias = [];

        foreach ($posts as $post) {
            foreach ($post->Medias as $media) {
                $medias[] = ['url' => $media->url, 'type' => $media->type];
            }
        }

        $amis = $user->amis ?? collect();
        $amisOf = $user->amisOf ?? collect();
        $allAmis = $amis->merge($amisOf);

        return response()->json([
            'user' => $user,
            'medias' => $medias,
            'posts' => $posts,
            'amis' => $allAmis
        ]);
    }

    public function updateCover(Request $request,  User $user)
    {
        
        // $request->validate([
        //     'image' => 'required|max:5120', // 5MB max
        // ]);
        if ($request->filled('image')) {
            $couvertureData = base64_decode($request->input('image'));
            $couvertureName = Str::random(10) . '.jpg';
            Storage::disk('public')->put("profile/couverture/$couvertureName", $couvertureData);
            $path_couverture = "profile/couverture/$couvertureName";
        }

        // $path = $request->file('image')->store("users/{$user->id}/covers", 'public');

        $user->update([
            'couverture_url' => asset("storage/" . $path_couverture),
            
        ]);

        return response()->json($user);
    }

    public function updateProfileImage(Request $request, User $user)
    {
        // $request->validate([
        //     'image' => 'required|max:5120',
        // ]);

        if ($request->filled('image')) {
            $profileData = base64_decode($request->input('image'));
            $profileName = Str::random(10) . '.jpg';
            Storage::disk('public')->put("profile/image_profile/$profileName", $profileData);
            $path_image_profile = "profile/image_profile/$profileName";
        }

        $user->update([
            'image_profile_url' => asset("storage/" . $path_image_profile)
        ]);

        return response()->json($user);
    }
}
