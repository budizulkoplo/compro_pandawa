<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use App\Models\Service;
use App\Models\GalleryCategory;
use App\Models\GalleryItem;
use App\Models\Client;
use App\Models\Message;
use App\Models\Certificate;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'pages' => [
                'about' => AboutUs::count(),
                'services' => Service::where('isActive', true)->count(),
                'clients' => Client::where('is_active', true)->count(),
            ],
            'gallery' => [
                'categories' => GalleryCategory::where('is_active', true)->count(),
                'items' => GalleryItem::where('is_active', true)->count(),
            ],
            'messages' => [
                'total' => Message::count(),
                'unread' => Message::where('isRead', false)->count(),
                'today' => Message::whereDate('created_at', today())->count(),
            ],
            'certificates' => [
                'total' => Certificate::count(),
                'active' => Certificate::where('is_active', true)->count(),
            ]
        ];

        $recentMessages = Message::with('repliedByUser')
            ->latest()
            ->limit(5)
            ->get(['id', 'name', 'email', 'subject', 'isRead', 'created_at']);

        $quickStats = [
            'totalPages' => $stats['pages']['about'] + $stats['pages']['services'] + $stats['pages']['clients'],
            'totalGalleryItems' => $stats['gallery']['items'],
            'unreadMessages' => $stats['messages']['unread'],
            'activeCertificates' => $stats['certificates']['active'],
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentMessages' => $recentMessages,
            'quickStats' => $quickStats,
        ]);
    }
}
