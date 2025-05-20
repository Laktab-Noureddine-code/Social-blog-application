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
}
