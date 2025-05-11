<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'confidentiality',
        'visibility',
        'created_by',
        'cover_image',
        'profile_image',
    ];

    // Relation: un groupe appartient à un créateur (user)
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Relation: un groupe a plusieurs membres (pivot enrichi)
    public function members()
    {
        return $this->belongsToMany(User::class, 'group_members')
            ->withPivot('role', 'status', 'joined_at')
            ->withTimestamps();
    }
    public function messages()
    {
        return $this->hasMany(GroupMessage::class);
    }
}
