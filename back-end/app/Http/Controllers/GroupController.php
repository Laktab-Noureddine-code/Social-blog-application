<?php

namespace App\Http\Controllers;

use App\Models\Group;
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
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
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

        // Handle profile image upload
        if ($request->hasFile('profile_image')) {
            $profilePath = $request->file('profile_image')->store('group_profiles', 'public');
            $groupData['profile_image'] = $profilePath;
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
}
