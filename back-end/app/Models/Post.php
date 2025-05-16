<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $fillable = [
        'text',
        'user_id'
    ];
    public function User(){
        return $this->belongsTo(User::class);
    }
    public function Medias(){
        return $this->hasMany(Media::class);
    }
    public function UsersLike(){
        return $this->belongsToMany(User::class);
    }
    public function Likes(){
        return $this->hasMany(Like::class);
    }
    public function UsersComment(){
        return $this->belongsToMany(User::class);
    }
    public function Comments(){
        return $this->hasMany(Comment::class);
    }
}
