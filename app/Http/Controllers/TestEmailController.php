<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestEmailController extends Controller
{
    public function viewTestEmail()
    {
        // Dummy data for testing
        $customerMessage = (object)[
            'name' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'phone' => '081234567890',
            'subject' => 'Permintaan Informasi',
            'message' => 'Saya ingin menanyakan lebih lanjut mengenai layanan yang ditawarkan.',
            'created_at' => now(),
        ];
        $websiteUrl = 'https://sigap.id';
        $replyContent = 'Terima kasih atas pertanyaan Anda. Kami akan segera menghubungi Anda untuk memberikan informasi lebih lanjut terkait layanan kami.';
        $adminUrl = config('app.url') . '/admin/messages';

        // Return the email view with dummy data
        return view('emails.admin.new-message', compact('customerMessage', 'websiteUrl', 'replyContent', 'adminUrl'));
    }
}
