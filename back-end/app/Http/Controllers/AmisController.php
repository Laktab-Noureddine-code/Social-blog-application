<?php

namespace App\Http\Controllers;

use App\Models\Amis;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreAmisRequest;
use App\Http\Requests\UpdateAmisRequest;

class AmisController extends Controller
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
    public function store(StoreAmisRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Amis $amis)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAmisRequest $request, Amis $amis)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Amis $amis)
    {
        //
    }

    public function removeFriend(User $user)
    {
        $currentUser = Auth::user();

        $deleted = Amis::where(function ($query) use ($currentUser, $user) {
            $query->where('user_id', $currentUser->id)
                ->where('amie_id', $user->id);
        })->orWhere(function ($query) use ($currentUser, $user) {
            $query->where('user_id', $user->id)
                ->where('amie_id', $currentUser->id);
        })->delete();
        if ($deleted) {
            return response()->json($user);
        }

    }
}
