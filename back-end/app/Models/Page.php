<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    /** @use HasFactory<\Database\Factories\PageFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'cover_image_url',
        'profile_image_url',
        'category',
        'website',
        'email',
        'phone',
        'location',
        'user_id',
    ];

    // A Page belongs to a User (owner)
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers_pages')
            ->withTimestamps();
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    public function admins()
    {
        return $this->belongsToMany(User::class, 'page_admins')
            ->withTimestamps();
    }
}
