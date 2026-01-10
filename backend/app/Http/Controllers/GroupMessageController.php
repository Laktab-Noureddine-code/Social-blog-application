<?php

namespace App\Http\Controllers;

use App\Events\GroupMessageSent;
use App\Events\GroupMessageUpdated;
use App\Models\GroupMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupMessageController extends Controller
{
    // public function sendGroupMessage(Request $request)
    // {
    //     $request->validate([
    //         'group_id' => 'required|exists:groups,id',
    //         'message' => 'nullable|string',
    //         'media' => 'nullable|file|mimes:jpg,jpeg,png,mp4|max:10240',
    //     ]);

    //     $mediaPath = null;
    //     if ($request->hasFile('media')) {
    //         $mediaPath = $request->file('media')->store('images/group_messages', 'public');
    //     }

    //     $user = Auth::user();
    //     $senderId = $user->id;
    //     $groupId = (int) $request->group_id;

    //     // Save group message into DB
    //     $groupMessage = GroupMessage::create([
    //         'group_id' => $groupId,
    //         'sender_id' => $senderId,
    //         'message' => $request->message,
    //         'media' => $mediaPath,
    //     ]);

    //     // Broadcast to group channel
    //     event(new GroupMessageSent(
    //         $groupMessage->message,
    //         $senderId,
    //         $groupId,
    //         $groupMessage->media
    //     ));

    //     return response()->json($groupMessage, 201);
    // }
    public function sendGroupMessage(Request $request)
    {
        $request->validate([
            'group_id' => 'required|exists:groups,id',
            'message' => 'nullable|string',
            'media' => 'nullable|file|mimes:jpg,jpeg,png,mp4|max:10240',
        ]);

        $mediaPath = null;
        if ($request->hasFile('media')) {
            $mediaPath = $request->file('media')->store('images/group_messages', 'public');
        }

        $user = Auth::user();
        $senderId = $user->id;
        $groupId = (int) $request->group_id;

        // Save group message into DB
        $groupMessage = GroupMessage::create([
            'group_id' => $groupId,
            'sender_id' => $senderId,
            'message' => $request->message,
            'media' => $mediaPath,
        ]);

        // Load the sender relationship with the message
        $groupMessage->load('sender');

        // Broadcast to group channel with full sender data
        event(new GroupMessageSent(
            $groupMessage->message,
            $groupMessage->sender, // Pass the entire sender object
            $groupId,
            $groupMessage->media,
            $groupMessage->created_at
        ));

        return response()->json($groupMessage, 201);
    }
    public function getAllGroupMessages($groupId)
    {
        $messages = GroupMessage::with('sender')
            ->where('group_id', $groupId)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $userId = Auth::id();
        $message = GroupMessage::where('id', $id)
            ->where('sender_id', $userId)
            ->first();

        if (!$message) {
            return response()->json(['error' => 'Message not found or not authorized'], 404);
        }

        $message->update([
            'message' => $request->message,
            'is_edited' => true,
        ]);

        // Broadcast the update in real-time
        event(new GroupMessageUpdated(
            $message->id,
            $message->message,
            $message->sender_id,
            $message->group_id,
            true
        ));

        return response()->json($message);
    }

    public function destroy($id)
    {
        $userId = Auth::id();
        $message = GroupMessage::where('id', $id)
            ->where('sender_id', $userId)
            ->first();

        if (!$message) {
            return response()->json(['error' => 'Message not found or not authorized'], 404);
        }

        $message->delete();
        return response()->json(['message' => 'Message deleted successfully']);
    }
}
