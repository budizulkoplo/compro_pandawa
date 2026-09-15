<?php
// app/Models/AboutUs.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutUs extends Model
{
    use HasFactory;

    protected $table = 'about_us';

    protected $fillable = [
        'description',
        'vision',
        'mission',
        'profile_images',
        'profile_video_url',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'slug',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeActive($query)
    {
        return $query->where('isActive', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sortOrder', 'asc');
    }
}
