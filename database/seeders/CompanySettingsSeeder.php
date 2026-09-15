<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanySettingsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('company_settings')->insert([
            'company_name' => 'PT. Sinergy Garda Pratama',
            'company_address' => 'Jl. Raya Hilir, Kel. Kembangarum, Kec. Semarang Barat, Jawa Tengah - INDONESIA',
            'company_phone' => '0811-2682-105', // Using primary contact
            'company_email' => 'sinergy@infosecurity-sgp.co.id',
            'company_website' => 'https://www.infosecurity-sgp.co.id', // Assumed website
            'company_description' => 'PT. SINERGY GARDA PRATAMA adalah perusahaan yang bergerak dalam bidang pelayanan Jasa Keamanan, Pengelolaan Parkir, dan Penyedia Sumber Daya Manusia (Outsourcing) untuk memenuhi kebutuhan tenaga kerja di seluruh Indonesia.',
            'logo_path' => '/images/logo-sigap.png',
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
            'whatsapp_default_message' => 'Halo PT. Sinergy Garda Pratama, saya tertarik dengan layanan Anda dan ingin bertanya lebih lanjut.',
            'whatsapp_enabled' => true,
            'meta_title' => 'PT. Sinergy Garda Pratama - Solusi Keamanan dan Outsourcing',
            'meta_description' => 'SIGAP menyediakan jasa keamanan, pengelolaan parkir, dan outsourcing tenaga kerja profesional di Indonesia. Hubungi kami untuk solusi keamanan terpercaya.',
            'meta_keywords' => 'jasa keamanan, outsourcing, pengelolaan parkir, satpam, security, penyedia sdm, semarang, indonesia',
        ]);
    }
}
