<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

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

    
}
