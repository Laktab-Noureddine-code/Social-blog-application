<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\RapportPublication;
use Illuminate\Support\Facades\Auth;

class RapportPublicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'cause' => 'required|string|max:255',
        ]);

        $user = Auth::user();

        // Prevent duplicate reports
        $existing = RapportPublication::where('user_id', $user->id)
            ->where('post_id', $post->id)
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Vous avez déjà signalé cette publication.'
            ], 409);
        }

        $Rapport = RapportPublication::create([
            'user_id' => $user->id,
            'post_id' => $post->id,
            'cause'   => $request->cause,
        ]);
        if($Rapport){
            return response()->json($user);
        }
    }

    // Optional: for admin viewing
    public function index()
    {
        return RapportPublication::with(['user', 'post'])->latest()->get();
    }


    public function destroy(Post $post)
{
        $user = Auth::user();
    $rapport = RapportPublication::where('post_id', $post->id)
    ->where('user_id', $user->id)
    ->first();

    if (!$rapport) {
        return response()->json(['message' => 'Rapport non trouvé.'], 404);
    }

    // // Optional: allow only the user who created it or admin
    // // if (Auth::id() !== $rapport->user_id && !Auth::user()->is_admin) {
    // //     return response()->json(['message' => 'Non autorisé.'], 403);
    // // }

    $rapport->delete();

    return response()->json($user);
}

    /**
     * Display the specified resource.
     */
    public function show(RapportPublication $rapportPublication)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RapportPublication $rapportPublication)
    {
        //
    }

}
