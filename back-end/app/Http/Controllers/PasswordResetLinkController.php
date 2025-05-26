<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;

class PasswordResetLinkController extends Controller
{
    

    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $token = Str::random(64);

        // Stocker le token dans la table password_resets
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'token' => Hash::make($token),
                'created_at' => Carbon::now(),
            ]
        );

        // Créer l'URL de réinitialisation
        $resetUrl = "http://localhost:5173/reset-password/{$token}/{$request->email}";
        $user = User::where('email', $request->email)->first(); // Remplacez User par le nom de votre modèle d'utilis

        // // Envoyer un e-mail simple avec le lien
        // Mail::raw("Clique ici pour réinitialiser ton mot de passe : $resetUrl", function ($message) use ($request) {
        //     $message->to($request->email);
        //     $message->subject("Réinitialisation du mot de passe");
        // });
        // $resetUrl = "http://localhost:5173/reset-password/$token/" . urlencode($user->email);

        Mail::send('reset-email', ['resetUrl' => $resetUrl,'name'=>$user->name], function ($message) use ($request) {
            $message->to($request->email)
                ->subject("Réinitialisation du mot de passe");
        });

        return response()->json(['message' => 'Un lien de réinitialisation a été envoyé par e-mail.']);
    }
}