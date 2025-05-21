<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandeAdmin extends Model
{
    /** @use HasFactory<\Database\Factories\DemandeAdminFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'page_id',
        'id_demondeur',
        'message',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    public function demandeur()
    {
        return $this->belongsTo(User::class, 'id_demondeur');
    }
}
