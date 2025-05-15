<?php

namespace App\Http\Controllers;

use App\Models\Amis;
use App\Models\Post;
use App\Models\User;
use App\Models\Media;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public function completProfile(Request $request, User $user)
    {
        // Validate the request
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'localisation' => 'nullable|string|max:255',
            'telephone' => 'nullable|string|max:20',
            'couverture' => 'nullable|string',
            'image_profile' => 'nullable|string',
        ]);

        if ($request->filled('couverture')) {
            $couvertureData = base64_decode($request->input('couverture'));
            $couvertureName = Str::random(10) . '.jpg'; // Adjust extension as needed
            Storage::disk('public')->put("profile/couverture/$couvertureName", $couvertureData);
            $path_couverture = "profile/couverture/$couvertureName";
        }
        if ($request->filled('image_profile')) {
            $couvertureData = base64_decode($request->input('image_profile'));
            $couvertureName = Str::random(10) . '.jpg'; // Adjust extension as needed
            Storage::disk('public')->put("profile/image_profile/$couvertureName", $couvertureData);
            $path_image_profile = "profile/image_profile/$couvertureName";
        }
        $User = User::findOrFail($user->id);
        $update = $User->update([
            'name' => $request->name ?? $user->name,
            'localisation' => $request->localisation ?? null,
            'telephone' => $request->telephone ?? null,
            'couverture_url' => $path_couverture ? asset("storage/" . $path_couverture) : null,
            'image_profile_url' => $path_image_profile ? asset("storage/" . $path_image_profile) : null,
        ]);
        if (!$update) {
            // Log::error('User update failed', ['data' => $request->all()]);
            return response()->json(['success' => false, 'message' => 'Update failed'], 500);
        }

        return response()->json($update);
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

    public function getAmis(user $user)
    {
        // $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Get friends and other relationships
        $amis = $user->amis ?? collect();
        $amisOf = $user->amisOf ?? collect();
        $tousAmis = $amis->merge($amisOf);

        // Get the users who invited me (invitateur)
        $utilisateursQuiMInvitent = $user->invitationsRecues()->with('invitateur')->get()->pluck('invitateur');

        // Get the users I invited (invite)
        $utilisateursInvitesParMoi = $user->invitationsEnvoyees()->with('invite')->get()->pluck('invite');

        return response()->json(compact('tousAmis', 'utilisateursQuiMInvitent', 'utilisateursInvitesParMoi'));
        // return response()->json($tousAmis);
    }


    // $user = Auth::user();
    public function toogleAmis(Request $request)
    {
        $ami = User::find($request->amie_id);
        $existingFriendship = Amis::where(
            function ($query) use ($request) {
                $query->where('user_id', $request->user_id)->where('amie_id', $request->amie_id);
            }
        )
            ->orWhere(
                function ($query) use ($request) {
                    $query->where('user_id', $request->amie_id)->where('amie_id', $request->user_id);
                }
            )->first();


        if ($existingFriendship) {
            $existingFriendship->delete();
        } else {
            Amis::create([
                'user_id' => $request->user_id,
                'amie_id' => $request->amie_id,
            ]);
        }
        return response()->json($ami);
    }
}
