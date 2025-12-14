<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class SavedBlog extends Pivot
{
    use HasFactory;

    protected $table = 'saved_blogs';
    protected $fillable = ['user_id', 'blog_id', 'saved_at'];
    protected $dates = ['saved_at'];
    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
