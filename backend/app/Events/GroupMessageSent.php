<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GroupMessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $sender;
    public $groupId;
    public $media;
    public $created_at;

    public function __construct($message, User $sender, $groupId, $media = null, $created_at = null)
    {
        $this->message = $message;
        $this->sender = $sender;
        $this->groupId = $groupId;
        $this->media = $media;
        $this->created_at = $created_at ?: now()->toDateTimeString();
    }

    public function broadcastOn()
    {
        return new Channel('group.' . $this->groupId);
    }

    public function broadcastAs()
    {
        return 'group-message';
    }

    public function broadcastWith()
    {
        return [
            'message' => $this->message,
            'sender' => [
                'id' => $this->sender->id,
                'name' => $this->sender->name,
                'profile_image' => $this->sender->profile_image,
                'couverture_url' => $this->sender->couverture_url,
                // include any other sender fields you need
            ],
            'group_id' => $this->groupId,
            'media' => $this->media,
            'created_at' => $this->created_at,
        ];
    }
}
