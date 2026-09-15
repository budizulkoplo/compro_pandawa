<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'image',
        'isActive',
        'sortOrder',
        'metaTitle',
        'metaDescription',
        'metaKeywords',
    ];

    protected $casts = [
        'isActive' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('isActive', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sortOrder')->orderBy('created_at');
    }
}
