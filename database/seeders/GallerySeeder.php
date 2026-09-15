<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        // Seed Categories
        DB::table('gallery_categories')->insert([
            [
                'name' => 'Pelatihan Keamanan',
                'description' => 'Dokumentasi kegiatan pelatihan fisik, mental, dan keahlian untuk para tenaga pengamanan kami.',
                'slug' => 'pelatihan-keamanan',
                'meta_title' => 'Galeri Pelatihan Keamanan | SIGAP',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Kontrol Lapangan',
                'description' => 'Kegiatan kontrol dan supervisi rutin di lokasi klien untuk memastikan standar operasional terpenuhi.',
                'slug' => 'kontrol-lapangan',
                'meta_title' => 'Galeri Kontrol Lapangan | SIGAP',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Kunjungan Klien',
                'description' => 'Momen pertemuan dan diskusi bersama para klien kami untuk memastikan kepuasan layanan.',
                'slug' => 'kunjungan-klien',
                'meta_title' => 'Galeri Kunjungan Klien | SIGAP',
                'is_active' => true,
                'sort_order' => 3,
            ],
        ]);

        // Seed Items
        DB::table('gallery_items')->insert([
            // Pelatihan Keamanan (Category ID: 1)
            ['gallery_category_id' => 1, 'title' => 'Pelatihan Fisik di Lapangan', 'image_path' => '/images/gallery/pelatihan-fisik-lapangan.jpg', 'alt_text' => 'Tenaga keamanan berbaris di lapangan lari', 'is_active' => true, 'sort_order' => 1],
            ['gallery_category_id' => 1, 'title' => 'Pelatihan Baris-berbaris', 'image_path' => '/images/gallery/pelatihan-baris.jpg', 'alt_text' => 'Instruktur memberikan arahan baris-berbaris', 'is_active' => true, 'sort_order' => 2],
            ['gallery_category_id' => 1, 'title' => 'Pelatihan Dalam Ruangan', 'image_path' => '/images/gallery/pelatihan-ruangan.jpg', 'alt_text' => 'Peserta pelatihan duduk di dalam kelas', 'is_active' => true, 'sort_order' => 3],

            // Kontrol Lapangan (Category ID: 2)
            ['gallery_category_id' => 2, 'title' => 'Briefing Malam', 'image_path' => '/images/gallery/kontrol-malam.jpg', 'alt_text' => 'Supervisor memberikan briefing malam kepada petugas', 'is_active' => true, 'sort_order' => 1],
            ['gallery_category_id' => 2, 'title' => 'Pengecekan Pos Jaga', 'image_path' => '/images/gallery/kontrol-pos.jpg', 'alt_text' => 'Pengecekan kelengkapan petugas di pos jaga', 'is_active' => true, 'sort_order' => 2],
            ['gallery_category_id' => 2, 'title' => 'Apel Pagi di Lokasi Proyek', 'image_path' => '/images/gallery/kontrol-proyek.jpg', 'alt_text' => 'Tim keamanan melakukan apel pagi di area proyek', 'is_active' => true, 'sort_order' => 3],

            // Kunjungan Klien (Category ID: 3)
            ['gallery_category_id' => 3, 'title' => 'Meeting dengan Klien Industri', 'image_path' => '/images/gallery/visit-klien-1.jpg', 'alt_text' => 'Tim SIGAP meeting dengan perwakilan klien', 'is_active' => true, 'sort_order' => 1],
            ['gallery_category_id' => 3, 'title' => 'Diskusi Proyek', 'image_path' => '/images/gallery/visit-klien-2.jpg', 'alt_text' => 'Diskusi teknis operasional bersama klien', 'is_active' => true, 'sort_order' => 2],
        ]);
    }
}
