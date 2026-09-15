<?php
// app/Models/GalleryItem.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GalleryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'gallery_category_id',
        'title',
        'description',
        'image_path',
        'alt_text',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function galleryCategory(): BelongsTo
    {
        return $this->belongsTo(GalleryCategory::class);
    }

    public function getImageUrlAttribute(): string
    {
        return $this->image_path ? asset('storage/' . $this->image_path) : '';
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc');
    }

    public function category()
    {
        return $this->belongsTo(GalleryCategory::class, 'gallery_category_id');
    }
}
