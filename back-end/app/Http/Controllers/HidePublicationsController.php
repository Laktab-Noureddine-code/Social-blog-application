<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\HidePublications;
use Illuminate\Support\Facades\Auth;

class HidePublicationsController extends Controller
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
    public function show(HidePublications $hidePublications)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HidePublications $hidePublications)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HidePublications $hidePublications)
    {
        //
    }

    public function hide(Post $post)
    {
        $existing = HidePublications::where('user_id', Auth::id())
            ->where('post_id', $post->id)
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Déjà masqué.'], 200);
        }

        HidePublications::create([
            'user_id' => Auth::id(),
            'post_id' => $post->id,
        ]);

        // return response()->json(['message' => 'Publication masquée avec succès.'], 201);
        return response()->json(Auth::user());
    }

    // ✅ Dé-masquer un post
    public function unhide(Post $post)
    {
        $deleted = HidePublications::where('user_id', Auth::id())
            ->where('post_id', $post->id)
            ->delete();

        if ($deleted) {
            return response()->json(Auth::user());
        }

        return response()->json(['message' => 'Publication non trouvée.']);
    }
}
