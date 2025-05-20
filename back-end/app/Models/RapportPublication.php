<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RapportPublication extends Model
{
    /** @use HasFactory<\Database\Factories\RapportPublicationFactory> */
    use HasFactory;


    protected $fillable = ['user_id', 'post_id', 'cause'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
