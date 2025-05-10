<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'group_id',
        'user_id',
        'role',
        'status',
        'joined_at',
    ];

    // Relation: appartenance au groupe
    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    // Relation: appartenance à l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
