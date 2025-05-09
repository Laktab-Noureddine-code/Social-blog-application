<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Register broadcast routes with Sanctum middleware
        Broadcast::routes(['middleware' => ['auth:sanctum']]);

        // Load channel authorization routes
        require base_path('routes/channels.php');

        // Optional: Customize the authentication endpoint if needed
        // Broadcast::channel('chat.{userId1}.{userId2}', function ($user, $userId1, $userId2) {
        //     return (int) $user->id === (int) $userId1 || (int) $user->id === (int) $userId2;
        // });
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        // Optionally register any broadcast services here
    }
}
