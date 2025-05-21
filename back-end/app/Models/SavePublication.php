<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavePublication extends Model
{
    /** @use HasFactory<\Database\Factories\SavePublicationFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'post_id', 'save_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
