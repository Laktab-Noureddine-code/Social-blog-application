<?php

namespace App\Http\Controllers;

use App\Events\GroupMessageSent;
use App\Models\GroupMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupMessageController extends Controller
{
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

        // Broadcast to group channel
        event(new GroupMessageSent(
            $groupMessage->message,
            $senderId,
            $groupId,
            $groupMessage->media
        ));

        return response()->json($groupMessage, 201);
    }
    public function getAllGroupMessages()
    {
        $messages = GroupMessage::with('sender')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }
}
