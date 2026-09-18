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
        'service_id',
        'isActive',
        'sortOrder',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'isActive' => 'boolean',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}