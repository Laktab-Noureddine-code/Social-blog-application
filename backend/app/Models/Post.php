<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $fillable = [
        'text',
        'user_id',
        'admin_id',
        'page_id',
        'group_id',
        'type'
    ];
    public function User()
    {
        return $this->belongsTo(User::class);
    }
    public function adminPost()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
    public function Medias()
    {
        return $this->hasMany(Media::class);
    }
    public function UsersLike()
    {
        return $this->belongsToMany(User::class);
    }
    public function Likes()
    {
        return $this->hasMany(Like::class);
    }
    public function UsersComment()
    {
        return $this->belongsToMany(User::class);
    }
    public function Comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function page()
    {
        return $this->belongsTo(Page::class);
    }
    public function group()
    {
        return $this->belongsTo(Group::class);
    }
    public function savedByUsers()
    {
        return $this->belongsToMany(User::class, 'save_publications')
            ->withPivot('save_at')
            ->withTimestamps();
    }
    public function reports()
    {
        return $this->belongsToMany(User::class, 'rapport_publications')
            ->withPivot('cause')
            ->withTimestamps();
    }
    //     public function hiddenByUsers()
    // {
    //     return $this->hasMany(HidePublications::class);
    // }
    public function hiddenByUsers()
    {
        return $this->belongsToMany(User::class, 'hide_publications', 'post_id', 'user_id');
    }
}
