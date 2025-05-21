<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'telephone',
        'localisation',
        'couverture_url',
        'image_profile_url',
        'workplace',
        'relationship_status',
        'partner',
        'job_title',
        'date_of_birth',
        'gender',
        'website',
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

    // === POSTS & INTERACTIONS ===

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function postsLiked()
    {
        return $this->belongsToMany(Post::class); // Consider naming pivot if exists
    }

    public function postsCommented()
    {
        return $this->belongsToMany(Post::class); // Consider naming pivot if exists
    }

    // === FRIENDS ===

    public function amis()
    {
        return $this->belongsToMany(User::class, 'amis', 'user_id', 'amie_id');
    }

    public function amisOf()
    {
        return $this->belongsToMany(User::class, 'amis', 'amie_id', 'user_id');
    }


    public function allFriends()
{
        return $this->amis->merge($this->amisOf);
}

    // === INVITATIONS ===

    public function invitationsRecues()
    {
        return $this->hasMany(Invitation::class, 'id_invite');
    }

    public function invitationsEnvoyees()
    {
        return $this->hasMany(Invitation::class, 'id_inviteur');
    }

    // === GROUPS ===

    public function groups()
    {
        return $this->belongsToMany(Group::class, 'group_members')
            ->withPivot('role', 'status', 'joined_at')
            ->withTimestamps();
    }

    public function groupMembers()
    {
        return $this->hasMany(GroupMember::class);
    }

    // === PAGES ===

    public function pages()
    {
        return $this->hasMany(Page::class);
    }

    public function followedPages()
    {
        return $this->belongsToMany(Page::class, 'followers_pages')
            ->withTimestamps();
    }
    public function adminPages()
    {
        return $this->belongsToMany(Page::class, 'page_admins')
            ->withTimestamps();
    }
    public function savedPosts()
    {
        return $this->belongsToMany(Post::class, 'save_publications')
            ->withPivot('save_at')
            ->withTimestamps();
    }

    public function reportedPosts()
    {
        return $this->belongsToMany(Post::class, 'post_reports')
            ->withPivot('cause')
            ->withTimestamps();
    }


    public function hiddenPosts()
{
    return $this->hasMany(HidePublications::class);
}

}



