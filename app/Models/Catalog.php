<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Catalog extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'image',
        'isActive',
        'sortOrder',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'isActive' => 'boolean',
    ];
}