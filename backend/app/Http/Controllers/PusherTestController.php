<?php

namespace App\Http\Controllers;

use App\Events\Message;
use App\Events\Notifications;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PusherTestController extends Controller
{
    /**
     * Test Pusher connection by sending a test event
     */
    public function testPusher(Request $request)
    {
        try {
            // Test basic Pusher event
            event(new \App\Events\TestEvent([
                'message' => 'Hello from Laravel!',
                'timestamp' => now()->toDateTimeString(),
                'test' => true
            ]));

            return response()->json([
                'success' => true,
                'message' => 'Test event sent successfully to my-channel',
                'timestamp' => now()->toDateTimeString()
            ]);
        } catch (\Exception $e) {
            Log::error('Pusher test error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error sending test event',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Test notification event
     */
    public function testNotification(Request $request)
    {
        $userId = $request->input('user_id', 1);

        try {
            event(new Notifications(
                $userId,
                'This is a test notification',
                'test',
                ['test' => true, 'timestamp' => now()->toDateTimeString()]
            ));

            return response()->json([
                'success' => true,
                'message' => "Test notification sent to user {$userId}",
                'timestamp' => now()->toDateTimeString()
            ]);
        } catch (\Exception $e) {
            Log::error('Notification test error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error sending test notification',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Test chat message event
     */
    public function testMessage(Request $request)
    {
        $senderId = $request->input('sender_id', 1);
        $receiverId = $request->input('receiver_id', 2);

        try {
            event(new Message(
                'This is a test message from Pusher test',
                $senderId,
                $receiverId
            ));

            return response()->json([
                'success' => true,
                'message' => "Test message sent from user {$senderId} to user {$receiverId}",
                'timestamp' => now()->toDateTimeString()
            ]);
        } catch (\Exception $e) {
            Log::error('Message test error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error sending test message',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get Pusher configuration info
     */
    public function getConfig()
    {
        return response()->json([
            'app_key' => config('broadcasting.connections.pusher.key'),
            'cluster' => config('broadcasting.connections.pusher.options.cluster'),
            'driver' => config('broadcasting.default'),
            'encrypted' => config('broadcasting.connections.pusher.options.useTLS', true),
        ]);
    }
}
