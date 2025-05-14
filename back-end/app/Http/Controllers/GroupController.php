<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class GroupController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'confidentiality' => 'required|in:privé,public',
            'visibility' => 'required|in:visible,masqué',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $groupData = [
            'name' => $request->name,
            'confidentiality' => $request->confidentiality,
            'visibility' => $request->visibility,
            'created_by' => Auth::id(),
        ];

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            $coverPath = $request->file('cover_image')->store('group_covers', 'public');
            $groupData['cover_image'] = $coverPath;
        }


        $group = Group::create($groupData);

        // Add creator as admin + accepted
        $group->members()->attach(Auth::id(), [
            'role' => 'admin',
            'status' => 'accepted',
            'joined_at' => now(),
        ]);

        return response()->json([
            'message' => 'Groupe créé avec succès',
            'group' => $group,
        ]);
    }

    public function index()
    {
        $groups = Group::with(['creator', 'members'])->get();
        return response()->json($groups);
    }


    public function userGroups()
    {
        $userId = Auth::id();

        $groups = Group::whereHas('members', function ($query) use ($userId) {
            $query->where('user_id', $userId)
                ->where('status', 'accepted');
        })
            ->with(['creator', 'members'])
            ->get();

        return response()->json($groups);
    }

    public function updateGroupInfo(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'confidentiality' => 'required|in:privé,public',
            'visibility' => 'required|in:visible,masqué',
        ]);

        $group = Group::findOrFail($id);

        $userIsAdmin = $group->members()
            ->where('user_id', Auth::id())
            ->where('role', 'admin')
            ->where('status', 'accepted')
            ->exists();

        if ($group->created_by !== Auth::id() && !$userIsAdmin) {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        $group->update([
            'name' => $request->name,
            'confidentiality' => $request->confidentiality,
            'visibility' => $request->visibility,
        ]);

        return response()->json([
            'message' => 'Informations du groupe mises à jour avec succès',
            'group' => $group,
        ]);
    }



    public function updateGroupCover(Request $request, $id)
    {
        $group = Group::findOrFail($id);
        // Handle file upload
        if ($request->hasFile('cover_image') && $request->file('cover_image')->isValid()) {
            $request->validate([
                'cover_image' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            ]);

            // Delete old image ONLY if it's a local file, not a URL
            if ($group->cover_image && !filter_var($group->cover_image, FILTER_VALIDATE_URL)) {
                // Check if the path is relative to storage (likely a previously uploaded file)
                if (Storage::disk('public')->exists($group->cover_image)) {
                    Storage::disk('public')->delete($group->cover_image);
                }
            }

            $coverPath = $request->file('cover_image')->store('group_covers', 'public');
            $group->cover_image = $coverPath;
            $group->save();

            return response()->json([
                'message' => 'Image de couverture mise à jour avec succès',
                'cover' => $group->cover_image,
            ]);
        }
        // Handle URL string
        elseif ($request->filled('cover_image')) {
            $request->validate([
                'cover_image' => 'required|string',
            ]);

            // Store the URL directly in the cover_image field
            // No need to delete previous files since we're just replacing a URL with another URL
            $group->cover_image = $request->input('cover_image');
            $group->save();

            return response()->json([
                'message' => 'Image de couverture mise à jour avec succès',
                'cover' => $group->cover_image,
            ]);
        }
        // No valid input provided
        else {
            return response()->json([
                'error' => 'Aucune image ou URL fournie.',
                'request_data' => $request->all(),
            ], 422);
        }
    }

    public function destroy($id)
    {
        $group = Group::findOrFail($id);

        // Only the creator/admin can delete the group
        if ($group->created_by !== Auth::id()) {
            return response()->json(['error' => 'Non autorisé à supprimer ce groupe'], 403);
        }

        // Optional: delete cover image from storage if exists
        if ($group->cover_image) {
            Storage::disk('public')->delete($group->cover_image);
        }

        // Detach all members before deleting the group
        $group->members()->detach();

        $group->delete();

        return response()->json([
            'message' => 'Groupe supprimé avec succès'
        ]);
    }



    // MemberShip methodes
    public function joinGroup($groupId)
    {
        $group = Group::findOrFail($groupId);
        $userId = Auth::id();

        // Check if the user is already a member or has requested to join
        $alreadyMember = $group->members()->where('user_id', $userId)->exists();

        if ($alreadyMember) {
            return response()->json([
                'message' => 'Vous avez déjà rejoint ce groupe ou votre demande est en attente.'
            ], 409);
        }

        $status = $group->confidentiality === 'public' ? 'accepted' : 'pending';

        $group->members()->attach($userId, [
            'role' => 'member',
            'status' => $status,
            'joined_at' => $status === 'accepted' ? now() : null,
        ]);

        return response()->json([
            'message' => $status === 'accepted'
                ? 'Vous avez rejoint le groupe avec succès.'
                : 'Votre demande d\'adhésion a été envoyée et est en attente d\'approbation.',
            'status' => $status,
        ]);
    }

    public function acceptMember($groupId, $userId)
    {
        // Find the group
        $group = Group::findOrFail($groupId);

        // Check if the authenticated user is an admin of the group
        if ($group->created_by !== Auth::id() && !$group->members()->wherePivot('role', 'admin')->exists()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Check if the member is in the group and their status is 'pending'
        $member = $group->members()->wherePivot('user_id', $userId)->wherePivot('status', 'pending')->first();

        if (!$member) {
            return response()->json(['error' => 'Member not in pending status'], 404);
        }

        // Update the status to 'accepted' and set the joined_at timestamp
        $group->members()->updateExistingPivot($userId, [
            'status' => 'accepted',
            'joined_at' => now(),
        ]);

        return response()->json([
            'message' => 'accepted',
        ]);
    }


    public function leaveGroup($groupId)
    {
        $group = Group::findOrFail($groupId);
        $userId = Auth::id();

        // Don't allow the creator to leave their own group
        if ($group->created_by === $userId) {
            return response()->json([
                'error' => 'Le créateur du groupe ne peut pas quitter le groupe.'
            ], 403);
        }

        // Check if the user is a member of the group
        if (!$group->members()->where('user_id', $userId)->exists()) {
            return response()->json([
                'error' => 'Vous n\'êtes pas membre de ce groupe.'
            ], 404);
        }

        // Remove the user from the group
        $group->members()->detach($userId);

        return response()->json([
            'message' => 'Vous avez quitté le groupe avec succès.'
        ]);
    }

    public function removeMember($groupId, $userId)
    {
        $group = Group::findOrFail($groupId);
        $authId = Auth::id();

        // Don't allow removing the group creator
        if ($userId == $group->created_by) {
            return response()->json(['error' => 'Impossible de supprimer le créateur du groupe.'], 403);
        }

        // Check if the authenticated user is the creator or an admin
        $isAdmin = $group->created_by == $authId ||
            $group->members()->where('user_id', $authId)->wherePivot('role', 'admin')->exists();

        if (!$isAdmin) {
            return response()->json(['error' => 'Non autorisé.'], 403);
        }

        // Check if the target user is a member
        if (!$group->members()->where('user_id', $userId)->exists()) {
            return response()->json(['error' => 'Cet utilisateur n\'est pas membre du groupe.'], 404);
        }

        // Detach the member
        $group->members()->detach($userId);

        return response()->json(['message' => 'Membre supprimé']);
    }



    public function inviteMember($groupId, $userId)
    {
        // Get the group
        $group = Group::findOrFail($groupId);

        // Check if the authenticated user is an admin or creator using the pivot table
        $user = Auth::user();
        $isAdminOrCreator = $group->members()->where('user_id', $user->id)
            ->where(function ($query) {
                $query->where('role', 'admin')
                    ->orWhere('role', 'creator');
            })
            ->exists();

        if (!$isAdminOrCreator) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Check if the user is already a member or invited
        $existingMember = $group->members()->where('user_id', $userId)->first();
        if ($existingMember) {
            return response()->json(['error' => 'User is already a member or invited'], 400);
        }

        // Insert into the pivot table with status 'invited'
        $group->members()->attach($userId, [
            'role' => 'member',
            'status' => 'invited',
            'joined_at' => null,  // Not yet joined
        ]);

        return response()->json([
            'message' => 'Invitation envoyée avec succès',
            'group' => $group,
            'invited_user_id' => $userId,
        ]);
    }
}
