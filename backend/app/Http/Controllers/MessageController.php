<?php

namespace App\Http\Controllers;

use App\Events\Message;
use App\Events\MessageUpdated;
use App\Models\Message as MessageModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'nullable|string',
            'media' => 'nullable|file|mimes:jpg,jpeg,png,mp4|max:10240',
        ]);
        $mediaPath = null;
        if ($request->hasFile('media')) {
            $mediaPath = $request->file('media')->store('images/messages', 'public');
        }

        $user = Auth::user(); // sender
        $senderId = $user->id;
        $receiverId = (int) $request->receiver_id;

        // Save message into DB
        $message = MessageModel::create([
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
            'message' => $request->message,
            'media' => $mediaPath,
        ]);

        // Fire real-time event with both message + media URL
        event(new Message(
            $message->message,
            $senderId,
            $receiverId,
            $message->media   // pass media URL to the event too
        ));

        return response()->json($message, 201);
    }




    public function index($friendId)
    {
        $userId = Auth::id();

        return MessageModel::where(function ($query) use ($userId, $friendId) {
            $query->where(function ($q) use ($userId, $friendId) {
                $q->where('sender_id', $userId)
                    ->where('receiver_id', $friendId);
            })->orWhere(function ($q) use ($userId, $friendId) {
                $q->where('sender_id', $friendId)
                    ->where('receiver_id', $userId);
            });
        })
            ->with(['sender:id,name', 'receiver:id,name'])
            ->orderBy('created_at', 'asc')
            ->get();
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
        return response()->json(['message' => 'Message deleted successfully']);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $userId = Auth::id();
        $message = MessageModel::where('id', $id)
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
        event(new MessageUpdated(
            $message->id,
            $message->message,
            $message->sender_id,
            $message->receiver_id,
            true
        ));

        return response()->json($message);
    }


    public function relatedUsers()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // 1. Get friends (full data)
        $amis = $user->amis()->get(); // full user objects
        $amisOf = $user->amisOf()->get(); // full user objects
        $tousAmis = $amis->merge($amisOf);

        // 2. Get users who sent or received a message to/from me (full data)
        $userId = $user->id;

        $messagePartners = MessageModel::where(function ($query) use ($userId) {
            $query->where('sender_id', $userId)
                ->orWhere('receiver_id', $userId);
        })
            ->with(['sender', 'receiver']) // no restriction on fields
            ->get()
            ->flatMap(function ($message) use ($userId) {
                return [
                    $message->sender_id != $userId ? $message->sender : null,
                    $message->receiver_id != $userId ? $message->receiver : null
                ];
            })
            ->filter()
            ->unique('id')
            ->values();

        // 3. Merge and remove duplicates
        $relatedUsers = $tousAmis->merge($messagePartners)->unique('id')->values();

        return response()->json($relatedUsers);
    }

    public function getMessagePartnersAndFriends()
    {
        $user = Auth::user();
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        // Get friends (similar to getAmis logic)
        $amis = $user->amis ?? collect();
        $amisOf = $user->amisOf ?? collect();
        $tousAmis = $amis->merge($amisOf);
    
        // Get users who exchanged messages with current user
        $messagePartners = MessageModel::where('sender_id', $user->id)
            ->orWhere('receiver_id', $user->id)
            ->with(['sender', 'receiver'])
            ->get()
            ->flatMap(function ($message) use ($user) {
                return [
                    $message->sender_id != $user->id ? $message->sender : null,
                    $message->receiver_id != $user->id ? $message->receiver : null
                ];
            })
            ->filter()
            ->unique('id')
            ->values();
    
        // Combine and remove duplicates
        $allRelations = $tousAmis->merge($messagePartners)->unique('id')->values();
    
        return response()->json($allRelations);
    }
}
