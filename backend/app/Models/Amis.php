<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Amis extends Model
{
    /** @use HasFactory<\Database\Factories\AmisFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'amie_id'
    ];
    public function amis()
    {
        return $this->belongsToMany(User::class, 'amis', 'user_id', 'amie_id');
        // ->withTimestamps();
    }


    public function amisOf()
    {

        return $this->belongsToMany(User::class, 'amis', 'amie_id', 'user_id');
        // ->withTimestamps();
    }
    // Helper method to get all friends
    public function friends()
    {
        return $this->amis->merge($this->amisOf);
    }
}
