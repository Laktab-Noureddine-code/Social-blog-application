<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Nette\Utils\Random;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    // public function completProfile(Request $request, User $user)
    // {
    //     // $validate = $request->validate([
    //     //     "name" => 'nullable|string|max:100',
    //     //     "localisation" => 'nullable|string|max:200',
    //     //     "telephone" => 'nullable|string|max:20',
    //     //     "couverture" => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
    //     //     'image_profile' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
    //     // ]);
    //     if ($request->hasFile('couverture')) {
    //         $couverture_name = Str::random(20) . date('YmdHis') . '.' . $request->couverture->extension();
    //         $request->couverture->move(public_path('profiles/couverture'), $couverture_name);
    //         $path_couverture = "profiles/couverture/$couverture_name";
    //     }

    //     if ($request->image_profile) {
    //         $image_profile_name = Str::random(20) . date('YmdHis') . '.' . $request->image_profile->extension();
    //         $request->image_profile->move(public_path('profiles/imageProfile'), $image_profile_name);
    //         $image_profile = "profiles/couverture/$couverture_name";
    //     }
    //     $user->update([
    //         "name" => $request->name ?? $user->name,
    //         "localisation" => $request->localisation ?? null,
    //         "telephone" => $request->telephone ?? null,
    //         "couverture_url" => $path_couverture ?? null,
    //         "image_profile_url" => $image_profile ?? null,
    //     ]);
    //     if ($request->hasFile('image_profile')) {
    //          return ['file'=>$request->file('image_profile')];
    //     }else{
    //         return ['no' => 'no'];
    //     }


    //     // return response()->json($request->file('image_profile'));
    // }













    public function completProfile(Request $request, User $user)
{
    // Validate the request
    $validated = $request->validate([
        'name' => 'sometimes|string|max:255',
        'localisation' => 'nullable|string|max:255',
        'telephone' => 'nullable|string|max:20',
        'couverture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'image_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);
    return response()->json(['hh'=>$request]);


    // $updateData = [
    //     'name' => $request->input('name', $user->name),
    //     'localisation' => $request->input('localisation'),
    //     'telephone' => $request->input('telephone'),
    // ];

    // // Handle cover photo upload
    // if ($request->hasFile('couverture')) {
    //     $coverPath = $request->file('couverture')->store('profiles/couverture', 'public');
    //     $updateData['couverture_url'] = $coverPath;
        
    //     // Delete old cover if exists
    //     if ($user->couverture_url) {
    //         Storage::disk('public')->delete($user->couverture_url);
    //     }
    // }

    // // Handle profile photo upload
    // if ($request->hasFile('image_profile')) {
    //     $profilePath = $request->file('image_profile')->store('profiles/imageProfile', 'public');
    //     $updateData['image_profile_url'] = $profilePath;
        
    //     // Delete old profile if exists
    //     if ($user->image_profile_url) {
    //         Storage::disk('public')->delete($user->image_profile_url);
    //     }
    // }

    // // Update user
    // $user->update($updateData);

    // return response()->json([
    //     'success' => true,
    //     'user' => $user,
    //     'message' => 'Profile updated successfully'
    // ]);
}























    // public function completProfile(Request $request, User $user)
    // {
        

    //     return response()->json($request->couverture);
    // }

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
}
