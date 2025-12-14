<?php

namespace App\Http\Controllers;

use App\Events\Notifications;
use App\Models\Like;
use App\Http\Requests\StoreLikeRequest;
use App\Http\Requests\UpdateLikeRequest;
use App\Models\Notification;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
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
    public function store(StoreLikeRequest $request)
    {
        //
    }
    public function checkLike(Request $request)
    {
        $existing = Like::where('user_id', Auth::id())
            ->where('post_id', $request->id)
            ->first();

        if ($existing) {
            $existing->delete(); // Unlike    
        } else {
            Like::create([
                'user_id' => Auth::id(),
                'post_id' => $request->id
            ]); // Like

            // Récupérer le post et son propriétaire
            $post = Post::find($request->id);
            $authUser = Auth::user();

            // Éviter de notifier si l'utilisateur like son propre post
           if($post->type === 'page') {
                if ($post && $post->admin_id != Auth::id()) {
                $notification = Notification::create([
                    'user_id' => $post->admin_id, // Le propriétaire du post
                    'type' => 'like_post',
                    'description' => $authUser->name . ' a aimé votre post',
                    'content' => 'post/' . $post->id . "/0",
                    'is_read' => false,
                ]);

                // Diffuser la notification via Pusher
                event(new Notifications(
                    $post->admin_id,              // Destinataire (propriétaire du post)
                    $notification->description,  // Message descriptif
                    'like_post',                 // Type de notification
                    $notification->content       // Lien vers le post
                ));
            }
        }else{
            if ($post && $post->user_id != Auth::id()) {
                $notification = Notification::create([
                    'user_id' => $post->user_id, // Le propriétaire du post
                    'type' => 'like_post',
                    'description' => $authUser->name . ' a aimé votre post',
                    'content' => 'post/' . $post->id . "/0",
                    'is_read' => false,
                ]);

                // Diffuser la notification via Pusher
                event(new Notifications(
                    $post->user_id,              // Destinataire (propriétaire du post)
                    $notification->description,  // Message descriptif
                    'like_post',                 // Type de notification
                    $notification->content       // Lien vers le post
                ));
            }
        }
        }
        $likes = Like::where('post_id', $request->id)->with('user')->get();
        return response()->json($likes);
    }
    public function getUersLike(Request $request)
    {
        $likes = Like::where('post_id', $request->id)->with('user')->get();
        return response()->json($likes);
    }

    /**
     * Display the specified resource.
     */
    public function show(Like $like)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLikeRequest $request, Like $like)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Like $like)
    {
        //
    }
}
