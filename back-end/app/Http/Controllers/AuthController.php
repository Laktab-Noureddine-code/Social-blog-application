<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use function Laravel\Prompts\error;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
    public function register(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
        $user = User::create([
            'name' => $validate['name'],
            'email' => $validate['email'],
            'password' => Hash::make($validate['password']),
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }
    public function LogIn(Request $request){
        $validate = $request->validate(
            [
                'email'=>'required|max:255|email|exists:users',
                'password'=>'required'
            ]
            );
        $user = User::where('email', $request->email)->first();
        if(!$user || !Hash::check($request->password,$user->password)){
                   return response()->json(['errors' => [
                    'email'=> ['Email ou mot de passe incorrect']
            ]
        ], 401);
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return [
            "access_token" => $token,
            'user' => $user
        ];


    }
    public function LogOut(Request $request){
        $request->user()->tokens()->delete();
        return response()->json([
            "message"=>"logOut with success !"
        ]);

    }
}
