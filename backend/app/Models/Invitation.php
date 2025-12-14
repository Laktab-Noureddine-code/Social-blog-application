<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    /** @use HasFactory<\Database\Factories\InvitationFactory> */
    use HasFactory;
    protected $fillable = ['id_invite', 'id_inviteur'];
    public function invite()
    {
        return $this->belongsTo(User::class, 'id_invite'); // 'id_invite' is the foreign key
    }

    // Relationship with the inviter user
    public function invitateur()
    {
        return $this->belongsTo(User::class, 'id_inviteur'); // 'id_inviteur' is the foreign key
    }
}
