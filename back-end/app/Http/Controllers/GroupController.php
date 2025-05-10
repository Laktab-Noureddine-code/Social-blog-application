<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
    // Créer un groupe
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'confidentiality' => 'required|in:privé,public',
            'visibility' => 'required|in:visible,masqué',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $group = Group::create([
            'name' => $request->name,
            'confidentiality' => $request->confidentiality,
            'visibility' => $request->visibility,
            'created_by' => Auth::id(),
            'cover_image' => $request->cover_image, // facultatif
            'profile_image' => $request->profile_image, // facultatif
        ]);

        // Ajouter le créateur comme admin + accepté
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
}
