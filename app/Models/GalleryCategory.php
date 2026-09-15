<?php
// app/Models/GalleryCategory.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class GalleryCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'slug',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function galleryItems(): HasMany
    {
        return $this->hasMany(GalleryItem::class)->orderBy('sort_order');
    }

    public function activeGalleryItems(): HasMany
    {
        return $this->hasMany(GalleryItem::class)->where('is_active', true)->orderBy('sort_order');
    }

    public function activeItems(): HasMany
    {
        return $this->hasMany(GalleryItem::class)->where('is_active', true)->orderBy('sort_order');
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });

        static::updating(function ($category) {
            if ($category->isDirty('name') && empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });
    }

    public function items(): HasMany
    {
        return $this->hasMany(GalleryItem::class, 'gallery_category_id')->orderBy('sort_order');
    }
}
