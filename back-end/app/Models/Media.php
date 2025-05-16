<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    /** @use HasFactory<\Database\Factories\MediaFactory> */
    use HasFactory;
    protected $fillable = [
        'type',
        'body',
        'url',
        'post_id'
    ];
    public function Post(){
        return $this->belongsTo(Post::class);
    }
}
