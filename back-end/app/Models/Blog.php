<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'cover_image',
        'creator_id',
        'creator_type',
        'created_by'
    ];

    /**
     * Get the creator of the blog (User or Group).
     */
    public function creator()
    {
        return $this->morphTo();
    }

    /**
     * Get the comments for the blog.
     */
    public function comments()
    {
        return $this->hasMany(BlogComment::class);
    }

    /**
     * Get the likes for the blog.
     */
    public function likes()
    {
        return $this->hasMany(BlogLike::class);
    }
    
    /**
     * Get the user who created the blog.
     */
    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    
    /**
     * Check if a user has liked this blog
     */
    public function isLikedByUser($userId)
    {
        return $this->likes()->where('user_id', $userId)->exists();
    }

    public function savedByUsers()
    {
        return $this->belongsToMany(User::class, 'saved_blogs')
            ->withTimestamps()
            ->withPivot('saved_at')
            ->using(SavedBlog::class);
    }

    public function isSavedBy(User $user)
    {
        return $this->savedByUsers()->where('user_id', $user->id)->exists();
    }
}
