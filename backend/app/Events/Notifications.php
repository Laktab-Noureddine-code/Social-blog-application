<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Notifications implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $userId;
    public $description;
    public $type;
    public $content;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($userId, $description, $type, $content)
    {
        $this->userId = $userId;
        $this->description = $description;
        $this->type = $type;
        $this->content = $content;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('user.' . $this->userId); // Private channel for specific user
    }

    /**
     * Data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return [
            'description' => $this->description,
            'type' => $this->type,
            'content' => $this->content,
        ];
    }

    /**
     * Broadcast name for event.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'notification';
    }
}
