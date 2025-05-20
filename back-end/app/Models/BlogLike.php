<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogLike extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'blog_id'
    ];

    /**
     * Get the user who liked the blog.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the blog that was liked.
     */
    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
