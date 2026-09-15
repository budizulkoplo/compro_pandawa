<?php
// app/Models/Message.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'isRead',
        'readAt',
        'adminReply',
        'repliedAt',
        'repliedByUserId',
    ];

    protected $casts = [
        'isRead' => 'boolean',
        'readAt' => 'datetime',
        'repliedAt' => 'datetime',
    ];

    public function repliedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'repliedByUserId');
    }

    public function markAsRead(): void
    {
        if (!$this->isRead) {
            $this->update([
                'isRead' => true,
                'readAt' => now(),
            ]);
        }
    }

    public function scopeUnread($query)
    {
        return $query->where('isRead', false);
    }

    public function scopeRead($query)
    {
        return $query->where('isRead', true);
    }
}
