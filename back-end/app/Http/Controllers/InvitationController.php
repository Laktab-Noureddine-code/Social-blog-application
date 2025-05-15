<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use App\Http\Requests\StoreInvitationRequest;
use App\Http\Requests\UpdateInvitationRequest;
use App\Models\Amis;
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

        // // Empêcher l'envoi d'une invitation à soi-même
        if ($currentUser->id === $user->id) {
            return response()->json(['message' => 'Impossible de s\'inviter soi-même.'], 400);
        }

        // Vérifier s'ils sont déjà amis
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

        // // Vérifier si une invitation existe déjà dans un sens ou l'autre
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

        // // Créer l’invitation
        $invitation = Invitation::create([
            'id_inviteur' => $currentUser->id,
            'id_invite' => $user->id,
        ]);

        return response()->json($user);
    }


    public function cancel(User $user)
    {
        $currentUser = Auth::user();

        // Trouver l'invitation que j'ai envoyée
        $invitation = Invitation::where('id_inviteur', $currentUser->id)
            ->where('id_invite', $user->id)
            ->first();

        if ($invitation) {
            $invitation->delete();
        }

        return response()->json($user);
    }


    public function accept(User $user)
    {
        $currentUser = Auth::user();

        // Trouver l'invitation que l'autre utilisateur m'a envoyée
        $invitation = Invitation::where('id_inviteur', $user->id)
            ->where('id_invite', $currentUser->id)
            ->first();

        if (!$invitation) {
            return response()->json(['message' => 'Invitation non trouvée.'], 404);
        }

        // Ajouter comme amis (dans les deux sens si nécessaire)
        Amis::create([
            'user_id' => $currentUser->id,
            'amie_id' => $user->id,
        ]);

        $invitation->delete();

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

        return response()->json($user);
    }
}
