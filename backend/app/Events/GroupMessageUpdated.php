<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GroupMessageUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $messageId;
    public $message;
    public $senderId;
    public $groupId;
    public $isEdited;

    /**
     * Create a new event instance.
     */
    public function __construct($messageId, $message, $senderId, $groupId, $isEdited = true)
    {
        $this->messageId = $messageId;
        $this->message = $message;
        $this->senderId = $senderId;
        $this->groupId = $groupId;
        $this->isEdited = $isEdited;
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn()
    {
        return ["group.{$this->groupId}"];
    }

    public function broadcastAs()
    {
        return "group-message-updated";
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
            'group_id' => $this->groupId,
            'is_edited' => $this->isEdited,
        ];
    }
}
