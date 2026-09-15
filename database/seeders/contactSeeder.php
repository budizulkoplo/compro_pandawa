<?php

namespace Database\Seeders;

use App\Models\Message;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class contactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $messages = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'phone' => '08123456789',
                'subject' => 'Pertanyaan tentang layanan keamanan',
                'message' => 'Saya ingin mengetahui lebih detail tentang layanan keamanan yang tersedia. Apakah ada paket khusus untuk gedung perkantoran?',
                'isRead' => false,
                'created_at' => now()->subDays(1),
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'phone' => '08987654321',
                'subject' => 'Konsultasi pengelolaan parkir',
                'message' => 'Kami membutuhkan jasa pengelolaan parkir untuk mall. Mohon informasi mengenai sistem dan biayanya.',
                'isRead' => true,
                'readAt' => now()->subHours(2),
                'created_at' => now()->subDays(2),
            ],
            [
                'name' => 'Ahmad Rahman',
                'email' => 'ahmad@example.com',
                'subject' => 'Request quotation outsourcing',
                'message' => 'Perusahaan kami memerlukan layanan outsourcing untuk bagian cleaning service. Mohon kirimkan penawaran harga.',
                'isRead' => true,
                'readAt' => now()->subHours(5),
                'adminReply' => '<p>Terima kasih atas minat Anda terhadap layanan kami.</p><p>Kami akan segera mengirimkan quotation ke email Anda dalam 1x24 jam.</p>',
                'repliedAt' => now()->subHours(3),
                'repliedByUserId' => 1,
                'created_at' => now()->subDays(3),
            ],
        ];

        foreach ($messages as $message) {
            Message::create($message);
        }
    }
}
