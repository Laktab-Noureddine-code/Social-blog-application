<?php

namespace App\Http\Controllers;

use App\Events\Message;
use App\Events\MessageSent;
use App\Models\Message as MessageModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|integer|exists:users,id',
            'message' => 'nullable|string',
            'media' => 'nullable|file|mimes:jpg,jpeg,png,mp4|max:10240',
        ]);
        $mediaPath = null;
        if ($request->hasFile('media')) {
            $mediaPath = $request->file('media')->store('images/messages', 'public');
        }

        $user = auth()->user(); // sender
        $senderId = $user->id;
        $receiverId = (int) $request->receiver_id;

        // Save message into DB
        $message = MessageModel::create([
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
            'message' => $request->message,
            'media' => $mediaPath,
        ]);

        // Optional: sort users for chat channel logic (if needed)
        $sortedUserIds = collect([$senderId, $receiverId])->sort()->join('.');

        // Fire real-time event with both message + media URL
        event(new Message(
            $message->message,
            $senderId,
            $receiverId,
            $message->media   // pass media URL to the event too
        ));

        return response()->json($message, 201);
    }




    public function index()
    {
        $userId = Auth::id();
        return MessageModel::where(function ($query) use ($userId) {
            $query->where('sender_id', $userId)
                ->orWhere('receiver_id', $userId);
        })
            ->with(['sender:id,name', 'receiver:id,name'])
            ->orderBy('created_at', 'asc')
            ->get();
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'message' => 'nullable|string',
            'media' => 'nullable|file|mimes:jpg,jpeg,png,mp4|max:10240',
        ]);

        $userId = Auth::id();
        $message = MessageModel::where('id', $id)
            ->where('sender_id', $userId)
            ->first();

        if (!$message) {
            return response()->json(['error' => 'Message not found or not authorized'], 404);
        }

        if ($request->has('message')) {
            $message->message = $request->message;
        }

        if ($request->hasFile('media')) {
            $mediaPath = $request->file('media')->store('messages', 'public');
            $message->media = $mediaPath;
        }

        $message->save();

        event(new Message($message));

        return response()->json($message);
    }

    public function destroy($id)
    {
        $userId = Auth::id();
        $message = MessageModel::where('id', $id)
            ->where('sender_id', $userId)
            ->first();

        if (!$message) {
            return response()->json(['error' => 'Message not found or not authorized'], 404);
        }

        $message->delete();
        // event(new Message(['deleted_message_id' => $id]));

        return response()->json(['message' => 'Message deleted successfully']);
    }
}
