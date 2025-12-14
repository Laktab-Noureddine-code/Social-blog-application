<?php

namespace App\Http\Controllers;

use App\Models\Amis;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreAmisRequest;
use App\Http\Requests\UpdateAmisRequest;
use Illuminate\Pagination\LengthAwarePaginator;

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
    // public function GetAuthers()
    // {
    //     $authId = Auth::id();

    //     // Get current user's friends
    //     $friendIds = DB::table('amis')
    //         ->where('user_id', $authId)
    //         ->orWhere('amie_id', $authId)
    //         ->get()
    //         ->flatMap(function ($row) use ($authId) {
    //             return [$row->user_id == $authId ? $row->amie_id : $row->user_id];
    //         })
    //         ->unique();

    //     // Get users involved in invitations with current user
    //     $invitedIds = DB::table('invitations')
    //         ->where('id_inviteur', $authId)
    //         ->orWhere('id_invite', $authId)
    //         ->get()
    //         ->flatMap(function ($row) use ($authId) {
    //             return [$row->id_inviteur == $authId ? $row->id_invite : $row->id_inviteur];
    //         })
    //         ->unique();

    //     // Merge all IDs to exclude (friends, invited, and self)
    //     $excludedIds = $friendIds->merge($invitedIds)->push($authId)->unique();

    //     // Get users who are not friends and not in invitation
    //     $users = DB::table('users')
    //         ->whereNotIn('id', $excludedIds)
    //         ->get();

    //     // Add mutual friend count
    //     $results = $users->map(function ($user) use ($authId, $friendIds) {
    //         // Get this user's friends
    //         $userFriendIds = DB::table('amis')
    //             ->where('user_id', $user->id)
    //             ->orWhere('amie_id', $user->id)
    //             ->get()
    //             ->flatMap(function ($row) use ($user) {
    //                 return [$row->user_id == $user->id ? $row->amie_id : $row->user_id];
    //             })
    //             ->unique();

    //         // Count mutual friends
    //         $mutualCount = $userFriendIds->intersect($friendIds)->count();

    //         return [
    //             'user' => $user,
    //             'mutual_friends_count' => $mutualCount,
    //         ];
    //     });

    //     return response()->json($results);
    // }

    public function GetAuthers()
    {
        $authId = Auth::id();

        // Step 1: Get current user's friend IDs
        $friendIds = DB::table('amis')
            ->where('user_id', $authId)
            ->orWhere('amie_id', $authId)
            ->get()
            ->flatMap(function ($row) use ($authId) {
                return [$row->user_id == $authId ? $row->amie_id : $row->user_id];
            })
            ->unique();

        // Step 2: Get users with invitations involving current user
        $invitedIds = DB::table('invitations')
            ->where('id_inviteur', $authId)
            ->orWhere('id_invite', $authId)
            ->get()
            ->flatMap(function ($row) use ($authId) {
                return [$row->id_inviteur == $authId ? $row->id_invite : $row->id_inviteur];
            })
            ->unique();

        // Step 3: Combine all excluded IDs (friends + invites + self)
        $excludedIds = $friendIds->merge($invitedIds)->push($authId)->unique();

        // Step 4: Get users not in excluded list
        $usersQuery = DB::table('users')
            ->whereNotIn('id', $excludedIds)
            ->orderBy('id'); // Optional: for consistent pagination order

        // Step 5: Apply pagination (30 per page)
        $perPage = 15;
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $usersPaginated = $usersQuery
            ->forPage($currentPage, $perPage)
            ->get();

        // Step 6: Map each user with mutual friend count
        $results = $usersPaginated->map(function ($user) use ($authId, $friendIds) {
            $userFriendIds = DB::table('amis')
                ->where('user_id', $user->id)
                ->orWhere('amie_id', $user->id)
                ->get()
                ->flatMap(function ($row) use ($user) {
                    return [$row->user_id == $user->id ? $row->amie_id : $row->user_id];
                })
                ->unique();

            $mutualCount = $userFriendIds->intersect($friendIds)->count();

            return [
                'user' => $user,
                'mutual_friends_count' => $mutualCount,
            ];
        });

        // Step 7: Create paginator manually
        $total = $usersQuery->count();
        $paginator = new LengthAwarePaginator(
            $results,
            $total,
            $perPage,
            $currentPage,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return response()->json($paginator);
    }
}
