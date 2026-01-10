<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $messageId;
    public $message;
    public $senderId;
    public $receiverId;
    public $isEdited;

    /**
     * Create a new event instance.
     */
    public function __construct($messageId, $message, $senderId, $receiverId, $isEdited = true)
    {
        $this->messageId = $messageId;
        $this->message = $message;
        $this->senderId = $senderId;
        $this->receiverId = $receiverId;
        $this->isEdited = $isEdited;
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn()
    {
        return ['chat'];
    }

    public function broadcastAs()
    {
        return "message-updated";
    }

    /**
     * Data to broadcast.
     */
    public function broadcastWith()
    {
        return [
            'id' => $this->messageId,
            'message' => $this->message,
            'sender_id' => $this->senderId,
            'receiver_id' => $this->receiverId,
            'is_edited' => $this->isEdited,
        ];
    }
}
