<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Group;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Events\Notifications;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GroupController extends Controller
{
    public function show($id)
    {
        $user = Auth::user();

        $group = Group::with(['creator', 'members'])
            ->findOrFail($id);

        // Add membership status
        $group->is_member = $group->members->contains('id', $user->id);
        $group->is_creator = $group->created_by === $user->id;

        if ($group->is_member) {
            $membership = $group->members->find($user->id)->pivot;
            $group->membership_status = $membership->status;
            $group->membership_role = $membership->role;
        }

        return response()->json($group);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'confidentiality' => 'required|in:privé,public',
            'visibility' => 'required|in:visible,masqué',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $groupData = [
            'name' => $validated['name'],
            'description' => $validated['description'],
            'confidentiality' => $validated['confidentiality'],
            'visibility' => $validated['visibility'],
            'created_by' => Auth::id(),
        ];

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            $coverPath = $request->file('cover_image')->store('group_covers', 'public');
            $groupData['cover_image'] = Storage::url($coverPath); // Use Storage::url() for proper URL generation
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
        ], 201); // HTTP 201 for created resource
    }


    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Group::with(['creator', 'members']);
        switch ($request->query('filter')) {
            case 'not_joined':
                // Visible groups where user is NOT a member
                $query->where('visibility', 'visible')
                    ->whereDoesntHave('members', function ($q) use ($user) {
                        $q->where('user_id', $user->id);
                    });
                break;

            case 'friends_groups':
                // Visible groups where friends are members but user isn't
                $friendIds = $user->amis()->pluck('amie_id')
                    ->merge($user->amisOf()->pluck('user_id'));

                $query->where('visibility', 'visible')
                    ->whereHas('members', function ($q) use ($friendIds) {
                        $q->whereIn('user_id', $friendIds);
                    })
                    ->whereDoesntHave('members', function ($q) use ($user) {
                        $q->where('user_id', $user->id);
                    });
                break;

            case 'my_groups':
                // Groups user is member of (regardless of visibility)
                $query->whereHas('members', function ($q) use ($user) {
                    $q->where('user_id', $user->id);
                });
                break;

            case 'mixed':
                // Combined: my groups + friends' visible groups + other visible groups
                $friendIds = $user->amis()->pluck('amie_id')
                    ->merge($user->amisOf()->pluck('user_id'));

                $query->where(function ($q) use ($user, $friendIds) {
                    // Groups I'm in
                    $q->whereHas('members', function ($q) use ($user) {
                        $q->where('user_id', $user->id);
                    })
                        // OR visible groups with my friends
                        ->orWhere(function ($q) use ($user, $friendIds) {
                            $q->where('visibility', 'visible')
                                ->whereHas('members', function ($q) use ($friendIds) {
                                    $q->whereIn('user_id', $friendIds);
                                });
                        })
                        // OR other visible groups
                        ->orWhere(function ($q) use ($user) {
                            $q->where('visibility', 'visible')
                                ->whereDoesntHave('members', function ($q) use ($user) {
                                    $q->where('user_id', $user->id);
                                });
                        });
                });
                break;

            default:
                // Default: all visible groups + groups I'm in
                $query->where(function ($q) use ($user) {
                    $q->where('visibility', 'visible')
                        ->orWhereHas('members', function ($q) use ($user) {
                            $q->where('user_id', $user->id);
                        });
                });
        }

        return response()->json($query->get());
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

        // Si un fichier est uploadé normalement (multipart)
        if ($request->hasFile('cover_image') && $request->file('cover_image')->isValid()) {
            $request->validate([
                'cover_image' => 'image|mimes:jpeg,png,jpg,webp|max:10048',
            ]);

            if ($group->cover_image && !filter_var($group->cover_image, FILTER_VALIDATE_URL)) {
                if (Storage::disk('public')->exists($group->cover_image)) {
                    Storage::disk('public')->delete($group->cover_image);
                }
            }

            $coverPath = $request->file('cover_image')->store('group_covers', 'public');
            $group->cover_image = asset('storage/' . $coverPath);
            $group->save();

            return response()->json([
                'message' => 'Image de couverture mise à jour avec succès (upload)',
                'cover' => $group->cover_image,
            ]);
        }

        // Si une chaîne base64 ou une URL est fournie
        elseif ($request->filled('cover_image')) {
            $coverImage = $request->input('cover_image');

            // Si c'est une URL valide, on la stocke directement
            if (filter_var($coverImage, FILTER_VALIDATE_URL)) {
                $group->cover_image = $coverImage;
            }
            // Sinon, on vérifie si c'est une image base64
            elseif (preg_match('/^data:image\/(\w+);base64,/', $coverImage, $type)) {
                $image = substr($coverImage, strpos($coverImage, ',') + 1);
                $image = base64_decode($image);

                if ($image === false) {
                    return response()->json(['error' => 'Base64 invalide.'], 422);
                }

                $extension = strtolower($type[1]); // jpg, png, gif, etc.

                if (!in_array($extension, ['jpg', 'jpeg', 'png', 'webp'])) {
                    return response()->json(['error' => 'Extension non supportée.'], 422);
                }

                // Supprimer l'ancienne image locale si elle existe
                if ($group->cover_image && !filter_var($group->cover_image, FILTER_VALIDATE_URL)) {
                    $path = str_replace(asset('storage') . '/', '', $group->cover_image);
                    if (Storage::disk('public')->exists($path)) {
                        Storage::disk('public')->delete($path);
                    }
                }

                // Nom du fichier unique
                $fileName = uniqid() . '.' . $extension;
                $path = 'group_covers/' . $fileName;

                Storage::disk('public')->put($path, $image);
                $group->cover_image = asset('storage/' . $path);
            }
            // Sinon, erreur
            else {
                return response()->json(['error' => 'Format de l’image non reconnu.'], 422);
            }

            $group->save();

            return response()->json([
                'message' => 'Image de couverture mise à jour avec succès',
                'cover' => $group->cover_image,
            ]);
        }

        return response()->json([
            'error' => 'Aucune image ou URL fournie.',
            'request_data' => $request->all(),
        ], 422);

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



    // In your GroupController.php
    public function inviteMembers(Request $request, $groupId)
    {
        $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $group = Group::findOrFail($groupId);

        // Check if user is admin or creator
        $userIsAdmin = $group->created_by == Auth::id() ||
            $group->members()->where('user_id', Auth::id())->wherePivot('role', 'admin')->exists();

        if (!$userIsAdmin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $existingMembers = $group->members()
            ->whereIn('user_id', $request->user_ids)
            ->pluck('user_id')
            ->toArray();

        $newMembers = array_diff($request->user_ids, $existingMembers);

        if (empty($newMembers)) {
            return response()->json([
                'message' => 'Tous les utilisateurs sélectionnés sont déjà membres ou invités',
            ], 200);
        }

        // Prepare the data for bulk insert
        $now = now();

        $invitations = array_map(function ($userId) use ($now) {
            return [
                'user_id' => $userId,
                'role' => 'member',
                'status' => 'invited',
                'joined_at' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }, $newMembers);

        // Bulk insert
        $group->members()->attach($invitations);

        // Create notification and broadcast for each invited user
        foreach ($newMembers as $userId) {
            $notification = Notification::create([
                'user_id' => $userId,
                'type' => 'group_invite',
                'description' => 'Vous avez été invité à rejoindre le groupe ' . $group->name,
                'content' => 'groups/' . $group->id,
            ]);

            // Broadcast the notification using Pusher
            event(new Notifications(
                $userId,              // User receiving the notification
                $notification->description,  // Description message
                $group->type,         // Type of the group
                $notification->content  // Link to the group content
            ));
        }

        return response()->json([
            'message' => 'Invitations envoyées avec succès',
            'invited_users' => $newMembers,
            'already_members' => $existingMembers,
        ]);
    }

    public function changeRole(Request $request, $groupId)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'role' => 'required|in:admin,member'
        ]);

        $group = Group::findOrFail($groupId);
        $authUser = Auth::user();

        // Check if user is creator or admin
        $isCreator = $group->created_by === $authUser->id;
        $isAdmin = $group->members()
            ->where('user_id', $authUser->id)
            ->where('role', 'admin')
            ->where('status', 'accepted')
            ->exists();

        if (!$isCreator && !$isAdmin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Check if target user is a member
        $targetMember = $group->members()
            ->where('user_id', $request->user_id)
            ->where('status', 'accepted')
            ->first();

        if (!$targetMember) {
            return response()->json(['error' => 'User is not an accepted member of this group'], 404);
        }

        // Prevent changing creator's role
        if ($request->user_id == $group->created_by) {
            return response()->json(['error' => 'Cannot change role of group creator'], 403);
        }

        // Update the role
        $group->members()->updateExistingPivot($request->user_id, [
            'role' => $request->role
        ]);

        return response()->json([
            'message' => 'Role updated successfully',
            'new_role' => $request->role
        ]);
    }
    public function acceptInvitation(Request $request, $groupId)
    {
        $group = Group::findOrFail($groupId);
        $user = Auth::user();

        // Check if user is invited
        $invitation = $group->members()
            ->where('user_id', $user->id)
            ->where('status', 'invited')
            ->first();

        if (!$invitation) {
            return response()->json(['error' => 'No invitation found'], 404);
        }

        // Accept the invitation
        $group->members()->updateExistingPivot($user->id, [
            'status' => 'accepted',
            'joined_at' => now()
        ]);

        return response()->json([
            'message' => 'Invitation accepted successfully',
            'status' => 'accepted'
        ]);
    }



    public function postsGroup(Group $group)
    {
        // Eager load posts with their medias
        $posts = Post::where('group_id', $group->id)
            ->with('group', 'Medias', 'Comments', 'Likes', 'user')->orderBy("created_at", 'desc')->get();

        // Collect all media URLs
        $medias = [];

        foreach ($posts as $post) {
            foreach ($post->Medias as $media) {
                $medias[] = ['url' => $media->url, 'type' => $media->type];
            }
        }


        return response()->json([
            'group' => $group,
            'medias' => $medias,
            'posts' => $posts,
        ]);
    }
}
