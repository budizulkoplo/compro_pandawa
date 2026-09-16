<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanySettingsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('company_settings')->insert([
            'company_name' => 'PT. Pandawa Meditech Pioneers',
            'company_address' => 'Jawa Tengah dan DIY, Indonesia',
            'company_phone' => '+62 811-2682-105',
            'company_email' => 'pandawameditechpioneers@gmail.com',
            'company_website' => null,
            'company_description' => 'PT. Pandawa Meditech Pioneers menyediakan alat kesehatan dan perlengkapan pendukung fasilitas kesehatan dengan kualitas dan pelayanan yang dapat diandalkan.',
            'logo_path' => '/images/logo-removebg.png',
            'favicon_path' => '/images/favicon.ico',
            'social_media' => json_encode([
                'facebook' => null,
                'instagram' => null,
                'twitter' => null,
                'linkedin' => null,
                'youtube' => null,
            ]),
            'google_maps_embed' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.22274996163!2d110.36802131477296!3d-6.982928994954751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70f5e4a8999999%3A0x8b5b5b5b5b5b5b5b!2sKembangarum%2C%20West%20Semarang%2C%20Semarang%20City%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1668108420981!5m2!1sen!2sid" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>', // Example embed for Semarang Barat
            'whatsapp_number' => '628112682105', // Ibnu Mundir's number in international format
            'whatsapp_default_message' => 'Halo PT. Pandawa Meditech Pioneers, saya tertarik dengan produk alat kesehatan dan ingin bertanya lebih lanjut.',
            'whatsapp_enabled' => true,
            'meta_title' => 'PT. Pandawa Meditech Pioneers - Distributor Alat Kesehatan',
            'meta_description' => 'PT. Pandawa Meditech Pioneers menyediakan solusi distribusi alat kesehatan dan perlengkapan fasilitas kesehatan.',
            'meta_keywords' => 'alat kesehatan, distributor alat kesehatan, perlengkapan rumah sakit, pandawa meditech pioneers',
        ]);
    }
}
