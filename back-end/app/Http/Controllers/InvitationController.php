<?php

namespace App\Http\Controllers;

use App\Events\Notifications;
use App\Models\Invitation;
use App\Http\Requests\StoreInvitationRequest;
use App\Http\Requests\UpdateInvitationRequest;
use App\Models\Amis;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class InvitationController extends Controller
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
    public function store(StoreInvitationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Invitation $invitation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvitationRequest $request, Invitation $invitation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invitation $invitation)
    {
        //
    }

    public function send(User $user)
    {
        $currentUser = Auth::user();

        // Prevent sending invitation to yourself
        if ($currentUser->id === $user->id) {
            return response()->json(['message' => 'Impossible de s\'inviter soi-même.'], 400);
        }

        // Check if they're already friends
        $alreadyFriends = Amis::where(function ($query) use ($currentUser, $user) {
            $query->where('user_id', $currentUser->id)
                ->where('amie_id', $user->id);
        })->orWhere(function ($query) use ($currentUser, $user) {
            $query->where('user_id', $user->id)
                ->where('amie_id', $currentUser->id);
        })->exists();

        if ($alreadyFriends) {
            return response()->json(['message' => 'Vous êtes déjà amis.'], 409);
        }

        // Check if an invitation already exists in either direction
        $invitationExistante = Invitation::where(function ($query) use ($currentUser, $user) {
            $query->where('id_inviteur', $currentUser->id)
                ->where('id_invite', $user->id);
        })->orWhere(function ($query) use ($currentUser, $user) {
            $query->where('id_inviteur', $user->id)
                ->where('id_invite', $currentUser->id);
        })->exists();

        if ($invitationExistante) {
            return response()->json(['message' => 'Invitation déjà existante.'], 409);
        }

        // Create the invitation
        $invitation = Invitation::create([
            'id_inviteur' => $currentUser->id,
            'id_invite' => $user->id,
        ]);

        // Create notification for the RECIPIENT (user being invited)
        $notification = Notification::create([
            'user_id' => $user->id,
            'type' => 'friend_invitation',
            'description' => $currentUser->name . ' vous a envoyé une invitation d\'amitié.',
            'content' => 'profile/' . $currentUser->id,
            'is_read' => false,
        ]);

        // Broadcast the notification via Pusher to the RECIPIENT
        event(new Notifications(
            $user->id,
            $notification->description,
            'friend_invitation',
            $notification->content
        ));

        return response()->json($user);
    }

    public function cancel(User $user)
    {
        $currentUser = Auth::user();

        // Find the invitation I sent
        $invitation = Invitation::where('id_inviteur', $currentUser->id)
            ->where('id_invite', $user->id)
            ->first();

        if ($invitation) {
            $invitation->delete();

            // Notify the recipient that the invitation was canceled
           
        }

        return response()->json($user);
    }

    public function accept(User $user)
    {
        $currentUser = Auth::user();

        // Find the invitation sent to me
        $invitation = Invitation::where('id_inviteur', $user->id)
            ->where('id_invite', $currentUser->id)
            ->first();

        if (!$invitation) {
            return response()->json(['message' => 'Invitation non trouvée.'], 404);
        }

        // Add as friends (both directions if your system requires it)
        Amis::create([
            'user_id' => $currentUser->id,
            'amie_id' => $user->id,
        ]);

        // Optional: Add reverse friendship if your system is not bidirectional
        Amis::create([
            'user_id' => $user->id,
            'amie_id' => $currentUser->id,
        ]);

        $invitation->delete();

        // Notify the sender that their invitation was accepted
        $notification = Notification::create([
            'user_id' => $user->id, // The original sender
            'type' => 'invitation_accepted',
            'description' => $currentUser->name . ' a accepté votre invitation d\'amitié.',
            'content' => 'profile/' . $currentUser->id,
            'is_read' => false,
        ]);

        event(new Notifications(
            $user->id,
            $notification->description,
            'invitation_accepted',
            $notification->content
        ));

        return response()->json($user);
    }

    public function refuse(User $user)
    {
        $currentUser = Auth::user();

        $invitation = Invitation::where('id_inviteur', $user->id)
            ->where('id_invite', $currentUser->id)
            ->first();

        if (!$invitation) {
            return response()->json(['message' => 'Invitation non trouvée.'], 404);
        }

        $invitation->delete();

        // Notify the sender that their invitation was refused
       

        return response()->json($user);
    }
}
