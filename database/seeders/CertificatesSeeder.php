<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CertificatesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('certificates')->insert([
            [
                'title' => 'ISO 9001 - Quality Management System',
                'issuer' => 'SAI GLOBAL',
                'image_path' => '/images/certificates/iso-9001.png',
                'description' => 'Sertifikasi Sistem Manajemen Mutu yang menjamin kualitas layanan kami.',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'ISO 45001 - Health & Safety Management System',
                'issuer' => 'Certified Body',
                'image_path' => '/images/certificates/iso-45001.png',
                'description' => 'Sertifikasi Sistem Manajemen Kesehatan & Keselamatan Kerja.',
                'is_active' => true,
                'sort_order' => 2,
            ],
        ]);
    }
}
