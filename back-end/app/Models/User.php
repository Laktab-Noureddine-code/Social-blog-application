<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'localisation',
        'telephone',
        'couverture_url',
        'image_profile_url',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function Posts()
    {
        return $this->hasMany(Post::class);
    }

    public function PostsLike()
    {
        return $this->belongsToMany(Post::class);
    }
    public function Likes()
    {
        return $this->hasMany(Like::class);
    }
    public function PostsComment()
    {
        return $this->belongsToMany(Post::class);
    }
    public function Comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function amis()
    {
        return $this->belongsToMany(User::class, 'amis', 'user_id', 'amie_id');
    }

    public function amisOf()
    {
        return $this->belongsToMany(User::class, 'amis', 'amie_id', 'user_id');
    }
    // User.php (Model)

    public function invitationsRecues()
    {
        return $this->hasMany(Invitation::class, 'id_invite'); // assuming 'id_invite' is the foreign key
    }

    public function invitationsEnvoyees()
    {
        return $this->hasMany(Invitation::class, 'id_inviteur'); // assuming 'id_inviteur' is the foreign key
    }
    public function blogs()
    {
        return $this->morphMany(Blog::class, 'creator');
    }
    public function blogLikes()
    {
        return $this->hasMany(BlogLike::class);
    }
}
